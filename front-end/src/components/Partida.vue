<template>
  <div>
    <div class='background'>
      <div class='background-partida'>
        <header-partida v-if="tabelaPartida.length > 0" v-bind:items="tabelaPartida" :timestamp="partida.timestamp" :stadName="stadName"></header-partida>

        <stats-partida :items="arrayPartida"></stats-partida>

        <tabs-times-partida :membrosAway="membrosAway" :membrosHome="membrosHome" :clubeDoRobson="clubeDoRobson" :tabelaPartida="tabelaPartida" :squadImage="squadImage"></tabs-times-partida>
      </div>
    </div>
  </div>
</template>

<script>

import partidasService from '../services/partidasService'
import robsonService from '../services/robsonService'
import HeaderPartida from './Partida/HeaderPartida.vue'
import StatsPartida from './Partida/StatsPartida'
import TabsTimesPartida from './Partida/TabsTimesPartida.vue'

export default {
  name: 'partida',
  components: {
    HeaderPartida,
    StatsPartida,
    TabsTimesPartida
  },
  data () {
    return {
      // modalShow: null,
      fixed: true,
      membrosHome: [],
      membrosAway: [],
      membrosRobson: [],
      membrosRobsonCompleto: [],
      clubeDoRobson: null,
      tabelaPartida: [],

      opcoes: [],
      model: {
        opcoes: [],
        selected: null
      },
      currentPartida: null,
      message: '',
      seasons: [],
      partida: [],
      arrayPartida: [],
      membroResgatado: null,
      currentIndex: -1
    }
  },
  methods: {

    async getPartida () {
      const partidaId = this.$route.params.partidaId
      const response = await partidasService.getOne(partidaId)

      this.partida = response.data[0]

      this.stadName = this.partida.partidasHomeClub.stadname
      this.partida.passes = 'Passes'
      this.partida.posse = 'Posse de bola'
      this.partida.chutes = 'Chutes'
      this.partida.precisao = 'Precisão no passe'
      this.partida.divididas = 'Divididas'

      const homeClub = this.partida.homeClub
      const awayClub = this.partida.awayClub
      let homeClubStats = []
      let awayClubStats = []

      this.partida.partidasClubesPartidas.forEach(stats => {
        if (stats.clubId === homeClub) {
          homeClubStats = stats
        } else if (stats.clubId === awayClub) {
          awayClubStats = stats
        }
      })

      if (homeClubStats.clubId === 6703918) {
        this.clubeDoRobson = 'HOME'
      } else {
        this.clubeDoRobson = 'AWAY'
      }

      if (this.partida.partidasAwayClub.iscustomteam === 1) {
        this.partida.awayCrest = this.partida.partidasAwayClub.customcrestid
      } else if (this.partida.partidasAwayClub.iscustomteam === 0) {
        this.partida.awayCrest = this.partida.partidasAwayClub.teamId
      }
      if (this.partida.partidasHomeClub.iscustomteam === 1) {
        this.partida.homeCrest = this.partida.partidasHomeClub.customcrestid
      } else if (this.partida.partidasHomeClub.iscustomteam === 0) {
        this.partida.homeCrest = this.partida.partidasHomeClub.teamId
      }

      const tentativasPasseAway = awayClubStats.passattempts
      const passesAway = awayClubStats.passesmade
      const precisaoAway = passesAway / tentativasPasseAway

      this.partida.partidasClubesPartidas.tentativasPasseAway = tentativasPasseAway
      this.partida.partidasClubesPartidas.passesAway = passesAway
      this.partida.partidasClubesPartidas.precisaoPasseAway = parseFloat(precisaoAway * 100).toFixed(2) + ' %'

      const tentativasPasseHome = homeClubStats.passattempts
      const passesHome = homeClubStats.passesmade
      const precisaoHome = passesHome / tentativasPasseHome

      this.partida.partidasClubesPartidas.tentativasPasseHome = tentativasPasseHome
      this.partida.partidasClubesPartidas.passesHome = passesHome
      this.partida.partidasClubesPartidas.precisaoPasseHome = parseFloat(precisaoHome * 100).toFixed(2) + ' %'

      let posseDeBolaAway = passesAway / (passesAway + passesHome)
      posseDeBolaAway = parseFloat(posseDeBolaAway * 100).toFixed(2)

      let posseDeBolaHome = 100 - posseDeBolaAway
      posseDeBolaHome = parseFloat(posseDeBolaHome).toFixed(2)

      this.partida.partidasClubesPartidas.posseAway = posseDeBolaAway + ' %'
      this.partida.partidasClubesPartidas.posseHome = posseDeBolaHome + ' %'

      this.arrayPartida = [
        {
          casa: homeClubStats.passesmade,
          label: 'Passes',
          fora: awayClubStats.passesmade
        },
        {
          casa: this.partida.partidasClubesPartidas.precisaoPasseHome,
          label: 'Precisão no passe',
          fora: this.partida.partidasClubesPartidas.precisaoPasseAway
        },
        {
          casa: this.partida.partidasClubesPartidas.posseHome,
          label: 'Posse de bola',
          fora: this.partida.partidasClubesPartidas.posseAway
        },
        {
          casa: homeClubStats.shots,
          label: 'Chutes',
          fora: awayClubStats.shots
        },
        {
          casa: homeClubStats.tacklesmade,
          label: 'Divididas',
          fora: awayClubStats.tacklesmade
        }
      ]

      this.partida.partidasMembrosPartidas.forEach(membro => {
        if (membro.clubid === homeClubStats.clubId) {
          this.membrosHome.push(membro)
          if (membro.clubid === 6703918) {
            this.membrosRobson.push(membro)
          }
        } else {
          this.membrosAway.push(membro)
          if (membro.clubid === 6703918) {
            this.membrosRobson.push(membro)
          }
        }
      })

      this.squadImage = this.getSquadImage()
      console.log(this.squadImage)
      const resposta = await robsonService.getAll()
      this.robsoners = resposta.data

      let membroResgatado = null
      this.membrosRobson.forEach((membro, i) => {
        membroResgatado = this.robsoners.find(
          (robsoner) => robsoner.name === membro.name
        )
        console.log(membro)
        if (membroResgatado) {
          this.membrosRobson[i].face = membroResgatado.face
        }
      })

      this.tabelaPartida = [this.partida]
    },

    getSquadImage () {
      let squadImage = ''
      if (this.membrosRobson.length === 2) {
        if (this.membrosRobson.find(element => element.name === 'Pedro_H77') && this.membrosRobson.find(element => element.name === 'bastospereira')) { squadImage = 'banjo-canuto.png' }
        if (this.membrosRobson.find(element => element.name === 'bastospereira') && this.membrosRobson.find(element => element.name === 'El_Wandershow')) { squadImage = 'canuto-sins.png' }
      }

      if (this.membrosRobson.length === 3) {
        console.log('TRESSSS')
        if (this.membrosRobson.find(element => element.name === 'Pedro_H77') && this.membrosRobson.find(element => element.name === 'bastospereira') && this.membrosRobson.find(element => element.name === 'ThePedroso')) { squadImage = 'banjo-canuto-toto.png' }
        if (this.membrosRobson.find(element => element.name === 'Pedro_H77') && this.membrosRobson.find(element => element.name === 'bastospereira') && this.membrosRobson.find(element => element.name === 'El_Wandershow')) { squadImage = 'banjo-canuto-sins.png' }
        if (this.membrosRobson.find(element => element.name === 'bastospereira') && this.membrosRobson.find(element => element.name === 'ThePedroso') && this.membrosRobson.find(element => element.name === 'El_Wandershow')) { squadImage = 'canuto-toto-sins.png' }
      }
      return squadImage
    }
  },
  async created () {
    this.message = ''
    console.log(this.$route.params)
    await this.getPartida()
    // this.getPartidas(null, this.$route.params.clubId);
  }
}
</script>

<style>
td {
  vertical-align: middle !important;
}

.edit-form {
  max-width: 300px;
  margin: auto;
}

.btable {
  text-align: center;
  vertical-align: middle;
  table-layout: fixed;

}

td {
  text-align: center;
}

th {
  text-align: center;
}

div.card-body {
  text-align: center;
}

.spanCenter {
  float:center
}

.modal-body {
  margin: 0 auto
}

</style>
