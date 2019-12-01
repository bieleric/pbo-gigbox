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
                @day-click="handleDateClick"
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
                  <p contenteditable v-text="currEvent.title" @blur="setCurrEventTitle" @keydown.enter="setCurrEventTitleEnd"> </p>
                    <p contenteditable v-if="this.currEvent.info.length > 0 " v-text="currEvent.info" @blur="setCurrEventInfo" @keydown.enter="setCurrEventInfoEnd"> </p>
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
        <b-row>
          <b-col offset-md="7" class="containerDeleteBtn">
                  <label id="deleteBtn" class="btn"
                    ><font-awesome-icon icon="trash-alt" class="icon"
                  /></label>
          </b-col>

          <b-col  class="containerAddBtn">
            <label for="addBtn" class="btn" id="addBtnLabel">
              <font-awesome-icon icon="plus" class="icon"/>
            </label>
            <b-button v-b-modal.songModal id="addBtn" style="display: none;" />
          </b-col>
        </b-row>
      </b-container>
    </main>
        <SongModal :currSongList="songList"></SongModal>
        <EventModal :event="currEvent"></EventModal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import * as storage from "../assets/storage.js";
import SongModal from "../components/SongModal.vue";
import EventModal from "../components/EventModal.vue";
export default {
  name: "Calendar",
  components: { draggable,SongModal,EventModal },
  data() {
    return {
      songList: [],
      gigs: storage.getGigs(),
      events: storage.getEvents(),
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
      this.eID = info.id;
      let tmp = storage.getGigs();
      this.songList = tmp[this.eID].Songs;
    },
    handleDateClick: function(info){
      console.log(info);
      this.$bvModal.show('eventModal');
    },
    setCurrEventTitle: function(event) {
      let tmp = event.target.innerText;
      this.currEvent.title = tmp;
    },

    setCurrEventTitleEnd: function(event) {
      event.target.blur();
    },
    setCurrEventInfo: function(event) {
      let tmp = event.target.innerText;
      this.currEvent.info = tmp;
      this.events[this.eID].info = tmp;
      console.log(this.currEvent);
    },

    setCurrEventInfoEnd: function(event) {
      event.target.blur();
    },
    modalShow: function(){
      this.$modal.show('SongModal');
    }
  },
  watch: {
    gigs: function() {
      storage.setGigs(this.gigs);
    },
    events: function() {
      storage.setEvents(this.events);
      console.log(storage.getEvents());
    },
    songs: function() {
      storage.setSongs(this.songs);
    },
    eID: function(){
      let tmpEvent = storage.getEvents();
      this.currEvent = tmpEvent[this.eID];
    },
    currEvent: function(){
      this.events[this.eID] = this.currEvent;
      console.log(this.events);
      storage.setEvents(this.events);
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

  .icon {
    font-size: 300%;
  }

  .btn {
    background-color: #42b983;
    color: white;
    cursor: pointer;
    width: 20%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
  }

  #deleteBtn{
    margin-left: 50%;
  }
  #addBtnLabel{
    margin-left: 25%;
  }
}
</style>
