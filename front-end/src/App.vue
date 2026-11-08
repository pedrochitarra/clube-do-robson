<template>
  <v-app>
    <header class="topbar">
      <div class="topbar-inner">
        <router-link to="/" class="brand">
          <img :src="$base + 'crests/99150901.png'" alt="Escudo do Clube do Robson">
          <span>Clube do Robson</span>
        </router-link>
        <nav class="nav">
          <router-link :to="`/clubes/${clubId}`">Clube</router-link>
          <router-link :to="`/membros/${clubId}`">Jogadores</router-link>
          <router-link :to="`/partidas/${clubId}`">Partidas</router-link>
        </nav>
      </div>
    </header>

    <v-main>
      <router-view/>
    </v-main>

    <footer class="footer">
      Pro Clubs · FIFA 21 · dados até 24/02/2021
    </footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    clubId: 6703918
  })
}
</script>

<style lang="scss">
@import './styles/theme.scss';

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(18, 12, 28, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.topbar-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text) !important;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  img { width: 36px; height: 36px; object-fit: contain; }
}

.nav {
  display: flex;
  gap: 4px;
  a {
    color: var(--muted) !important;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 10px;
    &:hover { color: var(--text) !important; background: var(--surface-2); }
    &.router-link-active { color: var(--gold) !important; background: var(--surface-2); }
  }
}

.footer {
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  padding: 24px 16px 32px;
  border-top: 1px solid var(--border);
}

@media (max-width: 600px) {
  .brand span { display: none; }
  .nav a { font-size: 0.95rem; padding: 6px 8px; }
}
</style>
