/**
 * Created by monk on 2018/3/1.
 */

var stateMachine = require('javascript-state-machine')

var fsm = new stateMachine({
  init: 'liquid',
  transitions: [
    {
      name: 'melt', from: 'solid', to: 'liquid'
    },
    {
      name: 'freeze', from: 'liquid', to: 'solid'
    },
    {
      name: 'vaporize', from: 'liquid', to: 'gas'
    },
    {
      name: 'condense', from: 'gas', to: 'liquid'
    }
  ],
  methods: {
    onMelt: function () {
      console.log('I melted')
    },
    onFrezze: function () {
      console.log('I froze')
    },
    onVaporize: function () {
      console.log('I vaporized')
    },
    onCondense: function () {
      console.log('I condensed')
    }
  }
})

console.log(fsm.state)
fsm.vaporize()