import { createContext, useContext, useEffect, useReducer } from 'react'

import type { BuilderHistoryState } from './history'
import type { Basics, Education, Experience, Project, Resume, SkillGroup } from './schema'

import {
  canRedoHistory,
  canUndoHistory,
  COMMIT_PAUSE_MS,
  commitHistory,
  createHistoryState,
  discreteHistory,
  editHistory,
  PERSIST_DEBOUNCE_MS,
  redoHistory,
  undoHistory,
} from './history'
import { baseResume } from './pdf/base-resume'
import { safeParseResumeData } from './schema'

const STORAGE_KEY = 'resume-builder'

type Action =
  | { type: 'edit'; data: Resume }
  | { type: 'commit' }
  | { type: 'discrete'; data: Resume }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'reset' }
  | { type: 'replace'; data: Resume }

function reducer(state: BuilderHistoryState, action: Action): BuilderHistoryState {
  switch (action.type) {
    case 'edit':
      return editHistory(state, action.data)
    case 'commit':
      return commitHistory(state)
    case 'discrete':
      return discreteHistory(state, action.data)
    case 'undo':
      return undoHistory(state)
    case 'redo':
      return redoHistory(state)
    case 'reset':
      return discreteHistory(state, baseResume)
    case 'replace':
      return discreteHistory(state, action.data)
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
  commit: () => void
  undo: () => void
  redo: () => void
  resetToBase: () => void
  importJson: (raw: unknown) => boolean
}

const ResumeBuilderContext = createContext<ResumeBuilderContextValue | null>(null)

export function ResumeBuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createHistoryState(loadInitialData()),
  )

  // Pause splits a long edit run into one undo step per burst.
  useEffect(() => {
    if (state.sessionBase === null) return
    const timer = window.setTimeout(() => dispatch({ type: 'commit' }), COMMIT_PAUSE_MS)
    return () => window.clearTimeout(timer)
  }, [state.data, state.sessionBase])

  // Route is client-only (ssr: false), so window is always available here.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data))
      } catch {
        // Storage full or unavailable: builder keeps working in memory.
      }
    }, PERSIST_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [state.data])

  const edit = (data: Resume) => dispatch({ type: 'edit', data })
  const discrete = (data: Resume) => dispatch({ type: 'discrete', data })

  const value: ResumeBuilderContextValue = {
    data: state.data,
    canUndo: canUndoHistory(state),
    canRedo: canRedoHistory(state),
    // Bullet add/remove shares these updaters; blur-capture in the editors
    // container commits first, so those clicks start a fresh session.
    updateBasics: (patch) => edit({ ...state.data, basics: { ...state.data.basics, ...patch } }),
    updateExperience: (id, patch) =>
      edit({
        ...state.data,
        experience: state.data.experience.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }),
    updateProject: (id, patch) =>
      edit({
        ...state.data,
        projects: state.data.projects.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }),
    updateEducation: (id, patch) =>
      edit({
        ...state.data,
        education: state.data.education.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }),
    // Skill chips commit per add/remove instead of coalescing like free text.
    updateSkillGroup: (id, patch) =>
      discrete({
        ...state.data,
        skills: state.data.skills.map((group) =>
          group.id === id ? { ...group, ...patch } : group,
        ),
      }),
    addProject: (project) =>
      discrete({ ...state.data, projects: [...state.data.projects, project] }),
    removeProject: (id) =>
      discrete({
        ...state.data,
        projects: state.data.projects.filter((item) => item.id !== id),
      }),
    commit: () => dispatch({ type: 'commit' }),
    undo: () => dispatch({ type: 'undo' }),
    redo: () => dispatch({ type: 'redo' }),
    resetToBase: () => dispatch({ type: 'reset' }),
    importJson: (raw) => {
      const parsed = safeParseResumeData(raw)
      if (!parsed) return false
      dispatch({ type: 'replace', data: parsed })
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
