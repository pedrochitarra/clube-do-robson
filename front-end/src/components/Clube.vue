<template>
  <div>
    <div class="card hero">
      <img :src="crest(c)" :alt="c.name">
      <div style="flex:1">
        <p class="cdr-title">{{ c.name }}</p>
        <p class="cdr-sub">🏟️ {{ c.stadname }} · ⭐ Reputação {{ s.starlevel }}</p>
        <div class="hero-rec">
          <div><div class="big">{{ s.totalgames }}</div><div class="lbl">Jogos</div></div>
          <div><div class="big w">{{ s.wins }}</div><div class="lbl">Vitórias</div></div>
          <div><div class="big d">{{ s.ties }}</div><div class="lbl">Empates</div></div>
          <div><div class="big l">{{ s.losses }}</div><div class="lbl">Derrotas</div></div>
        </div>
        <div class="bar">
          <div :style="{ width: pct.wins + '%', background: 'var(--win)' }"></div>
          <div :style="{ width: pct.ties + '%', background: 'var(--draw)' }"></div>
          <div :style="{ width: pct.losses + '%', background: 'var(--loss)' }"></div>
        </div>
        <p class="cdr-sub" style="margin:8px 0 0">Venceu {{ pct.wins.toFixed(0) }}% dos jogos</p>
      </div>
    </div>

    <div class="cdr-grid g3" style="margin-top:16px">
      <div class="card"><div class="card-h">Ataque e defesa</div>
        <div class="kv"><span>Gols marcados</span><span>{{ s.alltimegoals }}</span></div>
        <div class="kv"><span>Gols sofridos</span><span>{{ s.alltimegoalsagainst }}</span></div>
        <div class="kv"><span>Saldo</span><span :class="saldo >= 0 ? 'w' : 'l'">{{ saldo >= 0 ? '+' : '' }}{{ saldo }}</span></div>
        <div class="kv"><span>Gols por jogo</span><span>{{ (s.alltimegoals / total).toFixed(2) }}</span></div>
      </div>
      <div class="card"><div class="card-h">Temporadas</div>
        <div class="kv"><span>Disputadas</span><span>{{ s.seasons }}</span></div>
        <div class="kv"><span>Acessos</span><span class="w">{{ s.promotions }}</span></div>
        <div class="kv"><span>Rebaixamentos</span><span class="l">{{ s.relegations }}</span></div>
        <div class="kv"><span>Melhor divisão</span><span>{{ s.bestdivision }}ª</span></div>
      </div>
      <div class="card"><div class="card-h">Ranking</div>
        <div class="kv"><span>Pontos no ranking</span><span>{{ s.rankingpoints }}</span></div>
        <div class="kv"><span>Melhor pontuação</span><span>{{ s.bestpoints }}</span></div>
        <div class="kv"><span>Títulos</span><span class="gold">{{ s.titleswon }}</span></div>
        <div class="kv"><span>Divisão atual</span><span>{{ s.currentdivision }}</span></div>
      </div>
    </div>

    <div class="cdr-section">Sala de troféus <span class="gold">{{ s.titleswon }}</span></div>
    <div class="cdr-grid g4">
      <div v-for="t in trofeus" :key="t.img" class="card trophy" :class="{ zero: !t.n }">
        <img :src="`${base}trophies/${t.img}.png`" :alt="t.nome">
        <div class="big">{{ t.n }}</div><div class="lbl">{{ t.nome }}</div>
      </div>
    </div>

    <div class="cdr-section">Últimos jogos</div>
    <div class="cols c5">
      <router-link v-for="m in ultimas" :key="m.matchId" :to="`/partidas/${m.matchId}`"
                   class="card" style="text-align:center;padding:12px" :title="m.adv.name">
        <img :src="crest(m.adv)" style="width:48px;height:48px;object-fit:contain">
        <div style="font-family:var(--display);font-weight:800;font-size:1.3rem">{{ m.homeGoals }}–{{ m.awayGoals }}</div>
        <span class="badge" :class="m.result">{{ RESULT_LABEL[m.result] }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import * as data from '../data'
import { crest, RESULT_LABEL } from '../utils/ui'

export default {
  name: 'Clube',
  data () {
    const s = data.seasonal()
    const total = s.totalgames || 1
    return {
      base: process.env.BASE_URL,
      RESULT_LABEL,
      c: data.club(),
      s,
      total,
      pct: { wins: s.wins / total * 100, ties: s.ties / total * 100, losses: s.losses / total * 100 },
      saldo: s.alltimegoals - s.alltimegoalsagainst,
      trofeus: [
        { nome: '1ª Divisão', n: s.leaguewins, img: 'league_final' },
        { nome: 'Divisões 2 e 3', n: s.divswon2, img: '2-3_final' },
        { nome: 'Divisões 4 a 7', n: s.divswon3, img: '4-5-6-7_final' },
        { nome: 'Divisões 8 a 10', n: s.divswon4, img: '8-9-10_final' }
      ],
      ultimas: data.matches().slice(0, 10).map(m => ({
        ...m, adv: data.club(m.homeClub === data.CLUB_ID ? m.awayClub : m.homeClub)
      }))
    }
  },
  methods: { crest }
}
</script>
