// ./Routes/Pages/Home/index.js

export default async function handler(lang, nonce, pageRules) {
    const page = `<!DOCTYPE html>
  <html lang="${lang}">
  <head>
    ${pageRules}
    <title>Home</title>
  </head>
  <body>
    <h1>Tervetuloa!</h1>
    <!-- Page content here -->
  </body>
  </html>`;
    return page
  }
  