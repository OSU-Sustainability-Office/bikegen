<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-04T12:28:00-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-05T17:55:35-08:00
-->
<template>
  <el-row class='stageArea'>
    <el-col :span='18' style='height: 100%'>
      <el-row class='graphBlockRow'>
        <el-col :span='24' class='graphBlock block'>
          <linechart :chartData='data'  ref='chart' class='chart'/>
          <div class='blockOverlay'>
          </div>
        </el-col>
      </el-row>
      <el-row class='numnerAndTimerBlockRow'>
        <el-col :span='12' class='timerBlock block'>
          <div class='blockOverlay'>
          </div>
          <timer />
        </el-col>
        <el-col :span='12' class='numberBlock block'>
          <div class='blockOverlay'>
          </div>
          &nbsp;
        </el-col>
      </el-row>
    </el-col>
    <el-col :span='6' class='leaderboardBlock block'>
      <div class='blockOverlay'>
      </div>
      &nbsp;
    </el-col>
  </el-row>
</template>
<script>
import linechart from '@/components/line.js'
import timer from '@/components/timer.vue'
import { ipcRenderer } from 'electron'

export default {
  name: 'app',
  components: {
    linechart,
    timer
  },
  mounted () {

  },
  created () {
    ipcRenderer.on('serialData', (event, arg) => {
      let f = JSON.parse(arg)
      this.data.datasets[0].data.push({ x: this.data.datasets[0].data.length, y: (f[1] * f[2]) })
      this.$refs.chart.$data._chart.update()
    })
  },
  data () {
    return {
      connected: false,
      gradient: 0,
      data: {
        labels: ['Watts'],
        datasets: [
          {
            label: 'Watts',
            data: [],
            fill: true,
            borderColor: '#FFFFFF'
          }
        ]
      }
    }
  }
}
</script>
<style scoped lang='scss'>
@import "../assets/style-variables.scss";

.stageArea {
  height: 100%;
  width: 100%;
  padding: 1em;
}
.graphBlockRow {
  height: 80%;
  padding-right: 1em;
}
.numnerAndTimerBlockRow {
  height: 20%;
  padding-top: 1em;
}
.graphBlock {
  height: 100%;
  background-color: #00859B;
}
.timerBlock {
  height: 100%;
  background-color: #AA9D2E;
  margin-right: 1em;
  width: calc(50% - 1em);
}
.numberBlock {
  height: 100%;
  background-color: #D3832B;
  margin-right: 1em;
  width: calc(50% - 1em);
}
.leaderboardBlock {
  height: 100%;
  background-color: #4A773C;
}

.block {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  padding: 1em;
}
.blockOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(255,255,255,0), rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.15) 80%, rgba(255,255,255,0));
}
.chart {
  position: relative;
  top: 0;
  height: 100%;
}
</style>
