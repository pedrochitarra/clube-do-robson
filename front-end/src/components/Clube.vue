<template>
  <div v-if="currentClube">
    <!--<b-card-group deck class="headerClube">
      <b-card>
      <b-img
          fluid
          height="100%"
          width="100%"
          v-bind:src="'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l'+ currentClube.customcrestid +'.png'"
          alt="..."
        />
        Clube do Robson
      </b-card>
    </b-card-group>-->
    <b-card-group deck>
        <b-card v-if="seasonalData">
          <strong>Histórico Geral</strong>
          <p></p>
          <span class="leftFix">Jogos</span> <span class="rightFix">{{seasonalData.totalgames}}</span>
          <br>
          <span class="leftFix">Vitórias</span> <span class="rightFix">{{seasonalData.wins}}</span>
          <br>
          <span class="leftFix">Empates</span> <span class="rightFix">{{seasonalData.ties}}</span>
          <br>
          <span class="leftFix">Derrotas</span> <span class="rightFix">{{seasonalData.losses}}</span>
        </b-card>

      <b-card >
        <line-chart
          class="pie"
          v-if="seasonalData != null"
          :chartData="chartData"
          :options="chartOptions"
        />
      </b-card>
    </b-card-group>

    <b-card-group deck>
        <b-card v-if="seasonalData">
          <strong>Desempenho</strong>
          <p></p>
          <span class="leftFix">Gols marcados</span> <span class="rightFix">{{seasonalData.alltimegoals}}</span>
          <br>
          <span class="leftFix">Gols sofridos</span> <span class="rightFix">{{seasonalData.alltimegoalsagainst}}</span>
          <br>
          <span class="leftFix">Pontos no ranking</span> <span class="rightFix">{{seasonalData.rankingpoints}}</span>
          <br>
          <span class="leftFix">Reputação</span> <span class="rightFix">{{seasonalData.starlevel}}</span>
        </b-card>

      <b-card >
        <strong>Temporadas</strong>
          <p></p>
          <span class="leftFix">Total de temporadas</span> <span class="rightFix">{{seasonalData.seasons}}</span>
          <br>
          <span class="leftFix">Total de Títulos</span> <span class="rightFix">{{seasonalData.titleswon}}</span>
          <br>
          <span class="leftFix">Melhor divisão</span> <span class="rightFix">{{seasonalData.bestdivision}}</span>
          <br>
          <span class="leftFix">Melhor pontuação</span> <span class="rightFix">{{seasonalData.bestpoints}}</span>
          <br>
          <span class="leftFix">Acessos</span> <span class="rightFix">{{seasonalData.promotions}}</span>
          <br>
          <span class="leftFix">Rebaixamentos</span> <span class="rightFix">{{seasonalData.relegations}}</span>
          <br>
      </b-card>
    </b-card-group>

  </div>
</template>

<script>

import clubesService from '../services/clubesService'
import seasonalService from '../services/seasonalService'
import LineChart from '../components/Pizza.vue'

export default {
  name: 'clube',
  components: {
    LineChart
  },
  data () {
    return {
      currentClube: null,
      seasonalData: null,
      message: '',
      chartOptions: {
        title: {
          display: false
        }

      },
      chartData: {}
    }
  },
  methods: {
    async getClube (id) {
      const response = await clubesService.get(id)
      this.currentClube = response.data
      console.log(this.currentClube)
    },

    async getSeasonal () {
      const response = await seasonalService.getAll()
      this.seasonalData = response.data
      console.log(this.seasonalData)

      this.chartData.datasets = []
      this.chartData.datasets.push({
        backgroundColor: ['rgba(22, 204, 28, 0.7)', 'rgba(232, 232, 16,0.7)', 'rgba(232, 16, 23,0.7)'],
        label: '',
        data: [
          this.seasonalData.wins,
          this.seasonalData.ties,
          this.seasonalData.losses
        ]
      })

      this.chartData.labels = [
        'Vitórias',
        'Empates',
        'Derrotas'
      ]
    }

  },

  async mounted () {
    this.message = ''
    await this.getClube(this.$route.params.id)
    await this.getSeasonal()
  }
}
</script>

<style>

.rightFix {
  float: right;
}

.leftFix {
  float: left;
}

.card {
  text-align: center;
  vertical-align: middle;
  table-layout: fixed;
}

.card-deck{
  padding: 1% 5%
}

.headerClube{
  padding: 0.1%
}

#pie-chart {
  max-width: 70%;
  max-height: 70%;
  margin: 0 auto
  /*margin: 0 auto;*/
}
</style>
