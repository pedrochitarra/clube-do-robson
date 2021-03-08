<template>
<div>
  <div v-if="currentMembro">

    <b-modal ref="my-modal" ok-only class='purple-modal'>
        <div class='line-1-member'>
          <div class='small-modal-purple'>
            <strong>Ritmo <span>{{statsMembro.geralPace}}</span> </strong>
            <p></p>
            <span class="statsName">Aceleração</span> <span class="stats">{{statsMembro.aceleracao}}</span>
            <br>
            <span class="statsName">Pique</span> <span class="stats">{{statsMembro.pique}}</span>
          </div>
          <div class='small-modal-purple'>
            <strong>Finalização {{statsMembro.geralFinishing}}</strong>
            <p></p>
            <span class="statsName">Chute</span> <span class="stats">{{statsMembro.finalizacao}}</span>
            <br>
            <span class="statsName">Cobrança de falta</span><span span class="stats">{{statsMembro.aceleracao}}</span>
            <br>
            <span class="statsName">Cabeceio</span><span class="stats">{{statsMembro.cabeceio}}</span>
            <br>
            <span class="statsName">Força do chute</span><span class="stats">{{statsMembro.forcachute}}</span>
            <br>
            <span class="statsName">Chutes de longe</span><span class="stats">{{statsMembro.chuteslonge}}</span>
            <br>
            <span class="statsName">Voleio</span><span class="stats">{{statsMembro.voleio}}</span>
            <br>
            <span class="statsName">Penâltis</span><span class="stats">{{statsMembro.penaltis}}</span>
          </div>
        </div>
      <div class='line-1-member'>
        <div class='small-modal-purple'>
            <strong>Passe {{statsMembro.geralPassing}}</strong>
            <p></p>
            <span class="statsName">Visão</span> <span class="stats">{{statsMembro.visao}}</span>
            <br>
            <span class="statsName">Cruzamento</span><span span class="stats">{{statsMembro.cruzamento}}</span>
            <br>
            <span class="statsName">Lançamento</span><span class="stats">{{statsMembro.lancamento}}</span>
            <br>
            <span class="statsName">Passe curto</span><span class="stats">{{statsMembro.passecurto}}</span>
            <br>
            <span class="statsName">Curva</span><span class="stats">{{statsMembro.curva}}</span>
        </div>
        <div class='small-modal-purple'>
            <strong>Condução {{statsMembro.geralDribbling}}</strong>
            <p></p>
            <span class="statsName">Agilidade</span> <span class="stats">{{statsMembro.agilidade}}</span>
            <br>
            <span class="statsName">Equilíbrio</span><span span class="stats">{{statsMembro.equilibrio}}</span>
            <br>
            <span class="statsName">Posicionamento</span><span class="stats">{{statsMembro.posAtaque}}</span>
            <br>
            <span class="statsName">Controle de bola</span><span class="stats">{{statsMembro.controlebola}}</span>
            <br>
            <span class="statsName">Condução</span><span class="stats">{{statsMembro.conducao}}</span>
        </div>
      </div>
      <div class='line-1-member'>
        <div class='small-modal-purple'>
            <strong>Defesa {{statsMembro.geralDefending}}</strong>
            <p></p>
            <span class="statsName">Interceptação</span> <span class="stats">{{statsMembro.interceptacao}}</span>
            <br>
            <span class="statsName">Marcação</span><span span class="stats">{{statsMembro.nocaodefensiva}}</span>
            <br>
            <span class="statsName">Dividida</span><span class="stats">{{statsMembro.divididaempe}}</span>
            <br>
            <span class="statsName">Carrinho</span><span class="stats">{{statsMembro.carrinho}}</span>
        </div>
        <div class='small-modal-purple'>
            <strong>Físico {{statsMembro.geralPhysical}}</strong>
            <p></p>
            <span class="statsName">Impulsão</span> <span class="stats">{{statsMembro.impulsao}}</span>
            <br>
            <span class="statsName">Fôlego</span><span span class="stats">{{statsMembro.folego}}</span>
            <br>
            <span class="statsName">Força</span><span class="stats">{{statsMembro.forca}}</span>
            <br>
            <span class="statsName">Reação</span><span class="stats">{{statsMembro.reacao}}</span>
            <br>
            <span class="statsName">Combatividade</span><span class="stats">{{statsMembro.combatividade}}</span>
            <br>
            <span class="statsName">Frieza</span><span class="stats">{{statsMembro.frieza}}</span>
        </div>
      </div>

    </b-modal>

  </div>

  <div v-if="currentMembro">
    <div class='background'>
      <div class='background-member'>
        <div class='line-1-member'>
          <div class='small-purple'>
            <b-img
              fluid
              height="150%"
              width="150%"
              v-bind:src="robsoner.face"
              alt="..."
            />
            {{ currentMembro.proName }}
          </div>
          <div class='small-purple'>
            <b-img
              fluid
              v-bind:src="
                'https://www.ea.com/fifa/ultimate-team/web-app/content/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/fut/items/images/mobile/flags/card/' +
                currentMembro.proNationality +
                '.png'
              "
            />
            <p>Nacionalidade</p>

            {{ currentMembro.proHeight }} cm
            <p>Altura</p>

            {{ robsoner.weight }} kg
            <p>Peso</p>
          </div>
          <div class='small-purple'>
            {{ robsoner.birthdate }}
            <p>Nascimento</p>

            {{ robsoner.position }}
            <p>Posição</p>

            {{ robsoner.number }}
            <p>Número</p>
          </div>
        </div>

        <!--ARRUMAR CANVAS
        <div class='line-2-member'>
          <div class='x-large-purple-member'>
              <line-chart
                class="hexagon"
                v-if="chartData != null"
                :chartData="chartData"
                :options="chartOptions"
              />

              <b-btn  variant="purple" class="button-right" id="show-btn" @click="showModal">Detalhes</b-btn>
          </div>
        </div>-->
        <div class='line-2-member'>
          <div class='x-large-purple-member'>
            <div class='stats-row'>
              Jogos <img width=20px src="../assets/football-icons/field2.svg"/> {{ currentMembro.gamesPlayed }}
            </div>
            <div class='stats-row'>
              Gols <img width=20px src="../assets/football-icons/football.svg"/> {{ currentMembro.goals }}
            </div>
            <div class='stats-row'>
              Assistências <img width=20px src="../assets/football-icons/assistencia1.svg"/> {{ currentMembro.assists }}
            </div>
            <div class='stats-row'>
              Melhor em campo <img width=20px src="../assets/football-icons/motm.svg"/> {{ currentMembro.manOfTheMatch }}
            </div>
            <div class='stats-row'>
              Precisão dos Passes <img width=20px src="../assets/football-icons/precisaopasses.svg"/> {{ currentMembro.passSuccessRate }} %
            </div>
            <div class='stats-row'>
              Passes <img width=20px src="../assets/football-icons/passes.svg"/> {{ currentMembro.passesMade }}
            </div>
            <div class='stats-row'>
              Cartões Vermelhos <img width=20px src="../assets/football-icons/vermelho.svg"/> {{ currentMembro.redCards }}
            </div>
            <div class='stats-row'>
              Precisão dos Chutes <img width=20px src="../assets/football-icons/playe.svg"/> {{ currentMembro.shotSuccessRate }} %
            </div>
            <div class='stats-row'>
              Porcentagem de vitória <img width=20px src="../assets/football-icons/vitoria.svg"/> {{ currentMembro.winRate }} %
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import membrosService from '../services/membrosService'
import robsonService from '../services/robsonService'
// import LineChart from '../components/RadarHex.vue'

