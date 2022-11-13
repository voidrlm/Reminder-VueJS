<template>
  <v-container fluid>
    <v-card-title
      :class="
        $vuetify.breakpoint.mdAndUp ? 'text-h4 mt-n7' : 'text-h5 justify-center'
      "
      ><v-icon
        size="35"
        class="mr-2"
        :color="$vuetify.theme.dark ? 'white' : 'black'"
        >{{
          getGreetingData === "Good Evening"
            ? "mdi-moon-waning-crescent"
            : "mdi-white-balance-sunny"
        }}</v-icon
      >{{ getGreetingData }}, User!</v-card-title
    >
    <v-layout wrap>
      <v-flex xs12 sm4 pa-2>
        <v-card flat color="transparent">
          <v-card-title class="text-h5 font-weight-medium">
            Completed</v-card-title
          >

          <v-card-text class="headline">
            {{ completed }}
            {{ completed == 1 ? " task" : "tasks" }}</v-card-text
          >
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 pa-2>
        <v-card flat color="transparent">
          <v-card-title class="text-h5 font-weight-medium">
            Pending</v-card-title
          >
          <v-card-text class="headline"
            >{{ pending }} {{ pending == 1 ? " task" : "tasks" }}</v-card-text
          >
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 pa-2>
        <v-card flat color="transparent">
          <v-progress-circular
            :value="pending"
            size="85"
            width="15"
            :color="
              $vuetify.theme.dark ? 'accent lighten-3 ' : 'accent darken-3'
            "
            class="mt-4"
            >{{ progress }} %</v-progress-circular
          >
        </v-card>
      </v-flex>
      <v-flex xl="12" class="ml-2">
        <v-card flat color="transparent">
          <v-btn
            rounded
            color="accent"
            @click="gotoToTasks"
            dark
            large
            elevation="0"
            class="ml-4 mt-5"
          >
            View Calendar
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="justify-end mt-5 mr-8"> </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "dashboard-component",
  data: () => ({
    events:
      localStorage.getItem("calenderEvents") !== null
        ? JSON.parse(localStorage.getItem("calenderEvents"))
        : [],
  }),
  computed: {
    getGreetingData() {
      var today = new Date();
      var curHr = today.getHours();

      return curHr < 12
        ? "Good Morning"
        : curHr > 18
        ? "Good Evening"
        : "Good Afternoon";
    },

    completed() {
      let occurences = 0;
      this.events.forEach((event) => {
        event.tasks.forEach((task) => {
          if (task.done) {
            occurences = occurences + 1;
          }
        });
      });
      return occurences;
    },
    pending() {
      let occurences = 0;
      this.events.forEach((event) => {
        event.tasks.forEach((task) => {
          if (!task.done) {
            occurences = occurences + 1;
          }
        });
      });
      return occurences;
    },
    progress() {
      let totalTasks = 0;
      this.events.forEach((event) => {
        event.tasks.forEach(() => {
          totalTasks = totalTasks + 1;
        });
      });
      return (this.completed / totalTasks) * 100;
    },
  },
  methods: {
    gotoToTasks() {
      if (this.$route.name !== "calendar")
        this.$router.push("/calendar").catch(() => {});
    },
  },
};
</script>
