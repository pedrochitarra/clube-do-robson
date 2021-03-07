<script>
import { Pie } from 'vue-chartjs'

function done () {
  const myLine = document.getElementById('pie-chart').getContext('2d')
  console.log(myLine)
  const url = myLine.canvas.toDataURL()
  const canvasDiv = document.getElementById('pie-chart')

  document.getElementById('url').src = url
  canvasDiv.style.display = 'none'
  console.log(url)
}

export default {
  extends: Pie,
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    console.log(this.chartData)
    console.log(this.options)
    this.renderChart(this.chartData, {
      bezierCurve: false,
      animation: {
        onComplete: done
      }
    })
  }
}
</script>
