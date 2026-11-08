<template>
  <!-- Hexágono de habilidades: um eixo por atributo (0–99), grade em 25/50/75/99 (ui.radar do Python) -->
  <svg :viewBox="`0 0 ${size} ${size}`" style="width:100%;display:block;margin:auto" :style="{ maxWidth: size + 'px' }" role="img" aria-label="Hexágono de habilidades">
    <polygon v-for="(f, i) in [0.25, 0.5, 0.75, 1]" :key="f" :points="poly(nomes.map(() => f))" fill="none" :stroke="`rgba(255,255,255,${(0.06 + 0.04 * i).toFixed(2)})`"/>
    <line v-for="(a, i) in ang" :key="'e' + i" :x1="c" :y1="c" :x2="pt(a, 1)[0]" :y2="pt(a, 1)[1]" stroke="rgba(255,255,255,.08)"/>
    <polygon :points="poly(fs)" fill="rgba(245,197,24,.22)" stroke="#f5c518" stroke-width="2" stroke-linejoin="round"/>
    <circle v-for="(a, i) in ang" :key="'p' + i" :cx="pt(a, fs[i])[0]" :cy="pt(a, fs[i])[1]" r="3.5" fill="#f5c518"/>
    <g v-for="(a, i) in ang" :key="'t' + i" font-family="Barlow Condensed, sans-serif" text-anchor="middle">
      <text :x="pt(a, 1.25)[0]" :y="pt(a, 1.25)[1] - 5" fill="#a99cc0" font-weight="700" font-size="13">{{ nomes[i] }}</text>
      <text :x="pt(a, 1.25)[0]" :y="pt(a, 1.25)[1] + 13" :fill="attrColor(valores[nomes[i]])" font-weight="800" font-size="19">{{ valores[nomes[i]] }}</text>
    </g>
  </svg>
</template>

<script>
import { attrColor } from '../utils/ui'

export default {
  name: 'Radar',
  props: { valores: { type: Object, required: true }, size: { type: Number, default: 300 } },
  computed: {
    nomes () { return Object.keys(this.valores) },
    c () { return this.size / 2 },
    r () { return this.size / 2 - 46 },
    ang () { return this.nomes.map((_, i) => -Math.PI / 2 + i * 2 * Math.PI / this.nomes.length) },
    fs () { return this.nomes.map(n => this.valores[n] / 99) }
  },
  methods: {
    attrColor,
    pt (a, f) { return [this.c + this.r * f * Math.cos(a), this.c + this.r * f * Math.sin(a)] },
    poly (fs) { return this.ang.map((a, i) => this.pt(a, fs[i]).map(v => v.toFixed(1)).join(',')).join(' ') }
  }
}
</script>
