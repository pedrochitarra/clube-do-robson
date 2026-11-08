<template>
  <div>
    <p class="cdr-title">Elenco</p><p class="cdr-sub">Quem vestiu a camisa do Robson, por número de jogos</p>
    <div class="cols c2">
      <router-link v-for="m in membros" :key="m.name" :to="`/jogadores/${m.name}`" class="card player">
        <div class="ph">
          <img v-if="photo(m.name)" :src="photo(m.name)">
          <img v-else class="ph-empty" :src="DEFAULT_PHOTO">
          <span v-if="m.number != null" class="num">{{ m.number }}</span>
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;gap:8px">
            <div><div class="nm">{{ m.displayName }}</div><div class="tag">{{ m.name }} · {{ POSICOES_FAV[m.favoritePosition] || '' }}</div></div>
            <div class="ovr">{{ m.proOverall }}</div>
          </div>
          <div class="pstats">
            <div><b>{{ m.gamesPlayed }}</b><span>Jogos</span></div><div><b>{{ m.goals }}</b><span>Gols</span></div>
            <div><b>{{ m.assists }}</b><span>Assist.</span></div><div><b>{{ m.manOfTheMatch }}</b><span>Craque</span></div>
          </div>
          <div class="bar" style="height:6px"><div :style="{ width: m.winRate + '%', background: 'var(--win)' }"></div></div>
          <div class="tag" style="margin-top:4px">{{ m.winRate }}% de vitórias</div>
        </div>
      </router-link>
    </div>

    <div class="cdr-section">Personagens do clube</div>
    <p class="cdr-sub">Os craques fictícios que completavam o time</p>
    <div class="cols c4">
      <router-link v-for="r in fakes" :key="r.name" :to="`/jogadores/${r.name}`" class="card legend">
        <img :src="photo(r.name) || DEFAULT_PHOTO">
        <div class="big gold" style="font-size:1.4rem;margin-top:6px">{{ r.number }}</div>
        <div style="font-weight:600">{{ r.proName }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import * as data from '../data'
import { photo, DEFAULT_PHOTO } from '../utils/ui'
import { POSICOES_FAV } from '../utils/jogador'

export default {
  name: 'Jogadores',
  data: () => ({
    POSICOES_FAV,
    DEFAULT_PHOTO,
    membros: data.members(),
    fakes: data.table('Robsoners').filter(r => r.isfake === 1).sort((a, b) => a.number - b.number)
  }),
  methods: { photo }
}
</script>
