# revel-playwright

Framework de automatización de pruebas de interfaz para Revel, basado en Playwright, TypeScript y Cucumber.js. Los escenarios se describen en Gherkin y se implementan mediante step definitions, páginas y locators.

## Requisitos

- Node.js 22 o superior.
- npm.
- Visual Studio Code es opcional; se recomienda la extensión Cucumber para editar y navegar las features.

No se necesita Java ni Maven.

## Instalación y configuración

Instala las dependencias y el navegador Chromium de Playwright:

```shell
npm ci
npx playwright install chromium
```

La configuración local se lee desde `.env`:

| Variable      | Valores/comportamiento                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `ENVIRONMENT` | Obligatoria: `QA`, `DEV`, `STAGE` o `PROD`. `QA`/`DEV` usan la URL QA; `STAGE`/`PROD` usan la URL Stage. |
| `BROWSER`     | `chromium` (por defecto), `firefox` o `webkit`.                                                          |
| `HEADLESS`    | `true` para modo headless; de lo contrario, el navegador se muestra.                                     |

No añadas credenciales sensibles a `.env` ni las incluyas en cambios compartidos; proporciona secretos mediante variables de entorno seguras. Los valores de prueba de login están definidos en la tabla `Examples` de la feature correspondiente.

## Ejecutar pruebas

```shell
npm test
```

El comando ejecuta todas las features y genera el reporte Cucumber. `npm test` también realiza el chequeo de TypeScript (`tsc --noEmit`) antes de iniciar las pruebas.

Desde VS Code, abre **Terminal > Run Task** para ejecutar una feature completa o un escenario filtrado por tag:

| Task                                | Selección                  |
| ----------------------------------- | -------------------------- |
| `Test: Filters Our Cars feature`    | Toda la feature de filtros |
| `Test: Login feature`               | Toda la feature de login   |
| `Test: Single car filter option`    | `@filter_single_option`    |
| `Test: Combined car filter options` | `@filter_combined_options` |
| `Test: Car filters without results` | `@filter_no_results`       |
| `Test: Clear car filters`           | `@filter_clear`            |
| `Test: Successful login scenario`   | `@login_successful`        |
| `Test: Login with invalid OTP`      | `@login_invalid_otp`       |

Cada task ejecuta `npm test`, por lo que genera el mismo reporte que la ejecución completa. Para filtrar desde línea de comandos, configura `CUCUMBER_FEATURE` y/o `CUCUMBER_TAG` en el entorno antes de ejecutar `npm test`; estos filtros se definen en `cucumber.js`.

## Reporte Cucumber

El reporte se genera con [Multiple Cucumber HTML Reporter](https://www.npmjs.com/package/multiple-cucumber-html-reporter), sin depender de Java ni Maven:

- Página principal: `target/cucumber-html-reports/index.html`
- Páginas de features: `target/cucumber-html-reports/features/`
- JSON de Cucumber: `target/cucumber-reports/cucumber.json`

Los `Scenario Outline` aparecen expandidos con los valores de cada fila de `Examples`. El reporte se genera también cuando algún escenario falla; el comando conserva el código de salida de Cucumber para que el fallo no quede oculto. Los archivos generados están bajo `target/`, que Git ignora.

## Estructura principal

```text
src/
  config/                  Configuración de entorno, navegador y modo headless
  pages/                   Page Objects
  support/locators/        Selectores de las páginas
  test/
    features/              Escenarios Gherkin
    steps/                 Step definitions de Cucumber
    support/hooks.ts       Inicialización y cierre de Playwright por escenario
cucumber.js                Configuración de Cucumber y selección de feature/tag
scripts/run-cucumber.js    Ejecución de Cucumber y generación del reporte
.vscode/tasks.json         Tasks de VS Code para features y escenarios
```

## Otros comandos

```shell
npm run format
npm run lint
```
