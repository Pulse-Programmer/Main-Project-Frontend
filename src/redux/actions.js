// src/redux/actions.js
export const NEXT_CARD = 'NEXT_CARD';
export const PREV_CARD = 'PREV_CARD';

export const nextCard = () => ({
  type: NEXT_CARD
});

export const prevCard = () => ({
  type: PREV_CARD
});
