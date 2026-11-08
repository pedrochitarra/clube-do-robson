<template>
  <div>
    <p class="cdr-title">Partidas</p><p class="cdr-sub">Jogos registrados por temporada</p>
    <div class="pills">
      <button v-for="t in temporadas" :key="t" :class="{ on: t === temporada }" @click="escolhe(t)">Temporada {{ t }}</button>
    </div>

    <div class="cdr-grid g4" style="margin:6px 0 18px">
      <div class="card" style="text-align:center"><div class="big">{{ jogos.length }}</div><div class="lbl">Jogos</div></div>
      <div class="card" style="text-align:center"><div class="big w">{{ conta('w') }}</div><div class="lbl">Vitórias</div></div>
      <div class="card" style="text-align:center"><div class="big d">{{ conta('d') }}</div><div class="lbl">Empates</div></div>
      <div class="card" style="text-align:center"><div class="big l">{{ conta('l') }}</div><div class="lbl">Derrotas</div></div>
    </div>

    <router-link v-for="m in jogos" :key="m.matchId" :to="`/partidas/${m.matchId}`" class="card match" :class="m.result">
      <div class="dt">{{ dayMonth(m.date) }}<small>{{ hhmm(m.date) }}</small></div>
      <div class="team home" :class="{ us: m.h.clubId === CLUB_ID }"><span>{{ m.h.name }}</span><img :src="crest(m.h)"></div>
      <div class="score">{{ m.homeGoals }} – {{ m.awayGoals }}</div>
      <div class="team" :class="{ us: m.a.clubId === CLUB_ID }"><img :src="crest(m.a)"><span>{{ m.a.name }}</span></div>
      <span class="badge" :class="m.result">{{ RESULT_LABEL[m.result] }}</span>
    </router-link>
  </div>
</template>

<script>
import * as data from '../data'
import { crest, dayMonth, hhmm, RESULT_LABEL } from '../utils/ui'

export default {
  name: 'Partidas',
  data () {
    const partidas = data.matches().map(m => ({ ...m, h: data.club(m.homeClub), a: data.club(m.awayClub) }))
    const temporadas = [...new Set(partidas.map(m => m.season).filter(s => s != null))].sort((a, b) => b - a)
    return { CLUB_ID: data.CLUB_ID, RESULT_LABEL, partidas, temporadas, temporada: Number(this.$route.query.t) || temporadas[0] }
  },
  computed: {
    jogos () { return this.partidas.filter(m => m.season === this.temporada) }
  },
  methods: {
    crest,
    dayMonth,
    hhmm,
    // Temporada na URL para o "voltar" da partida cair nela de novo
    escolhe (t) { this.$router.replace({ query: { t } }) },
    conta (r) { return this.jogos.filter(m => m.result === r).length }
  }
}
</script>
