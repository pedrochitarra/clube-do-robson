<template>
  <div>
    <router-link to="/jogadores" class="back">← Elenco</router-link>
    <p v-if="!m && !r" class="note" style="margin-top:14px">Jogador não encontrado.</p>
    <template v-else>
      <div class="profile" style="margin-top:14px">
        <div class="fut">
          <div class="top"><div class="ov">{{ overall }}</div><div class="ps">{{ posicao }}</div><img :src="OUR_CREST"></div>
          <img v-if="foto" class="photo" :src="foto">
          <img v-else class="photo ph-empty" :src="DEFAULT_PHOTO">
          <div class="fn">{{ nome }}</div>
          <div class="at"><div v-for="(v, k) in g" :key="k"><b>{{ v }}</b><span>{{ k }}</span></div></div>
        </div>
        <div style="flex:1;min-width:0;width:100%">
          <p class="cdr-title">{{ nome }}</p>
          <div class="tags">
            <span v-if="r && r.number" class="shirt" title="Camisa">{{ r.number }}</span>
            <span class="tagchip">🎮 {{ tag }}</span>
            <span v-if="posicao" class="tagchip">{{ posicao }}</span>
            <span v-if="!m" class="tagchip fake">Personagem</span>
          </div>
          <div class="cdr-grid fatos" :style="{ '--n': fatos.length }">
            <div v-for="f in fatos" :key="f[1]" class="card"><div class="big" style="font-size:1.9rem">{{ f[0] }}</div><div class="lbl">{{ f[1] }}</div></div>
          </div>
          <div v-if="m" class="cdr-grid carreira" style="margin-top:14px">
            <div v-for="c in carreira" :key="c[0]" class="card"><div class="big" style="font-size:1.9rem">{{ c[1] }}</div><div class="lbl">{{ c[0] }}</div></div>
          </div>
          <p v-else class="note" style="margin-top:14px">🤖 Personagem fictício do clube: tem atributos, mas não entra nas estatísticas da EA.</p>
        </div>
      </div>

      <div v-if="s" class="habilidades">
        <div class="card radar-card"><div class="card-h">Habilidades</div><radar :valores="radar"/></div>
        <div class="grupos">
          <div v-for="[titulo, sigla, itens] in GRUPOS" :key="sigla" class="card">
            <div class="card-h">{{ titulo }} <span :style="{ float: 'right', color: attrColor(g[sigla]) }">{{ g[sigla] }}</span></div>
            <div v-for="[rot, k] in itens" :key="k" class="attr">
              <span>{{ rot }}</span>
              <div class="bar"><div :style="{ width: s[k] + '%', background: attrColor(s[k]) }"></div></div>
              <b :style="{ color: attrColor(s[k]) }">{{ s[k] }}</b>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import * as data from '../data'
import { photo, attrColor, DEFAULT_PHOTO, OUR_CREST } from '../utils/ui'
import { POSICOES, GRUPOS, ROTULOS, parseAttrs, grupos } from '../utils/jogador'
import Radar from './Radar'

export default {
  name: 'Jogador',
  components: { Radar },
  data () {
    const tag = this.$route.params.tag
    const m = data.members().find(p => p.name === tag) || null
    const r = data.robsoner(tag)
    if (!m && !r) return { tag, m, r }

    // Atributos: primeira partida registrada do jogador na tabela, ou o cadastro do personagem
    const pm = data.table('PlayersMatches').find(p => p.name === tag)
    const s = parseAttrs(pm ? pm.vproattr : r && r.vproattr)
    const g = s ? grupos(s) : null
    const posIdx = m ? m.proPos : r.proPos
    const posicao = posIdx != null && String(posIdx).trim() !== '' && String(posIdx) !== 'None' ? POSICOES[Math.trunc(Number(posIdx))] || '' : ''

    const fatos = [[Math.trunc(Number(m ? m.proHeight : r.proHeight)), 'Altura (cm)']]
    if (r && r.weight) fatos.push([r.weight, 'Peso (kg)'])
    if (r && r.birthdate) fatos.push([r.birthdate, 'Nascimento'])

    return {
      tag,
      m,
      r,
      s,
      g,
      posicao,
      fatos,
      nome: r ? r.proName : m.proName,
      foto: photo(tag),
      overall: m ? m.proOverall : g ? Math.round(Object.values(g).reduce((x, y) => x + y, 0) / 6) : '—',
      carreira: m
        ? [['Jogos', m.gamesPlayed], ['Gols', m.goals], ['Assistências', m.assists],
            ['Craque do jogo', m.manOfTheMatch], ['Vitórias', `${m.winRate}%`],
            ['Precisão de passe', `${m.passSuccessRate}%`], ['Precisão de chute', `${m.shotSuccessRate}%`],
            ['Cartões vermelhos', m.redCards]]
        : [],
      radar: g ? Object.fromEntries(Object.entries(g).map(([k, v]) => [ROTULOS[k], v])) : null,
      GRUPOS,
      DEFAULT_PHOTO,
      OUR_CREST
    }
  },
  methods: { attrColor }
}
</script>
