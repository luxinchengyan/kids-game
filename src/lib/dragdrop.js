// Lightweight drag-drop engine with undo support and tolerant matching

export function enableDragStart(e, id) {
  try {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
  } catch (err) {
    // some environments may not support dataTransfer; ignore
  }
}

export function handleDrop(e, targetId, session, matcher = (a, b) => a === b) {
  e.preventDefault()
  let id = null
  try {
    id = e.dataTransfer.getData('text/plain')
  } catch (err) {
    // ignore
  }
  if (!id) return false
  if (matcher(id, targetId)) {
    if (session && typeof session.recordMatch === 'function') {
      session.recordMatch(id, targetId)
    }
    return true
  }
  return false
}

export function createDragSession(onMatch) {
  const matches = []
  return {
    recordMatch(id, target) {
      matches.push({ id, target })
      if (typeof onMatch === 'function') onMatch(id, target)
    },
    undoLast() {
      return matches.pop()
    },
    all() {
      return matches.slice()
    }
  }
}

// tolerant matcher example: allows matching if ids share prefix
export function tolerantMatcher(a, b) {
  if (!a || !b) return false
  return a === b || a.split('-')[0] === b.split('-')[0]
}
