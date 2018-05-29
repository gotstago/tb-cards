export default function getGame(deck) {
    // date = parseDate(date)
    // return format(date, 'MMM Do, YYYY')
    var myGame = function () {

        // set up closure scope
        // var state = 1;
        var dealerPosition// = 'south';
        let currentPosition, handTrump, handBidder// = 'west';
        const playerPositions = ["west", "north", "east", "south"];
        const suits = ['spades', 'hearts', 'clubs', 'diamonds']
        const cardSuits = []
        var fontSize = window.getComputedStyle(document.body)
        .getPropertyValue('font-size').slice(0, -2)
        var cards = deck.cards
  
        const cardValues = {
          "1": {
            "nonTrump": 11,
            "trump": 11
          },
          "6": {
            "nonTrump": 0,
            "trump": 0
          },
          "7": {
            "nonTrump": 0,
            "trump": 0
          },
          "8": {
            "nonTrump": 0,
            "trump": 0
          },
          "9": {
            "nonTrump": 0,
            "trump": 14
          },
          "10": {
            "nonTrump": 10,
            "trump": 10
          },
          "11": {
            "nonTrump": 2,
            "trump": 20
          },
          "12": {
            "nonTrump": 3,
            "trump": 3
          },
          "13": {
            "nonTrump": 4,
            "trump": 4
          },
        }
        var dealCount = 0//cards.length
        var testMode
  
        // return object with methods to manipulate closure scope
        var positions = {
          west: {
            begOne: -6,
            endOne: -3,
            side: 'back',
            getY: function (idx, fs) {
              return Math.round((idx - 1.95) * 10 * fs / 16);
            },
            getX: function (idx, fs) {
              return Math.round(-130 * fs / 16);
            },
            nextPosition: 'north',
            rot: 90,
            cards: new Array(),
          },
          north: {
            begOne: -9,
            endOne: -6,
            side: 'back',
            getY: function (idx, fs) {
              return Math.round(-130 * fs / 16);
            },
            getX: function (idx, fs) {
              return Math.round((idx - 2.45) * 10 * fs / 16);
            },
            nextPosition: 'east',
            rot: 0,
            cards: new Array(),
          },
          east: {
            begOne: -12,
            endOne: -9,
            side: 'back',
            getY: function (idx, fs) {
              return Math.round((idx - 1.95) * 10 * fs / 16);
            },
            getX: function (idx, fs) {
              return Math.round(130 * fs / 16);
            },
            nextPosition: 'south',
            rot: 90,
            cards: new Array(),
          },
          south: {
            begOne: -15,
            endOne: -12,
            side: 'front',
            getY: function (idx, fs) {
              return Math.round(180 * fs / 16);
            },
            getX: function (idx, fs) {
              return Math.round((idx - 3.75) * 25 * fs / 16);
            },
            nextPosition: 'west',
            rot: 0,
            cards: new Array(),
          },
        }
        return {
          getDealer: function () {
            return playerPositions[dealerPosition];
          },
          getCurrent: function () {
            return playerPositions[currentPosition];
          },
          start: function (testing = false) {
            testMode = testing
            return chooseDealer()
              .then(data => {
                return deal(3, 4)
              })
              .then(data => {
                return deal(3, 4)
              })
              .then(data => {
                return acceptBids()
              })
              .then(data => {
                console.log(`bid is ${data}`)
                return deal(3, 4)
              })
              .then(data => {
                console.log(`bid is ${data}`)
                return sortSouth()
              })
              .then(data => {
                return `finished deal, trump is ${handTrump}, bid by ${handBidder}`
              })
          }
        };
  
        function sortSouth(reverse) {
          var southCards = positions.south.cards
          positions.south.cards = []
          southCards.sort(function (a, b) {
            if (reverse) {
              return a.i - b.i
            } else {
              return b.i - a.i
            }
          })
          let chain = Promise.resolve()
          southCards.forEach(function (currentCard, i) {
            (function (cp) {
              chain = chain.then(function () {
                return dealCard(cp, currentCard, i)
              })
              // do your stuff here
              // use the index variable - it is assigned to the value of 'i'
              // that was passed in during the loop iteration.
            })(3);          // south Position
            //   // if (i === southCards.length - 1) {
            //   //   next()-
            //   // }
            // }, reverse)
          })
          return chain
        }
  
        function moveCard(i, len, cb, reverse) {
          // var z = i / 4
          // var delay = i * 10
  
          // card.animateTo({
          //   delay: delay,
          //   duration: 400,
  
          //   x: -z,
          //   y: -150,
          //   rot: 0,
  
          //   onComplete: function () {
          //     $el.style.zIndex = i
          //   }
          // })
  
          // card.animateTo({
          //   delay: delay + 500,
          //   duration: 400,
  
          //   x: -z,
          //   y: -z,
          //   rot: 0,
  
          //   onComplete: function () {
          //     cb(i)
          //   }
          // })
        }
        function dealCard(cp, card, i) {
          return new Promise(function (resolve, reject) {
            //console.log(`deal card ${card} to ${position.nextPosition}`)
            let position = positions[playerPositions[cp]]
            console.log(`position is ${position.nextPosition}`)
            //debugger
            let handSize = position.cards.length
            console.log(`handSize is ${handSize}`)
            var delay = testMode ? 0 : 250;//0 //handSize * 250//i * 250
            var duration = testMode ? 25 : 250;
            var len = cards.length
            console.log(`currentPosition is ${cp}`)
            var currentY = position.getY(handSize, fontSize)
            var currentX = position.getX(handSize, fontSize)
            fontSize = getFontSize()
            console.log(`card is ${card.rank} of ${card.suit}, handSize is ${handSize}, 
              currentY is ${currentY} and currentX is ${currentX}`)
            card.animateTo({
              delay: delay,
              duration: duration,
              y: currentY,//Math.round((i - 1.05) * 20 * fontSize / 16),
              x: currentX,//Math.round(-150 * fontSize / 16),
              rot: position.rot,
              onStart: function () {
                card.$el.style.zIndex = (len - 1) + handSize
              },
              onComplete: function () {
                card.setSide(position.side)
                position.cards.push(card)
                dealCount++
                resolve()
              }
            })
          })
        }
  
        function acceptBids() {
          return automaticBid(playerPositions[currentPosition])
            .then(automaticBidHandler)
            .then(automaticBidHandler)
            .then(automaticBidHandler)
            .catch(function (data) {
              handTrump = data
              console.log(`bid is resolved`)
              return Promise.resolve(data)
            })
        }
        function automaticBidHandler(data) {
          //check for a bid other than pass, and if found,we are finished bidding.
          handBidder = playerPositions[currentPosition]
          console.log(`bid is ${playerPositions[currentPosition]}, ${data}`)
          currentPosition = (currentPosition + 1) % 4
          if (data === 'pass') {
            console.log(`bid is not resolved`)
            return automaticBid(playerPositions[currentPosition])
          } else {
            return Promise.reject(data)
          }
        }
        function automaticBid(playerPosition) {
          return new Promise(function (resolve, reject) {
            var position = positions[playerPosition]
            position.cards.forEach(card => {
              console.log(`card is ${card.rank} of ${card.suit}`)
            });
            var bid = evaluateCards(position.cards)
  
            return resolve(bid)
          })
        }
        function evaluateCards(hand) {
          const trumpReducer = (accumulator, currentValue) => accumulator + cardValues[currentValue.rank.toString()].trump;
          const nonTrumpReducer = (accumulator, currentValue) => accumulator + cardValues[currentValue.rank.toString()].nonTrump;
          const scenarios = [0, 1, 2, 3].map(function (currentTrump) {
            // return {
            return [
              hand.filter((c) => c.suit === 0),
              hand.filter((c) => c.suit === 1),
              hand.filter((c) => c.suit === 2),
              hand.filter((c) => c.suit === 3),
            ].map(function (val) {
              return val.reduce(function (prev, curr, index) {
                if (curr.suit === currentTrump) {
                  return prev + cardValues[curr.rank.toString()].trump
                } else {
                  return prev + cardValues[curr.rank.toString()].nonTrump
                }
              }, 0)
            })
              .reduce(function (prev, curr) {
                return prev + curr
              }, 0)
            // currentTrump:currentTrump,
            // pointTotal:calculateTotals(hand,currentTrump)
            // }
          })
          var indexOfMaxValue = scenarios.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
          console.log(scenarios)
          console.log(indexOfMaxValue)//Math.max( ...scenarios )
          if (scenarios[indexOfMaxValue] > 34) {
            return suits[indexOfMaxValue]
          } else {
            return 'pass'
          }
        }
        function calculateTotals(hand, trump) {
          var possibleTrumpScenarios = [
            hand.filter((c) => c.suit === 0),
            hand.filter((c) => c.suit === 1),
            hand.filter((c) => c.suit === 2),
            hand.filter((c) => c.suit === 3),
          ].map(function (val) {
            return val.reduce(function (prev, curr) {
              if (curr.suit === trump) {
                return prev + cardValues[curr.rank.toString()].trump
              } else {
                return prev + cardValues[curr.rank.toString()].nonTrump
              }
            }, 0)
          }).reduce(function (prev, curr) {
            return prev + curr
          }, 0)
          //trump.map(function (value) {
          return possibleTrumpScenarios
          //})
        }
        function deal(amount, repeat = 1) {
          //return new Promise(function (resolve, reject) {
          var cardCount = amount * repeat
          var len = cards.length
          let cardsToDeal = cards.slice(len - dealCount - cardCount, len - dealCount)//.reverse()
          //dealCount starts at 0, and we are beginning at the top of the deck
          //var beginning = 
          console.log(`dealing ${amount} cards ${repeat} times from deck of ${len}.`)
          console.log(`first to bid is ${playerPositions[currentPosition]}`)
          console.log(`dealer is ${playerPositions[dealerPosition]}`)
          // let pos = positions[playerPositions[currentPosition]]
          //let currentCard
          let chain = Promise.resolve()
          // (async function loop() {
          for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {//4
            for (let amountIndex = 0; amountIndex < amount; amountIndex++) {//3
              // let pos = positions[playerPositions[currentPosition]]
              let currentCard = cardsToDeal.pop()
              //console.log(`card is ${currentCard.rank} of ${currentCard.suit}`)
              console.log(`cardsToDeal are ${cardsToDeal.length}`);
              //let cp = currentPosition
              (function (cp) {
                chain = chain.then(function () {
                  return dealCard(cp, currentCard, amountIndex)
                })
                // do your stuff here
                // use the index variable - it is assigned to the value of 'i'
                // that was passed in during the loop iteration.
              })(currentPosition);
            }
            currentPosition = (currentPosition + 1) % repeat
            console.log(`after incrementing, currentPosition is ${currentPosition}`)
          }
          //console.log(`cardsToDeal are ${cardsToDeal.length}`)
          return chain
        }
        function dealCard(cp, card, i) {
          return new Promise(function (resolve, reject) {
            //console.log(`deal card ${card} to ${position.nextPosition}`)
            let position = positions[playerPositions[cp]]
            console.log(`position is ${position.nextPosition}`)
            //debugger
            let handSize = position.cards.length
            console.log(`handSize is ${handSize}`)
            var delay = testMode ? 0 : 250;//0 //handSize * 250//i * 250
            var duration = testMode ? 25 : 250;
            var len = cards.length
            console.log(`currentPosition is ${cp}`)
            var currentY = position.getY(handSize, fontSize)
            var currentX = position.getX(handSize, fontSize)
            //fontSize = fontSize
            console.log(`card is ${card.rank} of ${card.suit}, handSize is ${handSize}, 
              currentY is ${currentY} and currentX is ${currentX}`)
            card.animateTo({
              delay: delay,
              duration: duration,
              y: currentY,//Math.round((i - 1.05) * 20 * fontSize / 16),
              x: currentX,//Math.round(-150 * fontSize / 16),
              rot: position.rot,
              onStart: function () {
                card.$el.style.zIndex = (len - 1) + handSize
              },
              onComplete: function () {
                card.setSide(position.side)
                position.cards.push(card)
                dealCount++
                resolve()
              }
            })
          })
        }
  
        function chooseDealer(gameState) {
          return new Promise(function (resolve, reject) {
            var offset = 0//Math.floor(Math.random() * 4);
            dealerPosition = offset
            currentPosition = (offset + 1) % playerPositions.length;
            resolve()
          })
        }
  
      }();
      return myGame;
  }
