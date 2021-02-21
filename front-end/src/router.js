import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// mode: history for build and avoid reloading
export default new Router({
  // mode: "history",
  routes: [
    /* {
      path: "/",
      alias: "/clubes",
      name: "clubes",
      component: () => import("./components/ClubesList")
    }, */
    {
      path: '/clubes/:id',
      name: 'clube',
      component: () => import('./components/Clube')
    },
    {
      path: '/membros/:clubId',
      name: 'membros',
      component: () => import('./components/MembrosList')
    },
    {
      path: '/membros/:clubId/:id',
      name: 'membro',
      component: () => import('./components/Membro')
    },
    {
      path: '/partidas/:clubId',
      name: 'partidas',
      component: () => import('./components/Partidas')
    },
    {
      path: '/partida/:partidaId',
      name: 'partida',
      component: () => import('./components/Partida')
    }
  ]
})
