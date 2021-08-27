const withPWA = require('next-pwa')
const nextBuildId = require('next-build-id')

// ** adapted from next-pwa index.js since it doesn't set up its own entries when additionalManifestEntries is specified
const path = require('path')
const fs = require('fs')
const globby = require('globby')
const crypto = require('crypto')

const getRevision = data => crypto.createHash('md5').update(data).digest('hex')
const getFileRevision = file => getRevision(fs.readFileSync(file))

// precache files in public folder
function getStaticPrecacheEntries(){
  // set up properties used in next-pwa code to precache the public folder
  // Since we currently use the defaults, there is no need to pass them to withPWA
  const basePath = '/'
  const sw = 'sw.js'
  // exclude icon-related files from the precache since they are platform specific
  // note: no need to pass publicExcludes to next-pwa, it's not used for anything else
  const publicExcludes = [
    '!*.png',
    '!*.ico',
    '!browserconfig.xml',
  ]
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
    url: path.posix.join(basePath, `/${f}`),
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
// end of utility functions from lib/api.js

// extract the list of all denizen pages
function getDenizenPages(){
  let denizens = getAllCreatures();
  return denizens.map(denizen => denizen.code);
}

const pages = [
  {
    route: '/',
    precacheHtml: true,
    precacheJson: false, // no props
  },
  {
    route: '/about',
    precacheHtml: false,
    precacheJson: true,
  },
  {
    route: '/denizens',
    precacheHtml: false,
    precacheJson: true,
  },
  {
    route: '/denizens/',
    precacheHtml: false,
    precacheJson: true,
    dynamicPages: getDenizenPages(),
  },
];

function getPageJSONPath(buildId, pageRoute){
  return path.posix.join('/_next/data/', buildId, `${pageRoute}.json`);
}

function getJSONEntry(buildId, pageRoute){
  return {
    url: getPageJSONPath(buildId, pageRoute),
    revision: null,
  };
}

function getHTMLEntry(buildId, pageRoute){
  return {
    url: pageRoute,
    revision: buildId,
  };
}

function getNormalPageEntries(buildId, page){
  let entries = [];
  if (page.precacheHtml){
    entries.push(getHTMLEntry(buildId, page.route));
  }
  if (page.precacheJson){
    entries.push(getJSONEntry(buildId, page.route));
  }
  return entries;
}

function getDynamicPageEntries(buildId, page){
  let pageList = page.dynamicPages.map(actualPage => path.posix.join(page.route, actualPage));
  let entries = pageList.map(route => getNormalPageEntries(
    buildId, { route: route, precacheHtml: page.precacheHtml, precacheJson: page.precacheJson })
  );
  return entries.reduce((acc, curr) => acc.concat(curr), []);
}

function getPageEntries(buildId, page){
  if (Array.isArray(page.dynamicPages)){
    return getDynamicPageEntries(buildId, page);
  } else {
    return getNormalPageEntries(buildId, page);
  }
}

function getGeneratedPrecacheEntries(){
  const buildId = nextBuildId.sync();
  return pages.map(page => getPageEntries(buildId, page)).reduce((acc, curr) => acc.concat(curr), []);
}

module.exports = withPWA({
  generateBuildId: () => nextBuildId(),
  pwa: {
    dest: 'public',
    additionalManifestEntries: [...getStaticPrecacheEntries(), ...getGeneratedPrecacheEntries()],
  }
})
