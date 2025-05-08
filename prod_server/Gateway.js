function o(t){return((t.headers.get("accept-language")||"").split(",")[0].split(";")[0].trim()||"en").split("-")[0].toLowerCase()}function r(t=16){let e="";for(let n=0;n<t;n++){let a=Math.floor(Math.random()*256).toString(16).padStart(2,"0");e+=a}return e}function i(t){return`
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<meta name="robots" content="noindex" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
<meta http-equiv="Cache-Control" content="public, max-age=31536000" />
<meta http-equiv="X-Page-Rule" content="Cache Everything" />
<meta http-equiv="X-Failover" content="Automatic" />
<meta http-equiv="X-Frame-Options" content="DENY" />
<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin" />
<meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp" />
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'nonce-${t}'; style-src 'self' 'nonce-${t}'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none';" />
`}var x={async fetch(t,e,n){let a=await o(t),s=await r(),p=await i(s),c=new URL(t.url),l=c.hostname,m=c.pathname,u=await{"havaittavissa.fi":{"/":await import("./Home-FUTCFRIW.js").then(g=>g.default(a,s,p))}}[l][m];return new Response(`${u}`,{headers:{"Content-Type":"text/html"}})}};export{x as default};
