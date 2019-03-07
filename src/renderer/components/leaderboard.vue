<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-06T20:01:08-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-06T21:04:54-08:00
-->

<template>
  <el-row style='height: 100%'>
    <el-col :span='24' style='height: 100%'>
      <el-row class='title'>
        <el-col :span='24'> Leaderboard </el-col>
      </el-row>
      <el-row class='content'>
        <el-col :span='24'>
          <el-row class='rowtitles'>
            <el-col :span='6' class='total'>
              Watts
            </el-col>
            <el-col :span='12'>
              Name
            </el-col>
            <el-col :span='6' class='time'>
              Time
            </el-col>
          </el-row>
          <el-row class='rowdata' v-for='(row, index) in leaderboard.sort((a, b) => { return b.total - a.total })' :key='index'>
            <el-col :span='6' class='total'>
              {{ Math.round(row.total) }}
            </el-col>
            <el-col :span='12'>
              {{ row.name }}&nbsp;
            </el-col>
            <el-col :span='6' class='time'>
              {{ row.time | format }}
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
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
  computed: {
    ...mapGetters([
      'leaderboard'
    ])
  }
}
</script>
<style scoped lang='scss'>
@import "../assets/style-variables.scss";
.title {
  font-size: 32px;
  font-family: "StratumNo2";
  text-align: center;
  color: $--color-white;
}
.content {
  padding-top: 1em;
}
.rowdata {
  padding-top: 0.2em;
  height: 20px;
  font-size: 16px;
  color: $--color-white;
  text-align: left;
}
.total {
  text-align: left;
  font-weight: bold;
}
.time {
  text-align: right;
}
.rowtitles .total {
  font-weight: normal;
}
.rowtitles {
  color: darken($--color-white, 5%);
  border-bottom: 1px solid darken($--color-white, 40%);
  padding-bottom: 0.2em;
}
</style>
