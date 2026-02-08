# revel-playwright

Proyecto de automatización de pruebas de UI para la plataforma Revel utilizando **Playwright** con **TypeScript**.

## 📋 Descripción

Este es un proyecto en desarrollo que busca crear un framework de automatización robusto siguiendo principios de **BDD (Behavior Driven Development)**. Las pruebas se centran en validar funcionalidades críticas de la aplicación web como autenticación y filtrado de vehículos.

Si tuviera más tiempo haría esto:
- Buscaría una buena forma de meterle Cucumber porque los pasos son repetitivos y bien usados permiten crear tests muy rápido y los datos forman parte del propio test-escenario.
- Pondría los repositorios de objetos, uno por cada página, que eso ya está, pero además que no estén declarados dentro de cada page sino en ficheros aparte, para que cuando haya cambios en los elementos no sea necesario tocar nada que pueda tener código.
- Metería GitHub Actions pero de eso no tengo ni idea y tendría que investigarlo y después incorporarlo.
- Mejoraría el proyecto con fixtures que lo he leído de forma transversal porque este ha sido mi primer proyecto de Playwright y también mi primera experiencia con Typescript aunque los expects sí que lo había usado bastante con Ruby + Selenium por lo que más o menos pude completar la prueba técnica.

### Formatear el proyecto (prettier)
    
    $ npm format

### Ejecución (Sí ejecuta la feature)
    
    $ npm test

### Ver el reporte (No funciona)

El reporte está corriendo en http://localhost:9323.
En caso de que no se lance automáticamente, se puede levantar ejecutando:

    $ npx playwright show-report

## 🛠️ Stack Tecnológico

- **Framework**: Playwright
- **Lenguaje**: TypeScript
- **Test Framework**: Playwright Test
- **Patrón**: Page Object Model (POM)
- **Reporte**: HTML Reporter

## 🧪 Test Cases Implementados

### Login Test Suite

Se han implementado 2 casos de prueba en el módulo de login:

1. **Login successful with phone pre-set OTP** 
   - Valida que un usuario pueda autenticarse correctamente ingresando su número de teléfono y el OTP predeterminado
   - Verifica que aparezca la imagen de "Login Successful" tras la autenticación

2. **Login failed because a wrong OTP code**
   - Valida que el sistema rechace un OTP incorrecto
   - Verifica que se muestre el mensaje de error "Este código no es válido"

### Filters Our Cars Test Suite

Se han implementado 5 casos de prueba en el módulo de filtrado de vehículos:

1. **Verify response of the filter "Fuel" option "Electric Hybrid"**
   - Aplica el filtro de combustible "Híbrido enchufable"
   - Verifica que la URL contenga `?fuelTypes=electric-hybrid`
   - Valida que el primer vehículo en resultados sea "Toyota C-HR 220PH Advance"

2. **Verify response of the filter "Body Type" option "SUV"**
   - Aplica el filtro de tipo de coche "SUV"
   - Verifica que la URL contenga `?bodyType=suv`
   - Valida que el primer vehículo en resultados sea "Kia XCeed 1.0 T-GDi Drive"

3. **Verify response of the filters "Fuel" option "Electric Hybrid" and "Body Type" option "SUV"**
   - Aplica múltiples filtros de forma combinada
   - Verifica que la URL contenga ambos parámetros: `?fuelTypes=electric-hybrid&bodyType=suv`
   - Valida que el primer vehículo siga siendo "Toyota C-HR 220PH Advance"

4. **Filters without results. "Fuel: Electric Hybrid", "Body Type: SUV", "Color: Blanco"**
   - Aplica una combinación de tres filtros que no produce resultados
   - Verifica que aparezca el mensaje "¿No encuentras lo que buscas?"

5. **Cleaning filters. Filters "Fuel: Electric Hybrid" and "Body Type: SUV"**
   - Aplica filtros y luego los limpia mediante los botones de reset
   - Verifica que la URL no contenga parámetros de filtro
   - Valida que el primer vehículo sea "Peugeot 208 Allure" (resultado por defecto)

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
  const response = await fetch('https://verify.twilio.com/v2/Services/{SERVICE_SID}/Verifications', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.TWILIO_API_KEY}`
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
      status: 'pending'
    })
  });

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
        appiumVersion: '1.22.0'
      }
    }
  }
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
- Puede fallar si el dispositivo se desconecta. Esto ocurría con frecuencia cuando lo usé en un proyecto de  Telefónica+Ericsson.

---

### 📊 Comparativa de Soluciones

| Solución | Costo | Facilidad | Escalabilidad | Para CI/CD |
|----------|-------|-----------|---------------|-----------|
| **Twilio API** | Bajo | Alta | Alta | ✅ Recomendado |
| **BrowserStack** | Alto | Media | Alta | ✅ Sí |
| **ADB Local** | Muy Bajo | Baja | Baja | ❌ No |

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
