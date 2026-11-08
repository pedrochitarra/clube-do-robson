<template>
  <div>
    <a class="back" @click="voltar">← Partidas</a>
    <div class="card" style="margin-top:12px;padding:24px;background:radial-gradient(500px 220px at 50% 0%, rgba(167,123,240,.28), transparent 70%), linear-gradient(180deg,var(--surface-2),var(--surface))">
      <div class="meta">📅 {{ dayMonth(m.date) }} {{ m.date.getUTCFullYear() }} · 🕐 {{ hhmm(m.date) }} · 🏟️ {{ h.stadname }}<span v-if="publico"> · 👥 {{ publico }}</span></div>
      <div class="board">
        <div><img :src="crest(h)"><div class="cn" :class="{ gold: h.clubId === CLUB_ID }">{{ h.name }}</div><div class="lbl">Casa</div></div>
        <div><div class="goals">{{ m.homeGoals }} – {{ m.awayGoals }}</div><span class="pill" :class="m.result">{{ RESULT_NAME[m.result] }}</span></div>
        <div><img :src="crest(a)"><div class="cn" :class="{ gold: a.clubId === CLUB_ID }">{{ a.name }}</div><div class="lbl">Fora</div></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px"><div class="card-h">Estatísticas</div>
      <div v-for="c in comparacoes" :key="c.rot" class="cmp">
        <div class="vals">
          <span :class="{ gold: c.vh > c.va }">{{ c.fmt(c.vh) }}</span><span>{{ c.rot }}</span><span :class="{ gold: c.va > c.vh }">{{ c.fmt(c.va) }}</span>
        </div>
        <div class="bars">
          <div class="bar home"><div :style="{ width: c.vh / ((c.vh + c.va) || 1) * 100 + '%' }"></div></div>
          <div class="bar away"><div :style="{ width: c.va / ((c.vh + c.va) || 1) * 100 + '%' }"></div></div>
        </div>
      </div>
    </div>

    <div class="cdr-section">Escalações</div>
    <div class="cols c2">
      <div v-for="e in escalacoes" :key="e.clube.clubId">
        <div class="card-h" style="text-align:center">{{ e.clube.name }}</div>
        <div class="card" style="padding:8px 12px">
          <table class="tbl">
            <thead><tr><th>Jogador</th><th>G</th><th>A</th><th>Chutes</th><th>Passes</th><th>Nota</th><th></th></tr></thead>
            <tbody>
              <tr v-for="j in e.jogadores" :key="j.memberMatchId">
                <td>
                  <router-link v-if="j.nosso" :to="`/jogadores/${j.name}`" class="gold">{{ j.nome }}</router-link>
                  <template v-else>{{ j.nome }}</template>
                </td>
                <td>{{ j.goals }}</td><td>{{ j.assists }}</td><td>{{ j.shots }}</td><td>{{ j.passesmade }}</td>
                <td>{{ j.rating == null ? '' : j.rating.toFixed(1) }}</td><td>{{ j.mom === 1 ? '⭐' : '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as data from '../data'
import { crest, dayMonth, hhmm, fmtInt, RESULT_NAME } from '../utils/ui'

// Gerador com semente (o Python usa random.Random(match_id)): público fixo por partida
function seeded (seed) {
  let x = 0
  for (const ch of String(seed)) x = (x * 31 + ch.charCodeAt(0)) >>> 0
  x ^= x << 13; x ^= x >>> 17; x ^= x << 5
  return (x >>> 0) / 4294967296
}

export default {
  name: 'Partida',
  data () {
    const id = this.$route.params.id
    const m = data.match(id)
    const h = data.club(m.homeClub)
    const a = data.club(m.awayClub)
    const stats = data.clubMatchStats(id)
    const sh = stats.find(s => s.clubId === m.homeClub) || {}
    const sa = stats.find(s => s.clubId === m.awayClub) || {}

    // Público simulado: 80–100% da capacidade (a Arena Robson Oliveira usa o Emirates como referência)
    const cap = data.stadiumCapacity(h.stadname === 'Arena Robson Oliveira' ? 'Emirates Stadium' : h.stadname)
    const prec = s => s.passattempts ? s.passesmade / s.passattempts * 100 : 0
    const posseH = sh.passesmade / ((sh.passesmade + sa.passesmade) || 1) * 100
    const int = v => (v || 0).toFixed(0)
    const pct = v => `${v.toFixed(1)}%`

    const nomes = Object.fromEntries(data.members().map(p => [p.name, p.displayName]))
    const jogadores = data.playerMatchStats(id)
    const escalacoes = [h, a].map(clube => ({
      clube,
      jogadores: jogadores
        .filter(j => String(j.clubid) === String(clube.clubId))
        .map(j => ({ ...j, nome: nomes[j.name] || j.name, nosso: !!nomes[j.name] }))
        .sort((x, y) => (y.rating || 0) - (x.rating || 0))
    }))

    return {
      CLUB_ID: data.CLUB_ID,
      RESULT_NAME,
      m,
      h,
      a,
      publico: cap ? fmtInt(cap * (0.8 + seeded(id) * 0.2)) : null,
      comparacoes: [
        { rot: 'Passes', vh: sh.passesmade || 0, va: sa.passesmade || 0, fmt: int },
        { rot: 'Precisão no passe', vh: prec(sh), va: prec(sa), fmt: pct },
        { rot: 'Posse de bola', vh: posseH, va: 100 - posseH, fmt: pct },
        { rot: 'Chutes', vh: sh.shots || 0, va: sa.shots || 0, fmt: int },
        { rot: 'Divididas', vh: sh.tacklesmade || 0, va: sa.tacklesmade || 0, fmt: int }
      ],
      escalacoes
    }
  },
  methods: {
    crest,
    dayMonth,
    hhmm,
    voltar () {
      this.$router.push({ path: '/partidas', query: this.m.season != null ? { t: this.m.season } : {} })
    }
  }
}
</script>
