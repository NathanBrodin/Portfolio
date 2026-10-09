import type { Resume } from './schema'

export const UNDO_LIMIT = 50
export const COMMIT_PAUSE_MS = 800
export const PERSIST_DEBOUNCE_MS = 300

export type BuilderHistoryState = {
  data: Resume
  /** Snapshot at the start of the current typing session, null when clean. */
  sessionBase: Resume | null
  past: Resume[]
  future: Resume[]
}

export function createHistoryState(data: Resume): BuilderHistoryState {
  return { data, sessionBase: null, past: [], future: [] }
}

export function editHistory(state: BuilderHistoryState, data: Resume): BuilderHistoryState {
  if (data === state.data) return state
  if (state.sessionBase === null) {
    return { data, sessionBase: state.data, past: state.past, future: [] }
  }
  return { ...state, data }
}

export function commitHistory(state: BuilderHistoryState): BuilderHistoryState {
  if (state.sessionBase === null) return state
  return {
    data: state.data,
    sessionBase: null,
    past: [...state.past, state.sessionBase].slice(-UNDO_LIMIT),
    future: [],
  }
}

export function discreteHistory(state: BuilderHistoryState, data: Resume): BuilderHistoryState {
  const committed = commitHistory(state)
  if (data === committed.data) return committed
  return {
    data,
    sessionBase: null,
    past: [...committed.past, committed.data].slice(-UNDO_LIMIT),
    future: [],
  }
}

export function undoHistory(state: BuilderHistoryState): BuilderHistoryState {
  if (state.sessionBase !== null) {
    return {
      data: state.sessionBase,
      sessionBase: null,
      past: state.past,
      future: [state.data, ...state.future],
    }
  }
  const previous = state.past[state.past.length - 1]
  if (!previous) return state
  return {
    data: previous,
    sessionBase: null,
    past: state.past.slice(0, -1),
    future: [state.data, ...state.future],
  }
}

export function redoHistory(state: BuilderHistoryState): BuilderHistoryState {
  // Edits clear `future` on session start, so redo is only reachable when clean.
  if (state.sessionBase !== null) return state
  const next = state.future[0]
  if (!next) return state
  return {
    data: next,
    sessionBase: null,
    past: [...state.past, state.data].slice(-UNDO_LIMIT),
    future: state.future.slice(1),
  }
}

export function canUndoHistory(state: BuilderHistoryState): boolean {
  return state.sessionBase !== null || state.past.length > 0
}

export function canRedoHistory(state: BuilderHistoryState): boolean {
  return state.future.length > 0
}
