import { ThemeHubPage } from '../../components/ThemeHubPage';

export default function PinyinThemeHub() {
  return (
    <ThemeHubPage
      themeId="pinyin"
      trackingTheme="pinyin"
      title="拼音冒险岛"
      icon="📖"
      subtitle="选择一个拼音游戏开始冒险吧！✨"
      palette={{
        primary: '#FF9800',
        secondary: '#FFB74D',
        soft: '#FFF3E0',
        border: 'rgba(255, 152, 0, 0.26)',
        gradient: 'linear-gradient(135deg, #FF9800, #FFB74D, #FF9800)',
      }}
    />
  );
}
