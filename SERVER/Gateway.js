

const defaultLang = request.headers.get('Accept-Language') || 'fi-FI';
globalThis.lang = defaultLang.split(/[;,]/);

const routes = {
	"havaittavissa.fi": {
		"/": ""
	},
	"hallinta.havaittavissa.fi": {

	},
	"esimerkki.havaittavissa.fi": {

	},
	"*":{
	 
	}
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/message':
				return new Response('Hello, World!');
			case '/random':
				return new Response(crypto.randomUUID());
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
};
