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
                  v-model="list2"
                  group="songs"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <label id="deleteBtn" class="rounded border border-danger"
                    ><font-awesome-icon icon="trash-alt" id="deleteIcon"
                  /></label>
                </draggable>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="8" id="files">
            <draggable
              v-model="list2"
              group="songs"
              @start="drag = true; displayTrash();"
              @end="drag = false; notDisplayTrash();"
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

export default {
  name: "Yournotes",

  components: {
    draggable
  },

  data() {
    return {
      files: [],
      list2: [
        {
          name: "Song 1",
          id: 0,
          path: "C:/Users/Eric/Desktop/AnotherBrickInTheWall.pdf"
        },
        { name: "Song 2", id: 1 },
        { name: "Song 3", id: 2 },
        { name: "Song 4", id: 3 },
        { name: "Song 5", id: 4 },
        { name: "Song 6", id: 5 },
        { name: "Song 7", id: 6 },
        { name: "Song 8", id: 7 },
        { name: "Song 9", id: 8 }
      ]
    };
  },

  methods: {
    getSongs: function() {},

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

    save: function() {
      // select just .pdf-files
      /*let label = document.getElementById('labelAddBtn');
      let format = new RegExp(/[\/\\]([\w\d\s\.\-\(\)]+)$/);
      let text = label.value.match(format)[1];
      var sub = text.substring(text.length-4, text.length);
      if(sub !== ".pdf")
      {
          alert("Es werden nur pdf-Dokumente unterstützt.");
      }*/

      let title = document.getElementById("labelAddBtn").innerHTML;
      alert(title);
      localStorage.setItem(title, title); //(key, value)
      let local = localStorage.getItem(title);
      alert(local);
    },

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

    displayTrash: function() {
      let trashContainer = document.getElementById("deleteBtn");
      trashContainer.style.visibility = "visible";

    },

    notDisplayTrash: function() {
      let trashContainer = document.getElementById("deleteBtn");
      trashContainer.style.visibility = "hidden";
    }
  }
};
</script>

<style lang="scss">
main {
  padding-top: 5%;
  display: flex;
  flex-direction: row;

  #songs {
    cursor: grab;
  }

  #songs:active {
    cursor: grabbing;
  }

  #deleteBtn {
    margin-top: 50%;
    background-color: rgba(255, 0, 0, 0.2);
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80%;
    visibility: hidden;
  }

  #deleteIcon {
    font-size: 300%;
    color: rgba(255, 0, 0, 0.5);
  }

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
