var _ = require('lodash');
var ps = require('current-processes');
 
function getProcesses() {
    return new Promise((resolve, reject) => {
       ps.get(function(err, processes) {
          if(err) {
              reject(err)

          } 
          var sorted = _.sortBy(processes, 'cpu');
          var top10  = sorted.reverse().splice(0, 10);
   
          resolve(top10);
        });
    });
}
module.exports = getProcesses;