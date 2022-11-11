<template>
  <v-app>
    <v-main>
      <nav-bar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import navBar from "./components/navigation/navBar";
export default {
  name: "App",
  components: {
    navBar,
  },
  data: () => ({
    //
  }),
  mounted() {
    if (this.$route.path !== "/dashboard") {
      this.$router.push({
        path: "/dashboard",
      });
    }
  },
};
</script>
