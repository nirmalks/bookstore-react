export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

export const themes = {
  light: 'light',
  dark: 'dark',
};

export const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.light;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};
