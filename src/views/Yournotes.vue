<template>
  <div class="yournotes">
    <h1>Your Notes</h1>
    <main>
      <b-container>
        <b-row class="mb-5">
          <b-col class="mb-5" cols="2">
            <label id="labelAddBtn" for="addBtn" class="btn addAndDeleteBtn"
              ><font-awesome-icon icon="plus" class="icon"
            /></label>
            <input
              type="file"
              id="addBtn"
              style="display: none;"
              v-on:change="updateAddButton"
              accept=".pdf"
            />
            <div id="saveAndClearWrapper">
              <button
                class="btn btn-primary saveAndClearBtn"
                id="saveBtn"
                v-on:click="save"
              >
                Save
              </button>
              <button
                class="btn btn-warning saveAndClearBtn"
                id="clearBtn"
                v-on:click="clear"
              >
                Clear
              </button>
            </div>
            <b-row>
              <b-col>
                <draggable
                  id="deleteContainer"
                  v-model="list2"
                  group="songs"
                  @start="drag = true"
                  @end="drag = false"
                  @change="deleteSong()"
                  class="trashzone"
                >
                  <div slot="footer" class="footer">
                    <label id="deleteBtn" class="rounded border border-danger">
                      <font-awesome-icon icon="trash-alt" id="deleteIcon" />
                      Drop here for deletion
                    </label>
                  </div>
                </draggable>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="8" id="files">
            <draggable
              v-model="list2"
              v-bind="dragOptions"
              group="songs"
              @start="
                drag = true;
                displayTrash();
              "
              @end="
                drag = false;
                notDisplayTrash();
              "
              @change="setID($event)"
            >
              <div
                id="songs"
                class="drag w-90 text-white rounded m-2"
                v-for="element in list2"
                :key="element.id"
              >
                {{ element.name }}
              </div>
            </draggable>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import * as storage from "../assets/storage.js";

export default {
  name: "Yournotes",

  components: {
    draggable
  },

  data() {
    return {
      files: [],
      gigs: storage.getGigs(),
      events: storage.getEvents(),
      songs: storage.getSongs(),
      list2: []
    };
  },

  mounted: function() {
    this.initLoad();
  },

  methods: {
    /* Loads the list from localStorage onLoad */
    initLoad: function() {
      console.log("Load Songs");
      this.list2 = this.songs;
    },

    setID: function() {
      alert("Hallo");
    },

    /* Displays the save- and clear-button */
    updateAddButton: function() {
      let input = document.getElementById("addBtn");
      let label = document.getElementById("labelAddBtn");
      let saveButton = document.getElementById("saveBtn");
      let clearButton = document.getElementById("clearBtn");
      let filename = input.files.item(0).name;

      label.innerHTML = filename;

      clearButton.classList.add("show");
      saveButton.classList.add("show");
    },

    /* Saves the PDF to localStorage */
    save: function() {
      let title = document.getElementById("labelAddBtn").innerHTML;
      storage.setSongs(title);
    },

    /* Resets the add-button to default */
    clear: function() {
      let input = document.getElementById("addBtn");
      let label = document.getElementById("labelAddBtn");
      let saveButton = document.getElementById("saveBtn");
      let clearButton = document.getElementById("clearBtn");

      saveButton.classList.remove("show");
      clearButton.classList.remove("show");

      input.value = "";
      label.innerHTML = "";

      let icon = document.createElement("font-awesome-icon");
      icon.setAttribute("class", "icon");
      icon.setAttribute("icon", "plus");
      icon.style = "display: block; border: solid 3px red; padding: 20px;";

      label.appendChild(icon);
    },

    /* Makes waste paper bin visible onDrag */
    displayTrash: function() {
      let trashContainer = document.getElementById("deleteBtn");
      trashContainer.style.visibility = "visible";
    },

    /* Makes waste paper bin invisible onDrop */
    notDisplayTrash: function() {
      let trashContainer = document.getElementById("deleteBtn");
      trashContainer.style.visibility = "hidden";
    },

    /* Delete song from localstorage after drop */
    deleteSong: function() {
      storage.removeSong("Song 3");
      console.log("Song removed");
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
main {
  padding-top: 5%;
  display: flex;
  flex-direction: row;

  /* Hand and grab cursor-animation */
  #songs {
    cursor: grab;
  }

  #songs:active {
    cursor: grabbing;
  }

  /* Deletioncontainer to delete elements onDrop */
  #deleteContainer {
    height: 100px;
    margin-top: 50%;
    display: block;

    .trashzone .footer {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    #deleteBtn {
      position: absolute;
      display: inline-block;
      background-color: rgba(255, 0, 0, 0.2);
      width: 83%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 80%;
      visibility: hidden;
    }
    #deleteIcon {
      font-size: 300%;
      color: rgba(255, 0, 0, 0.5);
    }
  }

  /* Container for songlist */
  #files {
    height: 500px;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .addAndDeleteBtn {
    background-color: #42b983;
    color: white;
    cursor: pointer;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80%;
  }

  #saveAndClearWrapper {
    display: flex;
    flex-flow: row;

    .saveAndClearBtn {
      width: 45%;
      display: none;
      margin: 0 auto 0 auto;
    }
    .show {
      display: block;
    }
  }

  .icon {
    font-size: 300%;
  }

  .drag {
    cursor: move;
    height: 40px;
    vertical-align: middle;
    background-color: #42b983;
  }
}
</style>
