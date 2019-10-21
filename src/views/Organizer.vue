<template>
  <div class="organizer">
    <h1>Organizer</h1>
    <main>
      <b-container >
        <b-row class ="mb-5 " >
          <b-col cols ="5" class = "dates header"> Date </b-col>
          <b-col cols ="5" class = "files header"> Your sheets </b-col>
        </b-row>
     </b-container>
  </main>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
main {
  padding-top: 5%; 
  display: flex;
  flex-direction: row;

  .header {
    background-color: burlywood;
  }

  .files {
    height: 100%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .dates {
    height: 100%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }
}

</style>