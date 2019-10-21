<template>
  <div class="yournotes">
    <h1>Your Notes</h1>
    <main>
      <b-container >
        <b-row class ="mb-5" >
          <b-col class ="mb-5" cols="2" >
            <b-button pill id ="addBtn"> Add </b-button>
            <b-row>
              <b-col>
                <b-button pill id ="deleteBtn"> Delete </b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="8" id = "files"> Your sheets </b-col>
        </b-row>
     </b-container>
  </main>
  </div>
</template>

<script>
export default {
  name: "Yournotes",
  data (){
    return {
      files: []
    };
  }
    
}
</script>

<style lang="scss">
main {
  padding-top: 5%; 
  display: flex;
  flex-direction: row;

  #deleteBtn{
    margin-top:50%;
  }

  #files {
    height: 100%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

}

</style>