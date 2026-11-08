<template>
  <div class="page" v-if="clube && seasonal">
    <section class="hero card-x">
      <img class="hero-crest" :src="crest(clube)" :alt="clube.name">
      <div class="hero-info">
        <h1 class="page-title">{{ clube.name }}</h1>
        <p class="hero-meta">
          <v-icon small>mdi-stadium</v-icon> {{ clube.stadname }}
          <span class="dot">·</span>
          <v-icon small color="secondary">mdi-star</v-icon> Reputação {{ seasonal.starlevel }}
        </p>
        <div class="hero-record">
          <div><span class="stat-big">{{ seasonal.totalgames }}</span><div class="stat-label">Jogos</div></div>
          <div><span class="stat-big result-w">{{ seasonal.wins }}</span><div class="stat-label">Vitórias</div></div>
          <div><span class="stat-big result-d">{{ seasonal.ties }}</span><div class="stat-label">Empates</div></div>
          <div><span class="stat-big result-l">{{ seasonal.losses }}</span><div class="stat-label">Derrotas</div></div>
        </div>
        <div class="bar" :title="`${winPct}% de vitórias`">
          <div :style="{ width: pct(seasonal.wins) + '%', background: 'var(--win)' }"></div>
          <div :style="{ width: pct(seasonal.ties) + '%', background: 'var(--draw)' }"></div>
          <div :style="{ width: pct(seasonal.losses) + '%', background: 'var(--loss)' }"></div>
        </div>
        <p class="bar-caption">Venceu {{ winPct }}% dos jogos</p>
      </div>
    </section>

    <div class="grid grid-3 section">
      <div class="card-x">
        <h2 class="card-title-x">Ataque e defesa</h2>
        <div class="kv"><span>Gols marcados</span><span>{{ seasonal.alltimegoals }}</span></div>
        <div class="kv"><span>Gols sofridos</span><span>{{ seasonal.alltimegoalsagainst }}</span></div>
        <div class="kv"><span>Saldo</span><span :class="goalDiff >= 0 ? 'result-w' : 'result-l'">{{ goalDiff > 0 ? '+' : '' }}{{ goalDiff }}</span></div>
        <div class="kv"><span>Gols por jogo</span><span>{{ perGame(seasonal.alltimegoals) }}</span></div>
      </div>
      <div class="card-x">
        <h2 class="card-title-x">Temporadas</h2>
        <div class="kv"><span>Disputadas</span><span>{{ seasonal.seasons }}</span></div>
        <div class="kv"><span>Acessos</span><span class="result-w">{{ seasonal.promotions }}</span></div>
        <div class="kv"><span>Rebaixamentos</span><span class="result-l">{{ seasonal.relegations }}</span></div>
        <div class="kv"><span>Melhor divisão</span><span>{{ seasonal.bestdivision }}ª</span></div>
      </div>
      <div class="card-x">
        <h2 class="card-title-x">Ranking</h2>
        <div class="kv"><span>Pontos no ranking</span><span>{{ seasonal.rankingpoints }}</span></div>
        <div class="kv"><span>Melhor pontuação</span><span>{{ seasonal.bestpoints }}</span></div>
        <div class="kv"><span>Títulos</span><span class="gold">{{ seasonal.titleswon }}</span></div>
        <div class="kv"><span>Divisão atual</span><span>{{ seasonal.currentdivision || '—' }}</span></div>
      </div>
    </div>

    <section class="section">
      <h2 class="section-title">Sala de troféus <span class="gold">{{ seasonal.titleswon }}</span></h2>
      <div class="grid grid-4">
        <div class="card-x trophy" v-for="t in trophies" :key="t.label" :class="{ empty: !t.count }">
          <img :src="t.img" :alt="t.label">
          <div class="trophy-count">{{ t.count }}</div>
          <div class="stat-label">{{ t.label }}</div>
        </div>
      </div>
    </section>
  </div>

  <div class="page loading" v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import clubesService from '../services/clubesService'
import seasonalService from '../services/seasonalService'
import { crest } from '../utils/crest'

export default {
  name: 'clube',
  data () {
    return {
      clube: null,
      seasonal: null
    }
  },
  computed: {
    winPct () {
      return this.pct(this.seasonal.wins).toFixed(0)
    },
    goalDiff () {
      return this.seasonal.alltimegoals - this.seasonal.alltimegoalsagainst
    },
    trophies () {
      const s = this.seasonal
      return [
        { label: '1ª Divisão', count: s.leaguewins, img: require('@/assets/trophies/league.png') },
        { label: 'Divisões 2 e 3', count: s.divswon2, img: require('@/assets/trophies/2-3.png') },
        { label: 'Divisões 4 a 7', count: s.divswon3, img: require('@/assets/trophies/4-5-6-7.png') },
        { label: 'Divisões 8 a 10', count: s.divswon4, img: require('@/assets/trophies/8-9-10.png') }
      ]
    }
  },
  methods: {
    crest,
    pct (n) {
      return this.seasonal.totalgames ? (n / this.seasonal.totalgames) * 100 : 0
    },
    perGame (n) {
      return this.seasonal.totalgames ? (n / this.seasonal.totalgames).toFixed(2) : '—'
    }
  },
  async mounted () {
    const [clube, seasonal] = await Promise.all([
      clubesService.get(this.$route.params.id),
      seasonalService.getAll()
    ])
    this.clube = clube.data
    this.seasonal = seasonal.data
  }
}
</script>

<style scoped lang="scss">
.loading { display: flex; justify-content: center; padding-top: 120px; }

.hero {
  display: flex;
  gap: 32px;
  align-items: center;
  padding: 32px;
  background:
    radial-gradient(600px 300px at 0% 0%, rgba(167, 123, 240, 0.25), transparent 70%),
    linear-gradient(180deg, var(--surface-2), var(--surface));
}
.hero-crest {
  width: 168px;
  height: 168px;
  object-fit: contain;
  filter: drop-shadow(0 12px 30px rgba(124, 77, 206, 0.5));
  flex-shrink: 0;
}
.hero-info { flex: 1; min-width: 0; }
.hero-meta { color: var(--muted); margin: 0 0 20px; .dot { margin: 0 8px; } }
.hero-record {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  gap: 32px;
  margin-bottom: 18px;
}
.bar-caption { color: var(--muted); font-size: 0.85rem; margin: 8px 0 0; }

.section { margin-top: 24px; }
.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 14px;
}
.gold { color: var(--gold); }

.trophy {
  text-align: center;
  img { height: 150px; object-fit: contain; margin-bottom: 8px; }
  &.empty img { filter: grayscale(1) opacity(0.35); }
}
.trophy-count { font-family: var(--font-display); font-weight: 800; font-size: 2.2rem; color: var(--gold); line-height: 1; }
.trophy.empty .trophy-count { color: var(--muted); }

@media (max-width: 700px) {
  .hero { flex-direction: column; text-align: center; padding: 24px 16px; }
  .hero-crest { width: 120px; height: 120px; }
  .hero-record { grid-template-columns: repeat(4, 1fr); gap: 8px; justify-content: stretch; }
  .stat-big { font-size: 2rem; }
}
</style>
