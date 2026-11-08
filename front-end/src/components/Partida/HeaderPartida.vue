<template>
  <section class="scoreboard card-x" v-if="partida">
    <div class="meta">
      <span><v-icon small>mdi-calendar</v-icon> {{ data }}</span>
      <span><v-icon small>mdi-clock-outline</v-icon> {{ hora }}</span>
      <span><v-icon small>mdi-stadium</v-icon> {{ stadName }}</span>
      <span v-if="publico"><v-icon small>mdi-account-group</v-icon> {{ publico.toLocaleString('pt-BR') }}</span>
    </div>

    <div class="board">
      <div class="side" :class="{ us: partida.homeClub === clubId }">
        <img :src="crest(partida.partidasHomeClub)" :alt="partida.partidasHomeClub.name">
        <div class="club-name">{{ partida.partidasHomeClub.name }}</div>
        <div class="side-label">Casa</div>
      </div>

      <div class="result">
        <div class="goals">{{ partida.homeGoals }}<i>–</i>{{ partida.awayGoals }}</div>
        <span class="result-pill" :class="resultado">{{ { w: 'Vitória', d: 'Empate', l: 'Derrota' }[resultado] }}</span>
      </div>

      <div class="side" :class="{ us: partida.awayClub === clubId }">
        <img :src="crest(partida.partidasAwayClub)" :alt="partida.partidasAwayClub.name">
        <div class="club-name">{{ partida.partidasAwayClub.name }}</div>
        <div class="side-label">Fora</div>
      </div>
    </div>
  </section>
</template>

<script>
import stadiumService from '../../services/stadiumService'
import { crest } from '../../utils/crest'

export default {
  props: {
    items: Array,
    stadName: String,
    timestamp: Number
  },
  data () {
    return {
      clubId: 6703918,
      publico: null
    }
  },
  computed: {
    partida () {
      return this.items && this.items[0]
    },
    data () {
      return new Date(this.timestamp * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    },
    hora () {
      return new Date(this.timestamp * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    },
    resultado () {
      const p = this.partida
      const nossos = p.homeClub === this.clubId ? Number(p.homeGoals) : Number(p.awayGoals)
      const deles = p.homeClub === this.clubId ? Number(p.awayGoals) : Number(p.homeGoals)
      return nossos > deles ? 'w' : nossos < deles ? 'l' : 'd'
    }
  },
  methods: {
    crest
  },
  async mounted () {
    // Público "simulado": 80–100% da capacidade do estádio (a Arena Robson Oliveira usa o Emirates como referência)
    const nome = this.stadName === 'Arena Robson Oliveira' ? 'Emirates Stadium' : this.stadName
    const { data } = await stadiumService.get(nome)
    let estadio = data[0]
    if (!estadio) {
      const todos = await stadiumService.getAll()
      estadio = todos.data[Math.floor(Math.random() * todos.data.length)]
    }
    if (estadio) {
      this.publico = Math.round(estadio.capacity * (0.8 + Math.random() * 0.2))
    }
  }
}
</script>

<style scoped lang="scss">
.scoreboard {
  padding: 24px 24px 28px;
  margin-bottom: 16px;
  background:
    radial-gradient(500px 220px at 50% 0%, rgba(167, 123, 240, 0.28), transparent 70%),
    linear-gradient(180deg, var(--surface-2), var(--surface));
}

.meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 20px;
  .v-icon { color: var(--muted); margin-right: 2px; }
}

.board {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
}

.side {
  text-align: center;
  img { width: 120px; height: 120px; object-fit: contain; filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.45)); }
  &.us .club-name { color: var(--gold); }
}
.club-name { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; margin-top: 8px; line-height: 1.1; }
.side-label { color: var(--muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; }

.result { text-align: center; }
.goals {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 4.5rem;
  line-height: 1;
  i { font-style: normal; color: var(--muted); margin: 0 12px; font-size: 3rem; vertical-align: middle; }
}
.result-pill {
  display: inline-block;
  margin-top: 10px;
  padding: 3px 14px;
  border-radius: 99px;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #120c1c;
  &.w { background: var(--win); }
  &.d { background: var(--draw); }
  &.l { background: var(--loss); }
}

@media (max-width: 600px) {
  .side img { width: 64px; height: 64px; }
  .club-name { font-size: 1rem; }
  .goals { font-size: 2.8rem; i { font-size: 1.8rem; margin: 0 6px; } }
}
</style>
