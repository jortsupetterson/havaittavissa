import preload from "./Head/preload.js";
import meta from "./Head/meta.js";
import styles from "./Head/styles.js";


async function booking(lang,nonce,rules){const raw = `
    <!doctype html>
    <html lang="${lang}">

    <head>
    ${preload}
    ${rules}
    ${meta}
    ${styles}
    
    </head>

    <body>
    <booking>
    <script src="/Applications/BookingFunnel/start.js"></script>
    <noscript>Ajanvaraaminen vaatii JavaScriptiä</noscript>
    </booking>
    </body>

    </html>
`
const withNonces = raw.replace(/<(script|style)(\b)/g,`<$1 nonce="${nonce.trim()}"$2`);
return withNonces;
}export{booking as default};
