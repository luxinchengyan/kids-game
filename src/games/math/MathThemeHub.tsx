import { ThemeHubPage } from '../../components/ThemeHubPage';

export default function MathThemeHub() {
  return (
    <ThemeHubPage
      themeId="math-hub"
      trackingTheme="math"
      title="数字小镇"
      icon="🔢"
      subtitle="选择一个数学游戏开始冒险吧！✨"
      palette={{
        primary: '#2196F3',
        secondary: '#64B5F6',
        soft: '#E3F2FD',
        border: 'rgba(33, 150, 243, 0.26)',
        gradient: 'linear-gradient(135deg, #2196F3, #64B5F6, #2196F3)',
      }}
    />
  );
}
