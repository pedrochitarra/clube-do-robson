<template>
  <div class="page">
    <h1 class="page-title">Partidas</h1>
    <p class="page-subtitle">Jogos registrados por temporada</p>

    <div class="seasons" v-if="seasons.length">
      <button
        v-for="s in seasons"
        :key="s"
        class="season-chip"
        :class="{ active: s === season }"
        @click="selectSeason(s)"
      >Temporada {{ s }}</button>
    </div>

    <div class="grid grid-4 summary" v-if="partidas.length">
      <div class="card-x"><span class="stat-big">{{ partidas.length }}</span><div class="stat-label">Jogos</div></div>
      <div class="card-x"><span class="stat-big result-w">{{ resumo.w }}</span><div class="stat-label">Vitórias</div></div>
      <div class="card-x"><span class="stat-big result-d">{{ resumo.d }}</span><div class="stat-label">Empates</div></div>
      <div class="card-x"><span class="stat-big result-l">{{ resumo.l }}</span><div class="stat-label">Derrotas</div></div>
    </div>

    <div v-if="loading" class="loading"><v-progress-circular indeterminate color="primary"></v-progress-circular></div>

    <div class="matches" v-else>
      <router-link
        v-for="p in partidas"
        :key="p.matchId"
        class="match card-x"
        :class="'edge-' + p.result"
        :to="{ name: 'partida', params: { partidaId: p.matchId } }"
      >
        <div class="match-date">
          <span>{{ dia(p.timestamp) }}</span>
          <small>{{ hora(p.timestamp) }}</small>
        </div>
        <div class="team home" :class="{ us: p.homeClub === clubId }">
          <span class="team-name">{{ p.partidasHomeClub.name }}</span>
          <img :src="crest(p.partidasHomeClub)" :alt="p.partidasHomeClub.name">
        </div>
        <div class="score">
          <span>{{ p.homeGoals }}</span><i>–</i><span>{{ p.awayGoals }}</span>
        </div>
        <div class="team away" :class="{ us: p.awayClub === clubId }">
          <img :src="crest(p.partidasAwayClub)" :alt="p.partidasAwayClub.name">
          <span class="team-name">{{ p.partidasAwayClub.name }}</span>
        </div>
        <span class="badge-result" :class="p.result">{{ { w: 'V', d: 'E', l: 'D' }[p.result] }}</span>
      </router-link>

      <p class="empty" v-if="!partidas.length && season">Nenhuma partida registrada nesta temporada.</p>
    </div>
  </div>
</template>

<script>
import clubesPartidasService from '../services/clubesPartidas'
import { crest } from '../utils/crest'

export default {
  name: 'partidas',
  data () {
    return {
      clubId: Number(this.$route.params.clubId),
      seasons: [],
      season: null,
      partidas: [],
      loading: true
    }
  },
  computed: {
    resumo () {
      const r = { w: 0, d: 0, l: 0 }
      this.partidas.forEach(p => { r[p.result]++ })
      return r
    }
  },
  methods: {
    crest,
    dia (ts) {
      return new Date(ts * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    },
    hora (ts) {
      return new Date(ts * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    },
    // Resultado do ponto de vista do Clube do Robson
    resultado (p) {
      const nossos = p.homeClub === this.clubId ? Number(p.homeGoals) : Number(p.awayGoals)
      const deles = p.homeClub === this.clubId ? Number(p.awayGoals) : Number(p.homeGoals)
      return nossos > deles ? 'w' : nossos < deles ? 'l' : 'd'
    },
    async selectSeason (s) {
      this.season = s
      this.loading = true
      const { data } = await clubesPartidasService.getBySeason(this.clubId, s)
      this.partidas = data.partidasSeason
        .map(p => ({ ...p, result: this.resultado(p) }))
        .sort((a, b) => b.timestamp - a.timestamp)
      this.loading = false
    }
  },
  async mounted () {
    const { data } = await clubesPartidasService.getSeasons(this.clubId)
    this.seasons = [...new Set(data.map(s => s.seasonid).filter(s => s != null))].sort((a, b) => b - a)
    if (this.seasons.length) {
      await this.selectSeason(this.seasons[0])
    } else {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.loading { display: flex; justify-content: center; padding: 60px 0; }

.seasons { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.season-chip {
  background: var(--surface-2);
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 6px 16px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  &:hover { color: var(--text); }
  &.active { background: var(--gold); color: #120c1c; border-color: var(--gold); }
}

.summary { margin-bottom: 20px; .card-x { text-align: center; padding: 16px; } }

.matches { display: flex; flex-direction: column; gap: 10px; }

.match {
  display: grid;
  grid-template-columns: 64px 1fr auto 1fr 32px;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  color: var(--text) !important;
  border-left: 4px solid transparent;
  transition: transform 0.15s, background 0.15s;
  &:hover { transform: translateX(3px); background: var(--surface-2); }
  &.edge-w { border-left-color: var(--win); }
  &.edge-d { border-left-color: var(--draw); }
  &.edge-l { border-left-color: var(--loss); }
}

.match-date {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.1;
  small { color: var(--muted); font-weight: 500; }
}

.team {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  img { width: 44px; height: 44px; object-fit: contain; flex-shrink: 0; }
  &.home { justify-content: flex-end; text-align: right; }
  &.us .team-name { color: var(--gold); }
}
.team-name { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.score {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.9rem;
  background: var(--bg);
  border-radius: 10px;
  padding: 2px 14px;
  i { color: var(--muted); font-style: normal; font-size: 1.2rem; }
}

.empty { color: var(--muted); text-align: center; padding: 40px 0; }

@media (max-width: 700px) {
  .match { grid-template-columns: 1fr auto 1fr; gap: 8px; padding: 12px; }
  .match-date, .badge-result { display: none; }
  .team { flex-direction: column; gap: 4px; text-align: center !important; justify-content: center !important; }
  .team.home { flex-direction: column-reverse; }
  .team-name { font-size: 0.8rem; max-width: 100%; }
  .score { font-size: 1.5rem; }
}
</style>
