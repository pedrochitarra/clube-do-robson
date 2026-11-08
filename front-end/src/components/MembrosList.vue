<template>
  <div class="page">
    <h1 class="page-title">Elenco</h1>
    <p class="page-subtitle">Quem vestiu a camisa do Robson, por número de jogos</p>

    <div v-if="loading" class="loading"><v-progress-circular indeterminate color="primary"></v-progress-circular></div>

    <div class="grid grid-2" v-else>
      <router-link
        v-for="m in elenco"
        :key="m.name"
        class="card-x player"
        :to="{ name: 'membro', params: { clubId, id: m.name } }"
      >
        <div class="player-photo">
          <img v-if="m.robsoner" :src="m.face" :alt="m.displayName">
          <v-icon v-else size="64" class="no-photo">mdi-account</v-icon>
          <span class="player-number" v-if="m.number">{{ m.number }}</span>
        </div>
        <div class="player-body">
          <div class="player-head">
            <div>
              <div class="player-name">{{ m.displayName }}</div>
              <div class="player-tag">{{ m.name }} · {{ posicao(m.favoritePosition) }}</div>
            </div>
            <div class="player-ovr" :title="'Overall ' + m.proOverall">{{ m.proOverall }}</div>
          </div>
          <div class="player-stats">
            <div><b>{{ m.gamesPlayed }}</b><span>Jogos</span></div>
            <div><b>{{ m.goals }}</b><span>Gols</span></div>
            <div><b>{{ m.assists }}</b><span>Assist.</span></div>
            <div><b>{{ m.manOfTheMatch }}</b><span>Craque</span></div>
          </div>
          <div class="bar" :title="m.winRate + '% de vitórias'">
            <div :style="{ width: m.winRate + '%', background: 'var(--win)' }"></div>
          </div>
          <div class="player-win">{{ m.winRate }}% de vitórias</div>
        </div>
      </router-link>
    </div>

    <template v-if="personagens.length">
      <h2 class="section-title">Personagens do clube</h2>
      <p class="page-subtitle">Os craques fictícios que completavam o time</p>
      <div class="grid grid-4">
        <router-link
          class="card-x legend"
          v-for="p in personagens"
          :key="p.name"
          :to="{ name: 'membro', params: { clubId, id: p.name } }"
        >
          <img :src="p.face" :alt="p.proName">
          <div class="legend-number">{{ p.number }}</div>
          <div class="legend-name">{{ p.proName }}</div>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import membrosService from '../services/membrosService'
import robsonService from '../services/robsonService'

const POSICOES = { goalkeeper: 'Goleiro', defender: 'Defensor', midfielder: 'Meio-campo', forward: 'Atacante' }

export default {
  name: 'membros-list',
  data () {
    return {
      loading: true,
      clubId: this.$route.params.clubId,
      elenco: [],
      personagens: []
    }
  },
  methods: {
    posicao (p) {
      return POSICOES[p] || p
    }
  },
  async mounted () {
    const [membros, robsoners] = await Promise.all([
      membrosService.getAll(this.clubId),
      robsonService.getAll()
    ])
    const porNome = Object.fromEntries(robsoners.data.map(r => [r.name, r]))

    this.elenco = membros.data
      .map(m => {
        const robsoner = porNome[m.name]
        return {
          ...m,
          robsoner,
          displayName: robsoner ? robsoner.proName : m.proName,
          number: robsoner ? robsoner.number : null,
          face: robsoner ? robsoner.face : require('@/assets/defaultMember.png')
        }
      })
      .sort((a, b) => Number(b.gamesPlayed) - Number(a.gamesPlayed))

    this.personagens = robsoners.data
      .filter(r => r.isfake)
      .sort((a, b) => a.number - b.number)
    this.loading = false
  }
}
</script>

<style scoped lang="scss">
.loading { display: flex; justify-content: center; padding: 80px 0; }

.player {
  display: flex;
  gap: 18px;
  align-items: center;
  color: var(--text) !important;
  transition: transform 0.15s, border-color 0.15s;
  &:hover { transform: translateY(-2px); border-color: rgba(167, 123, 240, 0.5); }
}

.player-photo {
  position: relative;
  flex-shrink: 0;
  width: 108px;
  height: 108px;
  border-radius: 14px;
  background: radial-gradient(circle at 50% 30%, var(--surface-3), var(--surface));
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  display: flex;
  align-items: center;
  justify-content: center;
  .no-photo { color: var(--surface-3) !important; }
}
.player-number {
  position: absolute;
  left: 6px;
  bottom: 4px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--gold);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
}

.player-body { flex: 1; min-width: 0; }
.player-head { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
.player-name { font-family: var(--font-display); font-weight: 700; font-size: 1.45rem; line-height: 1.1; }
.player-tag { color: var(--muted); font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.player-ovr {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.4rem;
  color: #120c1c;
  background: var(--gold);
  border-radius: 10px;
  padding: 2px 10px;
  height: fit-content;
}

.player-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 10px;
  div { display: flex; flex-direction: column; }
  b { font-family: var(--font-display); font-size: 1.3rem; line-height: 1; }
  span { color: var(--muted); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; }
}
.bar { height: 6px; }
.player-win { color: var(--muted); font-size: 0.75rem; margin-top: 4px; }

.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 40px 0 2px;
}

.legend {
  display: block;
  color: var(--text) !important;
  transition: transform 0.15s, border-color 0.15s;
  &:hover { transform: translateY(-2px); border-color: rgba(167, 123, 240, 0.5); }
  text-align: center;
  padding: 16px 12px;
  img { width: 100%; height: 140px; object-fit: cover; object-position: top; border-radius: 12px; margin-bottom: 8px; }
}
.legend-number { font-family: var(--font-display); font-weight: 800; font-size: 1.4rem; color: var(--gold); line-height: 1; }
.legend-name { font-weight: 600; }
</style>
