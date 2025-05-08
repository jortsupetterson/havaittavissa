import getLang from "./Utilities/getLang.js";
import getNonce from "./Utilities/getNonce.js";
import getPageRules from "./Utilities/getPageRules.js";

export default {
  async fetch(request, env, ctx) {
	const lang = await getLang(request);
    const nonce = await getNonce();
	const pageRules = await getPageRules(nonce);
	const url = new URL(request.url);
	const host = url.hostname;
	const path = url.pathname;

	const routes = {
		"havaittavissa.fi": {
			"/": await import("./Routes/Pages/Home/index.js").then(m => m.default(lang, nonce, pageRules))
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
