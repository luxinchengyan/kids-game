import { describe, it, expect } from 'vitest'
import { createKnowledgeMap, createMission, getLearningContentSummary, getWeakKnowledgePoints } from '../data/learningContent'

describe('Knowledge Map', () => {
  it('should create initial knowledge state with all units', () => {
    const knowledgeMap = createKnowledgeMap()
    
    // Should have entries
    expect(Object.keys(knowledgeMap).length).toBeGreaterThan(0)
    
    // Should include pinyin initials
    expect(knowledgeMap['pinyin_b']).toBeDefined()
    expect(knowledgeMap['pinyin_b'].type).toBe('initial')
    
    // Should include pinyin finals
    expect(knowledgeMap['pinyin_a']).toBeDefined()
    expect(knowledgeMap['pinyin_a'].type).toBe('final')
    
    // Should include blend pairs
    expect(knowledgeMap['pinyin_b_a']).toBeDefined()
    expect(knowledgeMap['pinyin_b_a'].type).toBe('blend')
    expect(knowledgeMap['pinyin_b_a'].content).toBe('ba')
  })

  it('should have correct structure for each knowledge unit', () => {
    const knowledgeMap = createKnowledgeMap()
    const unit = knowledgeMap['pinyin_b']
    
    expect(unit).toHaveProperty('id')
    expect(unit).toHaveProperty('type')
    expect(unit).toHaveProperty('content')
    expect(unit).toHaveProperty('difficulty')
    expect(unit).toHaveProperty('nextReviewAt')
    expect(unit).toHaveProperty('lastReviewedAt')
    expect(unit).toHaveProperty('errorCount')
    expect(unit).toHaveProperty('accuracy')
    expect(unit).toHaveProperty('correctCount')
    expect(unit).toHaveProperty('seenCount')
  })
})

describe('Mission Creation', () => {
  it('should create a mission with mixed content', () => {
    const profile = {
      language: 'zh',
      focus: 'mixed',
      companion: 'astro'
    }
    const knowledgeState = {}
    
    const mission = createMission(profile, knowledgeState)
    
    expect(Array.isArray(mission)).toBe(true)
    expect(mission.length).toBeGreaterThan(0)
    expect(mission.length).toBeLessThanOrEqual(6)
  })

  it('should include order and recommended interval for each task', () => {
    const profile = {
      language: 'zh',
      focus: 'mixed',
      companion: 'astro'
    }
    const knowledgeState = {}
    
    const mission = createMission(profile, knowledgeState)
    
    mission.forEach((task, index) => {
      expect(task.order).toBe(index + 1)
      expect(task.recommendedIntervalMinutes).toBeDefined()
    })
  })

  it('should prioritize review tasks when knowledge state has due reviews', () => {
    const profile = {
      language: 'zh',
      focus: 'mixed',
      companion: 'astro'
    }
    
    // Create a knowledge state with a due review
    const knowledgeState = createKnowledgeMap()
    knowledgeState['pinyin_b'].nextReviewAt = Date.now() - 1000 // Due now
    knowledgeState['pinyin_b'].seenCount = 1
    knowledgeState['pinyin_b'].errorCount = 1
    
    const mission = createMission(profile, knowledgeState)
    
    // First task should be a review task
    expect(mission.length).toBeGreaterThan(0)
    expect(mission[0].knowledgeUnitId).toBe('pinyin_b')
  })

  it('builds subject-focused missions from real focus areas instead of a static tiny pool', () => {
    const knowledgeState = createKnowledgeMap()
    const mission = createMission(
      {
        language: 'zh',
        focus: 'math',
        companion: 'astro',
        age: 5,
      },
      knowledgeState
    )

    expect(mission.length).toBeGreaterThan(0)
    expect(mission.every((task) => ['math', 'pinyin', 'english', 'stories'].includes(task.skill))).toBe(true)
    expect(mission.some((task) => task.skill === 'math')).toBe(true)
    expect(mission.some((task) => task.type === 'micro' || task.type === 'choice')).toBe(true)
    expect(mission.every((task) => typeof task.missionRole === 'string')).toBe(true)
  })
})

describe('Weak Knowledge Points', () => {
  it('should return empty array for empty knowledge state', () => {
    const weakPoints = getWeakKnowledgePoints({})
    expect(weakPoints).toEqual([])
  })

  it('should identify weak points based on accuracy and errors', () => {
    const knowledgeState = createKnowledgeMap()
    
    // Make 'pinyin_b' a weak point
    knowledgeState['pinyin_b'].seenCount = 5
    knowledgeState['pinyin_b'].correctCount = 2
    knowledgeState['pinyin_b'].accuracy = 0.4
    knowledgeState['pinyin_b'].errorCount = 3
    
    // Make 'pinyin_p' less weak
    knowledgeState['pinyin_p'].seenCount = 3
    knowledgeState['pinyin_p'].correctCount = 2
    knowledgeState['pinyin_p'].accuracy = 0.67
    knowledgeState['pinyin_p'].errorCount = 1
    
    const weakPoints = getWeakKnowledgePoints(knowledgeState)
    
    expect(weakPoints.length).toBeGreaterThan(0)
    // First weak point should be pinyin_b (lower accuracy, more errors)
    expect(weakPoints[0].id).toBe('pinyin_b')
  })

  it('should return at most 3 weak points', () => {
    const knowledgeState = createKnowledgeMap()
    
    // Make multiple units weak
    const unitsToMakeWeak = ['pinyin_b', 'pinyin_p', 'pinyin_m', 'pinyin_f', 'pinyin_d']
    unitsToMakeWeak.forEach((unitId, index) => {
      knowledgeState[unitId].seenCount = 5
      knowledgeState[unitId].correctCount = 2
      knowledgeState[unitId].accuracy = 0.4
      knowledgeState[unitId].errorCount = 3 - (index * 0.1)
    })
    
    const weakPoints = getWeakKnowledgePoints(knowledgeState)
    
    expect(weakPoints.length).toBeLessThanOrEqual(3)
  })
})

describe('Learning content coverage', () => {
  it('exposes a broader content summary for the adaptive planner', () => {
    const summary = getLearningContentSummary()

    expect(summary.pinyin).toBeGreaterThan(40)
    expect(summary.math).toBeGreaterThan(15)
    expect(summary.english).toBeGreaterThan(20)
    expect(summary.total).toBeGreaterThan(80)
  })
})
