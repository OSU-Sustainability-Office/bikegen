/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-06T13:35:37-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-06T20:56:19-08:00
 */

const state = {
  current: {
    name: '',
    data: [],
    time: 0,
    total: 0,
    timerRunning: 0
  },
  leaderBoard: []
}

const mutations = {
  pushCurrent (state) {
    state.leaderBoard.push({ name: state.current.name, time: state.current.time, total: state.current.total })
  },
  pushData (state, payload) {
    state.current.total += payload.y
    state.current.data.push(payload)
  },
  incrementTimer (state) {
    if (state.current.timerRunning) {
      state.current.time++
    }
  },
  startTimer (state) {
    state.current.timerRunning = 1
  },
  stopTimer (state) {
    state.current.timerRunning = 0
  },
  resetCurrent (state) {
    state.current = {
      name: '',
      data: [],
      time: 0,
      total: 0,
      timerRunning: 0
    }
  },
  setName (state, payload) {
    state.current.name = payload
  }
}

const actions = {
  pushCurrent (state, payload) {
    state.commit('pushCurrent', payload)
    state.commit('resetCurrent')
  },
  pushData (state, payload) {
    state.commit('pushData', payload)
  },
  incrementTimer ({ commit, dispatch, getters }) {
    if (getters.timerRunning) {
      commit('incrementTimer')
      setTimeout(() => { dispatch('incrementTimer') }, 1000)
    }
  },
  startTimer ({ commit, dispatch }) {
    commit('startTimer')
    setTimeout(() => { dispatch('incrementTimer') }, 1000)
  },
  stopTimer (state) {
    state.commit('stopTimer')
  },
  resetCurrent (state) {
    state.commit('resetCurrent')
  },
  name (state, p) {
    state.commit('setName', p)
  }
}

const getters = {
  name (state) {
    return state.current.name
  },
  total (state) {
    return state.current.total
  },
  data (state) {
    return state.current.data
  },
  time (state) {
    return state.current.time
  },
  timerRunning (state) {
    return state.current.timerRunning
  },
  leaderboard (state) {
    return JSON.parse(JSON.stringify(state.leaderBoard))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
