import { createContext, useContext, useEffect, useReducer } from 'react'

import type { Basics, Education, Experience, Project, Resume, SkillGroup } from './schema'

import { baseResume } from './pdf/base-resume'
import { safeParseResumeData } from './schema'

const STORAGE_KEY = 'resume-builder'
const UNDO_LIMIT = 50

type State = {
  data: Resume
  past: Resume[]
  future: Resume[]
}

type Action =
  | { type: 'set'; data: Resume }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return {
        data: action.data,
        past: [...state.past, state.data].slice(-UNDO_LIMIT),
        future: [],
      }
    case 'undo': {
      const previous = state.past[state.past.length - 1]
      if (!previous) return state
      return {
        data: previous,
        past: state.past.slice(0, -1),
        future: [state.data, ...state.future],
      }
    }
    case 'redo': {
      const next = state.future[0]
      if (!next) return state
      return {
        data: next,
        past: [...state.past, state.data].slice(-UNDO_LIMIT),
        future: state.future.slice(1),
      }
    }
    case 'reset':
      return {
        data: baseResume,
        past: [...state.past, state.data].slice(-UNDO_LIMIT),
        future: [],
      }
  }
}

function loadInitialData(): Resume {
  if (typeof window === 'undefined') return baseResume
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return baseResume
    return safeParseResumeData(JSON.parse(raw)) ?? baseResume
  } catch {
    return baseResume
  }
}

type ResumeBuilderContextValue = {
  data: Resume
  canUndo: boolean
  canRedo: boolean
  updateBasics: (patch: Partial<Basics>) => void
  updateExperience: (id: string, patch: Partial<Omit<Experience, 'id'>>) => void
  updateProject: (id: string, patch: Partial<Omit<Project, 'id'>>) => void
  addProject: (project: Project) => void
  removeProject: (id: string) => void
  updateEducation: (id: string, patch: Partial<Omit<Education, 'id'>>) => void
  updateSkillGroup: (id: string, patch: Partial<Omit<SkillGroup, 'id'>>) => void
  undo: () => void
  redo: () => void
  resetToBase: () => void
  importJson: (raw: unknown) => boolean
}

const ResumeBuilderContext = createContext<ResumeBuilderContextValue | null>(null)

export function ResumeBuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    data: loadInitialData(),
    past: [],
    future: [],
  }))

  // Route is client-only (ssr: false), so window is always available here.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data))
    } catch {
      // Storage full or unavailable: builder keeps working in memory.
    }
  }, [state.data])

  const set = (data: Resume) => dispatch({ type: 'set', data })

  const value: ResumeBuilderContextValue = {
    data: state.data,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    updateBasics: (patch) => set({ ...state.data, basics: { ...state.data.basics, ...patch } }),
    updateExperience: (id, patch) =>
      set({
        ...state.data,
        experience: state.data.experience.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }),
    updateProject: (id, patch) =>
      set({
        ...state.data,
        projects: state.data.projects.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }),
    addProject: (project) => set({ ...state.data, projects: [...state.data.projects, project] }),
    removeProject: (id) =>
      set({
        ...state.data,
        projects: state.data.projects.filter((item) => item.id !== id),
      }),
    updateEducation: (id, patch) =>
      set({
        ...state.data,
        education: state.data.education.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }),
    updateSkillGroup: (id, patch) =>
      set({
        ...state.data,
        skills: state.data.skills.map((group) =>
          group.id === id ? { ...group, ...patch } : group,
        ),
      }),
    undo: () => dispatch({ type: 'undo' }),
    redo: () => dispatch({ type: 'redo' }),
    resetToBase: () => dispatch({ type: 'reset' }),
    importJson: (raw) => {
      const parsed = safeParseResumeData(raw)
      if (!parsed) return false
      set(parsed)
      return true
    },
  }

  return <ResumeBuilderContext.Provider value={value}>{children}</ResumeBuilderContext.Provider>
}

export function useResumeBuilder(): ResumeBuilderContextValue {
  const context = useContext(ResumeBuilderContext)
  if (!context) throw new Error('useResumeBuilder must be used within ResumeBuilderProvider')
  return context
}
