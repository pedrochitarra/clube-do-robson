<template><div class="card"><div class="card-h">{{ title }}</div><div v-for="item in items" :key="item[0]" class="kv"><span>{{ item[0] }}</span><span :class="item[2]">{{ item[1] }}</span></div></div></template>
<script>export default { name: 'MetricCard', props: { title: String, items: Array } }</script>
