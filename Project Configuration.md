# revel-playwright

Proyecto de automatización de pruebas de UI para la plataforma Revel utilizando **Playwright** con **TypeScript**.

## Dependencias/librerías instaladas

- Node.js
- Java (JDK)
- Apache Maven
- IDE recomendado: Visual Studio Code
- Extensión necesaria: Cucumber for Visual Studio Code

Las pruebas se ejecutan con Cucumber.js; Playwright se usa para controlar el navegador. La extensión Playwright Test for VS Code no es necesaria para lanzar estas pruebas.

## Ejecutar pruebas y generar el reporte

    $ npm test

El comando ejecuta Cucumber y, al finalizar, genera el informe HTML de Masterthought usando `maven-cucumber-reporting`.

- Informe principal: `target/cucumber-html-reports/overview-features.html`
- JSON original: `target/cucumber-reports/cucumber.json`
- JSON preparado para Masterthought: `target/cucumber-reports/cucumber-report.json`

Java y Maven deben estar disponibles en `PATH`. También se pueden ejecutar las pruebas desde **Terminal > Run Task** en VS Code. Las tasks están definidas en `.vscode/tasks.json`: hay una por feature y una por cada `Scenario Outline`, filtradas con sus tags Cucumber.

`mvn verify` solo regenera el informe a partir del JSON existente; para ejecutar los escenarios y después crear el informe, usa `npm test` o una de las tasks de VS Code.

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
