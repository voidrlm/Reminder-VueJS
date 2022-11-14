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
            :value="progress"
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
      <v-flex xl="12" class="ml-2 mt-n5">
        <v-card flat color="transparent">
          <v-btn
            rounded
            color="accent"
            @click="gotoToTasks"
            dark
            large
            elevation="0"
            class="ml-4 mt-5"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            View Calendar
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-data-iterator :items="events" hide-default-header hide-default-footer>
      <template v-slot:default="props">
        <v-layout row wrap class="mt-5 mx-3">
          <v-flex xs12 sm3 pa-2 v-for="item in props.items" :key="item.name">
            <v-card flat class="rounded-xl mb-5 mx-1">
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>
              <v-list dense>
                <v-list-item class="mt-n5">
                  <v-list-item-content
                    ><v-list-item-subtitle
                      >Completed:{{
                        item.completed ? item.completed : 0
                      }}</v-list-item-subtitle
                    >
                    <v-list-item-subtitle
                      >Remaining:{{ item.pending }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-progress-circular
                    :value="(item.completed / item.total) * 100 || 0"
                    size="30"
                    width="3"
                    :color="
                      $vuetify.theme.dark
                        ? 'accent lighten-3 '
                        : 'accent darken-3'
                    "
                    class="mt-n2"
                  ></v-progress-circular>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
export default {
  name: "dashboard-component",
  data: () => ({
    events: [],
  }),
  mounted() {
    this.events =
      localStorage.getItem("calenderEvents") !== null
        ? JSON.parse(localStorage.getItem("calenderEvents"))
        : [];
    this.events.map((event) => {
      let completed = 0;
      let pending = 0;
      let total = 0;
      event.tasks.map((task) => {
        total = total + 1;
        event.total = total;
        if (task.done) {
          completed = completed + 1;
          event.completed = completed;
        } else if (!task.done) {
          pending = pending + 1;
          event.pending = pending;
        }
      });
    });
  },
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
