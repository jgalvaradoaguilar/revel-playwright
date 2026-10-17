# Configuración del proyecto

Proyecto de pruebas UI de Revel con Playwright, TypeScript y Cucumber.js.

## Requisitos e instalación

- Node.js 22 o superior y npm.
- Visual Studio Code y la extensión Cucumber son opcionales.
- Java y Maven no son necesarios.

Instala dependencias y Chromium:

```shell
npm ci
npx playwright install chromium
```

## Variables locales

El proyecto carga la configuración de `.env` mediante `dotenv`:

- `ENVIRONMENT` es obligatoria: `QA`, `DEV`, `STAGE` o `PROD`. QA y DEV utilizan la URL de QA; STAGE y PROD utilizan la URL de Stage.
- `BROWSER` admite `chromium`, `firefox` o `webkit`; si no se especifica, se utiliza Chromium.
- `HEADLESS=true` ejecuta el navegador sin interfaz. Con cualquier otro valor, se muestra el navegador.

No añadas credenciales sensibles a `.env` ni las incluyas en cambios compartidos; proporciona secretos mediante variables de entorno seguras.

## Ejecución

```shell
npm test
```

Ejecuta las features de Cucumber y genera el reporte. Antes de las pruebas, npm ejecuta `tsc --noEmit`.

En VS Code, selecciona **Terminal > Run Task**. `.vscode/tasks.json` contiene dos tasks para ejecutar features completas y seis tasks filtradas por los tags de cada `Scenario Outline`. Todas generan el mismo reporte que `npm test`.

Las variables opcionales `CUCUMBER_FEATURE` y `CUCUMBER_TAG` permiten seleccionar una feature o un tag; la configuración está en `cucumber.js`.

## Reporte

El reporte JavaScript de Multiple Cucumber HTML Reporter se crea en:

- `target/cucumber-html-reports/index.html` (página principal)
- `target/cucumber-html-reports/features/` (detalle por feature)
- `target/cucumber-reports/cucumber.json` (JSON de Cucumber)

Los ejemplos de `Scenario Outline` se muestran expandidos. El reporte se genera incluso si hay escenarios fallidos, mientras el comando devuelve el código de salida de Cucumber. `target/` está excluida del control de versiones.

## Carpetas principales

- `src/config/`: selección de entorno, navegador y modo de ejecución.
- `src/pages/`: Page Objects.
- `src/support/locators/`: locators de interfaz.
- `src/test/features/`: features Gherkin.
- `src/test/steps/`: definiciones de pasos.
- `src/test/support/hooks.ts`: hooks Before/After para el ciclo de vida de Playwright.
- `scripts/run-cucumber.js`: ejecución de Cucumber y generación del reporte.
