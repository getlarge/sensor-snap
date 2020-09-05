module.exports = {
	title: 'Aloes - SensorSnap',
	base: '/sensor-snap/',
	dest: 'public',
	themeConfig: {
		logo: '/logo.png',
		repo: 'https://framagit.org/aloes/sensor-snap',
		repoLabel: 'Git',
		docsDir: 'docs',
		nav: [{text: 'Components', link: '/components/'}],
		sidebar: [
			['/readme/', 'Readme'],
			['/components/', 'Components'],
			['/mixins/', 'Mixins'],
			['/methods/', 'Methods'],
			['/resources/', 'Resources'],
		],
		serviceWorker: {
			updatePopup: true, // Boolean | Object, default to undefined.
			// If set to true, the default text config will be:
			updatePopup: {
				message: 'New content is available.',
				buttonText: 'Refresh',
			},
		},
	},
};
