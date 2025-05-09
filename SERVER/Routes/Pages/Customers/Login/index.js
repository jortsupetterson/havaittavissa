// ./Routes/Pages/StaffLogin/index.js

export default async function handler({ request, env, ctx, lang, nonce, pageRules }) {
    const page = `<!DOCTYPE html>
  <html lang="${lang}">
  <head>
    ${pageRules}
    <title>Staff Login</title>
  </head>
  <body>
    <h1>Kirjaudu sisään</h1>
    <form method="POST" action="/staff/auth">
      <div>
        <label for="username">Käyttäjätunnus:</label>
        <input id="username" name="username" type="text" required />
      </div>
      <div>
        <label for="password">Salasana:</label>
        <input id="password" name="password" type="password" required />
      </div>
      <div>
        <button type="submit">Kirjaudu</button>
      </div>
    </form>
  </body>
  </html>`;
  
    return page
  }
  