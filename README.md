# revel-playwright

Proyecto de automatización de pruebas de UI para la plataforma Revel utilizando **Playwright** con **TypeScript**.

## 📋 Descripción

Este es un proyecto en desarrollo que busca crear un framework de automatización robusto siguiendo principios de **BDD (Behavior Driven Development)**. Las pruebas se centran en validar funcionalidades críticas de la aplicación web como autenticación y filtrado de vehículos.

Si tuviera más tiempo haría esto:

- Aunque los objetos están declarados fuera de las páginas, quiero buscar una mejor forma de inicializar las instancias "pages".
- Implementaría herencia en "pages" (si se pudiera) para implementar métodos genéricos "isVisible" y similares.
- Metería GitHub Actions pero de eso no tengo ni idea y tendría que investigarlo y después incorporarlo.

## Formatear el proyecto

    $ npm format

## Ejecución de pruebas

    $ npm test

`npm test` ejecuta todas las features con Cucumber.js. Para lanzar las pruebas desde VS Code, abre **Terminal > Run Task** y elige una de estas tasks:

- **Por feature**:
  - `Test: Filters Our Cars feature`
  - `Test: Login feature`
- **Por Scenario Outline**:
  - `Test: Single car filter option` (`@filter_single_option`)
  - `Test: Combined car filter options` (`@filter_combined_options`)
  - `Test: Car filters without results` (`@filter_no_results`)
  - `Test: Clear car filters` (`@filter_clear`)
  - `Test: Successful login scenario` (`@login_successful`)
  - `Test: Login with invalid OTP` (`@login_invalid_otp`)

Las tasks seleccionan la feature y/o el tag y generan el reporte de la misma manera que `npm test`.

## Reportes de Cucumber

Después de ejecutar Cucumber, el script genera el reporte multipágina de Masterthought mediante Maven:

- Informe principal: `target/cucumber-html-reports/overview-features.html`
- Otras vistas: `overview-tags.html`, `overview-steps.html` y `overview-failures.html`
- JSON original de Cucumber: `target/cucumber-reports/cucumber.json`
- JSON preparado para Masterthought: `target/cucumber-reports/cucumber-report.json`

El JSON original conserva los hooks; la copia para el informe omite los hooks ocultos de Cucumber para evitar marcadores internos en el HTML. La carpeta `target/` se crea automáticamente y está excluida del control de versiones.

Para ejecutar pruebas y generar el informe se necesitan Node.js, Java y Maven disponibles en `PATH`. `mvn verify` genera el informe a partir del JSON existente, pero no ejecuta por sí solo los escenarios de Cucumber.

## 🛠️ Stack Tecnológico

- **Framework de Automatización**: Playwright
- **Lenguaje**: TypeScript
- **Framework BDD**: Cucumber.js
- **Patrón de Diseño**: Page Object Model (POM) + Locators separados
- **Estructura de Tests**: Features (Gherkin) → Steps (TypeScript) → Pages (POM) → Locators
- **Test Runner**: Cucumber.js
- **Automatización del navegador**: Playwright
- **Reporte**: Masterthought `maven-cucumber-reporting`

### Arquitectura

El proyecto sigue una estructura escalable basada en:

- **Features**: Archivos `.feature` con escenarios en lenguaje Gherkin para máxima legibilidad
- **Steps**: Implementación de definiciones de pasos en TypeScript (`*Steps.ts`)
- **Pages**: Clases que encapsulan la lógica de interacción con páginas (POM)
- **Locators**: Clases separadas que centralizan todos los selectores de elementos (`*Locators.ts`)
- **Environments & Browsers**: Configuración por enumeraciones para diferentes entornos

## 🧪 Test Cases Implementados

Los test cases están definidos en archivos **Feature** usando lenguaje Gherkin y se ejecutan a través de **steps** en TypeScript. Esto proporciona máxima legibilidad y mantenibilidad.

### Login Test Suite (`src/test/features/login.feature`)

Se han implementado 2 escenarios con ejemplos parametrizados:

#### 1. Login successful with phone pre-set OTP

```gherkin
Scenario Outline: Login successful with phone pre-set OTP: <email> - <phone> - <otp>
  Given the user go to login on Revel URL
  And the user login with his phone "<phone>"
  When the user writes the OTP received "<otp>"
  Then the user is logged successfully
```

- **Objetivo**: Validar autenticación exitosa con teléfono y OTP correcto
- **Datos de prueba**: Email, país, teléfono y OTP en tabla Examples
- **Verificación**: Debe aparecer la imagen de "Login Successful"

#### 2. Login failed because a wrong OTP code

```gherkin
Scenario Outline: Login failed because a wrong OTP code: <email> - <phone> - <otp>
  Given the user go to login on Revel URL
  And the user login with his phone "<phone>"
  When the user writes the OTP received "<otp>"
  Then an error message is showed
```

