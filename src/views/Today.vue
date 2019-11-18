<template>
  <div class="today">
    <h1>Today</h1>
    <main class="d-flex p-2 bd-highlight">
      <section id="notesheet" class="rounded">
        <pdf :src="path" :page="1" style="width:100%; margin: 0 auto 0 auto;">
          <template slot="loading">
            loading PDF...
          </template>
        </pdf>
      </section>
      <section id="organizer" class="rounded">
        <datetime id="datepicker" class="theme-orange bg-light w-100 rounded-top border"  v-model="date" title="Dein Autritt" placeholder="Choose a date..."></datetime> 
          <draggable v-model="list2" group="people" @start="drag=true" @end="drag=false">
            <div id="songs" class="drag w-90 text-white rounded m-2" v-for="element in list2" :key="element.id" v-on:click="showPdf(element.id)">{{element.name}}</div>
          </draggable>
      </section>

    </main>
  </div>
</template>

<script>
import { Datetime } from 'vue-datetime';
import draggable from 'vuedraggable';
import pdf from 'pdfvuer';

export default {
  name: "Datepicker",
  components: {
    datetime: Datetime,
    draggable,
    pdf,
  },
  data() {
    return {
      date: "",
      list2: [
        { name: "Another Brick In The Wall", id: 0, path: "AnotherBrickInTheWall.pdf" },
        { name: "Song 2", id: 1, path: "Wasanderes" },
        { name: "Song 3", id: 2 }
      ],
      path: "AnotherBrickInTheWall.pdf",
    };
  },

  methods: {
    showPdf: function(key) {

      this.path = this.list2[key].path;

      alert(this.path);
    },
  }
}

</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: row;

  #songs {
    cursor: pointer;
  }

  #notesheet {
    height: 30em;
    width: 45%;
    border: solid 3px grey;
    margin: 0 auto 0 auto;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  
  #organizer {
    height: 30em;
    width: 45%;
    border: solid 3px grey;
    margin: 0 auto 0 auto;
  }

  // Theme of datepicker
  .theme-orange .vdatetime-popup__header,
  .theme-orange .vdatetime-calendar__month__day--selected > span > span,
  .theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
    background: #42b983;
  }

  .theme-orange .vdatetime-year-picker__item--selected,
  .theme-orange .vdatetime-time-picker__item--selected,
  .theme-orange .vdatetime-popup__actions__button {
    color: #42b983;
  }

  .theme-orange input {
    width: 100%;
    cursor: pointer;
    border: none;
    border-bottom: solid 3px grey;
  }



  .drag {
    cursor: move;
    height: 40px;
    vertical-align: middle;
    background-color: #42b983;
  }
}

</style>