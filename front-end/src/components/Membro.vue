<template>
  <div class="page" v-if="membro">
    <router-link class="back" :to="{ name: 'membros', params: { clubId } }">
      <v-icon small>mdi-arrow-left</v-icon> Elenco
    </router-link>

    <section class="profile">
      <div class="fut-card">
        <div class="fut-top">
          <div class="fut-ovr">{{ overall }}</div>
          <div class="fut-pos">{{ posicao }}</div>
          <img class="fut-crest" src="/crests/99150901.png" alt="Clube do Robson">
        </div>
        <img class="fut-photo" :src="face" :alt="nome" :class="{ placeholder: !robsoner }">
        <div class="fut-name">{{ nome }}</div>
        <div class="fut-attrs" v-if="geral">
          <div v-for="a in principais" :key="a.label"><b>{{ a.value }}</b><span>{{ a.sigla }}</span></div>
        </div>
      </div>

      <div class="profile-info">
        <h1 class="page-title">{{ nome }}</h1>
        <p class="page-subtitle">{{ membro.name }}<template v-if="robsoner && robsoner.number"> · camisa {{ robsoner.number }}</template></p>

        <div class="grid grid-3 facts">
          <div class="card-x"><span class="stat-big">{{ membro.proHeight }}</span><div class="stat-label">Altura (cm)</div></div>
          <div class="card-x" v-if="robsoner && robsoner.weight"><span class="stat-big">{{ robsoner.weight }}</span><div class="stat-label">Peso (kg)</div></div>
          <div class="card-x" v-if="robsoner && robsoner.birthdate"><span class="stat-big small">{{ robsoner.birthdate }}</span><div class="stat-label">Nascimento</div></div>
        </div>

        <p class="fake-note" v-if="membro.ficticio">
          <v-icon small color="secondary">mdi-robot-happy</v-icon>
          Personagem fictício do clube: tem atributos, mas não entra nas estatísticas da EA.
        </p>
        <div class="grid grid-4 career" v-else>
          <div class="card-x" v-for="s in carreira" :key="s.label">
            <v-icon :color="s.color || 'primary'">{{ s.icon }}</v-icon>
            <span class="stat-big">{{ s.value }}</span>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-3 attrs" v-if="geral">
      <div class="card-x" v-for="g in grupos" :key="g.label">
        <h2 class="card-title-x">{{ g.label }} <span class="attr-total" :style="{ color: cor(g.total) }">{{ g.total }}</span></h2>
        <div class="attr" v-for="a in g.itens" :key="a[0]">
          <span>{{ a[0] }}</span>
          <div class="bar"><div :style="{ width: a[1] + '%', background: cor(a[1]) }"></div></div>
          <b :style="{ color: cor(a[1]) }">{{ a[1] }}</b>
        </div>
      </div>
    </section>
  </div>

  <div class="page loading" v-else>
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
import membrosService from '../services/membrosService'
import robsonService from '../services/robsonService'

// Índices de proPos usados pela API da EA
const POSICOES = ['GOL', 'LIB', 'ALD', 'LD', 'ZAD', 'ZAG', 'ZAE', 'LE', 'ALE', 'VOD', 'VOL', 'VOE', 'MD', 'MCD', 'MC', 'MCE', 'ME', 'MAD', 'MEI', 'MAE', 'SAD', 'SA', 'SAE', 'PD', 'ATD', 'ATA', 'ATE', 'PE']

// Ordem dos atributos em vproattr (string "088|089|...")
const ATRIBUTOS = ['aceleracao', 'pique', 'agilidade', 'equilibrio', 'impulsao', 'folego', 'forca', 'reacao', 'combatividade', 'frieza', 'interceptacao', 'posAtaque', 'visao', 'chuteslonge', 'forcachute', 'conducao', 'finalizacao', 'cobrancafalta', 'cabeceio', 'lancamento', 'passecurto', 'nocaodefensiva', 'cruzamento', 'controlebola', 'divididaempe', 'carrinho', 'voleio', 'curva', 'penaltis']

