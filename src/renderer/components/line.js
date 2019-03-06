/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-04T13:23:51-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-04T16:14:47-08:00
 */

import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        elements: {
          line: {
            tension: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontSize: 24,
            fontColor: '#FFF',
            fontFamily: 'Open Sans'
          },
          onHover: function (e) {
            e.target.style.cursor = 'pointer'
          }
        },
        hover: {
          onHover: function (e) {
            e.target.style.cursor = 'default'
          }
        },
        scales: {
          xAxes: [{
            type: 'linear',
            gridLines: {
              display: false,
              color: '#FFFFFF'
            },
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 24,
              fontColor: '#FFF',
              fontFamily: 'Open Sans'
            },
            gridLines: {
              display: true,
              color: 'rgba(255,255,255, 0.5)'
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    this.gradient.addColorStop(1, 'rgba(255, 255, 255, 0.25)')
    // this.gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    this.chartData.datasets[0].backgroundColor = this.gradient
    this.renderChart(this.chartData, this.options)
  }
}
