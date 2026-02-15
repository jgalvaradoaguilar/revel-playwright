# revel-playwright

Proyecto de automatización de pruebas de UI para la plataforma Revel utilizando **Playwright** con **TypeScript**.

## 📋 Descripción

Este es un proyecto en desarrollo que busca crear un framework de automatización robusto siguiendo principios de **BDD (Behavior Driven Development)**. Las pruebas se centran en validar funcionalidades críticas de la aplicación web como autenticación y filtrado de vehículos.

Si tuviera más tiempo haría esto:

- Aunque los objetos están declarados fuera de las páginas, quiero buscar una mejor forma de inicializar las instancias "pages".
- Implementaría herencia en "pages" (si se pudiera) para implementar métodos genéricos "isVisible" y similares.
- Metería GitHub Actions pero de eso no tengo ni idea y tendría que investigarlo y después incorporarlo.

### Formatear el proyecto (prettier)

    $ npm format

### Ejecución

    $ npm test

### Ver el reporte (No funciona)

Se crea un reporte cucumber html que deberá ser expuesto en CI/CD para poder revisar las features.

Lo tenemos en local en: file:///{tu_directorio}/revel-playwright/reports/cucumber-report.html

## 🛠️ Stack Tecnológico

- **Framework de Automatización**: Playwright
- **Lenguaje**: TypeScript
- **Framework BDD**: Cucumber.js
- **Patrón de Diseño**: Page Object Model (POM) + Locators separados
- **Estructura de Tests**: Features (Gherkin) → Steps (TypeScript) → Pages (POM) → Locators
- **Test Runner**: Playwright + Cucumber
- **Reporte**: HTML Cucumber Reports

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
Scenario Outline: Login successful with phone pre-set OTP: <email> - <phone> - <otp_code>
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
Scenario Outline: Login failed because a wrong OTP code: <email> - <phone> - <otp_code>
  Given the user go to login on Revel URL
  And the user login with his phone "<phone>"
  When the user writes the OTP received "<otp>"
  Then an error message is showed
```

- **Objetivo**: Validar rechazo de OTP incorrecto
- **Datos de prueba**: OTP inválido (1234) en tabla Examples
- **Verificación**: Debe mostrarse mensaje de error "Este código no es válido"

### Filters Our Cars Test Suite (`src/test/features/filtersOurCars.feature`)

Se han implementado 5 escenarios con ejemplos parametrizados:

#### 1. Verify response of the filter "Fuel" option "Electric Hybrid"

```gherkin
Scenario Outline: Verify response of the filter "<filter>" option "<option>"
  Given the user go to cars page on Revel URL
  When the user clicks on filter "<filter>"
  And the user choose the option "<option>"
  Then the filter option "<filterOptionInURL>" appears in the URL
  And the first car in the results page is "<firstCarModel>" "<firstCarVersion>"
```

- **Objetivo**: Validar filtrado por tipo de combustible
- **Datos de prueba**: Fuel/Electric Hybrid/`?fuelTypes=electric-hybrid`
- **Verificación**: URL contiene parámetro → Primer resultado es Toyota C-HR 220PH Advance

#### 2. Verify response of the filter "Body Type" option "SUV"

- **Objetivo**: Validar filtrado por tipo de carrocería
- **Datos de prueba**: Body Type/SUV/`?bodyType=suv`
- **Verificación**: URL contiene parámetro → Primer resultado es Kia XCeed 1.0 T-GDi Drive

#### 3. Verify response of the filters "Fuel" y "Body Type" combinados

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

#### 4. Filters without results

- **Objetivo**: Validar comportamiento cuando no hay resultados
- **Datos de prueba**: Combinación Fuel + Body Type + Color (sin resultados)
- **Verificación**: Aparece mensaje "¿No encuentras lo que buscas?"

#### 5. Cleaning filters

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
