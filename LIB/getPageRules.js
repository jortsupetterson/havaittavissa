// getPageRules.js
export default function getPageRules (nonce) {return `
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
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none';" />
`};
