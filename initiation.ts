
import { Player } from './constants/player';
import { Card, DECK } from './constants/cards';

// Function to shuffle the deck
const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
};

const getPlayers = (numberOfPlayers: number): Player[] => {
    const players: Player[] = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
        players.push({
            walletAmount: 1000,
            phoneNumber: `+91999999999${i}`,
            fullName: `Player ${i}`,
            isPlaying: true,
            cards: [],
            initialCard: null,
            playerNumber: i,
        });
    }
    return players;
}

export const giveDeciderCards = (numberOfPlayers: number): Player[] => {

    const players = getPlayers(numberOfPlayers);
    // Shuffle the deck
    let shuffledDeck = shuffleDeck([...DECK]);

    // Deal one card to each player
    const playersWithInitialCards = players.map(player => {
        const card = shuffledDeck.pop();
        if (card) {
            return { ...player, initialCard: card };
        }
        return player;
    });

    return playersWithInitialCards;
}

export const dealCards = (players: Player[]): Player[] => {
    let winner = players[0];
    for (let i = 1; i < players.length; i++) {
        if (players[i].cards[0].value > winner.cards[0].value) {
            winner = players[i];
        }
    }

    // Reset cards for all players
    players.forEach(p => p.cards = []);

    // Deal cards to players
    const shuffledDeck = shuffleDeck(DECK); // Reshuffle the deck
    players.forEach(player => {
        const cardCount = player.phoneNumber === winner.phoneNumber ? 14 : 13;
        for (let i = 0; i < cardCount; i++) {
            const card = shuffledDeck.pop();
            if (card) {
                player.cards.push(card);
            }
        }
    });

    return players;
}
// export const initiateGame = (players: Player[]): Player[] => {
//   // Shuffle the deck
//   let shuffledDeck = shuffleDeck([...DECK, ...DECK]);

//   // Deal one card to each player
//   const playersWithCards = players.map(player => {
//     const card = shuffledDeck.pop();
//     if (card) {
//       return { ...player, initialCard: card };
//     }
//     return player;
//   });

//   // Find the player with the highest card
//   let winner = playersWithCards[0];
//   for (let i = 1; i < playersWithCards.length; i++) {
//     if (playersWithCards[i].cards[0].value > winner.cards[0].value) {
//       winner = playersWithCards[i];
//     }
//   }

//   // Reset cards for all players
//   playersWithCards.forEach(p => p.cards = []);

//   // Deal cards to players
//   shuffledDeck = shuffleDeck(DECK); // Reshuffle the deck
//   playersWithCards.forEach(player => {
//     const cardCount = player.phoneNumber === winner.phoneNumber ? 14 : 13;
//     for (let i = 0; i < cardCount; i++) {
//       const card = shuffledDeck.pop();
//       if (card) {
//         player.cards.push(card);
//       }
//     }
//   });

//   return playersWithCards;
// };
