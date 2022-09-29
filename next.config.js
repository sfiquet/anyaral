const getBuildId = require('./util/buildid.js')

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: process.env.LINTMODE === 'nolint', // for fastbuild script
  },
  generateBuildId: getBuildId,
}

let pwa = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  dynamicStartUrl: false, // precache home page instead of storing it in runtime cache by default
  register: false,
  skipWaiting: false,
  buildExcludes: [/middleware-manifest\.json$/], // for Next 12, see https://github.com/shadowwalker/next-pwa/issues/288
}

// Attribute additionalManifestEntries is only needed for the build and 
// time-consuming to generate.
// So we only calculate it if we are actually generating the production build
if (process.env.PRECACHE === 'true'){
  const getStaticPrecacheEntries = require('./util/staticprecache.js')
  const getGeneratedPrecacheEntries = require('./util/precache.js')

  const buildId = getBuildId()

  pwa.additionalManifestEntries = [
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
}

const withPWA = require('next-pwa')(pwa)

module.exports = withPWA(nextConfig)