export default {
  name: 'membro',
  data () {
    return {
      clubId: this.$route.params.clubId,
      membro: null,
      robsoner: null,
      s: null
    }
  },
  computed: {
    nome () {
      return this.robsoner ? this.robsoner.proName : this.membro.proName
    },
    face () {
      return this.robsoner ? this.robsoner.face : require('@/assets/defaultMember.png')
    },
    // Fictícios não têm proOverall da EA: usa a média dos 6 atributos principais
    overall () {
      if (this.membro.proOverall) return this.membro.proOverall
      if (!this.geral) return '—'
      const v = Object.values(this.geral)
      return Math.round(v.reduce((a, b) => a + b, 0) / v.length)
    },
    posicao () {
      return POSICOES[parseInt(this.membro.proPos)] || ''
    },
    // Fórmulas dos 6 atributos principais do FIFA
    geral () {
      const s = this.s
      if (!s) return null
      const r = Math.round
      return {
        ritmo: r(s.pique * 0.55 + s.aceleracao * 0.45),
        finalizacao: r(s.finalizacao * 0.45 + s.chuteslonge * 0.2 + s.forcachute * 0.2 + s.posAtaque * 0.05 + s.penaltis * 0.05 + s.voleio * 0.05),
        passe: r(s.passecurto * 0.35 + s.visao * 0.2 + s.cruzamento * 0.2 + s.lancamento * 0.15 + s.curva * 0.05 + s.cobrancafalta * 0.05),
        conducao: r(s.conducao * 0.5 + s.controlebola * 0.35 + s.agilidade * 0.1 + s.equilibrio * 0.05),
        defesa: r(s.nocaodefensiva * 0.3 + s.divididaempe * 0.3 + s.interceptacao * 0.2 + s.cabeceio * 0.1 + s.carrinho * 0.1),
        fisico: r(s.forca * 0.5 + s.folego * 0.25 + s.combatividade * 0.2 + s.impulsao * 0.05)
      }
    },
    principais () {
      const g = this.geral
      return [
        { sigla: 'RIT', label: 'Ritmo', value: g.ritmo },
        { sigla: 'FIN', label: 'Finalização', value: g.finalizacao },
        { sigla: 'PAS', label: 'Passe', value: g.passe },
        { sigla: 'CON', label: 'Condução', value: g.conducao },
        { sigla: 'DEF', label: 'Defesa', value: g.defesa },
        { sigla: 'FIS', label: 'Físico', value: g.fisico }
      ]
    },
    grupos () {
      const s = this.s
      const g = this.geral
      return [
        { label: 'Ritmo', total: g.ritmo, itens: [['Aceleração', s.aceleracao], ['Pique', s.pique]] },
        { label: 'Finalização', total: g.finalizacao, itens: [['Finalização', s.finalizacao], ['Força do chute', s.forcachute], ['Chute de longe', s.chuteslonge], ['Posicionamento', s.posAtaque], ['Voleio', s.voleio], ['Pênaltis', s.penaltis]] },
        { label: 'Passe', total: g.passe, itens: [['Passe curto', s.passecurto], ['Visão', s.visao], ['Cruzamento', s.cruzamento], ['Lançamento', s.lancamento], ['Curva', s.curva], ['Cobrança de falta', s.cobrancafalta]] },
        { label: 'Condução', total: g.conducao, itens: [['Condução', s.conducao], ['Controle de bola', s.controlebola], ['Agilidade', s.agilidade], ['Equilíbrio', s.equilibrio], ['Reação', s.reacao], ['Frieza', s.frieza]] },
        { label: 'Defesa', total: g.defesa, itens: [['Noção defensiva', s.nocaodefensiva], ['Dividida em pé', s.divididaempe], ['Interceptação', s.interceptacao], ['Cabeceio', s.cabeceio], ['Carrinho', s.carrinho]] },
        { label: 'Físico', total: g.fisico, itens: [['Força', s.forca], ['Fôlego', s.folego], ['Combatividade', s.combatividade], ['Impulsão', s.impulsao]] }
      ]
    },
    carreira () {
      const m = this.membro
      return [
        { label: 'Jogos', value: m.gamesPlayed, icon: 'mdi-soccer-field' },
        { label: 'Gols', value: m.goals, icon: 'mdi-soccer' },
        { label: 'Assistências', value: m.assists, icon: 'mdi-shoe-cleat' },
        { label: 'Craque do jogo', value: m.manOfTheMatch, icon: 'mdi-star', color: 'secondary' },
        { label: 'Vitórias', value: m.winRate + '%', icon: 'mdi-trophy', color: 'success' },
        { label: 'Precisão de passe', value: m.passSuccessRate + '%', icon: 'mdi-target' },
        { label: 'Precisão de chute', value: m.shotSuccessRate + '%', icon: 'mdi-bullseye-arrow' },
        { label: 'Cartões vermelhos', value: m.redCards, icon: 'mdi-card', color: 'error' }
      ]
    }
  },
  methods: {
    cor (v) {
      return v >= 85 ? 'var(--win)' : v >= 70 ? 'var(--gold)' : v >= 50 ? '#f59f4a' : 'var(--loss)'
    }
  },
  async mounted () {
    const { id } = this.$route.params
    const [membro, robsoner] = await Promise.all([
      membrosService.get(id, this.clubId),
      robsonService.get(id)
    ])
    this.robsoner = robsoner.data[0] || null
    // Personagens fictícios (Robsoners com isfake) não existem na tabela Membros
    this.membro = membro.data[0] || {
      ficticio: true,
      name: id,
      proName: this.robsoner.proName,
      proPos: this.robsoner.proPos,
      proHeight: this.robsoner.proHeight
    }

    const partidas = this.membro.membrosMembrosPartidas || []
    const attr = partidas.length ? partidas[0].vproattr : this.robsoner && this.robsoner.vproattr
    if (attr) {
      const valores = attr.split('|').map(v => parseInt(v))
      this.s = Object.fromEntries(ATRIBUTOS.map((nome, i) => [nome, valores[i]]))
    }
  }
}
</script>

