<!-- Popup für Bearbeiten von Events -->

<template>
  <div>
    <b-modal id="songModal" title="Liederauswahl" @ok="handleOK">
      <div
        class="song w-45 text-white rounded m-2"
        v-for="element in songs"
        :key="element.id"
      >
        {{ element.name }}
        <div v-if="currSongList.some(e => e.id === element.id)">
          <input type="checkbox" checked="true" />
        </div>
        <div v-else>
          <input type="checkbox" checked="false" />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import * as Storage from "../assets/storage.js";
export default {
  props: ["currSongList"],
  data() {
    return {
      songs: Storage.getSongs()
    };
  },
  methods: {
    handleOK: function() {
      console.log("test");
    }
  }
};
</script>

<style lang="scss">
.song {
  cursor: move;
  width: 75%;
  height: 40px;
  vertical-align: middle;
  background-color: #42b983;
}
</style>
