import { ThemeHubPage } from '../../components/ThemeHubPage';

export default function EnglishThemeHub() {
  return (
    <ThemeHubPage
      themeId="english-hub"
      trackingTheme="english"
      title="英语游乐园"
      icon="🌍"
      subtitle="选择一个英语游戏开始学习吧！✨"
      palette={{
        primary: '#4CAF50',
        secondary: '#81C784',
        soft: '#E8F5E9',
        border: 'rgba(76, 175, 80, 0.26)',
        gradient: 'linear-gradient(135deg, #4CAF50, #81C784, #4CAF50)',
      }}
      speakLang="en-US"
    />
  );
}
