<template>
  <v-app>
    <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="play" flat :disabled="animating || playing">Play Game</v-btn>
      <v-btn @click="seed" flat :disabled="animating">Seed</v-btn>
      <v-btn @click="fan" flat>Fan</v-btn>
      <v-btn @click="flip" flat>Flip</v-btn>
      <v-btn @click="shuffle" flat>Shuffle</v-btn>
      <v-btn @click="sort" flat>Sort</v-btn>
      <v-btn @click="message" flat>Message</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-content>
      <GameTable/>
      <HelloWorld/>
    </v-content>
    <!-- <v-alert
      :value="alert"
      type="info"
      transition="scale-transition"
    >
      This is an info alert.
    </v-alert> -->
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import GameTable from './components/game-table'
// import getGame from "./utils/tarabish";
import { mapActions, mapGetters } from "vuex";
import { EventBus } from './utils/event-bus.js';

export default {
  name: 'App',
  components: {
    HelloWorld, GameTable
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      animating:true,
      playing:false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Cards',
      alert: true,
    }
  },
  computed: {
    // ...mapGetters([
    //   "deck",
    //   // "northCards",
    //   // "southCards",
    //   // "eastCards",
    //   // "westCards",
    //   // "trickCards"
    // ])
  },
  // define methods under the `methods` object
  methods: {
    playold: function (event) {
      console.log(`in play`)
    //   getGame(this.deck)
    //       .start(true)
    //       .then(function(gameState) {
    //         console.log("Got the final result: " + gameState);
    //       });
    //   // `this` inside methods points to the Vue instance
    //   // alert('Welcome to ' + this.title + '!')
    //   // // `event` is the native DOM event
    //   // if (event) {
    //   //   alert(event.target.tagName)
    //   // }
    },
    play() {
      // this.clickCount++;
      // Send the event on a channel (play) without a payload .
      this.playing = true;
      EventBus.$emit('play');
    },
    shuffle() {
      // Send the event on a channel (play) without a payload .
      // this.playing = true;
      // EventBus.$emit('shuffle');
      this.$store.dispatch("shuffle")
    },
    sort() {
      // Send the event on a channel (play) without a payload .
      // this.playing = true;
      // EventBus.$emit('sort');
      this.$store.dispatch("sort")
    },
    fan() {
      // Send the event on a channel (play) without a payload .
      // this.playing = true;
      // EventBus.$emit('fan');
      this.$store.dispatch("fan")
    },
    flip() {
      // Send the event on a channel (play) without a payload .
      // this.playing = true;
      // EventBus.$emit('flip');
      this.$store.dispatch("flip")
    },
    message() {
      // Send the event on a channel (play) without a payload .
      // this.playing = true;
      // EventBus.$emit('flip');
      this.$store.dispatch("printMessage","hello")
    },
    seed() {
      // this.clickCount++;
      // Send the event on a channel (play) without a payload .
      //this.playing = true;
      // EventBus.$emit('seed');
      this.$store.dispatch("seedDeck")
    }
  },
  mounted: function(){
    EventBus.$on("finished animating", () => {
      console.log(`enabling play`);
      this.animating = false;
    });
    console.log('begin mounted')
  },
  ready: function(){
    console.log('begin ready')
  }
}
</script>
