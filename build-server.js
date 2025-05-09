import esbuild                  from 'esbuild';
import fs                       from 'fs/promises';
import path                     from 'path';
import { minify as minifyHTML } from 'html-minifier-terser';
import CleanCSS                 from 'clean-css';
import { sync as globSync }     from 'glob';

// -------------------------------------------------------------------
// 1) JSON-importin minifiointi: käännetään JSON → JS-moduuli,
//    jossa "export default <minified JSON>"
// -------------------------------------------------------------------
const jsonTextMinifier = {
  name: 'jsonTextMinifier',
  setup(build) {
    build.onLoad({ filter: /\.json$/ }, async (args) => {
      const src = await fs.readFile(args.path, 'utf8');
      // parse & stringify ilman ylimääräisiä whitespaceja
      const min = JSON.stringify(JSON.parse(src));
      return { contents: `export default ${min};`, loader: 'js' };
    });
  }
};

// -------------------------------------------------------------------
// 2) CSS?text-importin minifiointi: inlined minified CSS → JS-moduuli
// -------------------------------------------------------------------
const cssTextMinifier = {
  name: 'cssTextMinifier',
  setup(build) {
    build.onLoad({ filter: /\.css(\?text)?$/ }, async (args) => {
      const src = await fs.readFile(args.path, 'utf8');
      const raw = new CleanCSS().minify(src).styles;
      // collapse rivinvaihdot ja monivälit
      const min = raw.replace(/\r?\n/g, '').replace(/\s{2,}/g, ' ').trim();
      return { contents: `export default ${JSON.stringify(min)};`, loader: 'js' };
    });
  }
};

// -------------------------------------------------------------------
// 3) HTML-template-litteraalien minifiointi backtick-moduuleissa
// -------------------------------------------------------------------
const htmlLiteralMinifier = {
  name: 'htmlLiteralMinifier',
  setup(build) {
    build.onLoad({ filter: /\.(js|mjs)$/ }, async (args) => {
      let src = await fs.readFile(args.path, 'utf8');
      src = src.replace(/nonce="\s*(.*?)\s*"/g, 'nonce="$1"');

      const regex = /`([\s\S]*?<[^>]+>[\s\S]*?)`/g;
      let m, last = 0, parts = [];

      while ((m = regex.exec(src)) !== null) {
        parts.push(src.slice(last, m.index));
        let html = m[1];
        try {
          html = await minifyHTML(html, {
            collapseWhitespace:    true,
            removeComments:        true,
            minifyCSS:             true,
            minifyJS:              true,
            ignoreCustomFragments: [/\$\{[^}]+\}/g]
          });
        } catch {
          // jos minify rikkoo, palauta alkuperäinen
        }
        html = html.replace(/\r?\n/g, '').replace(/\s{2,}/g, ' ').trim();
        parts.push('`'+html+'`');
        last = m.index + m[0].length;
      }
      if (last) {
        parts.push(src.slice(last));
        src = parts.join('');
      }

      return { contents: src, loader: 'js' };
    });
  }
};

async function build() {
  const outdir = path.resolve('prod_server');
  // Tyhjennä output
  await fs.rm(outdir, { recursive: true, force: true });

  // ---------------------------------------------------
  // Bundlaus & minifiointi: JSON, CSS?text, HTML-literal
  // ---------------------------------------------------
  await esbuild.build({
    entryPoints: ['SERVER/Gateway.js'],
    bundle:      true,
    splitting:   true,
    format:      'esm',
    platform:    'node',
    minify:      true,             // esbuild hoitaa JS-minifioinnin lopussa
    loader:      { '.json': 'js' },// JSON-käsittely pluginissa
    outdir,
    plugins:     [ jsonTextMinifier, cssTextMinifier, htmlLiteralMinifier ]
  });

  console.log('🎉 build-server.js valmis: JSON- ja CSS-importit inlined, HTML-litteraalit minified, prod_server sisältää vain JS-tiedostoja.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
