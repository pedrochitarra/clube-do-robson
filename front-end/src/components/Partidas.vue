<template>
  <div>
    <div class='background'>
      <div class='background-partidas'>
        <div class='xlarge-purple-partidas'>
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

          <b-table :items="partidas" :fields="fields">
            <template #cell(homeCrest)="data">
              <b-img fluid center height="100%" width="100%" :src="'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l'+ data.value +'.png'" alt="..." />
            </template>
            <template #cell(awayCrest)="data">
              <b-img fluid center height="100%" width="100%" :src="'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l'+ data.value +'.png'" alt="..." />
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
      </div>
    </div>
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

body {
  background: #d1d1d1;
  /*font-family: 'Muli', sans-serif;*/

  margin: 0 auto;
  /*flex-direction: column;*/
  align-items: center;
  justify-content: center;
  height: 95vh;
  overflow: auto;
  height: auto;
  color: #333333;
  display: block
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

.background-partidas {
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

.xlarge-purple-partidas{

  /*position: absolute;*/
  width: 50%;
  /* height: 63vh; */
  padding: 5px;
  background: #9c83cc;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction:column;
  margin: 0 auto;

}

.b-table {
  width: 90%
}

@media only screen and (max-device-width: 768px) {

  .xlarge-purple-partidas {
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

}

</style>
