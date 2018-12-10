// test data
import data from './test-data.json';
// Unit under test
import { getHandRank, getHighCard } from '../components/Scoring.js';

// An array of test configurations.
export { tests };

const expectedHighCard = {
  "suit": "HEARTS",
  "value": "KING",
  "numValue": 13,
  "image": "https://deckofcardsapi.com/static/img/KH.png",
  "code": "KH"
};

const tests = [
  {
    id: 11,
    name: "1. Royal Flush",
    data: data.royalFlush,
    actual: getHandRank(data.royalFlush),
    expected: "RoyalFlush",
    description: "A straight flush including ace, king, queen, jack, and ten all in the same suit."
  },
  {
    id: 10,
    name: "2. Straight Flush",
    data: data.straightFlush,
    actual: getHandRank(data.straightFlush),
    expected: "StraightFlush",
    description: "Five cards in a sequence, all in the same suit."
  },
  {
    id: 9,
    name: "3. Four of a kind",
    data: data.fourOfAKind,
    actual: getHandRank(data.fourOfAKind),
    expected: "FourOfAKind",
    description: "Four cards of the same value."
  },
  {
    id: 8,
    name: "4. Full House",
    data: data.fullHouse,
    actual: getHandRank(data.fullHouse),
    expected: "FullHouse",
    description: "Three of a kind with a pair."
  },
  {
    id: 7,
    name: "5. Flush",
    data: data.flush,
    actual: getHandRank(data.flush),
    expected: "Flush",
    description: "All five cards are of the same suit, but not in sequence."
  },
  {
    id: 6,
    name: "6. Straight",
    data: data.straight,
    actual: getHandRank(data.straight),
    expected: "Straight",
    description: "Five cards of mixed suits in sequence."
  },
  {
    id: 5,
    name: "7. Three of a kind",
    data: data.threeOfAKind,
    actual: getHandRank(data.threeOfAKind),
    expected: "ThreeOfAKind",
    description: "Three cards of the same value."
  },
  {
    id: 4,
    name: "8. Two Pair",
    data: data.twoPair,
    actual: getHandRank(data.twoPair),
    expected: "TwoPair",
    description: "Two cards of the same value."
  },
  {
    id: 3,
    name: "9. Pair",
    data: data.pair,
    actual: getHandRank(data.pair),
    expected: "Pair",
    description: "Two cards of the same value."
  },
  {
    id: 1,
    name: "1a. High Card",
    data: data.highCard,
    actual: getHandRank(data.highCard),
    expected: "HighCard",
    description: "Default hand rank"
  },  {
    id: 2,
    name: "1b. getHighCard",
    data: data.highCard,
    actual: getHighCard(data.highCard),
    expected: expectedHighCard,
    description: "The card with the highest value in the hand. (Deep Equals, return the full card object)."
  }
].sort((a,b) => a.id - b.id);