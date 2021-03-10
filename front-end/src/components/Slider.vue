<template>

  <div class = 'slither-slider'>

    <slither-slider :options="{
        fullscreen:false,
        //numberOfSlides: 1,
        dots: false,
      }">
      <!-- Slide 1 -->
      <div>
        1a Divisão
        <b-img
        fluid
        center
        :src="require(`@/assets/trophies/league.png`)"/>
        {{seasonalData.leaguewins}}
      </div>
      <div>
        Divisões 2 e 3
        <b-img
        fluid
        center
        :src="require(`@/assets/trophies/2-3.png`)"/>
        {{seasonalData.divswon2}}
      </div>
      <div>
        Divisões 4, 5, 6 e 7
        <b-img
        fluid
        center
        :src="require(`@/assets/trophies/4-5-6-7.png`)"/>
        {{seasonalData.divswon3}}
      </div>
      <div>
        Divisões 8, 9 e 10
        <b-img
        fluid
        center
        :src="require(`@/assets/trophies/8-9-10.png`)"/>
        {{seasonalData.divswon4}}
      </div>
    </slither-slider>

  </div>

</template>

<script>

export default {
  props: {
    seasonalData: {
      type: Object,
      default: null
    }
  },
  mounted () {
    console.log(this.seasonalData)
  }
}
</script>

<style>

.slither-slider{
  text-align: center
}

</style>
