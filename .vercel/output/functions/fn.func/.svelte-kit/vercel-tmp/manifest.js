export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store",".well-known/apple-app-site-association",".well-known/assetlinks.json","favicon.png","fonts/FrankRuhlLibre-Bold.ttf","fonts/FrankRuhlLibre-Medium.ttf","fonts/FrankRuhlLibre-Regular.ttf","fonts/FrankRuhlLibre-SemiBold.ttf","images/sources/add-url.png","images/sources/banners/bbc.png","images/sources/banners/cnn.png","images/sources/banners/guardian.png","images/sources/banners/medium.png","images/sources/banners/newyorktimes.png","images/sources/banners/techcrunch.png","images/sources/bbc.png","images/sources/cnn.png","images/sources/guardian.png","images/sources/medium.png","images/sources/my-queue.png","images/sources/newyorktimes.png","images/sources/techcrunch.png","logos/logo128.png","logos/logo16.png","logos/logo180.png","logos/logo192.png","logos/logo32.png","logos/logo48.png"]),
	mimeTypes: {".json":"application/json",".png":"image/png",".ttf":"font/ttf"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.5e1f6833.js","imports":["_app/immutable/entry/start.5e1f6833.js","_app/immutable/chunks/index.485fcb8d.js","_app/immutable/chunks/singletons.4d3f7a01.js","_app/immutable/chunks/index.1e0a1e55.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.bce9119f.js","imports":["_app/immutable/entry/app.bce9119f.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.485fcb8d.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