- **Objetivo**: Validar rechazo de OTP incorrecto
- **Datos de prueba**: OTP inválido (1234) en tabla Examples
- **Verificación**: Debe mostrarse mensaje de error "Este código no es válido"

### Filters Our Cars Test Suite (`src/test/features/filtersOurCars.feature`)

El feature contiene cuatro `Scenario Outline`, cada uno con un tag propio para su task de VS Code:

- `@filter_single_option`: filtro individual (actualmente, los pasos de selección y comprobación están comentados en el feature).
- `@filter_combined_options`: combinación de Fuel y Body Type.
- `@filter_no_results`: combinación de filtros sin resultados.
- `@filter_clear`: limpieza de los filtros aplicados.

El ejemplo individual de Body Type/SUV también está comentado, por lo que no se ejecuta. Los demás outlines tienen un ejemplo activo cada uno.

#### Single filter (currently partially disabled)

```gherkin
Scenario Outline: Verify response of the filter "<filter>" option "<option>"
  Given the user go to cars page on Revel URL
  When the user clicks on filter "<filter>"
  #And the user choose the option "<option>"
  #Then the filter option "<filterOptionInURL>" appears in the URL
  #And the first car in the results page is "<firstCarModel>" "<firstCarVersion>"
```

- **Datos de ejemplo**: Fuel/Electric Hybrid/`?fuelTypes=electric-hybrid`
- En el estado actual, la selección de la opción y las comprobaciones de URL y vehículo están comentadas; este outline solo navega a la página de coches y abre el filtro Fuel.

#### Verify response of the filters "Fuel" y "Body Type" combinados

```gherkin
Scenario Outline: Verify response of the filters "<filter_1>" option "<option_1>" and "<filter_2>" option "<option_2>"
  Given the user go to cars page on Revel URL
  When the user clicks on filter "<filter_1>"
  And the user choose the option "<option_1>"
  And the user clicks on filter "<filter_2>"
  And the user choose the option "<option_2>"
  Then the filter option "<filtersOptionsInURL>" appears in the URL
  And the first car in the results page is "<firstCarModel>" "<firstCarVersion>"
```

- **Objetivo**: Validar combinación de múltiples filtros
- **Datos de prueba**: Fuel + Body Type
- **Verificación**: URL contiene ambos parámetros → Resultado correcto

#### Filters without results

- **Objetivo**: Validar comportamiento cuando no hay resultados
- **Datos de prueba**: Combinación Fuel + Body Type + Color (sin resultados)
- **Verificación**: Aparece mensaje "¿No encuentras lo que buscas?"

#### Cleaning filters

- **Objetivo**: Validar limpieza de filtros aplicados
- **Datos de prueba**: Fuel + Body Type aplicados y luego limpiados
- **Verificación**: URL sin parámetros → Primer vehículo es "Peugeot 208 Allure"

### Steps Definition

Cada feature se vincula con sus correspondientes steps en TypeScript:

- `src/test/steps/loginSteps.ts` - Implementa los pasos del feature de login
- `src/test/steps/filtersOurCarsSteps.ts` - Implementa los pasos del feature de filtros

**Ejemplo de step**:

```typescript
When('the user login with his phone {string}', async function (phone) {
  console.log('Phone: ' + phone);
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.setPhone(phone);
  await loginPage.clickContinueButton();
});
```

### Page Object Model & Locators

La estructura mantiene el patrón POM con separación de responsabilidades:

- **Pages** (`src/pages/`): Contienen métodos de alto nivel para interactuar con la aplicación
- **Locators** (`src/support/locators/`): Centralizan todos los selectores de elementos (desacoplamiento)

**Ejemplo de Locators**:

```typescript
export class LoginLocators {
  readonly phoneInput: Locator;
  readonly continueButton: Locator;
  readonly otpInput: Locator;

  constructor(page: Page) {
    this.phoneInput = page.locator('input[name="phone number"]');
    this.continueButton = page.getByRole('button', { name: 'Continuar' });
    // ...
  }
}
```

**Ejemplo de Page**:

```typescript
export class LoginPage {
  private page: Page;
  private loginLocators: LoginLocators;

  async setPhone(telephone: string) {
    await this.loginLocators.phoneInput.click();
    await this.loginLocators.phoneInput.fill(telephone);
  }
}
```

## 🔐 Manejo de OTP - Estado Actual vs. Entorno Real

### ⚠️ Situación Actual (Desarrollo)

En el entorno de desarrollo, el OTP es **fijo y predeterminado** (`8048`). Esto facilita el desarrollo y la ejecución rápida de pruebas sin dependencias externas.

**Razón**: El OTP es generado por un servicio externo de Twilio, que es responsabilidad del backend, no de la capa de UI que estamos probando. En varias empresas se considera un servicio externo y por tanto no se prueba como tal, solo se simula.

### 🚀 Soluciones para Entorno Real (Staging/CI)

