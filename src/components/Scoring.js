import { groupBy } from '@progress/kendo-data-query';

export { getHighCard, getHandRank }

/*
Use this file to complete the following functions and solve all of the unit tests displayed to the right.

Try a functional approach. Complete all of the unit tests without defining a single variable.

*/

// const groupBy = (items, keySelector) => items.reduce((groups, item) => groups[keySelector(item)] = [...groups[keySelector(item)], item]);


// Test 1b. Get the highest card.
// The card with the highest value in the hand. (Deep Equals, return the full card object).

// [{ value: 10, items[{numValue:10, suit:'HEART'}]}]
const toNumValueGroups = (cards) => groupBy(cards, [{ field: "numValue" }]);

const countOfAKind = (quantity, cards) => toNumValueGroups(cards).filter(g => g.items.length === quantity).length;

const distance = (numValues) => Math.max(...numValues) - Math.min(...numValues);

const getHighCard = (cards) => cards.reduce((highCard, currentCard) => currentCard.numValue > highCard.numValue ? currentCard : highCard);

// (cards) => bool
const hasTwoPair = (cards) => countOfAKind(2, cards) === 2;

const hasPair = (cards) => countOfAKind(2, cards) > 0;

const hasThreeOfAKind = (cards) => countOfAKind(3, cards) > 0;

const hasFourOfAKind = (cards) => countOfAKind(4, cards) > 0;

const hasFullHouse = (cards) => hasPair(cards) && hasThreeOfAKind(cards);

const hasFlush = (cards) => cards.every(card => card.suit === cards[0].suit);

const areAllUnique = (cards) => new Set(toValues(cards)).size === 5;

const toValues = (cards) => cards.map(c => c.numValue);

const hasStraight = (cards) => areAllUnique(cards) && distance(toValues(cards)) === 4;

const hasStraightFlush = (cards) => hasFlush(cards) && hasStraight(cards);

const hasRoyalFlush = (cards) => hasFlush(cards) && cards.every(card => card.numValue > 9);

const getHandRank = (cards) => [
  { eval: () => true, rank: "HighCard", strength: 1 },
  { eval: hasPair, rank: "Pair", strength: 2 },
  { eval: hasTwoPair, rank: "TwoPair", strength: 3 },
  { eval: hasThreeOfAKind, rank: "ThreeOfAKind", strength: 4 },
  { eval: hasStraight, rank: "Straight", strength: 5 },
  { eval: hasFlush, rank: "Flush", strength: 6 },
  { eval: hasFullHouse, rank: "FullHouse", strength: 7 },
  { eval: hasFourOfAKind, rank: "FourOfAKind", strength: 8 },
  { eval: hasStraightFlush, rank: "StraightFlush", strength: 9 },
  { eval: hasRoyalFlush, rank: "RoyalFlush", strength: 10 },
].sort(r => r.strength).reverse().find(r => r.eval(cards)).rank;
