<template>
  <div class='background'>
      <div class='background-clubs'>

        <div class='xlarge-purple'>
          <b-table

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
    </div>
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
                this.membros[i].face = require('@/assets/defaultMember.png')
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

body {
  background: #d1d1d1;
  /*font-family: 'Muli', sans-serif;*/

  margin: 0;
  /*flex-direction: column;*/
  align-items: center;
  justify-content: center;
  height: 90vh;

  color: #333333;
}

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

td {
  text-align: center !important;
  vertical-align: middle !important
}

.background {
  background: #d1d1d1;
}

.background-clubs {
  /*position: relative;*/
  width: 90vw;
  /* height: 90vh; */
  background: #d1d1d1;
  /*display: flex;*/
    align-items: center;
  justify-content: center;
  /*position: relative;*/
  margin: 10px auto;
}

.table-members {
  position: relative;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  background: #9c83cc;
}

.xlarge-purple {
  /*position: absolute;*/
  width: 50%;
  /* height: 63vh; */
  padding: 5px;
  background: #9c83cc;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  /*display: flex;*/
  margin: 0 auto;
}

a.btn.btn-purple {
  color: #6F42C1;
}

/* MOBILE */
@media only screen and (max-device-width: 768px) {
  .small-purple {
    /*position: absolute;*/
    width: 28%;
    /* height: 23vh; */
    background-color: #9c83cc;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    padding: 5px;
    /*display: flex;*/
    margin: 10px;
    font-size: 12px;
    /*font-size: 1vw;*/
  }

  .xlarge-purple {
    /*position: absolute;*/
    width: 100%;
    /* height: 63vh; */
    padding: 5px;
    background: #9c83cc;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    /*display: flex;*/
    font-size: 12px;
    margin: 10px;
  }

  .btn {
    font-size: 12px
  }

  #pie-chart {
    width: 30vh;
    height: 30vh;
  }

}

</style>
