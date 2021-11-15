const withPWA = require('next-pwa')
const { PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  const config = {
		...defaultConfig,
    eslint: {
      ignoreDuringBuilds: process.env.LINTMODE === 'nolint', // for fastbuild script
    },
		pwa: {
			dest: 'public',
			dynamicStartUrl: false, // precache home page instead of storing it in runtime cache by default
      register: false,
      skipWaiting: false,
      buildExcludes: [/middleware-manifest\.json$/], // for Next 12, see https://github.com/shadowwalker/next-pwa/issues/288
		},
	}

	if (phase === PHASE_PRODUCTION_BUILD){
    // Attributes generateBuildId and additionalManifestEntries are only needed
    // for the build and calculating their value is time-consuming.
    // So we add them here, just for the build.
    const getBuildId = require('./util/buildid.js')
    const getStaticPrecacheEntries = require('./util/staticprecache.js')
    const getGeneratedPrecacheEntries = require('./util/precache.js')

		const buildId = getBuildId()

		config.generateBuildId = getBuildId
		config.pwa.additionalManifestEntries = [
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
	
  return withPWA(config)
}
