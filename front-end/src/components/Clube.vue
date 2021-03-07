<template>
  <div v-if='currentClube'>
    <div class='background'>
      <div class='background-clubs'>
        <div class='line-1-clubs'>
          <div class='small-purple'>
            <p style='text-align: center'>
              <strong>Histórico Geral</strong>
            </p>
            <span class='leftFix'>Jogos</span>
            <span class='rightFix'>{{ seasonalData.totalgames }}</span>
            <br />
            <span class='leftFix'>Vitórias</span>
            <span class='rightFix'>{{ seasonalData.wins }}</span>
            <br />
            <span class='leftFix'>Empates</span>
            <span class='rightFix'>{{ seasonalData.ties }}</span>
            <br />
            <span class='leftFix'>Derrotas</span>
            <span class='rightFix'>{{ seasonalData.losses }}</span>
          </div>
          <div class='small-purple'>
            <p style='text-align: center'>
              <strong>Temporadas</strong>
            </p>
            <span class='leftFix'>Total de temporadas</span>
            <span class='rightFix'>{{ seasonalData.seasons }}</span>
            <br />
            <span class='leftFix'>Total de Títulos</span>
            <span class='rightFix'>{{ seasonalData.titleswon }}</span>
            <br />
            <span class='leftFix'>Melhor divisão</span>
            <span class='rightFix'>{{ seasonalData.bestdivision }}</span>
            <br />
            <span class='leftFix'>Melhor pontuação</span>
            <span class='rightFix'>{{ seasonalData.bestpoints }}</span>
            <br />
            <span class='leftFix'>Acessos</span>
            <span class='rightFix'>{{ seasonalData.promotions }}</span>
            <br />
            <span class='leftFix'>Rebaixamentos</span>
            <span class='rightFix'>{{ seasonalData.relegations }}</span>
            <br />
          </div>
          <div class='small-purple'>
            <p style='text-align: center'>
              <strong>Desempenho</strong>
            </p>
            <span class='leftFix'>Gols marcados</span>
            <span class='rightFix'>{{ seasonalData.alltimegoals }}</span>
            <br />
            <span class='leftFix'>Gols sofridos</span>
            <span class='rightFix'>{{ seasonalData.alltimegoalsagainst }}</span>
            <br />
            <span class='leftFix'>Pontos no ranking</span>
            <span class='rightFix'>{{ seasonalData.rankingpoints }}</span>
            <br />
            <span class='leftFix'>Reputação</span>
            <span class='rightFix'>{{ seasonalData.starlevel }}</span>
          </div>
        </div>

        <div class='line-2-clubs'>
          <div class='x-large-purple-clube'>
            <line-chart
              class='seasonal-chart'
              v-if='seasonalData != null'
              :chartData='chartData'
              :options='chartOptions'
            />
            <div class='seasonal-chart'>
              <b-img
              fluid
              id="url"/>
            </div>
          </div>
        </div>
        <div class='line-2-clubs'>
          <div class='x-large-purple-clube'>
            <p style='text-align: center'>
              <strong>Títulos</strong>
            </p>
              <div id="slider" class="slider">
                <Slider :seasonalData="seasonalData"></Slider>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clubesService from '../services/clubesService'
import seasonalService from '../services/seasonalService'
import LineChart from '../components/Pizza.vue'
import Slider from '../components/Slider.vue'

export default {
  name: 'clube',
  components: {
    LineChart, Slider
  },
  data () {
    return {
      currentClube: null,
      seasonalData: null,
      message: '',
      chartOptions: {
        responsive: true,
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
        backgroundColor: [
          'rgba(22, 204, 28, 0.7)',
          'rgba(232, 232, 16,0.7)',
          'rgba(232, 16, 23,0.7)'
        ],
        label: '',
        data: [
          this.seasonalData.wins,
          this.seasonalData.ties,
          this.seasonalData.losses
        ]
      })

      this.chartData.labels = ['Vitórias', 'Empates', 'Derrotas']
    }
  },

  async mounted () {
    this.message = ''
    await this.getClube(this.$route.params.id)
    await this.getSeasonal()
  }
}
</script>

<style scoped>

body {
  background: #d1d1d1;
  /*font-family: 'Muli', sans-serif;*/
  display: flex;
  margin: 0;
  /*flex-direction: column;*/
  align-items: center;
  justify-content: center;
  height: 90vh;
  overflow: hidden;
  color: #333333;
}

.rightFix {
  float: right;
}

.leftFix {
  float: left;
}

.headerClube {
  padding: 0.1%;
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
  /*position: relative;*/
  margin: 10px auto;
}

.line-1-clubs {
  position: relative;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
}

.line-2-clubs {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

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
  font-size: 16px;
  /*font-size: 1vw;*/
}

.large-purple {
  /*position: absolute;*/
  width: 50%;
  /* height: 63vh; */
  padding: 5px;
  background: #9c83cc;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  /*display: flex;*/
  margin: 10px;
}

img {
  margin: 0 auto
}

.x-large-purple-clube {
  /*position: absolute;*/
  width: 95%;
  /* height: 63vh; */
  padding: 5px;
  background: #9c83cc;
  border-radius: 20px;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction:column;
  margin: 10px;
  max-height: 650px
}

#canvas {
  width: 90%;
  margin: 0 auto
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

  .large-purple {
    /*position: absolute;*/
    width: 50%;
    /* height: 63vh; */
    padding: 5px;
    background: #9c83cc;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    /*display: flex;*/
    margin: 10px;
  }

}

</style>
