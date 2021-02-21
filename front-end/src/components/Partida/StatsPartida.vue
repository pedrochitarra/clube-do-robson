<template>
  <b-table align="center" :items="items" :fields="fields"></b-table>
</template>

<script>
export default {
  props: {
    items: Array
    // fields: Array
  },
  data () {
    return {
      fields: [
        {
          key: 'casa',
          label: '',
          sortable: false
        },
        {
          key: 'label',
          label: '',
          text: '',
          sortable: false,
          align: 'center'
        },
        {
          key: 'fora',
          label: '',
          sortable: false,
          align: 'center'
        }
      ]
    }
  },
  mounted () {
    console.log(this.fields)
  }
}
</script>
