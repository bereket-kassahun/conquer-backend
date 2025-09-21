
export interface Card {
  suit: 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades' | 'Joker';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | 'Joker';
  value: number;
}

const suits: ('Hearts' | 'Diamonds' | 'Clubs' | 'Spades')[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks: ('2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A')[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const DECK: Card[] = suits.flatMap(suit => 
  ranks.map(rank => {
    let value = 0;
    if (rank === 'A') {
      value = 14;
    } else if (rank === 'K') {
      value = 13;
    } else if (rank === 'Q') {
      value = 12;
    } else if (rank === 'J') {
      value = 11;
    } else {
      value = parseInt(rank, 10);
    }
    return { suit, rank, value };
  })
);

export const DECK_WITHOUT_JOKER = [...DECK];

DECK.push({ suit: 'Joker', rank: 'Joker', value: 15 });
DECK.push({ suit: 'Joker', rank: 'Joker', value: 15 });