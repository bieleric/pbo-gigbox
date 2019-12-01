<!-- Popup für Bearbeiten von Events -->

<template>
    <div>
        <b-modal id="eventModal" title="Event" @ok="handleOK" >
            <label> Titel: </label>
            <p contenteditable class="my-4">{{event.title}}</p>
            <label> Startzeit: </label>
            <p contenteditable class="my-4">{{event.start}}</p>
            <label> Endzeit: </label>
            <p contenteditable class="my-4">{{event.end}}</p>
            <label> Info: </label>
            <p contenteditable class="my-4">{{event.info}}</p>
        </b-modal>
    </div>
</template>

<script>
import * as storage from "../assets/storage.js";
export default {
    props: [
        'event',
    ],
    methods:{
        handleOK: function(){
            console.log(this.event);
            let ID = this.event.eID;
            let events = storage.getEvents();
            events[ID] = this.event;
            storage.setEvents(this.event);
        }
    }
}
</script>

<style lang="scss">

</style>