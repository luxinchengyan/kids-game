import { describe, it, expect } from 'vitest'
import { createKnowledgeMap, createMission, getLearningContentSummary, getWeakKnowledgePoints, storyData } from '../data/learningContent'

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
    expect(summary.stories).toBeGreaterThan(20)
    expect(summary.total).toBeGreaterThan(80)
  })

  it('keeps a rich pool of idiom and myth stories in story kingdom', () => {
    const mythTitles = storyData.filter((story) => story.type === 'myth').map((story) => story.title)
    const idiomTitles = storyData.filter((story) => story.type === 'idiom').map((story) => story.title)
    const coreMyths = [
      '盘古开天地',
      '女娲补天',
      '女娲造人',
      '后羿射日',
      '嫦娥奔月',
      '牛郎织女',
      '精卫填海',
      '夸父逐日',
      '哪吒闹海',
      '大禹治水',
      '宝莲灯',
      '八仙过海',
      '白蛇传',
      '孙悟空大闹天宫',
      '年兽的传说',
      '十二生肖的来历',
    ]
    const coreIdioms = [
      '守株待兔',
      '亡羊补牢',
      '揠苗助长',
      '掩耳盗铃',
      '狐假虎威',
      '毛遂自荐',
      '老马识途',
      '伯乐相马',
      '自相矛盾',
      '刻舟求剑',
      '画蛇添足',
      '画龙点睛',
      '入木三分',
      '对牛弹琴',
      '井底之蛙',
      '滥竽充数',
      '盲人摸象',
      '惊弓之鸟',
      '洛阳纸贵',
      '纸上谈兵',
      '凿壁偷光',
      '程门立雪',
      '破釜沉舟',
      '四面楚歌',
      '草船借箭',
    ]

    expect(mythTitles.length).toBeGreaterThanOrEqual(34)
    expect(idiomTitles.length).toBeGreaterThanOrEqual(50)
    expect(new Set(mythTitles).size).toBe(mythTitles.length)
    expect(new Set(idiomTitles).size).toBe(idiomTitles.length)
    expect(mythTitles).toEqual(expect.arrayContaining(coreMyths))
    expect(idiomTitles).toEqual(expect.arrayContaining(coreIdioms))
  })

  it('keeps a rich pool of fable and history stories in story kingdom', () => {
    const fableTitles = storyData.filter((story) => story.type === 'fable').map((story) => story.title)
    const historyTitles = storyData.filter((story) => story.type === 'history').map((story) => story.title)
    const coreFables = [
      '乌鸦喝水',
      '狐狸和葡萄',
      '龟兔赛跑',
      '狼来了',
      '小马过河',
      '郑人买履',
      '南辕北辙',
      '杞人忧天',
      '朝三暮四',
      '黔驴技穷',
      '邯郸学步',
      '螳臂当车',
      '曲突徙薪',
      '智子疑邻',
      '按图索骥',
      '农夫与蛇',
      '鹬蚌相争',
      '狐狸和乌鸦',
      '狼和小羊',
      '老鼠开会',
      '东郭先生和狼',
      '螳螂捕蝉',
      '买椟还珠',
    ]
    const coreHistory = [
      '孔融让梨',
      '司马光砸缸',
      '曹冲称象',
      '花木兰',
      '岳母刺字',
      '黄香温席',
      '孔子拜师',
      '祖冲之算圆周率',
      '王羲之吃墨',
      '孔子周游列国',
      '苏秦刺股',
      '李密牛角挂书',
      '孟母三迁',
      '孟母断机',
      '王戎识李',
      '孔子学琴',
      '司马迁写史记',
      '苏武牧羊',
      '鉴真东渡',
      '张骞出使西域',
      '郑和下西洋',
      '海瑞退礼',
      '狄仁杰公正断案',
      '徐霞客远游',
      '文天祥留取丹心',
      '张仲景坐堂行医',
      '蔡伦造纸',
      '毕昇发明活字印刷',
      '车胤囊萤',
      '孙康映雪',
      '李时珍尝药',
      '文成公主入藏',
      '玄奘西行',
      '张衡和地动仪',
    ]

    expect(fableTitles.length).toBeGreaterThanOrEqual(55)
    expect(historyTitles.length).toBeGreaterThanOrEqual(60)
    expect(new Set(fableTitles).size).toBe(fableTitles.length)
    expect(new Set(historyTitles).size).toBe(historyTitles.length)
    expect(fableTitles).toEqual(expect.arrayContaining(coreFables))
    expect(historyTitles).toEqual(expect.arrayContaining(coreHistory))
  })
})
