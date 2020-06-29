import theme from 'styled-theming';

export const lightTheme = {
  body: '#F5F7FB',
  text: '#363537',
  // toggleBorder: '#FFF',
  background: '#363537',
}
export const darkTheme = {
  body: '#2d3748',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
}

export const backgroundColor = theme('mode', {
  // light: '#fafafa',
  light: '#F5F7FB',
  dark: '#222'
});

export const buttonBackgroundColor = theme('mode', {
  light: '#222',
  dark: '#eee'
});