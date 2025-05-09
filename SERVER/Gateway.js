import getLang from "../LIB/getLang.js";
import getNonce from "../LIB/getNonce.js";
import getPageRules from "../LIB/getPageRules.js";

export default {
  async fetch(request, env, ctx) {
	const lang = await getLang(request);
    const nonce = await getNonce();
	const pageRules = await getPageRules(nonce);
	const url = new URL(request.url);
	const host = url.hostname;
	const path = url.pathname;

	const routes = {	
		"server.havaittavissa.workers.dev": {
			"/": await import("./Routes/Pages/Leads/Introduction/index.js").then(m => m.default(lang, nonce, pageRules)),
			"/varaa-aika": await import("./Routes/Pages/Leads/Booking/index.js").then(m => m.default(lang, nonce, pageRules)),
		},
		"havaittavissa.fi": {
			"/": await import("./Routes/Pages/Leads/Introduction/index.js").then(m => m.default(lang, nonce, pageRules)),
			"/varaa-aika": await import("./Routes/Pages/Leads/Booking/index.js").then(m => m.default(lang, nonce, pageRules)),
		}
	}

	const response = await routes[host][path]
    


    return new Response(`${response}`, {
      headers: {
        "Content-Type": "text/html"
      }
    });
  }
};
