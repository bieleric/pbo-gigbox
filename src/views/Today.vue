<template>

  <div class="today">
    <h1>Today</h1>
    <main>
      <section id="notesheet">

      </section>

      <section id="organizer">

      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "today",
  components: {
    //HelloWorld
  }
};
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: row;

  #notesheet {
    height: 80px;
    width: 45%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }
  
  #organizer {
    height: 80px;
    width: 45%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }
}



</style>