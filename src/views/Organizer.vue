<template>
  <div class="organizer">
    <h1>Organizer</h1>
    <main>
      <b-container fluid>
        <b-row>
          <b-col cols="6" class="containerDates ">
            <b-row class="calendar">
              <full-calendar :config="config" :events="events" />
            </b-row>
          </b-col>
          <b-col cols="4" class="containerFiles ">
            <b-row class="sheets">
              <b-col>
                <draggable
                  v-model="list"
                  group="people"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <div
                    class="drag w-90 text-white rounded m-2"
                    v-for="element in list"
                    :key="element.id"
                  >
                    {{ element.name }}
                  </div>
                </draggable>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Calendar",
  components: { draggable },
  data() {
    return {
      list: [
        { name: "Song 1", id: 0 },
        { name: "Song 2", id: 1 },
        { name: "Song 3", id: 2 }
      ],
      events: [
        {
          title: "Auftritt",
          start: "2019-11-02T12:30:00",
          end: "2019-11-02T14:30:00",
          allDay: false
        }
      ],
      config: {
        defaultView: "month"
      }
    };
  }
};
</script>

<style lang="scss">
main {
  padding-top: 5%;

  .containerDates {
    height: 100%;
    border: solid 3px grey;
    border-radius: 10px;
    margin: 0 auto 0 auto;
  }

  .containerFiles {
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
    height: 100%;
    background-color: white;
  }

  .theme-orange .vdatetime-popup__header,
  .theme-orange .vdatetime-calendar__month__day--selected > span > span,
  .theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
    background: #42b983;
  }
  .theme-orange .vdatetime-year-picker__item--selected,
  .theme-orange .vdatetime-time-picker__item--selected,
  .theme-orange .vdatetime-popup__actions__button {
    color: #42b983;
  }
  .theme-orange input {
    width: 100%;
    cursor: pointer;
    border: none;
    border-bottom: solid 3px grey;
  }
  .drag {
    cursor: move;
    height: 40px;
    vertical-align: middle;
    background-color: #42b983;
  }
}
</style>
