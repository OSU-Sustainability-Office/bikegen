<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-06T21:05:48-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-06T21:14:48-08:00
-->

<template>
  <el-row style='height: 100%'>
    <el-col :span='24' class='total'>{{ Math.round(total) }} w</el-col>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'total'
    ])
  }
}
</script>
<style scoped lang='scss'>
@import "../assets/style-variables.scss";
.total:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.total {
  font-size: 54px;
  height: 100%;
  color: $--color-white;
  text-align: center;
}
</style>
