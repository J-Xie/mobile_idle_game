const common = {
  $borderRadius: 5,
  $borderWidth: 1,
};

export const activeTint = {
  light: 'black',
  dark: 'white',
};

export default {
  light: {
    ...common,
    $theme: 'light',
    $bgColor: 'white',
    $textColor: 'black',
    $borderColor: 'black',
  },
  dark: {
    ...common,
    $theme: 'dark',
    $bgColor: '#333',
    $textColor: 'white',
    $borderColor: 'white',
  },
};
