<template>
  <v-app>
    <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="play" flat :disabled="animating || playing">Play Game</v-btn>
      <v-btn @click="seed" flat :disabled="animating">Seed</v-btn>
      <v-btn flat>Link Three</v-btn>
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
    seed() {
      // this.clickCount++;
      // Send the event on a channel (play) without a payload .
      //this.playing = true;
      EventBus.$emit('seed');
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
