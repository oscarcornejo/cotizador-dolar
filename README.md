# Cotizador Dólar App [Visítala](https://cotizador-dolar.netlify.app/)

Aplicación web para cotizar el valor del Dólar entre rangos de fechas.

## Descargar Proyecto

Para probar este proyecto necesitas hacer:
- Clonar el proyecto
- Entrar a la carpeta del proyecto clonado
- Arranacar el proyecto

## Arrancar Proyecto con Yarn

```sh
git clone https://github.com/oscarcornejo/cotizador-dolar.git
cd cotizador-dolar
yarn
yarn start
```

## Arrancar Proyecto con Npm

```sh
git clone https://github.com/oscarcornejo/cotizador-dolar.git
cd cotizador-dolar
npm install
npm start
```

## Estructura del Proyecto

```
cotizador-dolar
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── postcss.config.js
├── tailwind.js
├── yarn.lock
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│   └── robots.txt
└── src
    ├── components
    │   ├── cardCotizador
    │   │   └── CardCotizador.js
    │   ├── cardGrafico
    │   │   └── GraficoResultado.js
    │   ├── cardInformacion
    │   │   └── CardInformacion.js
    │   ├── footer
    │   │   └── Footer.js
    │   ├── header
    │   │   └── Header.js
    │   └── inputs
    │       └── inputDate
    │           └── InputDate.js
    ├── pages
    │   └── cotizador
    │       └── CotizadorPage.js
    ├── redux
    │   ├── actions
    │   │   ├── darkModeAction.js
    │   │   ├── estadisticasAction.js
    │   │   └── valorActualAction.js
    │   ├── reducers
    │   │   ├── darkModeReducer.js
    │   │   ├── estadisticasReducer.js
    │   │   ├── index.js
    │   │   └── valorActualReducers.js
    │   ├── types
    │   │   └── types.js
    │   └── store.js
    ├── theme
    │   ├── globalStyles.js
    │   └── theme.js
    ├── utils
    │   ├── api.js
    │   └── ApiKeys.js
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    └── serviceWorker.js
    └── setupTests.js
```

## Contribución

Si encuentras algún bug, probelma o mejor aún, quieres utilizar esta platafroma web, favor escríbeme a [Oscar Cornejo](https://www.linkedin.com/in/oscarcornejo10/) y con gusto leeré tus comentarios.
