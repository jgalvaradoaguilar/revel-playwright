# revel-playwright

Proyecto de automatización de pruebas de UI para la plataforma Revel utilizando **Playwright** con **TypeScript**.

## Dependencias/librerías instaladas

- Node.js
- IDE recomendado: Visual Studio Code
- Extensión necesaria: Playwright Test for VSCode
- Extensión necesaria: Cucumber for Visual Studio Code


## Comandos ejecutados en el proceso

    $ npm init playwright@latest
    $ npm i @cucumber/cucumber -D
    $ npm i -D typescript ts-node @types/node
    $ npx tsc --init (no ejecutar porque reemplaza tsconfig.json)
    $ npm install dotenv --save (no ejecutar porque actualiza playwright.config.ts)
    $ npm install --save-dev prettier
    $ npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
    $ npm install -D eslint eslint-plugin-playwright eslint-plugin-promise
    $ npm install -D husky lint-staged commitlint @commitlint/config-conventional
    $ npx husky init


## Configurar la extesnión de Cucumber

Hay que buscar la extensión de Cucumber y modificar las rutas de las features y los steps. Para hacerlo, presiona Ctrl + Comma, busca Cucumber y clica en ‘Edit in settings.json’.

- Actualiza las rutas en el "settings.json":

    "cucumber.features": [
        "src/test/features/*.feature"
    ],
    "cucumber.glue": [
        "src/test/steps/*.ts"
    ]
