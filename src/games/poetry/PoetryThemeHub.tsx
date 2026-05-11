import { ThemeHubPage } from '../../components/ThemeHubPage';

export default function PoetryThemeHub() {
  return (
    <ThemeHubPage
      themeId="poetry-hub"
      trackingTheme="poetry"
      title="古典诗词"
      icon="🏛️"
      subtitle="学习优美的古诗词，感受传统文化的魅力！✨"
      palette={{
        primary: '#673AB7',
        secondary: '#9575CD',
        soft: '#F3E5F5',
        border: 'rgba(103, 58, 183, 0.24)',
        gradient: 'linear-gradient(135deg, #673AB7, #9575CD, #673AB7)',
      }}
    />
  );
}
