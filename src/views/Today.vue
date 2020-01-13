<template>
  <div class="today">
    <div class="main d-flex flex-row p-2 bd-highlight">
      <section id="notesheet" class="rounded my-0 mx-auto">
        <pdf src="/assets/AnotherBrickInTheWall.pdf" :page="1">
          <template slot="loading">
            loading content here...
          </template>
        </pdf>
      <WebViewer :path="`${publicPath}lib`" url="https://www2.htw-dresden.de/~s77194/PBO/AnotherBrickInTheWall.pdf"/>  
      <!--<WebViewer :path="'${publicPath}lib'" url = "file://C:/Users/Paul/Documents/Uni/PBO/pbo-gigbox/src/views/AnotherBrickInTheWall.pdf"/> !-->
      <!--<PDFDocument url="https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS" scale=0.5> </PDFDocument>  !-->
      </section>
      <section id="organizer" class="rounded my-0 mx-auto">
        <datetime
          id="datepicker"
          class="theme-orange bg-light w-100 rounded-top border"
          v-model="date"
          title="Your Appearence"
          placeholder="Choose a date..."
        ></datetime>
        <draggable
          v-model="list2"
          v-bind="dragOptions"
          group="people"
          @start="drag = true"
          @end="drag = false"
        >
          <div
            id="songs"
            class="drag w-90 text-white rounded m-2"
            v-for="element in list2"
            :key="element.id"
            @click="showPdf(element.id)"
          >
            {{ element.name }}
          </div>
        </draggable>
      </section>
    </div>
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import draggable from "vuedraggable";
import * as storage from "../assets/storage.js";
import pdfjs from "pdfjs-dist";
import WebViewer from "../components/WebViewer.vue"
//import PDFDocument from "../components/PDFDocument.vue";
//import pdf from 'vue-pdf';

export default {
  name: "Datepicker",
  components: {
    datetime: Datetime,
    draggable,
    //pdf
    //PDFDocument
    WebViewer
  },

  data() {
    return {
      publicPath: process.env.BASE_URL,
      url: "./assets/AnotherBrickInTheWall.pdf",
      date: "",
      list2: [],
      path: "AnotherBrickInTheWall.pdf",
      pdfdata: pdfjs.getDocument('https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS')
    };
  },
  methods: {
    getPdf () {
      //self.pdfdata = pdfvuer.createLoadingTask('../assets/AnotherBrickInTheWall.pdf')
      //self.pdfdata = pdfjs.getDocument("https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS");
      },
    showPdf: function() {
      //let pfad = this.list2[key].path;
      this.getPdf();
      console.log(typeof('https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS'));
      console.log(this.pdfdata);
      alert(this.path);
    },

    /* Date format: yyyy-mm-dd */
    formatDate: function(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
  },

  watch: {
    /* If datepicker changes the date -> update view */
    date: function() {
      let tmp = storage.getGigs();
      for (let i = 0; i < tmp.length; i++) {
        let selectedDate = this.formatDate(this.date);
        if (tmp[i].Date == selectedDate) {
          this.list2 = tmp[i].Songs;
          break;
        } else {
          this.list2 = [];
        }
      }
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "songs",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style lang="scss">
.main {
  #songs {
    cursor: grab;
  }

  #songs:active {
    cursor: grabbing;
  }

  /* Notesheet of current song */
  #notesheet {
    height: 35em;
    width: 45%;
    border: solid 3px grey;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #organizer {
    height: 35em;
    width: 45%;
    border: solid 3px grey;
  }

  /* Theme of datepicker */
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
