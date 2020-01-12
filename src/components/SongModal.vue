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
        <div>
          <input
            type="checkbox"
            v-model="selectedSongs"
            :value="element.id"
            checked
          />
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
      songs: Storage.getSongs(),
      selectedSongs: []
    };
  },
  methods: {
    handleOK: function() {
      let newSongList = [];
      for (let i = 0; i < this.selectedSongs.length; i++) {
        newSongList[i] = this.songs[this.selectedSongs[i]];
      }
      this.$emit("updateSongList", newSongList);
    }
  },
  watch: {
    currSongList: function() {
      this.selectedSongs = this.currSongList.map(el => el.id);
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
