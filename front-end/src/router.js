import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Hash mode: o GitHub Pages não tem fallback para rotas do SPA
export default new Router({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    { path: '/', redirect: '/clube' },
    { path: '/clube', name: 'clube', component: () => import('./components/Clube') },
    { path: '/jogadores', name: 'jogadores', component: () => import('./components/Jogadores') },
    { path: '/jogadores/:tag', name: 'jogador', component: () => import('./components/Jogador') },
    { path: '/partidas', name: 'partidas', component: () => import('./components/Partidas') },
    { path: '/partidas/:id', name: 'partida', component: () => import('./components/Partida') },
    // URLs antigas
    { path: '/clubes/:id', redirect: '/clube' },
    { path: '/membros/:clubId', redirect: '/jogadores' },
    { path: '/membros/:clubId/:tag', redirect: to => `/jogadores/${to.params.tag}` },
    { path: '/partida/:id', redirect: to => `/partidas/${to.params.id}` },
    { path: '*', redirect: '/clube' }
  ]
})
