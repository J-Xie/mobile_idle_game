const SUCCESS = 'success';
const INFO = 'info';
const WARNING = 'warning';
const ERROR = 'error';

export const explorationNotifs = {
  success: [
    {
      type: SUCCESS,
      incomeType: 'space',
      title: 'New space available',
      message: 'Your villagers discovered some new space.',
    },
    {
      type: SUCCESS,
      title: 'Deposit found.',
      message: 'A new deposit was found.',
    },
    {
      type: SUCCESS,
      title: 'Resources found.',
      message: 'Your villagers came back with some resources.',
    },
  ],
  info: [
    {
      type: INFO,
      title: 'Nothing found.',
      message: 'Your exploration squad got lost and decicded to head back.',
    },
  ],
  warning: [
    {
      type: WARNING,
      title: 'Ambush.',
      message:
        'A bunch of thieves appeared and robbed some of your vllagers resources.',
    },
    {
      type: WARNING,
      title: 'Safety first',
      message:
        'A best came out of nowhere, your villagers fled as far as possible.',
    },
  ],
  error: [
    {
      type: ERROR,
      title: 'Dangerous cave.',
      message:
        'Your exploration squad ventured into a cave. Only a few came back from their trip.',
    },
    {
      type: ERROR,
      title: 'Attacked by beasts.',
      message: "Your villagers found a best nest. Some of them didn't survive",
    },
  ],
};
