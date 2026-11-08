<template>
  <v-app>

    <v-app-bar
      app
      color="purple"
      dark

    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="`${baseUrl}crests/99150901.png`"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/CDR.png"
          width="200"
        />

      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/clubes/6703918">Clube</v-btn>
      <v-btn text to="/membros/6703918">Jogadores</v-btn>
      <v-btn text to="/partidas/6703918">Partidas</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// v-if="$vuetify.breakpoint.xsOnly" para mobile
export default {
  name: 'App',
  title: 'Clube do Robson',
  data: () => ({
  }),
  computed: {
    baseUrl () {
      return process.env.BASE_URL || '/'
    }
  }
}
</script>

<style>
.centerNav{
  margin: 0 auto !important
}

v-app-bar {
  width: 90vw
}

body {
  background: #d1d1d1;
}

</style>
