<template>
  <div class="organizer">
    <h1>Organizer</h1>
    <main >
      <b-container fluid>
        <b-row>
          <b-col cols="6" class="containerDates ">
            <b-row class="calendar">
              <full-calendar
                ref="calendar"
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
                  <div class="w-90 rounded m-2 gig-header">
                    <p
                      v-text="currEvent.title"
                    ></p>
                    <p
                      v-if="this.currEvent.info.length > 0"
                      v-text="currEvent.info"
                    ></p>
                  </div>
                <draggable
                  v-model="songList"
                  group="songs"
                  @start="drag = true; trashVisible = true; displayTrash();"
                  @end="onDragEnd; trashVisible = false; displayTrash();"
                  :move="setID"
                >
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
                <draggable
                  id="deleteContainer"
                  v-model="deleteList"
                  group="songs"
                  @start="drag = true"
                  @end="drag = false"
                  @change="deleteSong()">
                    <label id="deleteBtn" class="rounded border btn">
                      <font-awesome-icon icon="trash-alt" id="deleteIcon" class="icon"/>
                    </label>
                </draggable>
          </b-col>
          <b-col class="containerAddBtn">
            <label for="addBtn" class="btn" id="addBtnLabel">
              <font-awesome-icon icon="plus" class="icon" />
            </label>
            <b-button v-b-modal.songModal id="addBtn" style="display: none;" />
          </b-col>
        </b-row>
      </b-container>
    </main>
    <SongModal :currSongList="songList" v-on:updateSongList="updateSongList"></SongModal>
    <EventModal :event="currEvent" v-on:updateCurrEvent="updateCurrEvent" v-on:deleteEvent="deleteEvent"></EventModal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import * as storage from "../assets/storage.js";
import SongModal from "../components/SongModal.vue";
import EventModal from "../components/EventModal.vue";
export default {
  name: "Calendar",
  components: { draggable, SongModal, EventModal },
  data() {
    return {
      songList: [],
      deleteList: [],
      gigs: storage.getGigs(),
      events: storage.getEvents(),
      songs: storage.getSongs(),
      songId: -1,
      config: {
        defaultView: "month"
      },
      eId: -1,
      currEvent: {
        eId: -1,
        title: "",
        start: "",
        end: "",
        allDay: false,
        info: ""
      },
      clicks: 0,
      changedGigs: false,
      changedEvents: false,
      changedSongs: false,
      changedeId: false,
      changedCurrEvent: false,
      trashVisible: false
    };
  },
  methods: {
    handleEventClick: function(info) {
      this.eId = info.eId;
      let idx = storage.getIdxForId(this.gigs,this.eId);
      this.songList = this.gigs[idx].Songs;
      this.changedeId = !this.changedeId;
      this.clicks++ 
      let self = this;
      if(this.clicks === 1) {
        this.timer = setTimeout(function() {
          self.clicks = 0;
        }, 1000);
      } else{
          clearTimeout(this.timer);  
          this.$bvModal.show("eventModal");
          this.clicks = 0;
      }         
    },
    handleDateClick: function(info) {
      let tmp = this.gigs.filter(el => el.Date == info.toISOString().trim()); //trim notwendig, da sonst compare failed
      if(tmp.length != 1){
        let dateStart = info.toISOString() + 'T12:00:00';
        let dateEnd = info.toISOString() + 'T13:00:00';
        this.currEvent.start = dateStart;
        this.currEvent.end = dateEnd;
        this.currEvent.title = '';
        this.currEvent.info = '';
        this.songList = [];
        let max = Math.max(...this.gigs.map(el=>el.eId));
        console.log(max);
        this.currEvent.eId = max+1;
      }
      else{
        this.eId = tmp[0].eId;
        this.changedeId = !this.changedeId;
        this.songList = tmp[0].Songs;
      }
      this.$bvModal.show("eventModal");
    },
    modalShow: function() {
      this.$modal.show("SongModal");
    },
    updateSongList: function(newList){
      this.songList = newList;
      let idx = storage.getIdxForId(this.gigs,this.eId);
      this.gigs[idx].Songs = newList;
      this.changedGigs = !this.changedGigs;
      console.log(this.gigs);
    },
    updateCurrEvent: function(newCurrEvent){
      this.currEvent = newCurrEvent;
      this.eId = this.currEvent.eId;
      this.events = storage.getEvents();
      this.gigs = storage.getGigs();
    },
    deleteEvent: function(){
      this.gigs = storage.getGigs();
      this.events = storage.getEvents();
      this.changedGigs = !this.changedGigs;
      this.changedEvents = !this.changedEvents;
    },
    onDragEnd: function(){
      this.changedSongs = !this.changedSongs;
    },
    displayTrash: function(){
      let trashContainer = document.getElementById("deleteBtn");
      if(this.trashVisible == true)
        trashContainer.style.visibility = "visible";
      else
        trashContainer.style.visibility = "hidden";
    },
    deleteSong: function(){
      console.log("Song: "+ this.songId + " removed");
      storage.removeSong(this.songId);
      this.changedSongs = !this.changedSongs;
    },
    /* Sets id from element onDrag for delete-function */
    setID: function(e) {
      this.songId = e.draggedContext.element.name.split(' ')[1];
      console.log("Current song id:" + this.songId);
    },
  },
  watch: {
    changedGigs: function(){
      storage.setGigs(this.gigs);
    },
    changedEvents: function(){
      storage.setEvents(this.events);
      let api = this.$refs.calendar.getApi();
      api.refetchEvents();
    },
    changedSongs: function(){
      let idx = storage.getIdxForId(this.gigs,this.eId);
      this.gigs[idx].Songs = this.songList;
      storage.setGigs(this.gigs);
    },
    changedeId: function(){
    //  let tmpEvent = storage.getEvents();
      let idx = storage.getIdxForId(this.events,this.eId);
      this.currEvent = this.events[idx];
    },
    changedCurrEvent: function(){
      let idx = storage.getIdxForId(this.events,this.eId);
      this.events[idx] = this.currEvent;
      this.changedEvents = !this.changedEvents;
    }
  }
};
</script>

<style lang="scss" scoped>
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

  #deleteBtn {
    visibility: hidden;
    margin-left: 50%;
  }
  #addBtnLabel {
    margin-left: 25%;
  }
}
</style>
