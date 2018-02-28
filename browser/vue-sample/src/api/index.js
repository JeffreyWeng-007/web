const data = require('./mock-data')
const data2 = require('./mock-data2')
const LATENCY = 2000

export function getMessages (cb,t) {
  if (t == 0) {
    setTimeout(() => {
      cb(data)
    }, LATENCY)
  } else if (t == 1) {
    setTimeout(() => {
      cb(data2)
    }, LATENCY)
  }
}
