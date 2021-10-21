const { nanoid } = require('nanoid')

let buildId = 0

function getBuildId(){
  if (!buildId){
    buildId = nanoid()
  }
  return buildId
}

module.exports = getBuildId
