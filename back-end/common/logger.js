const tracer = require('tracer')
const colors = require('colors')

module.exports = tracer.colorConsole({
  level: 'log',
  filters: {
    log: colors.cyan,
    trace: colors.magenta,
    debug: colors.blue,
    info: colors.green,
    warn: colors.yellow,
    error: [colors.red.bold]
  },
  format: '{{path}}:{{line}} \n> {{message}}\n'
})
