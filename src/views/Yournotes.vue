<template>
  <div class="yournotes">
    <h1>Your Notes</h1>
    <main>
      <b-container >
        <b-row class ="mb-5" >
          <b-col class ="mb-5" cols="2" >
            <label for="addBtn" class="btn"><font-awesome-icon icon="plus" class="icon" /></label>
            <input type="file" id ="addBtn" style="display: none;">
            <b-row>
              <b-col>
                <draggable v-model="list2" group="people" @start="drag=true" @end="drag=false">
                  <label id ="deleteBtn" class="btn"><font-awesome-icon icon="trash-alt" class="icon" /></label>
                </draggable>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="8" id = "files">
            <draggable v-model="list2" group="people" @start="drag=true" @end="drag=false">
              <div class="drag w-90 text-white rounded m-2" v-for="element in list2" :key="element.id">{{element.name}}</div>
            </draggable>
          </b-col>

          <button v-on:click="getSongs">Hier</button>
        </b-row>
     </b-container>
  </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: "Yournotes",

  components: {
    draggable,
  },

  data (){
    return {
      files: [],
      list2: [
        { name: "Song 1", id: 0 },
        { name: "Song 2", id: 1 },
        { name: "Song 3", id: 2 },
        { name: "Song 4", id: 3 },
        { name: "Song 5", id: 4 },
        { name: "Song 6", id: 5 },
        { name: "Song 7", id: 6 },
        { name: "Song 8", id: 7 },
        { name: "Song 9", id: 8 }
      ],
    };
  },

  methods: {
    getSongs: function() {
       
    }
  }
    
}
</script>

<style lang="scss">
main {
  padding-top: 5.0%; 
  display: flex;
  flex-direction: row;

  #deleteBtn{
    margin-top:50%;
  }

  #files {
    height: 500px;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .btn {
    background-color: #42b983;
    color: white;
    cursor: pointer;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
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