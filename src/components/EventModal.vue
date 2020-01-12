<!-- Popup für Bearbeiten von Events -->

<template>
  <div>
    <b-modal
      id="eventModal"
      title="Event"
      @ok="handleOK"
      @cancel="handleCancel"
    >
      <label> Titel: </label>
      <p
        contenteditable
        class="my-4 editable"
        id="pTitle"
        @blur="setCurrEventTitle"
        @keydown.enter="setCurrEventTitleEnd"
      >
        {{ event.title }}
      </p>
      <label> Startzeit: </label>
      <p
        contenteditable
        class="my-4 editable"
        @blur="setCurrEventStart"
        @keydown.enter="setCurrEventStartEnd"
      >
        {{ event.start }}
      </p>
      <label> Endzeit: </label>
      <p
        contenteditable
        class="my-4 editable"
        @blur="setCurrEventEnd"
        @keydown.enter="setCurrEventEndEnd"
      >
        {{ event.end }}
      </p>
      <label> Info: </label>
      <p
        contenteditable
        class="my-4 editable"
        @blur="setCurrEventInfo"
        @keydown.enter="setCurrEventInfoEnd"
      >
        {{ event.info }}
      </p>

      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Delete
        </b-button>
        <b-button size="sm" variant="success" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import * as storage from "../assets/storage.js";
export default {
  props: ["event"],
  methods: {
    handleOK: function(okEvent) {
      if (this.event.title.length > 0) {
        let ID = this.event.eId;
        let events = storage.getEvents();
        let gigs = storage.getGigs();
        if(storage.getIdxForId(gigs,ID) == -1){
          events.push(this.event);
          let newGig = {
            eId: ID,
            Date: this.event.start.split("T")[0],
            Songs: []
          };
          gigs.push(newGig);
          storage.setGigs(gigs);
        } else {
          //events[ID] = this.event;
          let idx = storage.getIdxForId(events, this.event.eId);
          events[idx] = this.event;
        }
        storage.setEvents(events);
        this.$emit("updateCurrEvent", this.event);
      } else {
        okEvent.preventDefault();
      }
    },
    handleCancel: function() {
      let gigs = storage.getGigs();
      let events = storage.getEvents();
      let idx = storage.getIdxForId(storage.getEvents(), this.event.eId);
      events.splice(idx, 1);
      gigs.splice(idx, 1);
      storage.setGigs(gigs);
      storage.setEvents(events);
      this.$emit("deleteEvent");
    },
    setCurrEventTitle: function(event) {
      console.log(this.event);
      let tmp = event.target.innerText;
      this.event.title = tmp;
    },

    setCurrEventTitleEnd: function(event) {
      event.target.blur();
    },
    setCurrEventInfo: function(event) {
      let tmp = event.target.innerText;
      this.event.info = tmp;
    },

    setCurrEventInfoEnd: function(event) {
      event.target.blur();
    },
    setCurrEventStart: function(event) {
      let tmp = event.target.innerText;
      this.event.start = tmp;
    },

    setCurrEventStartEnd: function(event) {
      event.target.blur();
    },
    setCurrEventEnd: function(event) {
      let tmp = event.target.innerText;
      this.event.end = tmp;
    },

    setCurrEventEndEnd: function(event) {
      event.target.blur();
    }
  }
};
</script>

<style lang="scss">
.editable {
  border: solid 1px;
  border-color: black;
  border-radius: 5px;
}
</style>
