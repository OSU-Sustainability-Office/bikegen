<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-04T11:26:52-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-05T17:50:16-08:00
-->

<template>
  <el-container id="app">
    <el-header>
      <el-col :span='22'>
        OSU Bike Generator
      </el-col>
      <el-col :span='2'>
        <el-popover placement="left" width="400" trigger="hover">
          <el-table :data="gridData">
            <el-table-column width="300" property="name" label="Name">
              <template slot-scope="scope">
                <div @click='selectDevice(scope.$index)'>{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column width="100" property="selected" label="">
              <template slot-scope="scope">
                <i v-if='gridData[scope.$index].selected' class="el-icon-check" @click='selectDevice(scope.$index)'></i>
              </template>
            </el-table-column>
          </el-table>
          <i slot='reference' class="icon el-icon-setting"></i>
        </el-popover>
      </el-col>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      © 2019 Oregon State University
    </el-footer>
  </el-container>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'bikegen',
  data () {
    return {
      gridData: []
    }
  },
  mounted () {
    ipcRenderer.send('connectDevice', '')
  },
  created () {
    ipcRenderer.on('addDevice', (event, arg) => {
      if (this.gridData.map(e => { return e.name }).indexOf(arg) < 0) {
        this.gridData.push({ name: arg, selected: false })
      }
    })
  },
  methods: {
    selectDevice: function (value) {
      ipcRenderer.send('disconnectDevice', '')
      new Promise((resolve, reject) => {
        ipcRenderer.on('disconnectSuccess', (event, arg) => {
          for (let device of this.gridData) {
            device.selected = false
          }
          resolve()
        })
        ipcRenderer.on('disconnectError', (event, arg) => {
          reject(new Error('Could not disconnect device'))
        })
      }).then(() => {
        ipcRenderer.send('chooseDevice', value + 1)
        new Promise((resolve, reject) => {
          ipcRenderer.on('connectError', (event, arg) => {
            reject(new Error(arg))
          })
          ipcRenderer.on('connectSuccess', (event, arg) => {
            resolve()
          })
        }).then(() => {
          // success
          this.gridData[value].selected = true
        }).catch((e) => {
          console.log(e.message)
        })
      }).catch(e => {
        console.log(e.message)
      })
    }
  }
}
</script>

<style lang='scss'>
$--font-path: '~element-ui/packages/theme-chalk/src/fonts';
@import "~element-ui/packages/theme-chalk/src/index";
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@font-face {
    font-family: 'StratumNo2';
    src: url('assets/StratumNo2-Bold.woff2') format('woff2'),
        url('assets/StratumNo2-Bold.woff') format('woff'),
        url('assets/StratumNo2-Bold.ttf') format('truetype'),
        url('assets/StratumNo2-Bold.svg#StratumNo2-Bold') format('svg');
    font-weight: bold;
    font-style: normal;
}
body {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
}
</style>

<style scoped lang='scss'>
@import "assets/style-variables.scss";
.el-container {
  padding: 0;
  margin: 0;
}
.el-header {
  background-color: $--color-primary;
  text-align: center;
  font-family: "StratumNo2";
  font-size: 52px;
  line-height: 100px;
  height: 100px !important;
  color: $--color-white;
}
.el-main {
  background-color: $--color-black;
  height: calc(100vh - 118px);
}
.el-footer {
  position: absolute;
  bottom: 0;
  width: 100vw;
  background-color: $--color-primary;
  height: 18px !important;
  line-height: 18px;
  text-align: center;
  font-size: 14px;
  color: $--color-white;
}
.icon {
  cursor: pointer;
}
.icon:hover {
  color: $--color-black;
}
.el-icon-check {
  color: $--color-primary;
  font-size: 32px;
}
</style>
