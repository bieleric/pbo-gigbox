<template>
  <div class="organizer">
    <h1>Organizer</h1>
    <main>
      <b-container fluid>
        <b-row>
          <b-col cols ="6" class = "containerDates header"> Date 
            <b-row class ="calendar">
              <full-calendar :config="config" :events="events"/>
            </b-row>
          </b-col>
          <b-col cols ="4" class = "containerFiles header"> Your sheets 
            <b-row class ="sheets">

            </b-row>
          </b-col>
        </b-row>
     </b-container>
  </main>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      events: [
        {
          title: 'Auftritt',
          start: '2019-11-02T12:30:00',
          end: '2019-11-02T14:30:00',
          allDay: false,
        },
      ],
      config: {
        defaultView: 'month',
        eventRender: function(event,element){
          console.log(event + '' + element);
        }
      },
    }
  }
}
</script>

<style lang="scss">
main {
  padding-top: 5.0%;

  .header {
    background-color: burlywood;
  }

  .containerDates {
    height: 100%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .containerFiles {
    height: 100%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .calendar {
    height: 100%;
    background-color: white;
    padding-top: 5%;

  }

  .sheets {
    height: 30em;
    background-color: white;
    padding-top: 5%;

  }
}

</style>