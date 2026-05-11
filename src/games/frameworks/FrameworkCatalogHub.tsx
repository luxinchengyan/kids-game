import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout, GamePageHeader } from '../../components/PageLayout';
import { Button } from '../../components/Button';
import { frameworkCatalog } from '../../data/gameFrameworkCatalog';
import { getGameSeriesSnapshot } from '../../data/gameSeriesCatalog';
import { track } from '../../lib/analytics';
import PinyinText from '../../components/PinyinText';

function StatusBadge({ playable }: { playable: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 800,
        color: playable ? '#2E7D32' : '#7B1FA2',
        background: playable ? '#E8F5E9' : '#F3E5F5',
        whiteSpace: 'nowrap',
      }}
    >
      {playable ? '✅ 可玩' : '🧩 框架'}
    </span>
  );
}

// 辅助函数：为常见的游戏名提供拼音映射（实际项目中应从数据层提供）
const getPinyin = (text: string) => {
  const pinyinMap: Record<string, string> = {
    '拼音打地鼠': 'pīn yīn dǎ dì shǔ',
    '拼音翻翻乐': 'pīn yīn fān fān lè',
    '拼音连连看': 'pīn yīn lián lián kàn',
    '拼音拼图': 'pīn yīn pīn tú',
    '拼音节奏大师': 'pīn yīn jié zòu dà shī',
    '找规律填数': 'zhǎo guī lǜ tián shù',
    '数独儿童版': 'shù dú ér tóng bǎn',
    '数学打地鼠': 'shù xué dǎ dì shǔ',
    '数字华容道': 'shù zì huá róng dào',
    '比大小跷跷板': 'bǐ dà xiǎo qiāo qiāo bǎn',
    '单词翻翻乐': 'dān cí fān fān lè',
    '字母拼图': 'zì mǔ pīn tú',
    '英语打地鼠': 'yīng yǔ dǎ dì shǔ',
    '英语宾果': 'yīng yǔ bīn guǒ',
    '英语角色扮演': 'yīng yǔ jué sè bàn yǎn',
    '故事排序': 'gù shì pái xù',
    '故事阅读': 'gù shì yuè dú',
    '汉字打地鼠': 'hàn zì dǎ dì shǔ',
    '故事问答转盘': 'gù shì wèn dá zhuàn pán',
    '故事创作工坊': 'gù shì chuàng zuò gōng fǎng',
    '舒尔特方格': 'shū ěr tè fāng gé',
    '反应测试': 'fǎn yìng cè shì',
    '记忆翻牌': 'jì yì fān pái',
    '找规律': 'zhǎo guī lǜ',
    '迷宫探险': 'mí gōng tàn xiǎn',
    '五子棋': 'wǔ zǐ qí',
    '扫雷大冒险': 'sǎo léi dà mào xiǎn',
    '中国象棋': 'zhōng guó xiàng qí',
    '国际象棋': 'guó jì xiàng qí',
    '围棋入门': 'wéi qí rù mén',
    '军棋大战': 'jūn qí dà zhàn',
    '趣味牌类': 'qù wèi pái lèi',
    '跳棋': 'tiào qí',
    '拼音冒险岛': 'pīn yīn mào xiǎn dǎo',
    '数字小镇': 'shù zì xiǎo zhèn',
    '英语游乐园': 'yīng yǔ yóu lè yuán',
    '故事王国': 'gù shì wáng guó',
    '跨学科综合游戏': 'kuà xué kē zōng hé yóu xì',
    '智趣棋牌中心': 'zhì qù qí pái zhōng xīn',
  };
  return pinyinMap[text] || '';
};

export default function FrameworkCatalogHub() {
  const navigate = useNavigate();
  const playableCount = frameworkCatalog.reduce(
    (sum, section) => sum + section.games.filter((item) => item.status === 'playable' && item.playPath).length,
    0
  );
  const totalCount = frameworkCatalog.reduce((sum, section) => sum + section.games.length, 0);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handlePlay = useCallback(
    (sectionId: string, itemId: string, path: string) => {
      track('framework_play_select', { sectionId, frameworkId: itemId, path });
      navigate(path);
    },
    [navigate]
  );

  return (
    <PageLayout maxWidth="1120px">
      <GamePageHeader
        title="游戏设计工坊"
        icon="🛠️"
        subtitle="把设计变成好玩的游戏框架"
        gradient="linear-gradient(135deg, #E91E63, #FF9800, #2196F3)"
        progressColor="#E91E63"
        onBack={handleBack}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '24px' }}>
        {frameworkCatalog.map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.05 }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '20px', padding: '0 8px' }}>
              <div style={{ fontSize: '42px' }}>{section.icon}</div>
              <div>
                <PinyinText text={section.title} pinyin={getPinyin(section.title)} />
                <div style={{ height: '4px', background: section.color, borderRadius: '2px', marginTop: '4px', width: '60px' }} />
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {section.games.map((item) => {
                const playable = item.status === 'playable' && !!item.playPath;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                    style={{
                      borderRadius: '24px',
                      padding: '20px',
                      background: '#FFFFFF',
                      border: `3px solid ${playable ? section.color + '40' : '#EEEEEE'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                  >
                    {!playable && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '-30px',
                        background: '#9E9E9E',
                        color: 'white',
                        padding: '4px 40px',
                        transform: 'rotate(45deg)',
                        fontSize: '10px',
                        fontWeight: 900,
                        zIndex: 1
                      }}>
                        开发中
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <PinyinText text={item.name} pinyin={getPinyin(item.name)} />
                      </div>
                      <StatusBadge playable={playable} />
                    </div>

                    <p style={{ 
                      margin: 0, 
                      color: '#5D4037', 
                      lineHeight: 1.5, 
                      fontSize: '14px', 
                      fontWeight: 600,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '42px'
                    }}>
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {item.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: section.color + '15',
                          color: section.color
                        }}>#{tag}</span>
                      ))}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                      {playable ? (
                        <Button
                          size="large"
                          onClick={() => handlePlay(section.id, item.id, item.playPath as string)}
                          style={{
                            width: '100%',
                            background: section.color,
                            fontSize: '18px',
                            fontWeight: 900,
                            boxShadow: `0 6px 0 ${section.color}88`,
                            transform: 'translateY(-2px)'
                          }}
                        >
                          ▶️ 开始玩
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          disabled
                          style={{ width: '100%', opacity: 0.6 }}
                        >
                          🧩 完善中
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </PageLayout>
  );
}
