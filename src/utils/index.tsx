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

export const formatPrice = (price: number) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(price.toFixed(2));
  return dollarsAmount;
};

export const generateQuantityOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const quantity = index + 1;
    return (
      <option key={quantity} value={quantity}>
        {quantity}
      </option>
    );
  });
};
