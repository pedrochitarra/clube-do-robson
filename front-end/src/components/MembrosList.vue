<template>
  <div>

    <b-table
      fixed
      v-if="listMembros"
      :items="listMembros"
      :fields="headers"
      id="my-table"
      :per-page="perPage"
      :current-page="currentPage">
      <template #cell(face)="data">
        <b-img center rounded="circle" height="100%" width="100%" :src="data.value" alt="..." />
      </template>

      <template #cell(name)="data">
        <b-btn
          variant="purple"
          :to="{
            name: 'membro',
            params: { id: data.value },
          }"
          >Detalhes</b-btn
        >
      </template>
    </b-table>

    <b-pagination
      class="paginationPurple"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

  </div>
</template>

<script>
import membrosService from '../services/membrosService'
import robsonService from '../services/robsonService'

export default {
  name: 'membros-list',
  data () {
    return {
      membros: [],
      robsoners: [],
      listMembros: [],
      fakeRobsoners: [],
      currentMembro: null,
      currentIndex: -1,
      perPage: 10,
      currentPage: 1,
      title: '',
      headers: [
        {
          key: 'face',
          label: '',
          sortable: false
        },
        {
          key: 'number',
          label: '',
          sortable: false
        },
        {
          key: 'proName',
          label: '',
          sortable: false
        },
        {
          key: 'name',
          label: '',
          sortable: false
        }
      ]
    }
  },

  computed: {
    rows () {
      return this.listMembros.length
    }
  },

  methods: {
    async getMembros (clubId) {
      membrosService
        .getAll(clubId)
        .then((response) => {
          this.membros = response.data
          console.log(response.data)
          robsonService.getAll().then((response) => {
            this.robsoners = response.data
            console.log(response.data)

            this.membros.forEach((membro, i) => {
              const face = this.robsoners.find(
                (robsoner) => robsoner.name === membro.name
              )
              if (face === undefined) {
                this.membros[i].face = 'https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg'
              } else {
                this.membros[i].number = face.number
                this.membros[i].face = face.face
              }
            })

            console.log(this.membros)

            this.listMembros = this.membros

            console.log(this.robsoners)

            this.robsoners.forEach(robsoner => {
              if (robsoner.isfake) {
                this.listMembros.push(robsoner)
              }
            })

            console.log(this.listMembros)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },

    async getRobsoners () {
      robsonService.getAll().then((response) => {
        this.robsoners = response.data
        console.log(response.data)
        this.robsoners.forEach((robsoner) => {
          this.membros.forEach((membro, i) => {
            if (membro.name === robsoner.name) {
              this.membros[i].face = robsoner.face
            } else {
              this.membros[i].face = 'https://funkyimg.com/i/3aepK.png'
            }
          })
        })
        console.log(this.membros)
      })
    },

    setActiveMembro (membro, index) {
      this.currentMembro = membro
      this.currentIndex = index
    }
  },
  async mounted () {
    await this.getMembros(this.$route.params.clubId)
  }
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

td {
  text-align: center !important;
  vertical-align: middle !important
}

</style>
