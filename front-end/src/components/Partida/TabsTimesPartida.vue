<template>
    <div>
        <b-tabs fill>
          <b-tab v-if="tabelaPartida.length > 0" v-bind:title="tabelaPartida[0].partidasHomeClub.name" active>
            <b-table elevation-1 align="center" class="btable" bordered outlined small text-center striped hover :items="membrosHome" :fields="fieldsCompact">
                <template #cell(name)="data">
                    <b-btn variant="purple" @click="showModalMember(data)">
                        <b-icon icon="file-bar-graph"/>
                    </b-btn>
                </template>
                <template #cell(mom)="data">
                    <b-icon icon="star-fill" v-if="data.value=='1'"/>
                </template>
            </b-table>
            <b-btn v-if="clubeDoRobson == 'HOME'" variant="purple" class="button-right" id="show-btn" @click="showModal">Escalação</b-btn>
          </b-tab>
          <b-tab v-if="tabelaPartida.length > 0" v-bind:title="tabelaPartida[0].partidasAwayClub.name">
            <b-table align="center" class="btable" bordered outlined small text-center striped hover :items="membrosAway" :fields="fieldsCompact">
                <template #cell(name)="data">
                    <b-btn variant="purple" @click="showModalMember(data)">
                        <b-icon icon="file-bar-graph"/>
                    </b-btn>
                </template>
                <template #cell(mom)="data">
                    <b-icon icon="star-fill" v-if="data.value=='1'"/>
                </template>
            </b-table>
            <b-btn v-if="clubeDoRobson == 'AWAY'" variant="purple" class="button-right" id="show-btn" @click="showModal">Escalação</b-btn>
          </b-tab>
        </b-tabs>

        <b-modal centered id="modal-tall" size="xl" ref="my-modal" ok-only>
                <b-img
                v-if="squadImage"
                fluid
                center
                :src="require(`@/assets/squads/${squadImage}`)"/>
        </b-modal>

        <b-modal centered id="my-modal" size="xl" ref="my-modal-1" ok-only>
            <!--Hello {{selectedMember.item}}-->
            <b-card>
            <strong>{{selectedMember.item.membrosPartidasMembros.proName}}</strong>
            <p></p>
            Gols {{selectedMember.item.goals}}
            <br>
            Assistências {{selectedMember.item.assists}}
            <br>
            Tentativas de passe {{selectedMember.item.passattempts}}
            <br>
            Passes feitos {{selectedMember.item.passesmade}}
            <br>
            Nota{{selectedMember.item.rating}}
            <br>
            Divididas tentadas{{selectedMember.item.tackleattempts}}
            <br>
            Divididas com sucesso{{selectedMember.item.tacklesmade}}
            </b-card>
        </b-modal>

    </div>
</template>

<script>
export default {
  props: {
    membrosHome: Array,
    membrosAway: Array,
    clubeDoRobson: String,
    tabelaPartida: Array,
    squadImage: String
    // fieldsMembros: Array
    // fields: Array
  },
  data () {
    return {
      modalShow: null,
      selectedMember: {
        item: {
          goals: 0,
          assists: 0,
          passesmade: 0,
          passattempts: 0,
          tacklesmade: 0,
          tackleattempts: 0,
          rating: 0,
          membrosPartidasMembros: 0
        }
      },
      fields: [
        {
          key: 'membrosPartidasMembros.proName',
          label: 'Nome',
          sortable: false,
          align: 'center'
        },
        {
          key: 'passattempts',
          label: 'Tentativas de passe',
          sortable: false,
          align: 'center'
        },
        {
          key: 'passesmade',
          label: 'Passes feitos',
          sortable: false,
          align: 'center'
        },
        {
          key: 'shots',
          label: 'Chutes',
          sortable: false,
          align: 'center'
        },
        {
          key: 'goals',
          label: 'Gols',
          sortable: false,
          align: 'center'
        },
        {
          key: 'assists',
          label: 'Assistências',
          sortable: false,
          align: 'center'
        },
        {
          key: 'mom',
          label: '',
          sortable: false,
          align: 'center'
        },
        {
          key: 'rating',
          label: 'Nota',
          sortable: false,
          align: 'center'
        }
      ],
      fieldsCompact: [
        {
          key: 'membrosPartidasMembros.proName',
          label: 'Nome',
          sortable: false,
          align: 'center'
        },
        {
          key: 'goals',
          label: 'G',
          sortable: false,
          align: 'center'
        },
        {
          key: 'assists',
          label: 'A',
          sortable: false,
          align: 'center'
        },
        {
          key: 'mom',
          label: '',
          sortable: false,
          align: 'center'
        },
        {
          key: 'rating',
          label: 'Nota',
          sortable: false,
          align: 'center'
        },
        {
          key: 'name',
          label: ''
        }
      ],
      fieldsMembros: [
        {
          key: 'membrosPartidasMembros.proName',
          label: 'Nome',
          sortable: false,
          align: 'center'
        },
        {
          key: 'passattempts',
          label: 'Tentativas de passe',
          sortable: false,
          align: 'center'
        },
        {
          key: 'passesmade',
          label: 'Passes feitos',
          sortable: false,
          align: 'center'
        },
        {
          key: 'shots',
          label: 'Chutes',
          sortable: false,
          align: 'center'
        },
        {
          key: 'goals',
          label: 'Gols',
          sortable: false,
          align: 'center'
        },
        {
          key: 'assists',
          label: 'Assistências',
          sortable: false,
          align: 'center'
        },
        {
          key: 'mom',
          label: '',
          sortable: false,
          align: 'center'
        },
        {
          key: 'rating',
          label: 'Nota',
          sortable: false,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },

    showModalMember (data) {
      this.selectedMember = data
      this.$refs['my-modal-1'].show()
    }
  },
  created () {
    console.log(this.tabelaPartida)
    /* this.selectedMember["item"]["goals"] = 0;
    this.selectedMember["item"]["assists"] = 0;
    this.selectedMember["item"]["passesmade"] = 0;
    this.selectedMember["item"]["passattempts"] = 0;
    this.selectedMember["item"]["tacklesmade"] = 0;
    this.selectedMember["item"]["tackleattempts"] = 0;
    this.selectedMember["item"]["rating"] = 0;
    this.selectedMember["membrosPartidasMembros"]["proName"] = 0; */
  }
}
</script>
