<template>
  <div>
    <br>
    <v-select
      class="select"
      placeholder = "Escolha a temporada"
      v-model= "selectedSeason"
      :items="opcoes"
      item-text="label"
      item-value="value"
      v-on:input="getPartidas"
      ></v-select>

    <b-table fixed responsive :items="partidas" :fields="fields">
      <template #cell(homeCrest)="data">
        <b-img fluid center :src="'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l'+ data.value +'.png'" alt="..." />
      </template>
      <template #cell(awayCrest)="data">
        <b-img fluid center :src="'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l'+ data.value +'.png'" alt="..." />
      </template>
      <template #cell(matchId)="data">
        <b-btn
        variant="purple"
        :to="{
          name:'partida',
          params: {partidaId: data.value}
        }"
        >Detalhes</b-btn>
      </template>
    </b-table>
  </div>
</template>

<script>
// import clubesService from "../services/clubesService";
import clubesPartidasService from '../services/clubesPartidas'
// import partidasService from "../services/partidasService"

export default {
  name: 'partidas',
  data () {
    return {
      selectedSeason: {
        label: 'Escolha a temporada',
        value: null
      },
      fields: [
        {
          key: 'homeCrest',
          label: '',
          sortable: false
        },
        /* {
          key: "partidasHomeClub.name",
          label: "Casa",
          sortable: false,
        }, */
        {
          key: 'homeGoals',
          label: '',
          sortable: false
        },
        {
          key: 'awayGoals',
          label: '',
          sortable: false
        },
        /* {
          key: "partidasAwayClub.name",
          label: "Fora",
          sortable: false,
        }, */
        {
          key: 'awayCrest',
          label: '',
          sortable: false
        },
        {
          key: 'matchId',
          label: '',
          sortable: false
        }
      ],
      opcoes: [],
      model: {
        opcoes: [],
        selected: null
      },
      currentPartida: null,
      message: '',
      seasons: [],
      partidas: [],
      currentIndex: -1
    }
  },
  methods: {
    getPartidas (seasonId) {
      const clubId = this.$route.params.clubId
      console.log(clubId)
      console.log(seasonId)
      clubesPartidasService
        .getBySeason(clubId, seasonId)
        .then((response) => {
          console.log(response.data.partidasSeason)
          this.partidas = response.data.partidasSeason

          console.log(this.partidas)

          this.partidas.forEach((partida, i) => {
            if (partida.partidasAwayClub.iscustomteam === 1) {
              this.partidas[i].awayCrest = this.partidas[i].partidasAwayClub.customcrestid
            } else if (partida.partidasAwayClub.iscustomteam === 0) {
              this.partidas[i].awayCrest = this.partidas[i].partidasAwayClub.teamId
            }
            if (partida.partidasHomeClub.iscustomteam === 1) {
              this.partidas[i].homeCrest = this.partidas[i].partidasHomeClub.customcrestid
            } else if (partida.partidasHomeClub.iscustomteam === 0) {
              this.partidas[i].homeCrest = this.partidas[i].partidasHomeClub.teamId
            }
          })

          console.log(this.partidas)
        })
        .catch((e) => {
          console.log(e)
        })
    },

    async getSeasons (clubId) {
      console.log(clubId)
      const response = await clubesPartidasService.getSeasons(clubId)
      console.log(response)
      response.data.forEach((season) => {
        if (season.seasonid != null) {
          this.seasons.push(season.seasonid)
        }
      })
      this.seasons = [...new Set(this.seasons)]
      this.seasons = this.seasons.sort((a, b) => {
        return b - a
      })
      console.log(this.seasons)
      this.seasons.forEach(season => {
        console.log(season)
        this.opcoes.push({
          label: 'Temporada ' + season,
          value: season
        })
      })
      console.log(this.opcoes)
    },

    setActivePartida (partida, index) {
      this.currentPartida = partida
      this.currentIndex = index
    }

  },

  async mounted () {
    this.message = ''
    console.log(this.$route.params)
    await this.getSeasons(this.$route.params.clubId)
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
}

</style>
