// 体育健将主题数据 - TypeScript 类型定义
export interface SportsStar {
  name: string;
  icon: string;
  description: string;
  link?: string;
  achievements: string[];
}

export interface SportCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  introduction: string;
  competitions: string[];
  stars: SportsStar[];
  classicEvents: string[];
}

export interface SportsData {
  categories: SportCategory[];
}

export const sportsData: SportsData = {
  // 运动类目
  categories: [
    {
      id: 'table-tennis',
      name: '乒乓球',
      icon: '🏓',
      description: '中国的国球，速度快、技巧高',
      introduction: '乒乓球是一项流行的室内运动，起源于19世纪的英国。中国在乒乓球项目上有着悠久的历史和卓越的成绩。',
      competitions: [
        '世界乒乓球锦标赛',
        '奥运会乒乓球比赛',
        '世界杯乒乓球赛',
        '全国乒乓球锦标赛'
      ],
      stars: [
        {
          name: '樊振东',
          icon: '🏆',
          description: '中国乒乓球运动员，世界排名第一',
          link: 'https://www.f-zd.com/',
          achievements: ['世锦赛冠军', '世界杯冠军', '世界排名第一']
        },
        {
          name: '马龙',
          icon: '🥇',
          description: '中国乒乓球传奇选手，大满贯得主',
          achievements: ['奥运会金牌', '世锦赛冠军', '大满贯得主']
        },
        {
          name: '孙颖莎',
          icon: '🌟',
          description: '中国女子乒乓球新星',
          achievements: ['世锦赛冠军', '世界杯冠军', '世界排名前列']
        }
      ],
      classicEvents: [
        '2008年北京奥运会乒乓球比赛',
        '2019年布达佩斯世乒赛',
        '2021年东京奥运会乒乓球决赛'
      ]
    },
    {
      id: 'basketball',
      name: '篮球',
      icon: '🏀',
      description: '团队合作的激烈对抗运动',
      introduction: '篮球是一项由两队参与的球类运动，目标是将球投入对方的篮筐得分。篮球运动在全球广受欢迎。',
      competitions: [
        'NBA（美国职业篮球联赛）',
        'CBA（中国男子篮球职业联赛）',
        'FIBA篮球世界杯',
        '奥运会篮球比赛'
      ],
      stars: [
        {
          name: '姚明',
          icon: '🌟',
          description: '中国篮球的标志性人物，NBA名人堂成员',
          achievements: ['NBA全明星', '名人堂成员', '中国篮球协会主席']
        },
        {
          name: '易建联',
          icon: '🏆',
          description: '中国篮球名将，曾效力NBA',
          achievements: ['CBA MVP', 'NBA经历', '国家队核心']
        },
        {
          name: '勒布朗·詹姆斯',
          icon: '👑',
          description: 'NBA超级巨星，历史得分王',
          achievements: ['4次NBA总冠军', '4次MVP', '历史得分王']
        }
      ],
      classicEvents: [
        '2008年北京奥运会中美篮球大战',
        '2016年NBA总决赛骑士逆转勇士',
        '2019年FIBA篮球世界杯'
      ]
    },
    {
      id: 'football',
      name: '足球',
      icon: '⚽',
      description: '世界上最受欢迎的运动',
      introduction: '足球是一项两队之间进行的球类运动，每队11名球员。足球被誉为"世界第一运动"，拥有全球最多的粉丝。',
      competitions: [
        'FIFA世界杯',
        '欧洲冠军联赛',
        '英超联赛',
        '中超联赛'
      ],
      stars: [
        {
          name: '梅西',
          icon: '🐐',
          description: '阿根廷足球巨星，多次获得金球奖',
          achievements: ['8次金球奖', '世界杯冠军', '欧冠冠军']
        },
        {
          name: 'C罗',
          icon: '⚡',
          description: '葡萄牙足球巨星，进球机器',
          achievements: ['5次金球奖', '欧洲杯冠军', '历史射手王']
        },
        {
          name: '武磊',
          icon: '🇨🇳',
          description: '中国足球运动员，曾效力西甲',
          achievements: ['中超金靴', '西甲进球', '国家队核心']
        }
      ],
      classicEvents: [
        '2022年卡塔尔世界杯决赛',
        '2005年伊斯坦布尔欧冠决赛',
        '2014年巴西世界杯'
      ]
    },
    {
      id: 'swimming',
      name: '游泳',
      icon: '🏊',
      description: '水上竞技运动',
      introduction: '游泳是一项在水中进行的速度和耐力运动。游泳不仅是竞技项目，也是生存技能和健身方式。',
      competitions: [
        '奥运会游泳比赛',
        '世界游泳锦标赛',
        'FINA游泳世界杯',
        '全国游泳锦标赛'
      ],
      stars: [
        {
          name: '孙杨',
          icon: '🏊‍♂️',
          description: '中国游泳名将，自由泳世界纪录保持者',
          achievements: ['奥运会金牌', '世锦赛冠军', '世界纪录']
        },
        {
          name: '叶诗文',
          icon: '🌊',
          description: '中国女子游泳运动员，奥运冠军',
          achievements: ['奥运会金牌', '世锦赛冠军', '世界纪录']
        },
        {
          name: '迈克尔·菲尔普斯',
          icon: '🏅',
          description: '美国游泳传奇，奥运历史上最成功的运动员',
          achievements: ['23枚奥运金牌', '多项世界纪录', '泳坛传奇']
        }
      ],
      classicEvents: [
        '2008年北京奥运会游泳比赛',
        '2012年伦敦奥运会400米混合泳',
        '2016年里约奥运会游泳项目'
      ]
    },
    {
      id: 'athletics',
      name: '田径',
      icon: '🏃',
      description: '运动之母，包含跑跳投项目',
      introduction: '田径运动包括跑步、跳跃和投掷等项目，被称为"运动之母"。它是最基础、最古老的竞技运动形式。',
      competitions: [
        '奥运会田径比赛',
        '世界田径锦标赛',
        '钻石联赛',
        '全国田径锦标赛'
      ],
      stars: [
        {
          name: '苏炳添',
          icon: '⚡',
          description: '中国短跑名将，亚洲飞人',
          achievements: ['亚洲纪录保持者', '奥运会决赛', '世锦赛奖牌']
        },
        {
          name: '刘翔',
          icon: '🏃‍♂️',
          description: '中国110米栏传奇，奥运冠军',
          achievements: ['奥运会金牌', '世界纪录', '大满贯得主']
        },
        {
          name: '尤塞恩·博尔特',
          icon: '🌟',
          description: '牙买加短跑传奇，世界最快的人',
          achievements: ['8枚奥运金牌', '100米世界纪录', '200米世界纪录']
        }
      ],
      classicEvents: [
        '2004年雅典奥运会110米栏决赛',
        '2008年北京奥运会100米决赛',
        '2012年伦敦奥运会田径比赛'
      ]
    },
    {
      id: 'badminton',
      name: '羽毛球',
      icon: '🏸',
      description: '中国的优势项目',
      introduction: '羽毛球是一项隔着球网用球拍击打羽毛球的运动。中国在羽毛球项目上有着强大的实力和传统优势。',
      competitions: [
        '世界羽毛球锦标赛',
        '全英羽毛球公开赛',
        '奥运会羽毛球比赛',
        '汤姆斯杯/尤伯杯'
      ],
      stars: [
        {
          name: '林丹',
          icon: '🏆',
          description: '中国羽毛球传奇，超级全满贯',
          achievements: ['2次奥运金牌', '5次世锦赛冠军', '超级全满贯']
        },
        {
          name: '谌龙',
          icon: '🥇',
          description: '中国羽毛球名将，奥运冠军',
          achievements: ['奥运会金牌', '世锦赛冠军', '世界排名第一']
        },
        {
          name: '陈雨菲',
          icon: '🌟',
          description: '中国女子羽毛球选手，奥运冠军',
          achievements: ['奥运会金牌', '世锦赛冠军', '世界排名前列']
        }
      ],
      classicEvents: [
        '2012年伦敦奥运会羽毛球决赛',
        '2008年北京奥运会林李大战',
        '2016年里约奥运会羽毛球比赛'
      ]
    }
  ]
};
