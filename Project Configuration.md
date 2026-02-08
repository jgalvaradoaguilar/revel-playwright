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
    $ npm i ts-node -D


## Configurar la extesnión de Cucumber

Before running, we need to update step and feature path definitions in the cucumber settings. To do this, press Ctrl + Comma, search for Cucumber, and click the ‘Edit in settings.json’ link.

- Update settings.json file as:

    "cucumber.features": [
        "src/test/features/*.feature"
    ],
    "cucumber.glue": [
        "src/test/steps/*.ts"
    ]
