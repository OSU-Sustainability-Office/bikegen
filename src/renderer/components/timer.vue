<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-04T14:23:52-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-06T19:04:04-08:00
-->

<template>
  <el-row style='height: 100%'>
    <el-col :span='24' class='timer'>{{ time | format }}</el-col>
    <el-dialog title="Save Entry" :visible.sync="dialogVisible" width="30%">
        <el-input placeholder="Name" v-model="input"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel()">Cancel</el-button>
          <el-button type="primary" @click="saveTime()">Confirm</el-button>
        </span>
      </el-dialog>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'time',
      'timerRunning'
    ]),
    input: {
      get () {
        return this.$store.getters.name
      },
      set (value) {
        this.$store.dispatch('name', value)
      }
    }
  },
  watch: {
    timerRunning: function (val) {
      if (!val) {
        this.dialogVisible = true
      }
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
    saveTime: function () {
      this.dialogVisible = false
      this.$store.dispatch('pushCurrent')
    },
    cancel: function () {
      this.$store.dispatch('resetCurrent')
      this.dialogVisible = false
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
