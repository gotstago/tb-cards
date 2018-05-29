import Vue from 'vue'
import Vuex from 'vuex'
import Deck from 'deck-of-cards'
//import getGame from "../utils/tarabish";
// Vue.prototype.$deck = deck
Vue.use(Vuex)
const UPDATE_DECK = 'UPDATE_DECK'
const CREATE_DECK = 'CREATE_DECK'
const REMOVE_CARDS = 'REMOVE_CARDS'
const SEED_DECK = 'SEED_DECK'
export default new Vuex.Store({
  state: {
    deck: {},
    prefix: {},
  },
  getters: {
    // allCards: state => state.deck,
    getDeck: state => state.deck,
    prefix: state => state.prefix,
  },
  mutations: {
    [CREATE_DECK](state, d) {
      //console.log('mutate deck', deck)
      state.prefix = Deck.prefix
      state.deck = d();
      //console.log(state)
    },
    [REMOVE_CARDS](state, parm) {
      console.log(`begin ${parm[0]} amount ${parm[1]}`)
      var removedCards = state.deck.cards.splice(parm[0], parm[1]);
      removedCards.forEach(function (removedCard) {
        removedCard.unmount();
      });
      //console.log(state)
    },
    [SEED_DECK](state, seedArray) {
      console.log(`begin seeding ${seedArray}`)
      state.deck.cards.forEach(function(card, i) {
        card.pos = seedArray[i];
        // card.sort(i, cards.length, function (i) {
        //   if (i === cards.length - 1) {
        //     next()
        //   }
        // }, reverse)
      });
      // state.deck.cards.sort(function (a, b) {
      //   // if (reverse) {
      //     return a.pos - b.pos
      //   // } else {
      //   //   return b.pos - a.pos
      //   // }
      // })
      
      // var removedCards = state.deck.cards.splice(parm[0], parm[1]);
      // removedCards.forEach(function (removedCard) {
      //   removedCard.unmount();
      // });
      //console.log(state)
    }
  },
  actions: {
    obtainDeck({ commit }) {
      commit(CREATE_DECK, Deck)
    },
    seedDeck({ commit }) {
      commit(SEED_DECK, [
        44,        7,        17,        27,        16,
        2,        39,        43,        30,        1,
        15,        51,        33,        12,        3,
        20,        45,        42,        5,        14,
        31,        40,        19,        4,        6,
        46,        18,        28,        25,        26,
        38,        41,        13,        29,        0,
        32
      ])
    },
    removeCards({ commit, state }) {
      console.log(`state.deck is ${state.deck}`)
      var cards = state.deck.cards;
      commit(REMOVE_CARDS, [8, 4]);
      commit(REMOVE_CARDS, [17, 4]);
      commit(REMOVE_CARDS, [26, 4]);
      commit(REMOVE_CARDS, [35, 4]);
    }
  }
})
