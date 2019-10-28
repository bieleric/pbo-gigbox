<template>
  <div class="today">
    <h1>Today</h1>
    <main class="d-flex p-2 bd-highlight">
      <section id="notesheet">
      </section>
      <section id="organizer">
        <datetime id="datepicker" v-model="date" title="Dein Autritt" placeholder="Choose a date..."></datetime>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import Datepicker from "vuejs-datepicker";

import { Datetime } from 'vue-datetime';

export default {
  name: "Datepicker",
  components: {
    datetime: Datetime
  },
  data() {
    return {
      date: ""
    }
  }
}

</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: row;

  #notesheet {
    height: 30em;
    width: 45%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }
  
  #organizer {
    height: 30em;
    width: 45%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  #datepicker {
    cursor: pointer;
  }
}

</style>