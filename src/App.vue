<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Today</router-link> |
      <router-link to="/organizer">Organizer</router-link> |
      <router-link to="/yournotes">Your Notes</router-link>
      <b-button id="initBtn" @click="initStorage"> Init </b-button>
    </div>
    <router-view />
  </div>
</template>

<script>
import * as storage from "./assets/storage.js";
export default {
  name: "App",
  data() {
    return {
      songs: [
        { name: "Song 1", id: 0 },
        { name: "Song 2", id: 1 },
        { name: "Song 3", id: 2 },
        { name: "Song 4", id: 3 }
      ],
      gigs: [
        {
          eId: 0,
          Date: "2020-01-22",
          Songs: [
            { name: "Song 1", id: 0 },
            { name: "Song 2", id: 1 },
            { name: "Song 3", id: 2 }
          ]
        },
        {
          eId: 1,
          Date: "2020-01-23",
          Songs: [
            { name: "Song 3", id: 2 },
            { name: "Song 1", id: 0 },
            { name: "Song 2", id: 1 }
          ]
        }
      ],
      events: [
        {
          eId: 0, //Event-ID
          title: "Auftritt",
          start: "2020-01-22T12:30:00",
          end: "2020-01-22T14:30:00",
          allDay: false,
          info: "Test-Auftritt 0"
        },
        {
          eId: 1, //Event-ID
          title: "Auftritt2",
          start: "2020-01-23T12:30:00",
          end: "2020-01-23T14:30:00",
          allDay: false,
          info: ""
        }
      ]
    };
  },
  methods: {
    initStorage: function() {
      storage.setGigs(this.gigs);
      storage.setEvents(this.events);
      storage.setSongs(this.songs);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  #initBtn {
    float: right;
  }
}
</style>