export default {
  name: 'membro',
  components: {

  },
  data () {
    return {
      modalShow: null,
      currentMembro: null,
      message: '',
      positions: [
        'GK',
        'SW',
        'RWB',
        'RB',
        'RCB',
        'CB',
        'LCB',
        'LB',
        'LWB',
        'RDM',
        'CDM',
        'LDM',
        'RM',
        'RCM',
        'CM',
        'LCM',
        'LM',
        'RAM',
        'CAM',
        'LAM',
        'RF',
        'CF',
        'LF',
        'RW',
        'RS',
        'ST',
        'LS',
        'LW'
      ],
      arrayStats: [],
      chartOptions: {
        title: {
          display: false
        }
        // backgroundColor: 'rgba(225, 21, 232, 1)'
      },
      chartData: {}
    }
  },
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    async getMembro (id, clubId) {
      const response = await membrosService.get(id, clubId)
      this.currentMembro = response.data[0]
      console.log('ROBSONER', this.robsoner)
      console.log('MEMBRO::', this.currentMembro)
      if (this.robsoner.isfake) {
        this.arrayStats = this.robsoner.vproattr.split('|')
        this.currentMembro = this.robsoner
      } else {
        this.arrayStats = this.currentMembro.membrosMembrosPartidas[0].vproattr.split('|')
      }
      console.log(this.arrayStats)

      this.statsMembro = {
        aceleracao: parseInt(this.arrayStats[0]),
        pique: parseInt(this.arrayStats[1]),
        agilidade: parseInt(this.arrayStats[2]),
        equilibrio: parseInt(this.arrayStats[3]),
        impulsao: parseInt(this.arrayStats[4]),
        folego: parseInt(this.arrayStats[5]),
        forca: parseInt(this.arrayStats[6]),
        reacao: parseInt(this.arrayStats[7]),
        combatividade: parseInt(this.arrayStats[8]),
        frieza: parseInt(this.arrayStats[9]),
        interceptacao: parseInt(this.arrayStats[10]),
        posAtaque: parseInt(this.arrayStats[11]),
        visao: parseInt(this.arrayStats[12]),
        chuteslonge: parseInt(this.arrayStats[13]),
        forcachute: parseInt(this.arrayStats[14]),
        conducao: parseInt(this.arrayStats[15]),
        finalizacao: parseInt(this.arrayStats[16]),
        cobrancafalta: parseInt(this.arrayStats[17]),
        cabeceio: parseInt(this.arrayStats[18]),
        lancamento: parseInt(this.arrayStats[19]),
        passecurto: parseInt(this.arrayStats[20]),
        nocaodefensiva: parseInt(this.arrayStats[21]),
        cruzamento: parseInt(this.arrayStats[22]),
        controlebola: parseInt(this.arrayStats[23]),
        divididaempe: parseInt(this.arrayStats[24]),
        carrinho: parseInt(this.arrayStats[25]),
        voleio: parseInt(this.arrayStats[26]),
        curva: parseInt(this.arrayStats[27]),
        penaltis: parseInt(this.arrayStats[28]),
        goleiro: parseInt(this.arrayStats[29]),
        mergulho: parseInt(this.arrayStats[30]),
        manejo: parseInt(this.arrayStats[31]),
        chutegoleiro: parseInt(this.arrayStats[32]),
        reflexos: parseInt(this.arrayStats[33])
      }

      this.statsMembro.geralFinishing =
        this.statsMembro.finalizacao * 0.45 +
        this.statsMembro.chuteslonge * 0.2 +
        this.statsMembro.forcachute * 0.2 +
        this.statsMembro.posAtaque * 0.05 +
        this.statsMembro.penaltis * 0.05 +
        this.statsMembro.voleio * 0.05

      this.statsMembro.geralFinishing = Math.round(
        this.statsMembro.geralFinishing
      )

      this.statsMembro.geralPace =
        this.statsMembro.pique * 0.55 + this.statsMembro.aceleracao * 0.45

      this.statsMembro.geralPace = Math.round(
        this.statsMembro.geralPace
      )

      this.statsMembro.geralPassing =
        this.statsMembro.passecurto * 0.35 +
        this.statsMembro.visao * 0.2 +
        this.statsMembro.cruzamento * 0.2 +
        this.statsMembro.lancamento * 0.15 +
        this.statsMembro.curva * 0.05 +
        this.statsMembro.cobrancafalta * 0.05

      this.statsMembro.geralPassing = Math.round(
        this.statsMembro.geralPassing
      )

      this.statsMembro.geralDribbling =
        this.statsMembro.conducao * 0.5 +
        this.statsMembro.controlebola * 0.35 +
        this.statsMembro.agilidade * 0.1 +
        this.statsMembro.equilibrio * 0.05

      this.statsMembro.geralDribbling = Math.round(
        this.statsMembro.geralDribbling
      )

      this.statsMembro.geralDefending =
        this.statsMembro.nocaodefensiva * 0.3 +
        this.statsMembro.divididaempe * 0.3 +
        this.statsMembro.interceptacao * 0.2 +
        this.statsMembro.cabeceio * 0.1 +
        this.statsMembro.carrinho * 0.1

      this.statsMembro.geralDefending = Math.round(
        this.statsMembro.geralDefending
      )

      this.statsMembro.geralPhysical =
        this.statsMembro.forca * 0.5 +
        this.statsMembro.folego * 0.25 +
        this.statsMembro.combatividade * 0.2 +
        this.statsMembro.impulsao * 0.05

      this.statsMembro.geralPhysical = Math.round(
        this.statsMembro.geralPhysical
      )

      this.chartData.datasets = []
      this.chartData.datasets.push({
        // backgroundColor: 'rgba(225, 21, 232, 0.1)',
        label: '',
        data: [
          this.statsMembro.geralFinishing,
          this.statsMembro.geralPassing,
          this.statsMembro.geralDribbling,
          this.statsMembro.geralDefending,
          this.statsMembro.geralPhysical,
          this.statsMembro.geralPace
        ]
      })

      console.log(this.statsMembro)
      this.chartData.labels = [
        'Finalização',
        'Passe',
        'Condução',
        'Defesa',
        'Físico',
        'Ritmo'
      ]

      console.log(this.chartData)
      console.log(this.currentMembro)

      this.positions.forEach((pos, i) => {
        console.log(pos, i)
        if (i === parseInt(this.currentMembro.proPos)) {
          this.robsoner.position = pos
        }
      })
      console.log(this.robsoner)
    },

    async getRobsoner (name) {
      robsonService.get(name).then((response) => {
        this.robsoner = response.data[0]
        console.log(response.data)

        console.log(this.robsoner)
      })
    }
  },

  async mounted () {
    this.message = ''
    console.log(this.$route.params)
    await this.getRobsoner(this.$route.params.id)
    await this.getMembro(this.$route.params.id, this.$route.params.clubId)
    /* const myLine = document.getElementById('radar-chart').getContext('2d')
    console.log(myLine)
    const url = myLine.canvas.toDataURL()
    const canvasDiv = document.getElementById('radar-chart')
    document.getElementById('url').src = url
    canvasDiv.style.display = 'none'
    console.log(url) */
  }
}

