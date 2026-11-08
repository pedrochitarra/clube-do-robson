<template>
  <section class="card-x stats-card" v-if="items && items.length">
    <h2 class="card-title-x">Estatísticas</h2>
    <div class="stat-row" v-for="s in items" :key="s.label">
      <div class="values">
        <span :class="{ lead: num(s.casa) > num(s.fora) }">{{ s.casa }}</span>
        <span class="label">{{ s.label }}</span>
        <span :class="{ lead: num(s.fora) > num(s.casa) }">{{ s.fora }}</span>
      </div>
      <div class="bars">
        <div class="bar home"><div :style="{ width: share(s.casa, s.fora) + '%' }"></div></div>
        <div class="bar away"><div :style="{ width: share(s.fora, s.casa) + '%' }"></div></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    items: Array
  },
  methods: {
    num (v) {
      return parseFloat(v) || 0
    },
    share (a, b) {
      const total = this.num(a) + this.num(b)
      return total ? (this.num(a) / total) * 100 : 50
    }
  }
}
</script>

<style scoped lang="scss">
.stats-card { margin-bottom: 16px; }

.stat-row { padding: 10px 0; border-bottom: 1px solid var(--border); &:last-child { border-bottom: 0; } }

.values {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
  span { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; min-width: 70px; }
  span:last-child { text-align: right; }
  .lead { color: var(--gold); }
  .label {
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 0.8rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-align: center;
    min-width: 0;
  }
}

.bars { display: flex; gap: 6px; }
.bars .bar { flex: 1; height: 8px; }
.bar.home { justify-content: flex-end; > div { background: var(--brand); } }
.bar.away > div { background: var(--gold); }
</style>
