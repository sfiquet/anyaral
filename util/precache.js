const path = require('path')
const fs = require('fs')

const pages = [
  {
    route: '/',
    precacheHtml: false, // next-pwa already caches the home page
    precacheJson: false, // no props
  },
  {
    route: '/about',
    precacheHtml: false,
    precacheJson: true,
  },
  {
    route: '/denizens',
    precacheHtml: true, // this is now the start url for A2HS
    precacheJson: true,
  },
  {
    route: '/denizens/',
    precacheHtml: false,
    precacheJson: true,
    dynamicPages: getDenizenPages(),
  },
];

// utility functions copied from lib/data.js since you can't import it
function readJsonFile(dataFile){
  let json = fs.readFileSync(dataFile, {encoding: 'utf8'});
  return JSON.parse(json);
}

function getAllCreatures(){
  const dataDir = path.posix.join(process.cwd(), 'data');

  let rawObj = readJsonFile(path.posix.join(dataDir, 'creatures_list.json'));
  // version checking would take place here if needed
  return rawObj.data;
}
// end of utility functions from lib/data.js

// extract the list of all denizen pages
function getDenizenPages(){
  let denizens = getAllCreatures();
  return denizens.map(denizen => denizen.code);
}

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

function getGeneratedPrecacheEntries(buildId){
  if (typeof buildId !== 'string'){
    console.error('getGeneratedPrecacheEntries: buildId should be a string', buildId)
    return
  } else if (buildId === ''){
    console.error('getGeneratedPrecacheEntries: buildId cannot be an empty string')
    return
  }

  return pages.map(page => getPageEntries(buildId, page)).reduce((acc, curr) => acc.concat(curr), []);
}

module.exports = getGeneratedPrecacheEntries
