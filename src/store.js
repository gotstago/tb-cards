import Vue from 'vue'
import Vuex from 'vuex'
import Deck from 'deck-of-cards'
import getGame from "./utils/tarabish";
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
      state.deck.cards.forEach(function (card, i) {
        card.pos = seedArray[i];
        // card.sort(i, cards.length, function (i) {
        //   if (i === cards.length - 1) {
        //     next()
        //   }
        // }, reverse)
      });
      state.deck.cards.sort(function (a, b) {
        // if (reverse) {
        return a.pos - b.pos
        // } else {
        //   return b.pos - a.pos
        // }
      })

      // var removedCards = state.deck.cards.splice(parm[0], parm[1]);
      // removedCards.forEach(function (removedCard) {
      //   removedCard.unmount();
      // });
      //console.log(state)
    }
  },
  actions: {
    sort({ commit, state }) {
      state.deck.sort()
    },
    flip({ commit, state }) {
      state.deck.flip()
    },
    fan({ commit, state }) {
      state.deck.fan()
    },
    shuffle({ commit, state }) {
      state.deck.shuffle()
    },
    obtainDeck({ commit }) {
      commit(CREATE_DECK, Deck)
    },
    newGame({ commit, state }) {
      getGame(state.deck)
        .start(true)
        .then(function (gameState) {
          console.log("Got the final result: " + gameState);
        });
    },
    seedDeck({ commit }) {
      commit(SEED_DECK, [
        44, 7, 17, 27, 16,
        2, 39, 43, 30, 1,
        15, 51, 33, 12, 3,
        20, 45, 42, 5, 14,
        31, 40, 19, 4, 6,
        46, 18, 28, 25, 26,
        38, 41, 13, 29, 0,
        32
      ])
    },
    removeCards({ commit, state }) {
      console.log(`state.deck is ${state.deck}`)
      var cards = state.deck.cards;
      commit(REMOVE_CARDS, [1, 4]);
      commit(REMOVE_CARDS, [10, 4]);
      commit(REMOVE_CARDS, [19, 4]);
      commit(REMOVE_CARDS, [28, 4]);
    },
    printMessage({state},text) {
      var prefix = Deck.prefix
      var translate = Deck.translate
      var transform = prefix('transform')
      var animationFrames = Deck.animationFrames
      var ease = Deck.ease
      var $message = document.createElement('p')
      $message.classList.add('message')
      $message.textContent = text

      document.body.appendChild($message)

      $message.style[transform] = translate(window.innerWidth + 'px', 0)

      var diffX = window.innerWidth

      animationFrames(1000, 700)
        .progress(function (t) {
          t = ease.cubicInOut(t)
          $message.style[transform] = translate((diffX - diffX * t) + 'px', 0)
        })

      animationFrames(16000, 700)
        .start(function () {
          diffX = window.innerWidth
        })
        .progress(function (t) {
          t = ease.cubicInOut(t)
          $message.style[transform] = translate((-diffX * t) + 'px', 0)
        })
        .end(function () {
          document.body.removeChild($message)
        })
    }
  }
})
