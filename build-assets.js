// build.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';
import { minify as minifyHTML } from 'html-minifier-terser';
import { sync as globSync } from 'glob';

// __dirname ESM-tilassa
const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async function(){
  const srcRoot = path.resolve(__dirname, 'ASSETS');
  const outRoot = path.resolve(__dirname, 'prod_assets');
  await fs.mkdir(outRoot, { recursive: true });

  // Listaa kaikki tiedostot
  const files = globSync('**/*.*', { cwd: srcRoot, nodir: true });

  for(const rel of files){
    const src = path.join(srcRoot, rel);
    const dst = path.join(outRoot, rel);
    const ext = path.extname(rel).toLowerCase();
    await fs.mkdir(path.dirname(dst), { recursive: true });

    let contents = await fs.readFile(src, 'utf8');

    if(ext === '.js'){
      // 1) Minifioidaan HTML-template-litteraalit
      const regex = /`([\s\S]*?<[\s\S]*?)`/g;
      let match;
      const replacements = [];
      while((match = regex.exec(contents)) !== null){
        const [full, htmlPart] = match;
        const minified = await minifyHTML(htmlPart, {
          collapseWhitespace: true,
          removeComments:     true,
          // Älä yritä JS-minifioida tässä
          minifyJS:           false,
          minifyCSS:          true,
          ignoreCustomFragments: [/\$\{[^}]+\}/g]
        });
        replacements.push({
          start: match.index,
          end:   match.index + full.length,
          text:  '`' + minified + '`'
        });
      }
      for(let i = replacements.length - 1; i >= 0; i--){
        const { start, end, text } = replacements[i];
        contents = contents.slice(0, start) + text + contents.slice(end);
      }

      // 2) Esbuild: lopullinen JS-minify
      const { code } = await esbuild.transform(contents, {
        loader: 'js',
        minify: true
      });
      await fs.writeFile(dst, code, 'utf8');

    } else if(ext === '.css'){
      const { code } = await esbuild.transform(contents, {
        loader: 'css',
        minify: true
      });
      await fs.writeFile(dst, code, 'utf8');

    } else if(ext === '.html' || ext === '.htm'){
      const result = await minifyHTML(contents, {
        collapseWhitespace: true,
        removeComments:     true,
        minifyJS:           false,
        minifyCSS:          true
      });
      await fs.writeFile(dst, result, 'utf8');

    } else if(ext === '.json'){
      // Tiivistä JSON
      const obj = JSON.parse(contents);
      await fs.writeFile(dst, JSON.stringify(obj), 'utf8');

    } else {
      // Muut tiedostot: kopioi sellaisenaan
      await fs.copyFile(src, dst);
    }
  }
})();
