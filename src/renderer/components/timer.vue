<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-04T14:23:52-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-04T16:48:00-08:00
-->

<template>
  <el-row style='height: 100%'>
    <el-col :span='20' class='timer'>{{ time | format }}</el-col>
    <el-col :span='4' style='height: 100%'>
      <el-row class='buttonRow'>
        <el-col :span='24'>
          <el-button style='width: 100%' type='success' @click='startTimer()' v-if='!timerRunning'>Start</el-button>
          <el-button style='width: 100%' type='danger' @click='stopTimer()' v-if='timerRunning'>Stop</el-button>
        </el-col>
      </el-row>
      <el-row class='buttonRow'>
        <el-col :span='24'>
          <el-button style='width: 100%' type='primary' @click='time = 0' >Reset</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      time: 0,
      timerRunning: 0
    }
  },
  filters: {
    format: (value) => {
      let min = Math.floor(value / 60)
      let sec = value % 60
      let minS = ''
      let secS = ''
      if (min === 0) {
        minS = '00'
      } else if (min < 10) {
        minS = '0' + min.toString()
      } else {
        minS = min.toString()
      }
      if (sec === 0) {
        secS = '00'
      } else if (sec < 10) {
        secS = '0' + sec.toString()
      } else {
        secS = sec.toString()
      }
      return minS + ':' + secS
    }
  },
  methods: {
    incrementTime: function () {
      if (this.timerRunning) {
        this.time++
        setTimeout(() => { this.incrementTime() }, 1000)
      }
    },
    startTimer: function () {
      this.timerRunning = 1
      setTimeout(() => { this.incrementTime() }, 1000)
    },
    stopTimer: function () {
      this.timerRunning = 0
    }
  }
}
</script>
<style scoped lang='scss'>
@import "../assets/style-variables.scss";
.timer:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.timer {
  font-size: 54px;
  height: 100%;
  color: $--color-white;
  text-align: center;
}
.buttonRow {
  height: 50%;
}
</style>
