<template>
  <v-container fluid>
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
            <v-form ref="form" v-model="formValidation" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="List Name*"
                    v-model="listName"
                    :rules="requiredRule"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Schedule From*"
                    v-model="scheduleFrom"
                    :rules="requiredRule"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Schedule To*"
                    v-model="scheduleTo"
                    :rules="requiredRule"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="task"
                    label="Enter task*"
                    append-icon="mdi-plus-circle"
                    @keydown.enter="addTask()"
                    @click:append="addTask()"
                  ></v-text-field>
                </v-col> </v-row
            ></v-form>

            <v-card v-if="tasks.length > 0" class="elevation-0 mx-n4">
              <v-list-item v-for="(task, i) in tasks" :key="i">
                <v-list-item-title>
                  <v-icon class="mr-2">
                    mdi-checkbox-blank-circle-outline </v-icon
                  >{{ task.text }}</v-list-item-title
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
            ><v-card-title
              v-else
              class="elevation-0 subtitle-1 pa-0 justify-center error--text"
              >Please add a task to the list</v-card-title
            >
          </v-container>
        </v-card-text>
        <v-card-actions class="accent">
          <v-spacer></v-spacer>
          <v-btn
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
            text
            @click="saveList"
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
  name: "add-list-component",

  data: () => ({
    formValidation: true,
    dialog: false,
    listName: "",
    scheduleFrom: "",
    scheduleTo: "",
    tasks: [],
    task: null,
    requiredRule: [(v) => !!v || "This is a required field."],
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
    validate() {
      this.$refs.form.validate();
    },
    saveList() {
      if (this.$refs.form.validate() && this.tasks.length !== 0) {
        var calenderEvents = [];
        if (localStorage.getItem("calenderEvents") !== null) {
          calenderEvents = JSON.parse(localStorage.getItem("calenderEvents"));
        }
        let newEvent = {
          listName: this.listName,
          scheduleFrom: this.scheduleFrom,
          scheduleTo: this.scheduleTo,
          tasks: this.tasks,
        };
        console.log(newEvent);
        calenderEvents.push(newEvent);
        localStorage.setItem("calenderEvents", JSON.stringify(calenderEvents));
      }
    },
    closeDialog() {
      this.dialog = false;
      this.$refs.form.resetValidation();
    },
  },
};
</script>
