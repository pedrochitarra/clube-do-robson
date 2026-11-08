<template>
  <div>
    <header class="topbar">
      <router-link to="/clube" class="logo"><img :src="ourCrest" alt="Clube do Robson"></router-link>
      <nav>
        <router-link to="/clube">🛡️ Clube</router-link>
        <router-link to="/jogadores">👥 Jogadores</router-link>
        <router-link to="/partidas">⚽ Partidas</router-link>
      </nav>
    </header>
    <main class="page">
      <div v-if="!ready" class="loading">Carregando…</div>
      <router-view v-else :key="$route.fullPath"/>
      <p class="footer">Pro Clubs · FIFA 21 · dados até 24/02/2021</p>
    </main>
  </div>
</template>

<script>
import { load } from './data'
import { OUR_CREST } from './utils/ui'

export default {
  name: 'App',
  data: () => ({ ready: false, ourCrest: OUR_CREST }),
  async created () {
    await load()
    this.ready = true
  }
}
</script>

<style scoped>
.topbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 18px; padding: 10px 16px;
          background: rgba(18, 12, 28, .85); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
.logo img { width: 40px; height: 40px; object-fit: contain; display: block; }
nav { display: flex; gap: 4px; flex-wrap: wrap; }
nav a { color: var(--muted); font-size: .9rem; font-weight: 500; padding: 5px 12px; border-radius: 8px; }
nav a:hover { color: var(--text); background: var(--surface-2); }
nav a.router-link-active { color: var(--text); background: var(--surface-3); }
.footer { text-align: center; color: var(--muted); font-size: .8rem; margin: 40px 0 24px; }
</style>
