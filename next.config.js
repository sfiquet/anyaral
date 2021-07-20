const withPWA = require('next-pwa')
const nextBuildId = require('next-build-id')

// set up properties used in next-pwa code to precache the public folder
const subdomainPrefix = ''
const publicExcludes = []
const sw = 'sw.js'

// ** adapted from next-pwa index.js since it doesn't set up its own entries when additionalManifestEntries is specified
const path = require('path')
const fs = require('fs')
const globby = require('globby')
const crypto = require('crypto')

const getRevision = data => crypto.createHash('md5').update(data).digest('hex')
const getFileRevision = file => getRevision(fs.readFileSync(file))

// precache files in public folder
function getStaticPrecacheEntries(){
  let manifestEntries = globby
  .sync(
    [
      '**/*',
      '!workbox-*.js',
      '!workbox-*.js.map',
      '!worker-*.js',
      '!worker-*.js.map',
      '!fallback-*.js',
      '!fallback-*.js.map',
      `!${sw.replace(/^\/+/, '')}`,
      `!${sw.replace(/^\/+/, '')}.map`,
      ...publicExcludes
    ],
    {
      cwd: 'public'
    }
  )
  .map(f => ({
    url: path.posix.join(subdomainPrefix, `/${f}`),
    revision: getFileRevision(`public/${f}`)
  }))
  return manifestEntries
}

// ** end of next-pwa code


// utility functions copied from lib/api.js since you can't import it
const dataDir = path.posix.join(process.cwd(), 'data');

function readJsonFile(dataFile){
  let json = fs.readFileSync(dataFile, {encoding: 'utf8'});
  return JSON.parse(json);
}

function getAllCreatures(){
  let rawObj = readJsonFile(path.posix.join(dataDir, 'creatures_list.json'));
  // version checking would take place here if needed
  return rawObj.data;
}

// extract the list of all denizen pages
function getDenizenPages(){
  let denizenPath = '/denizens/'
  let buildId = nextBuildId.sync()
  let denizens = getAllCreatures()
  let htmlEntries = denizens.map(denizen => ({
    url: path.posix.join(denizenPath, denizen.code),
    revision: buildId,
  }))
  //console.log('htmlEntries', htmlEntries)
  return htmlEntries
}

function getGeneratedPrecacheEntries(){
  // TO DO: add other pages
  return getDenizenPages()
}

module.exports = withPWA({
  generateBuildId: () => nextBuildId(),
  pwa: {
    dest: 'public',
    additionalManifestEntries: [...getStaticPrecacheEntries(), ...getGeneratedPrecacheEntries()],
    subdomainPrefix,
    publicExcludes,
    sw,
  }
})