</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

div.col{
  text-align: center !important;
}

.btable {
  text-align: center;
  vertical-align: middle;
  table-layout: fixed;
}

.card {
  text-align: center;
  vertical-align: middle;
  table-layout: fixed;
}

#radar-chart {
  margin: 0 auto;
}

.centerVertical {
  margin: auto 0;
}

.button-right{
  float: right
}

.stats {
  float: right;
}

.statsName {
  float: left;
}

.card-body {
  vertical-align: center;
}

.row {
     display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.background {
  background: #d1d1d1;
}

.background-member {
  /*position: relative;*/
  width: 90vw;
  /* height: 90vh; */
  background: #d1d1d1;
  /*display: flex;*/
  /*position: relative;*/
  margin: 10px auto;
}

.line-1-member {
  position: relative;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
}

.line-2-member {
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
  text-align: center;
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
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction:column;
  margin: 10px;
}

.x-large-purple-member {
  /*position: absolute;*/
  width: 100%;
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

.row {
  margin: auto 0
}

.modal-content{
  background-color: #432875;
  border: 0
}

.modal-body{
  border-color: #432875
}

.close{
  color: #fff
}

.close:hover {
  color: #432875
}

.small-modal-purple {
  /*position: absolute;*/
  width: 45%;
  /* height: 23vh; */
  background-color: #9c83cc;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px;
  /*display: flex;*/
  margin: 10px;
  font-size: 16px;
  /*font-size: 1vw;*/
}

.btn.btn-primary {
  background-color: #9c83cc;
  border-color: #9c83cd
}

.stats-row {
  padding: 20px;
  text-align: center;
  justify-content: space-between;

}

#canvas {
  width: 90%;
  margin: 10px
}

img {
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
    padding: 10px;
    /*display: flex;*/
    margin: 10px;
    font-size: 12px;
    /*font-size: 1vw;*/
  }

  .large-purple {
    /*position: absolute;*/
    width: 50%;
    /* height: 63vh; */
    padding: 1px;
    background: #9c83cc;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction:column;
    font-size: 12px;
    /*display: flex;*/
    margin: 10px;
  }

  .row {
    justify-content: space-between
  }

}

</style>
