import schema from './schemald.json'

export default `
  <meta name="robots" content="noindex, follow">
  <title>Varaa aika verkkoympäristösi karoitukselle | Havaittavissa</title>
  <link rel="shortcut icon" href="/Images/favicon.png" type="image/x-icon">
  <meta name="description" content="Lähetä laadukkaita tarjouspyyntöjä sadoille yrityksille minuuteissa, vertaile ja valitse paras tarjous sähköpostistasi" />
  <meta name="keywords" content="kilpailuta, tarjoukset, palvelut, hintavertailu, tarjouspyyntö, nettipalvelu, yritykset" />
  <meta name="author" content="J&J Commerce Oy" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="canonical" href="https://havaittavissa.fi/fi" />
  <link rel="alternate" hreflang="fi" href="https://havaittavissa.fi/fi" />
  <link rel="alternate" hreflang="sv" href="https://havaittavissa.fi/sv" />
  <link rel="alternate" hreflang="en" href="https://havaittavissa.fi/en" />

  <meta property="og:title" content="Varaa aika verkkoympäristösi karoitukselle | Havaittavissa" />
  <meta property="og:description" content="Lähetä laadukkaita tarjouspyyntöjä sadoille yrityksille minuuteissa, vertaile ja valitse paras tarjous sähköpostistasi"/>
  <meta property="og:image" content="/Images/kilpailuta-tumma-logo.svg" />
  <meta property="og:url" content="https://kilpailuta.online/fi" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Kilpailuta Online" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Varaa aika verkkoympäristösi karoitukselle | Havaittavissa" />
  <meta name="twitter:description" content="Lähetä laadukkaita tarjouspyyntöjä sadoille yrityksille minuuteissa, vertaile ja valitse paras tarjous sähköpostistasi" />
  <meta name="twitter:image" content="/Images/kilpailuta-tumma-logo.svg" />
  <meta name="twitter:site" content="@KilpailutaOnline" />

  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#f9ffff" />
  <meta name="msapplication-TileColor" content="#f9ffff" />
  <meta name="msapplication-TileImage" content="/Images/ms-icon-144x144.png" />
  <meta name="msapplication-config" content="/Images/browserconfig.xml" />

  <link rel="apple-touch-icon" sizes="180x180" href="/Images/apple-icon-180x180.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/Images/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/Images/favicon-96x96.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/Images/favicon-16x16.png" />

  <script type="application/ld+json">${JSON.stringify(schema)}</script>
`