<template>
  <v-container fluid v-resize="onResize">
    <v-card-title
      class="mb-5"
      :class="
        $vuetify.breakpoint.mdAndUp ? 'text-h4 mt-n7' : 'text-h5 justify-center'
      "
      >Calendar

      <v-dialog
        v-model="showCalenderSettings"
        width="500"
        content-class="rounded-xl"
        :overlay-opacity="0.8"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="ml-2" v-bind="attrs" v-on="on"
            ><v-icon size="30" :color="$vuetify.theme.dark ? 'white' : 'black'"
              >mdi-cog</v-icon
            ></v-btn
          >
        </template>
        <v-card class="rounded-xl">
          <v-card-title class="text-h6 accent">
            Calendar Settings<v-spacer />
            <v-btn
              icon
              :color="$vuetify.theme.dark ? 'white' : 'black'"
              @click="showCalenderSettings = false"
              ><v-icon size="25">mdi-close-circle</v-icon></v-btn
            ></v-card-title
          >

          <v-list dense>
            <v-list-item class="mb-n2">
              <v-list-item-title class="subtitle-1 mx-3"
                >Weekdays</v-list-item-title
              >
              <v-list-item-action class="mt-5 mr-3">
                <v-select
                  solo-inverted
                  flat
                  rounded
                  dense
                  v-model="weekday"
                  :items="weekdays"
                  hide-details
                  label="Weekdays"
                  color="accent--text"
                ></v-select
              ></v-list-item-action>
            </v-list-item>
            <v-list-item clas="mb-n5">
              <v-list-item-title class="subtitle-1 mx-3 mt-n3"
                >Calendar Type</v-list-item-title
              >
              <v-list-item-action class="mt-5 mr-3">
                <v-select
                  solo-inverted
                  flat
                  rounded
                  dense
                  v-model="calenderType"
                  :items="typeOptions"
                  label="Type"
                  color="accent--text"
                >
                  <template v-slot:item="{ item }">
                    <v-list dense>
                      <v-list-item-title>{{
                        item.text
                      }}</v-list-item-title></v-list
                    >
                  </template></v-select
                ></v-list-item-action
              >
            </v-list-item></v-list
          >
        </v-card>
      </v-dialog>
      <v-btn
        icon
        v-if="
          calenderFocus !== new Date().toISOString().slice(0, 10) &&
          calenderFocus !== ''
        "
        @click.stop="calenderFocus = ''"
        class="ml-2"
        :small="$vuetify.breakpoint.smAndDown"
      >
        <v-icon size="30" :color="$vuetify.theme.dark ? 'white' : 'black'"
          >mdi-calendar-today</v-icon
        >
      </v-btn></v-card-title
    >
    <v-layout row wrap class="mb-5 mt-2">
      <span
        class="subtitle-2 ml-5"
        @click="$refs.calendar.prev()"
        style="cursor: pointer"
      >
        <v-icon left>mdi-chevron-left</v-icon>PREV</span
      >
      <v-spacer />
      <v-toolbar-title class="subtitle-1 mt-n1 text-no-wrap font-weight-medium">
        {{ $refs.calendar ? $refs.calendar.title : "" }}
      </v-toolbar-title>

      <v-spacer />
      <span
        class="subtitle-2 mr-5"
        @click="$refs.calendar.next()"
        style="cursor: pointer"
      >
        NEXT <v-icon left>mdi-chevron-right</v-icon></span
      >
    </v-layout>

    <v-calendar
      ref="calendar"
      v-model="calenderFocus"
      :events="events"
      :type="calenderType"
      event-overlap-mode="column"
      :weekdays="weekday"
      color="accent--text"
      :class="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-4'"
      class="rounded-xl pa-3 ma-3"
    >
    </v-calendar>

    <v-dialog
      v-model="dialog"
      persistent
      fullscreen
      :overlay-opacity="1"
      scrollable
    >
      <template v-slot:activator="{ on, attrs }">
        <v-fab-transition>
          <v-btn
            color="accent"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
            fixed
            bottom
            right
            fab
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <v-card>
        <v-card-text class="pa-5">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="List Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Schedule From*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Schedule To*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="task"
                  label="Enter task*"
                  required
                  append-icon="mdi-plus-circle"
                  @keydown.enter="addTask()"
                  @click:append="addTask()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card v-if="tasks.length > 0" class="elevation-0 mx-n4">
              <v-list-item v-for="(task, i) in tasks" :key="i">
                <v-list-title>
                  <v-icon class="mr-2">
                    mdi-checkbox-blank-circle-outline </v-icon
                  >{{ task.text }}</v-list-title
                >
                <v-icon
                  class="ml-1"
                  size="20"
                  color="error"
                  @click="removeTask(task)"
                >
                  mdi-close
                </v-icon>
              </v-list-item> </v-card
            ><v-card-title v-else class="elevation-0 subtitle-1 pa-0"
              >Please add a task to the list</v-card-title
            >
          </v-container>
        </v-card-text>
        <v-card-actions class="accent">
          <v-spacer></v-spacer>
          <v-btn
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "dashboard-component",
  data: () => ({
    dialog: false,
    calenderType: "week",
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    calenderFocus: "",
    showCalenderSettings: false,
    events: [
      {
        name: "Event 1",
        start: new Date().toISOString().slice(0, 10) + " 5:00",
        end: new Date().toISOString().slice(0, 10) + " 16:00",
        color: "accent",
      },
      {
        name: "Event 2",
        start: new Date().toISOString().slice(0, 10) + " 15:00",
        end: new Date().toISOString().slice(0, 10) + " 16:00",
        color: "accent",
      },
    ],
    typeOptions: [],
    tasks: [],
    task: null,
  }),
  methods: {
    addTask() {
      if (this.task) {
        this.tasks.push({
          done: false,
          text: this.task,
        });
      }
      this.task = null;
    },
    removeTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },
    onResize: function () {
      if (window.innerWidth >= 600) {
        this.calenderType = "week";
        this.typeOptions = [
          { text: "Day", value: "day" },
          { text: "Week", value: "week" },
          { text: "Month", value: "month" },
        ];
      } else {
        this.calenderType = "day";
        this.typeOptions = [{ text: "Day", value: "day" }];
      }
    },
  },
};
</script>
