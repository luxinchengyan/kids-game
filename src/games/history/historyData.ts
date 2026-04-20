export interface HistoryMapNode {
  label: string;
  top: string;
  left: string;
  tone: 'core' | 'frontier' | 'route';
}

export interface HistoryStoryBeat {
  title: string;
  narration: string;
  focusLabels: string[];
}

export interface HistoryStoryPerspective {
  title: string;
  story: string;
  characters: string[];
  events: string[];
  administration: string[];
  mapSummary: string;
  terrain: string;
  landforms: string[];
  landmarks: string[];
  mapNodes: HistoryMapNode[];
  kidQuestions: string[];
}

export interface HistoryStoryEra {
  id: string;
  yearLabel: string;
  title: string;
  summary: string;
  compareNote: string;
  china: HistoryStoryPerspective;
  world: HistoryStoryPerspective;
}

export const historyStoryEras: HistoryStoryEra[] = [
  {
    id: 'ancient-dawn',
    yearLabel: '公元前 3000 - 前 1046',
    title: '文明的晨光',
    summary: '黄河、尼罗河和两河流域旁的人们，开始种田、造城、记事，历史故事慢慢有了开头。',
    compareNote: '同一段很早很早的时间里，中国和世界都在学会“定居下来，一起生活”。',
    china: {
      title: '中国：从部落到早期王朝',
      story:
        '在黄河边，先民们一边观察四季，一边种粟、养蚕、烧陶。后来，传说中的尧、舜、禹带着大家治水，夏朝和商朝的故事也跟着出现了。甲骨上的刻字像一封封寄给未来的信，让我们知道古人已经会记录天气、祭祀和战争。',
      characters: ['大禹', '商王武丁', '妇好'],
      events: ['大禹治水', '夏朝建立', '商朝甲骨文', '青铜器兴起'],
      administration: ['部落联盟', '方国', '王都周边的王畿'],
      mapSummary: '故事中心在黄河中下游，今天大致对应河南、山西、陕西东部一带。',
      terrain: '黄土高原的土容易耕种，但河水也会改道；平原适合聚居，河谷适合发展农业。',
      landforms: ['黄河', '黄土高原', '华北平原'],
      landmarks: ['二里头遗址', '殷墟', '黄河流域'],
      mapNodes: [
        { label: '黄河中游', top: '38%', left: '34%', tone: 'core' },
        { label: '中原王都', top: '44%', left: '48%', tone: 'core' },
        { label: '东部方国', top: '46%', left: '66%', tone: 'frontier' },
        { label: '治水路线', top: '30%', left: '54%', tone: 'route' },
      ],
      kidQuestions: ['如果你住在黄河边，最想先学会什么本领？', '为什么会写字以后，故事更容易留下来？'],
    },
    world: {
      title: '世界：大河边的文明学校',
      story:
        '在非洲的尼罗河边，古埃及人学会看星星和涨水时间，建起金字塔；在西亚的两河流域，苏美尔人发明楔形文字，写下贸易和法律；在地中海东岸，人们扬帆航海，把城市和故事连起来。大河像一位老师，教大家什么时候播种、什么时候收获。',
      characters: ['法老胡夫', '汉谟拉比'],
      events: ['埃及金字塔修建', '楔形文字出现', '《汉谟拉比法典》'],
      administration: ['城邦', '法老王国', '王国属地'],
      mapSummary: '文明多沿着尼罗河、底格里斯河、幼发拉底河分布，像几条绿色生命带穿过沙漠。',
      terrain: '沙漠让河谷更珍贵，河水带来泥土和粮食，海岸线又帮助商船远行。',
      landforms: ['尼罗河', '两河流域', '东地中海'],
      landmarks: ['吉萨金字塔', '巴比伦', '尼罗河谷'],
      mapNodes: [
        { label: '尼罗河', top: '52%', left: '34%', tone: 'core' },
        { label: '埃及王国', top: '42%', left: '40%', tone: 'core' },
        { label: '两河流域', top: '44%', left: '60%', tone: 'core' },
        { label: '地中海航线', top: '30%', left: '52%', tone: 'route' },
      ],
      kidQuestions: ['为什么大河边最早出现很多城市？', '如果没有船，古人交换东西会难在哪里？'],
    },
  },
  {
    id: 'hundred-schools',
    yearLabel: '公元前 1046 - 前 221',
    title: '礼乐秩序与思想百花',
    summary: '周王朝、诸侯国和百家争鸣一起登场，让孩子看到“国家怎么管”“思想怎么变”。',
    compareNote: '中国的诸子百家与地中海世界的哲学家、城邦实验，几乎在同一片历史天空下思考“怎样让社会更好”。',
    china: {
      title: '中国：周朝礼乐、诸侯竞争与百家争鸣',
      story:
        '周朝建立后，王室把土地分给诸侯管理，像搭起一张层层合作的大网。后来，春秋战国的竞争让铁器、农具、变法和思想一起活跃起来。孔子带着学生周游列国，商鞅帮助秦国变法，孩子们会发现：历史不只是在打仗，也是在认真想“怎样治理国家、怎样做人”。',
      characters: ['周公', '孔子', '商鞅', '屈原'],
      events: ['西周建立', '分封制运行', '百家争鸣', '商鞅变法'],
      administration: ['王畿', '诸侯国', '县制萌芽'],
      mapSummary: '关中、洛邑、齐鲁、楚地像棋盘上的重要格子，黄河中下游仍是最热闹的核心舞台。',
      terrain: '华北平原适合耕作与行军，函谷关等关隘保护关中，长江与汉水让楚地形成南方强国。',
      landforms: ['关中平原', '华北平原', '函谷关', '长江中游'],
      landmarks: ['镐京', '洛邑', '曲阜', '咸阳'],
      mapNodes: [
        { label: '关中', top: '34%', left: '34%', tone: 'core' },
        { label: '洛邑', top: '40%', left: '48%', tone: 'core' },
        { label: '齐鲁', top: '36%', left: '66%', tone: 'frontier' },
        { label: '楚地', top: '60%', left: '56%', tone: 'route' },
      ],
      kidQuestions: ['如果你要给国家定规则，你会先想到什么？', '为什么很多聪明人会在动荡时代努力提建议？'],
    },
    world: {
      title: '世界：希腊城邦、波斯大道和爱提问的人',
      story:
        '地中海周边出现了很多城邦，雅典尝试让公民一起讨论公共事务，斯巴达则更重视军事训练。更东方的波斯帝国修建大道和驿站，把广大土地管理起来。苏格拉底、柏拉图和亚里士多德不断追问“什么是好的生活”“怎样认识世界”，让“爱提问”本身也成为了历史中的主角。',
      characters: ['苏格拉底', '柏拉图', '亚里士多德', '大流士一世'],
      events: ['希腊城邦发展', '波斯帝国扩张', '伯罗奔尼撒战争', '哲学兴起'],
      administration: ['城邦', '行省', '帝国王道体系'],
      mapSummary: '爱琴海像一间蓝色大教室，希腊城邦沿海分布，波斯大道把西亚和更远的土地连起来。',
      terrain: '多山半岛让城邦分散，海湾和海岛鼓励航海，西亚平原则适合修筑长路和管理大片行省。',
      landforms: ['爱琴海', '巴尔干半岛', '安纳托利亚高原', '两河平原'],
      landmarks: ['雅典', '斯巴达', '波斯波利斯'],
      mapNodes: [
        { label: '雅典', top: '46%', left: '30%', tone: 'core' },
        { label: '爱琴海', top: '52%', left: '38%', tone: 'route' },
        { label: '小亚细亚', top: '42%', left: '52%', tone: 'frontier' },
        { label: '波斯大道', top: '34%', left: '68%', tone: 'route' },
      ],
      kidQuestions: ['为什么很多哲学家喜欢不停地问“为什么”？', '海边城市和内陆帝国，管理土地的方法会一样吗？'],
    },
  },
  {
    id: 'empire-roads',
    yearLabel: '公元前 221 - 公元 220',
    title: '大一统与丝路驼铃',
    summary: '道路被连起来，帝国开始管理更大的土地，商队和使者把远方的消息带进家门。',
    compareNote: '这一时期，中国和欧亚大陆都在学习怎样管理大范围土地、修路和传递命令。',
    china: {
      title: '中国：秦汉把大地连成一张网',
      story:
        '秦始皇统一六国后，修驰道、统一文字和度量衡，就像给各地换上一套共同规则。到了汉朝，张骞出使西域，丝绸之路上的驼队从长安出发，带着丝绸、葡萄和新见闻往来。孩子们会发现，路修得越通，故事就跑得越远。',
      characters: ['秦始皇', '张骞', '汉武帝', '蔡伦'],
      events: ['秦统一六国', '郡县制推行', '张骞通西域', '蔡伦改进造纸术'],
      administration: ['郡县', '郡国并行', '西域都护管辖地区'],
      mapSummary: '版图从关中平原向东南西北展开，河西走廊像一条细长走廊，把中原和西域连起来。',
      terrain: '关中适合建都，黄河和长江平原适合生产粮食，河西走廊夹在高山与沙漠之间，是天然通道。',
      landforms: ['关中平原', '河西走廊', '天山南北', '长江流域'],
      landmarks: ['长安', '咸阳', '玉门关', '河西走廊'],
      mapNodes: [
        { label: '关中', top: '44%', left: '34%', tone: 'core' },
        { label: '长安', top: '42%', left: '40%', tone: 'core' },
        { label: '河西走廊', top: '34%', left: '56%', tone: 'route' },
        { label: '西域都护', top: '26%', left: '74%', tone: 'frontier' },
      ],
      kidQuestions: ['为什么统一文字以后，各地更容易交流？', '如果你跟着驼队走丝绸之路，会想带什么礼物？'],
    },
    world: {
      title: '世界：罗马道路与欧亚商路',
      story:
        '在地中海周边，罗马修起石头道路和港口，让士兵、商人和信件跑得更快。欧亚大陆另一头，丝绸、玻璃和香料不断交换。虽然很多人彼此没见过面，但通过商路，大家已经在互相影响，就像把很远很远的城市串成一串会发光的珠子。',
      characters: ['凯撒', '屋大维', '汉尼拔'],
      events: ['罗马帝国扩张', '罗马道路建设', '欧亚贸易繁荣'],
      administration: ['行省', '自治城', '帝国直辖区'],
      mapSummary: '地中海像一座蓝色广场，罗马、埃及、西亚港口围着它展开，陆路再向中亚延伸。',
      terrain: '地中海利于航海，阿尔卑斯山和沙漠会挡路，所以道路和海港特别重要。',
      landforms: ['地中海', '阿尔卑斯山', '中亚草原'],
      landmarks: ['罗马城', '亚历山大港', '安条克'],
      mapNodes: [
        { label: '罗马', top: '40%', left: '34%', tone: 'core' },
        { label: '地中海', top: '52%', left: '42%', tone: 'route' },
        { label: '埃及', top: '62%', left: '52%', tone: 'frontier' },
        { label: '东方商路', top: '36%', left: '72%', tone: 'route' },
      ],
      kidQuestions: ['海和路，哪一种更适合运很多货物？', '为什么大帝国都很看重道路？'],
    },
  },
  {
    id: 'golden-exchange',
    yearLabel: '581 - 1279',
    title: '盛世城市与知识旅行',
    summary: '大城市更热闹了，书籍、茶叶、瓷器和数学知识一起旅行，世界像被更多桥梁连接起来。',
    compareNote: '中国的唐宋与世界其他文明一起，把“交流”变成了真正的日常生活。',
    china: {
      title: '中国：唐宋的大城与海陆商路',
      story:
        '唐朝的长安像一座国际大城市，街上能听到不同口音。宋朝时，市集更繁忙，印刷术、指南针和海船让知识与商品更快传播。小朋友可以把这一段历史想成一座会发光的夜市：纸上的字、海上的船、桥上的人，大家都在交换新点子。',
      characters: ['唐太宗', '武则天', '毕昇', '苏轼'],
      events: ['贞观之治', '大运河继续繁荣', '活字印刷', '海上贸易发展'],
      administration: ['道', '州县', '路', '府州军监'],
      mapSummary: '长安、洛阳、开封和临安像几颗亮星，运河与海港把北方和南方连在一起。',
      terrain: '关中和华北平原适合大城市发展，江南水网与海岸线让船运和贸易飞快成长。',
      landforms: ['关中平原', '大运河', '长江三角洲', '东南沿海'],
      landmarks: ['长安', '开封', '泉州', '大运河'],
      mapNodes: [
        { label: '长安', top: '32%', left: '32%', tone: 'core' },
        { label: '开封', top: '38%', left: '50%', tone: 'core' },
        { label: '大运河', top: '44%', left: '58%', tone: 'route' },
        { label: '泉州港', top: '66%', left: '72%', tone: 'frontier' },
      ],
      kidQuestions: ['为什么运河会让南北方更亲近？', '如果你是小书童，你最想把哪本书印给大家看？'],
    },
    world: {
      title: '世界：阿拉伯商队、拜占庭和中世纪城市',
      story:
        '阿拉伯商人把数字、天文知识和香料带向四方；拜占庭守着欧亚交汇处；欧洲的城市和大学慢慢长大。很多知识不是待在一个地方不动，而是像旅行家一样，从一座城市住到另一座城市，最后变成大家都会用的本领。',
      characters: ['穆罕默德', '查理曼', '伊本·西那'],
      events: ['伊斯兰文明兴起', '阿拉伯数字传播', '欧洲大学出现'],
      administration: ['哈里发行省', '封建领地', '城邦和自治市'],
      mapSummary: '从阿拉伯半岛到地中海、再到欧洲内陆，商路像网一样把港口与城市接起来。',
      terrain: '沙漠商队要靠绿洲，海上航线依赖季风和港口，山脉让城堡和关口很重要。',
      landforms: ['阿拉伯半岛', '地中海', '阿尔卑斯山', '北海沿岸'],
      landmarks: ['巴格达', '君士坦丁堡', '威尼斯'],
      mapNodes: [
        { label: '巴格达', top: '44%', left: '52%', tone: 'core' },
        { label: '君士坦丁堡', top: '32%', left: '40%', tone: 'core' },
        { label: '威尼斯', top: '28%', left: '28%', tone: 'frontier' },
        { label: '香料海路', top: '60%', left: '66%', tone: 'route' },
      ],
      kidQuestions: ['知识为什么也需要“旅行”？', '沙漠里的商队最离不开什么东西？'],
    },
  },
  {
    id: 'steppe-and-ocean',
    yearLabel: '1206 - 1433',
    title: '草原风与大海风',
    summary: '马背上的消息跑得快，海上的船队看得远，欧亚大陆和海洋世界被拉得更近了。',
    compareNote: '这一时期的关键词是“连通”：草原帝国、海上远航、城市见闻都在扩张孩子对世界的想象。',
    china: {
      title: '中国：元代行省与明代船队',
      story:
        '元朝把更大的土地放进同一套行省制度里，驿站像一串接力点，把命令和消息送向远方。明朝前期，郑和率船队远航，从南京、苏州、泉州附近的港口出发，带着丝绸和瓷器去认识大海另一边的朋友。历史像风一样，一会儿吹过草原，一会儿吹向海洋。',
      characters: ['成吉思汗', '忽必烈', '郑和'],
      events: ['蒙古统一草原', '元朝建立', '行省制推广', '郑和下西洋'],
      administration: ['行省', '宣政院辖地', '都司卫所'],
      mapSummary: '北方草原、京杭运河、东南港口和西南山地都被纳入更清晰的管理与交通网络。',
      terrain: '草原适合骑马奔行，运河适合运粮，海岸港口适合远航，西南山地让道路修建更难。',
      landforms: ['蒙古高原', '京杭大运河', '东海与南海', '云贵高原'],
      landmarks: ['大都', '南京', '刘家港', '泉州'],
      mapNodes: [
        { label: '草原通道', top: '16%', left: '42%', tone: 'route' },
        { label: '大都', top: '26%', left: '48%', tone: 'core' },
        { label: '南京', top: '52%', left: '58%', tone: 'core' },
        { label: '远洋航线', top: '72%', left: '80%', tone: 'route' },
      ],
      kidQuestions: ['为什么草原上的马能让消息传得更快？', '如果你登上郑和的宝船，最想先看到什么？'],
    },
    world: {
      title: '世界：欧亚大通道与文艺复兴前夜',
      story:
        '蒙古帝国让欧亚大陆的部分商路更加连通，旅行家们带回远方见闻。与此同时，地中海周边的城市更加富有，艺术家和学者开始重新关注自然、人体和科学。就像先有很多窗户被打开，后面才会有更明亮的房间。',
      characters: ['马可·波罗', '帖木儿', '达·芬奇'],
      events: ['欧亚商路畅通', '黑死病冲击', '文艺复兴兴起'],
      administration: ['汗国', '王国', '城市共和国'],
      mapSummary: '从中亚草原到黑海、再到意大利城市，陆路和海路像交叉的绳结。',
      terrain: '草原利于骑兵和驿站，黑海与地中海利于航运，阿尔卑斯山让通道更加珍贵。',
      landforms: ['中亚草原', '黑海', '地中海', '亚平宁半岛'],
      landmarks: ['撒马尔罕', '威尼斯', '佛罗伦萨'],
      mapNodes: [
        { label: '中亚草原', top: '26%', left: '56%', tone: 'route' },
        { label: '黑海', top: '34%', left: '42%', tone: 'frontier' },
        { label: '威尼斯', top: '38%', left: '26%', tone: 'core' },
        { label: '佛罗伦萨', top: '46%', left: '24%', tone: 'core' },
      ],
      kidQuestions: ['为什么商路畅通后，更多新故事会出现？', '艺术家为什么喜欢去热闹的城市？'],
    },
  },
  {
    id: 'voyage-and-new-worlds',
    yearLabel: '1433 - 1760',
    title: '大航海与新知识地图',
    summary: '远洋船、新作物、白银和科学实验一起流动，世界地图被重新画过很多次。',
    compareNote: '中国继续经营辽阔版图，世界则进入大航海、科学革命和全球贸易加速的新阶段。',
    china: {
      title: '中国：明清治理、多民族版图与新作物',
      story:
        '明清时期，中央和地方管理更细密，驿站、河工、漕运和边疆治理一起支撑大国运转。玉米、番薯等新作物来到中国，让更多山地也能养活更多人口。康熙等人组织测绘和治河，郑成功又收复台湾。孩子们会感受到：地图不是静止不动的，它会随着治理、交通和生活方式一起变化。',
      characters: ['朱元璋', '郑成功', '康熙帝', '徐光启'],
      events: ['明朝建立', '郑成功收复台湾', '清代统一多民族国家巩固', '新作物传播'],
      administration: ['省', '府州县', '理藩院辖地', '驻防体系'],
      mapSummary: '北京、江南粮道、台湾海峡和西北边疆共同组成更完整的国家空间，运河仍是大动脉。',
      terrain: '华北平原适合都城和粮运，长江与运河承担运输，西北高原和山地让边疆治理更依赖驿站与驻防。',
      landforms: ['华北平原', '京杭大运河', '台湾海峡', '天山南北'],
      landmarks: ['北京城', '山海关', '台湾府', '避暑山庄'],
      mapNodes: [
        { label: '北京', top: '24%', left: '50%', tone: 'core' },
        { label: '江南粮道', top: '48%', left: '58%', tone: 'route' },
        { label: '台湾海峡', top: '72%', left: '70%', tone: 'frontier' },
        { label: '西北边疆', top: '22%', left: '22%', tone: 'route' },
      ],
      kidQuestions: ['为什么新作物会改变很多普通人的生活？', '如果你是测绘队的小助手，你最想先画哪一条路？'],
    },
    world: {
      title: '世界：大航海、科学革命与新大陆交换',
      story:
        '哥伦布、达·伽马等航海者让欧洲、非洲、美洲和亚洲被更紧地连在一起。土豆、玉米、辣椒和白银开始在全球旅行，很多港口迅速热闹起来。与此同时，伽利略、牛顿等科学家用实验和计算解释世界，地图上的海洋和天上的星星，都变得比以前更“可测量”了。',
      characters: ['哥伦布', '达·伽马', '伽利略', '牛顿'],
      events: ['新航路开辟', '殖民扩张', '科学革命', '全球贸易网络形成'],
      administration: ['殖民地', '王国', '贸易公司据点'],
      mapSummary: '大西洋航线把欧洲、非洲和美洲串在一起，印度洋和太平洋也被更频繁地连接。',
      terrain: '海洋成为最大的高速路，港口和海峡决定贸易效率，矿山和平原又决定哪些地方最先变得富裕。',
      landforms: ['大西洋', '好望角', '加勒比海', '安第斯山脉'],
      landmarks: ['里斯本', '伦敦', '墨西哥城', '阿姆斯特丹'],
      mapNodes: [
        { label: '欧洲港口', top: '20%', left: '28%', tone: 'core' },
        { label: '大西洋航线', top: '34%', left: '46%', tone: 'route' },
        { label: '新大陆', top: '40%', left: '74%', tone: 'frontier' },
        { label: '印度洋航路', top: '64%', left: '62%', tone: 'route' },
      ],
      kidQuestions: ['为什么海洋会突然变成很多国家最重要的路？', '新知识和新问题为什么常常一起到来？'],
    },
  },
  {
    id: 'steam-and-change',
    yearLabel: '1760 - 1911',
    title: '蒸汽机、工厂和新问题',
    summary: '机器跑起来以后，世界变快了；但变快以后，也带来了新的竞争、冲突和选择。',
    compareNote: '世界工业化加速时，中国也在思考怎样回应新的船、炮、铁路和规则。',
    china: {
      title: '中国：晚清在风浪里找方向',
      story:
        '清朝后期，沿海口岸被越来越多的蒸汽船敲开大门。鸦片战争以后，中国开始面对新的世界规则。有人主张“师夷长技”，有人推动新式学堂、铁路和工厂。孩子们读这一段历史时，会发现：当外面的风很大时，最重要的是学会造更稳的船。',
      characters: ['林则徐', '曾国藩', '李鸿章', '康有为'],
      events: ['鸦片战争', '洋务运动', '甲午战争', '戊戌变法', '辛亥革命'],
      administration: ['省', '府', '州县', '通商口岸', '督抚辖区'],
      mapSummary: '沿海口岸如广州、上海、天津变得格外重要，内陆铁路和长江航线开始改变空间连接。',
      terrain: '中国东部沿海便于船只进出，长江像一条大水路，西部高原和山地让全国交通差异更明显。',
      landforms: ['东南沿海', '长江', '珠江三角洲', '华北平原'],
      landmarks: ['广州十三行', '上海外滩', '武昌', '京张铁路'],
      mapNodes: [
        { label: '北京', top: '22%', left: '50%', tone: 'core' },
        { label: '上海', top: '48%', left: '68%', tone: 'frontier' },
        { label: '广州', top: '74%', left: '60%', tone: 'frontier' },
        { label: '长江航线', top: '56%', left: '52%', tone: 'route' },
      ],
      kidQuestions: ['为什么沿海城市在这一时期特别重要？', '遇到新技术时，学会它和害怕它，哪一种更有力量？'],
    },
    world: {
      title: '世界：蒸汽机让地球转得更快',
      story:
        '英国的工厂里，蒸汽机带动机器轰隆隆地运转，火车把城市和矿山连在一起，电报让消息不再慢吞吞。可新的机器也让各国更想争土地、抢市场。世界变得更近，也变得更容易摩擦。这像一场速度很快的长跑：跑得快的人，也得学会守规则。',
      characters: ['瓦特', '拿破仑', '林肯'],
      events: ['工业革命', '美国独立', '法国大革命', '铁路时代到来'],
      administration: ['殖民地', '联邦州', '王国与共和国'],
      mapSummary: '英国、法国、美国等工业国家通过海洋和铁路把影响力伸向更多大陆。',
      terrain: '煤矿和河流帮助工厂发展，海洋帮助殖民和贸易扩张，山脉有时成为国界和铁路难点。',
      landforms: ['不列颠群岛', '北大西洋', '阿巴拉契亚山脉'],
      landmarks: ['伦敦', '曼彻斯特', '纽约', '巴黎'],
      mapNodes: [
        { label: '伦敦', top: '22%', left: '28%', tone: 'core' },
        { label: '工业区', top: '30%', left: '34%', tone: 'route' },
        { label: '大西洋航线', top: '40%', left: '52%', tone: 'route' },
        { label: '纽约', top: '34%', left: '76%', tone: 'frontier' },
      ],
      kidQuestions: ['火车和电报为什么会改变大家的生活？', '速度变快以后，为什么更需要规则？'],
    },
  },
  {
    id: 'revolution-and-defence',
    yearLabel: '1911 - 1949',
    title: '追光的人与保家卫国',
    summary: '很多人都在追问：怎样让国家更有力量、让人民过上更好的生活？',
    compareNote: '中国在动荡中寻找新道路，世界也经历大战与重建，大家都在问“未来该往哪儿走”。',
    china: {
      title: '中国：从辛亥革命到新中国成立',
      story:
        '1911 年辛亥革命后，中国告别了延续很久的皇朝体制。接着，许多人通过新文化运动、五四运动、北伐、长征和抗日战争寻找新的出路。一路上有挫折，也有坚持。到了 1949 年，新中国成立，像一盏灯在风雨之后重新点亮。',
      characters: ['孙中山', '鲁迅', '毛泽东', '周恩来', '赵一曼'],
      events: ['辛亥革命', '五四运动', '长征', '全民族抗战', '新中国成立'],
      administration: ['省', '特别市', '边区', '抗日根据地'],
      mapSummary: '武汉、延安、南京、重庆、东北等地在不同阶段成为重要舞台，战线跨越山河南北。',
      terrain: '长江流域连接南北，黄土高原和大别山等地利于根据地建设，崎岖山地也增加了行军困难。',
      landforms: ['黄土高原', '长江流域', '太行山', '大别山'],
      landmarks: ['武昌', '延安', '重庆', '卢沟桥'],
      mapNodes: [
        { label: '武昌', top: '50%', left: '54%', tone: 'core' },
        { label: '延安', top: '36%', left: '42%', tone: 'core' },
        { label: '重庆', top: '56%', left: '36%', tone: 'frontier' },
        { label: '抗战主战场', top: '30%', left: '64%', tone: 'route' },
      ],
      kidQuestions: ['为什么很多青年会勇敢站出来？', '长征那么难，大家为什么还要坚持走下去？'],
    },
    world: {
      title: '世界：大战、危机与联合',
      story:
        '两次世界大战让很多国家感受到战争的可怕。飞机、坦克、无线电等新技术被快速使用，但人们也更明白和平的珍贵。战后，联合国成立，很多国家开始认真讨论怎样合作，别再让悲剧重演。孩子们会懂得：强大不只是会打仗，更是会一起守护和平。',
      characters: ['爱因斯坦', '丘吉尔', '罗斯福', '甘地'],
      events: ['第一次世界大战', '第二次世界大战', '联合国筹建', '殖民体系动摇'],
      administration: ['共和国', '联邦', '殖民地', '托管地'],
      mapSummary: '欧洲战场、太平洋战场和殖民地世界交织在一起，地球像一张被战争划伤的地图。',
      terrain: '海峡、海岛、平原和工业城市都成为战场，补给线常常决定战争能否继续。',
      landforms: ['欧洲平原', '太平洋岛链', '莱茵河流域'],
      landmarks: ['伦敦', '诺曼底', '珍珠港', '新德里'],
      mapNodes: [
        { label: '欧洲战场', top: '28%', left: '34%', tone: 'core' },
        { label: '大西洋补给线', top: '38%', left: '50%', tone: 'route' },
        { label: '太平洋战场', top: '52%', left: '78%', tone: 'frontier' },
        { label: '殖民世界', top: '70%', left: '54%', tone: 'route' },
      ],
      kidQuestions: ['为什么世界大战会让很多国家反思规则？', '和平为什么需要很多国家一起努力？'],
    },
  },
  {
    id: 'rebuild-and-space',
    yearLabel: '1949 - 1978',
    title: '重建家园，仰望星空',
    summary: '很多国家忙着重建、发展教育和工业，也开始把目光投向太空。',
    compareNote: '战后世界一边修复创伤，一边迈向科学时代；中国也在重建新的国家秩序和生活方式。',
    china: {
      title: '中国：新国家开始搭积木',
      story:
        '1949 年后，中国开始建立新的国家制度，修铁路、建工厂、办学校、治淮河。全国行政区逐渐稳定，省、自治区、直辖市等框架更清晰。虽然日子并不总是轻松，但很多家庭第一次感到“家园正在被一点点重新搭好”。',
      characters: ['毛泽东', '周恩来', '钱学森', '焦裕禄'],
      events: ['中华人民共和国成立', '第一个五年计划', '万隆会议', '两弹一星起步'],
      administration: ['省', '自治区', '直辖市', '民族自治地方'],
      mapSummary: '全国版图更加稳定，东北、华北、长三角、西南等地区在工业和交通建设中承担不同任务。',
      terrain: '东北平原适合重工业布局，华北平原利于交通线铺设，西部高原和山区建设更辛苦。',
      landforms: ['东北平原', '华北平原', '青藏高原', '长江中下游平原'],
      landmarks: ['鞍山', '武汉长江大桥', '大庆油田', '酒泉'],
      mapNodes: [
        { label: '东北工业区', top: '22%', left: '68%', tone: 'core' },
        { label: '首都北京', top: '28%', left: '50%', tone: 'core' },
        { label: '长江大桥', top: '52%', left: '56%', tone: 'route' },
        { label: '西部航天基地', top: '36%', left: '24%', tone: 'frontier' },
      ],
      kidQuestions: ['修桥、修路为什么像在给国家搭骨架？', '为什么很多科学家愿意去很远的地方工作？'],
    },
    world: {
      title: '世界：联合国、独立浪潮和太空竞赛',
      story:
        '战后，越来越多亚洲、非洲国家走向独立。联合国让国家们多了一个一起商量问题的大厅。与此同时，人类把卫星送上天空，宇航员飞向太空。世界像一边缝补旧衣服，一边开始做新翅膀。',
      characters: ['尼赫鲁', '纳赛尔', '加加林', '阿姆斯特朗'],
      events: ['联合国成立', '亚非国家独立', '人造卫星上天', '人类登月'],
      administration: ['独立国家', '联邦', '国际组织'],
      mapSummary: '新国家在亚洲、非洲不断出现，太空探索又把“地图”从地球延伸到月球轨道。',
      terrain: '海港、运河、油田和发射场都变成影响国家发展的关键地点。',
      landforms: ['苏伊士运河', '拜科努尔发射场', '佛罗里达海岸'],
      landmarks: ['纽约联合国总部', '开罗', '拜科努尔', '月球'],
      mapNodes: [
        { label: '联合国', top: '30%', left: '28%', tone: 'core' },
        { label: '独立浪潮', top: '60%', left: '52%', tone: 'route' },
        { label: '发射场', top: '26%', left: '64%', tone: 'frontier' },
        { label: '月球想象', top: '10%', left: '82%', tone: 'route' },
      ],
      kidQuestions: ['为什么独立建国对很多人民来说特别重要？', '抬头看太空时，人类在想什么？'],
    },
  },
  {
    id: 'open-and-connected',
    yearLabel: '1978 - 今天',
    title: '连接更快的地球',
    summary: '高铁、互联网、卫星导航和国际合作，让很多地方像一下子拉近了距离。',
    compareNote: '今天的历史还在继续写：每一次合作、每一项发明、每一张地图更新，都是新故事。',
    china: {
      title: '中国：改革开放后的新速度',
      story:
        '改革开放后，沿海城市更快地和世界做朋友，工厂、港口、高铁和互联网一起改变生活。香港、澳门回归，34 个省级行政区的今天版图更容易被孩子们认出来。高铁穿山过河，北斗卫星在天上帮我们找方向，很多“很远”的地方不再那么远。',
      characters: ['邓小平', '袁隆平', '屠呦呦', '杨利伟'],
      events: ['改革开放', '香港回归', '澳门回归', '加入世界贸易组织', '北斗组网'],
      administration: ['23 个省', '5 个自治区', '4 个直辖市', '2 个特别行政区'],
      mapSummary: '沿海经济带、长江经济带和西部大开发把不同地区连接成更紧密的网络。',
      terrain: '中国仍然是“西高东低”，高原、盆地、平原和海岸线一起决定交通和城市布局。',
      landforms: ['青藏高原', '四川盆地', '长江经济带', '珠江三角洲'],
      landmarks: ['深圳', '浦东', '港珠澳大桥', '酒泉卫星发射中心'],
      mapNodes: [
        { label: '京津冀', top: '24%', left: '50%', tone: 'core' },
        { label: '长三角', top: '46%', left: '68%', tone: 'core' },
        { label: '粤港澳', top: '76%', left: '58%', tone: 'frontier' },
        { label: '高铁网络', top: '52%', left: '48%', tone: 'route' },
      ],
      kidQuestions: ['为什么今天认识行政区更适合搭配交通地图一起看？', '高铁和卫星怎样让生活更方便？'],
    },
    world: {
      title: '世界：全球化、互联网与共同挑战',
      story:
        '互联网让人们可以在屏幕上见到远方朋友，飞机和集装箱船让商品在全球旅行。很多国家一起讨论气候、卫生、科技和太空合作。世界当然还会有分歧，但更多孩子已经知道：地球像一座大社区，大家会互相影响，也需要互相帮忙。',
      characters: ['曼德拉', '乔布斯', '马云', '马拉拉'],
      events: ['互联网普及', '欧洲一体化推进', '全球气候合作', '国际空间站运行'],
      administration: ['主权国家', '区域联盟', '国际组织', '跨国都市圈'],
      mapSummary: '地图上仍有国家边界，但海底光缆、航空线和数字网络又画出了新的“连接线”。',
      terrain: '海峡、海港、能源通道和数据中心继续影响世界，地形仍然决定交通成本和生活方式。',
      landforms: ['太平洋航线', '欧亚大陆桥', '海底光缆走廊'],
      landmarks: ['国际空间站', '硅谷', '联合国气候大会会场'],
      mapNodes: [
        { label: '北美创新区', top: '28%', left: '18%', tone: 'core' },
        { label: '欧洲联盟', top: '26%', left: '40%', tone: 'core' },
        { label: '亚洲制造带', top: '36%', left: '72%', tone: 'frontier' },
        { label: '海底光缆', top: '60%', left: '54%', tone: 'route' },
      ],
      kidQuestions: ['网络为什么也像地图上的一条路？', '如果地球是一个大家庭，我们可以怎样互相帮助？'],
    },
  },
];

function collectIndexValues(
  selector: (era: HistoryStoryEra) => string[],
) {
  return Array.from(new Set(historyStoryEras.flatMap(selector))).sort((a, b) =>
    a.localeCompare(b, 'zh-Hans-CN'),
  );
}

export function getHistoryPeopleIndex() {
  return collectIndexValues((era) => [...era.china.characters, ...era.world.characters]);
}

export function getHistoryEventIndex() {
  return collectIndexValues((era) => [...era.china.events, ...era.world.events]);
}

export function buildPerspectiveStoryBeats(perspective: HistoryStoryPerspective): HistoryStoryBeat[] {
  return [
    {
      title: '故事开场',
      narration: perspective.story,
      focusLabels: perspective.characters.slice(0, 2),
    },
    {
      title: '人物与大事',
      narration: `这一站里，${perspective.characters.join('、')}这些人物和${perspective.events.join('、')}这些大事，让历史一步步向前走。`,
      focusLabels: perspective.events.slice(0, 3),
    },
    {
      title: '地图怎么帮你记住',
      narration: `把故事放到地图上看，${perspective.mapSummary}。再看看地形地势：${perspective.terrain}`,
      focusLabels: perspective.landforms.slice(0, 3),
    },
  ];
}