<style scoped lang="scss">
.loading { display: flex; justify-content: center; padding-top: 120px; }

.back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--muted) !important;
  margin-bottom: 16px;
  font-weight: 600;
  .v-icon { color: inherit; }
  &:hover { color: var(--text) !important; }
}

.profile { display: flex; gap: 28px; align-items: flex-start; margin-bottom: 24px; }

.fut-card {
  flex-shrink: 0;
  width: 260px;
  padding: 18px 18px 22px;
  border-radius: 22px;
  background:
    radial-gradient(260px 200px at 50% 20%, rgba(245, 197, 24, 0.35), transparent 70%),
    linear-gradient(160deg, #3a2758, #1c1329 70%);
  border: 1px solid rgba(245, 197, 24, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  position: relative;
  text-align: center;
}
.fut-top {
  position: absolute;
  top: 18px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-display);
  line-height: 1;
}
.fut-ovr { font-weight: 800; font-size: 3rem; color: var(--gold); }
.fut-pos { font-weight: 700; font-size: 1.2rem; margin-bottom: 8px; }
.fut-crest { width: 32px; height: 32px; object-fit: contain; }
.fut-photo {
  width: 190px;
  height: 190px;
  object-fit: cover;
  object-position: top;
  margin-left: 30px;
  &.placeholder { object-fit: contain; padding: 30px; opacity: 0.4; }
}
.fut-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.7rem;
  text-transform: uppercase;
  border-top: 1px solid rgba(245, 197, 24, 0.4);
  border-bottom: 1px solid rgba(245, 197, 24, 0.4);
  margin: 4px 0 12px;
  padding: 2px 0;
}
.fut-attrs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px 10px;
  font-family: var(--font-display);
  div { display: flex; gap: 6px; justify-content: center; align-items: baseline; }
  b { font-size: 1.35rem; font-weight: 800; }
  span { color: var(--muted); font-weight: 600; }
}

.profile-info { flex: 1; min-width: 0; }
.facts, .career { margin-bottom: 16px; }
.facts .card-x, .career .card-x { padding: 14px 16px; }
.stat-big.small { font-size: 1.6rem; }
.career {
  .card-x { display: flex; flex-direction: column; gap: 4px; }
  .stat-big { font-size: 2rem; }
}

.fake-note {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 12px 14px;
}

.attr-total { float: right; font-size: 1.4rem; }
.attr {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px 26px;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  font-size: 0.88rem;
  span { color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  b { font-family: var(--font-display); font-size: 1.1rem; text-align: right; }
  .bar { height: 6px; }
}

@media (max-width: 800px) {
  .profile { flex-direction: column; align-items: center; }
  .profile-info { width: 100%; }
}
</style>
