<template>
  <div class="organizer">
    <h1>Organizer</h1>
    <main>
      <b-container fluid>
        <b-row>
          <b-col cols="6" class="containerDates ">
            <b-row class="calendar">
              <full-calendar
                :config="config"
                :events="events"
                @event-selected="handleEventClick"
              />
            </b-row>
          </b-col>
          <b-col cols="4" class="containerFiles ">
            <b-row class="sheets">
              <b-col>
                <draggable
                  v-model="songList"
                  group="people"
                  @start="drag = true"
                  @end="drag = false"
                >
                <div class ="w-90 rounded m-2 gig-header">
                </div> 
                  <div
                    class="drag w-90 text-white rounded m-2"
                    v-for="element in songList"
                    :key="element.id"
                  >
                    {{ element.name }}
                  </div>
                </draggable>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import * as storage from "../assets/storage.js";
//import FullCalendar from 'vue-full-calendar'
export default {
  name: "Calendar",
  components: { draggable },
  data() {
    return {
      songList: [],
      gigs: [
        {
          eID: 0,
          Lieder: [
            { name: "Song 1", id: 0 },
            { name: "Song 2", id: 1 },
            { name: "Song 3", id: 2 }
          ]
        }
      ],
      events: [
        {
          id: 0, //Event-ID
          title: "Auftritt",
          start: "2019-11-02T12:30:00",
          end: "2019-11-02T14:30:00",
          allDay: false,
          info: ""
        }
      ],
      config: {
        defaultView: "month"
      },
      eID: -1,
      currEvent: {
        title: '',
        start: "",
        end: "",
        allDay: false,
        info: ""
      }
    };
  },
  methods: {
    handleEventClick: function(info) {
      console.log(info);
      this.eID = info.id;
      let tmp = storage.getGigs();
      console.log(tmp);
      this.songList = tmp[this.eID].Songs;
      console.log(this.eID);
    }
  },
  watch: {
    gigs: function() {
      storage.setGigs(this.gigs);
    },
    events: function() {
      storage.setEvents(this.events);
    },
    songs: function() {
      storage.setSongs(this.songs);
    },
    eID: function(){
      let tmpEvent = storage.getEvents();
      console.log(tmpEvent);
      this.currEvent = tmpEvent[this.eID];
    }
  }
};
</script>

<style lang="scss">
main {
  padding-top: 5%;

  .containerDates {
    height: 100%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .containerFiles {
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .calendar {
    height: 100%;
    background-color: white;
    padding-top: 5%;
  }

  .sheets {
    height: 100%;
    background-color: white;
  }

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
