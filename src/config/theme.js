const common = {
  $borderRadius: 5,
  $borderWidth: 1,
};

export const activeTint = {
  light: 'black',
  dark: 'white',
};

export const notifBg = {
  dark: {
    success: 'green',
    info: 'powderblue',
    warning: 'orange',
    error: 'red',
  },
  light: {
    success: 'green',
    info: 'powderblue',
    warning: 'orange',
    error: 'red',
  },
};

export default {
  light: {
    ...common,
    $theme: 'light',
    $bgColor: 'white',
    $textColor: 'black',
    $borderColor: 'black',

    $bgColorLight: '#81807E',
    $bgColorDark: '#31302B',
  },
  dark: {
    ...common,
    $theme: 'dark',
    $bgColor: '#333',
    $textColor: 'white',
    $borderColor: 'white',
    $bgColorLight: '#81807E',
    $bgColorDark: '#31302B',
  },
};
