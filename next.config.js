const { nanoid } = require('nanoid')
const getStaticPrecacheEntries = require('./util/staticprecache.js')
const getGeneratedPrecacheEntries = require('./util/precache.js')

const buildId = nanoid()

const nextConfig = {
  generateBuildId: () => buildId,
}

const cacheEntries = [
  ...getStaticPrecacheEntries({
    // exclude icon-related files from the precache since they are platform specific
    // note: no need to pass publicExcludes to next-pwa, it's not used for anything else
    publicExcludes: [
      '!*.png',
      '!*.ico',
      '!browserconfig.xml',
    ],
  }), 
  ...getGeneratedPrecacheEntries(buildId),
]

const pwa = {
  additionalManifestEntries: cacheEntries,
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  dynamicStartUrl: false, // precache home page instead of storing it in runtime cache by default
  register: false,
  skipWaiting: false,
  buildExcludes: [/middleware-manifest\.json$/], // for Next 12, see https://github.com/shadowwalker/next-pwa/issues/288
}

const withPWA = require('next-pwa')(pwa)

module.exports = withPWA(nextConfig)