En un entorno real (staging o CI/CD), existen varias estrategias para manejar OTPs dinámicos:

#### **1. API de Twilio Verify - Opción Recomendada**

**Nota:** Hice una investigación previa sobre la APP de Twilio y con lo que creía que podría ser adecuado se lo pasé a la IA y ella me hizo el README y yo lo revisé y lo edité donde creía necesario.
Se incluyen notas sobre Browserstack y comandos AT porque alguna vez he trabajado con eso y sé que se puede hacer pero al final lo mejor es usar el API del propio Twilio.

Twilio proporciona una API REST que permite acceder al código de verificación en entornos de prueba/desarrollo:

```typescript
// Ejemplo de cómo obtener el OTP desde la API de Twilio
async function getOTPFromTwilio(phoneNumber: string): Promise<string> {
  const response = await fetch(
    'https://verify.twilio.com/v2/Services/{SERVICE_SID}/Verifications',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.TWILIO_API_KEY}`,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        status: 'pending',
      }),
    }
  );

  const data = await response.json();
  // El OTP está disponible en la respuesta de Twilio en entornos de prueba
  return data.code;
}
```

**Ventajas**:

- Oficial y soportado por Twilio
- Funciona en entornos de staging
- No requiere hardware adicional
- Fácil de integrar en pipelines CI/CD

**Documentación**: https://www.twilio.com/docs/verify/api

---

#### **2. BrowserStack con Dispositivos Reales**

Utilizar BrowserStack con dispositivos reales que tienen SIM cards insertadas:

```typescript
// Configuración en playwright.config.ts
export default defineConfig({
  use: {
    connectOption: {
      browserstack: {
        device: 'Samsung Galaxy S21',
        osVersion: '12.0',
        networkLogs: true,
        appiumVersion: '1.22.0',
      },
    },
  },
});
```

**Flujo de prueba**:

1. El dispositivo real recibe el SMS con el OTP
2. Se intercepta el SMS usando APIs de BrowserStack
3. Se extrae el código y se utiliza en la prueba

**Ventajas**:

- Pruebas en dispositivos reales
- Simula correctamente el comportamiento del usuario
- Captura de errores más realistas

**Desventajas**:

- Costo más elevado
- Mayor latencia en ejecución

---

#### **3. ADB + Comandos AT (Conexión USB Local)**

Conectar un dispositivo Android al ordenador y consultar SMS directamente:

```typescript
// Implementación con ADB
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function getOTPFromPhoneViaSMS(): Promise<string> {
  try {
    // Obtener el primer SMS no leído
    const { stdout } = await execAsync(
      'adb shell content query --uri content://sms/inbox --projection body'
    );

    // Parsear y extraer el código de 4 dígitos (ajustar según formato)
    const match = stdout.match(/\\d{4}/);
    if (match) {
      return match[0];
    }

    throw new Error('OTP not found in SMS');
  } catch (error) {
    console.error('Error reading SMS via ADB:', error);
    throw error;
  }
}

// En el test
test('Login with dynamic OTP', async ({ page }) => {
  const otp = await getOTPFromPhoneViaSMS();
  await loginPage.setOTP(otp);
  // ... resto del test
});
```

**Requisitos**:

- Android SDK instalado
- ADB (Android Debug Bridge) configurado
- Dispositivo físico conectado por USB con depuración habilitada

**Ventajas**:

- Costo muy bajo (solo requiere un dispositivo Android)
- Control total sobre el dispositivo
- OTP real sin intermediarios

**Desventajas**:

- Solo para Android
- Requiere configuración local del dispositivo
- No es escalable para CI/CD distribuido
- Puede fallar si el dispositivo se desconecta. Esto ocurría con frecuencia cuando lo usé en un proyecto de Telefónica+Ericsson.

---

### 📊 Comparativa de Soluciones

| Solución         | Costo    | Facilidad | Escalabilidad | Para CI/CD     |
| ---------------- | -------- | --------- | ------------- | -------------- |
| **Twilio API**   | Bajo     | Alta      | Alta          | ✅ Recomendado |
| **BrowserStack** | Alto     | Media     | Alta          | ✅ Sí          |
| **ADB Local**    | Muy Bajo | Baja      | Baja          | ❌ No          |

### ✨ Recomendación

Para un entorno de **CI/CD productivo**, la solución más práctica es:

1. **Usar la API de Twilio Verify** - Es la opción más sostenible y oficial
2. **Mantener OTP fijo en desarrollo local** - Para rapidez en el ciclo de feedback
3. **Configurar por variable de entorno** - Permitir cambiar entre modo fijo y dinámico según contexto

```typescript
// En LoginPage.ts
async setOTP(otp?: string) {
  const otpCode = otp || process.env.DEFAULT_OTP || await getOTPFromAPI();
  await this.otpInput.fill(otpCode);
}
```
