var osu = require('node-os-utils')
var mem = osu.mem
  
function getMemoria() {
    return mem.info()
}

module.exports = getMemoria;  