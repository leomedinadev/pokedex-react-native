# Pokedex — React Native

Aplicación móvil hecha con React Native que lista los pokemon de [PokeAPI](https://pokeapi.co/), muestra el detalle de cada uno y permite guardar favoritos en el dispositivo. Es un proyecto de práctica de navegación, consumo de una API REST y almacenamiento local.

## Qué hace

- **Pokedex:** lista en dos columnas con carga progresiva (20 pokemon por página) al llegar al final.
- **Detalle:** imagen, tipos y estadísticas base de un pokemon.
- **Favoritos:** con sesión iniciada se puede marcar un pokemon con el corazón de la cabecera; la lista se guarda con AsyncStorage.
- **Mi cuenta:** formulario de inicio de sesión (Formik + Yup) y datos del usuario.

El inicio de sesión es de demostración: no hay backend y el único usuario está definido en [`src/utils/userDB.ts`](src/utils/userDB.ts) (usuario `leonardo`, contraseña `leonardo`). La sesión no se conserva al cerrar la aplicación.

## Tecnologías

- React Native 0.73.6 y React 18, con TypeScript
- React Navigation 6 (pestañas inferiores y pilas nativas)
- AsyncStorage, Formik, Yup y Lodash
- react-native-vector-icons (Font Awesome)
- Jest para las pruebas

## Requisitos

- Node 18 o superior
- El [entorno de React Native](https://reactnative.dev/docs/environment-setup) para Android (JDK 17 y Android SDK)

El proyecto se ha probado en Android. En iOS los iconos no están configurados: `react-native.config.js` desactiva el enlace de `react-native-vector-icons` en esa plataforma y `Info.plist` no declara las fuentes.

## Cómo ejecutarlo

```bash
npm install
npm start
```

Con Metro en marcha, en otra terminal:

```bash
npm run android
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm start` | Arranca Metro |
| `npm run android` | Compila e instala la aplicación en Android |
| `npm run ios` | Compila e instala la aplicación en iOS (antes, `pod install` dentro de `ios/`) |
| `npm test` | Ejecuta las pruebas con Jest |
| `npm run typecheck` | Comprueba los tipos con TypeScript |
| `npm run lint` | Analiza el código con ESLint |

## Estructura

```
App.tsx              Punto de entrada: navegación y contexto de sesión
src/
  api/               Llamadas a PokeAPI y favoritos en AsyncStorage
  components/        Lista, tarjeta, detalle, formulario de login
  context/           AuthContext (sesión en memoria)
  hooks/             useAuth
  models/            Tipos de pokemon
  navigation/        Pestañas y pilas de navegación
  screens/           Pokedex, Pokemon, Favoritos y Mi cuenta
  utils/             Constantes y usuario de demostración
__tests__/           Pruebas de la aplicación y de los servicios
```

## Problema conocido en Android

Si la compilación falla en una tarea de `lint` relacionada con las fuentes de `react-native-vector-icons`, añade esto al final de `node_modules/react-native-vector-icons/fonts.gradle` (dentro del bloque `android.applicationVariants.all`):

```groovy
def lintAnalyzeDebugTask = tasks.findByName("lintAnalyzeDebug")
if (lintAnalyzeDebugTask) {
    lintAnalyzeDebugTask.dependsOn(fontCopyTask)
    lintAnalyzeDebugTask.mustRunAfter(fontCopyTask)
}

def lintVitalAnalyzeReleaseTask = tasks.findByName("lintVitalAnalyzeRelease")
if (lintVitalAnalyzeReleaseTask) {
    lintVitalAnalyzeReleaseTask.dependsOn(fontCopyTask)
    lintVitalAnalyzeReleaseTask.mustRunAfter(fontCopyTask)
}
```

Es un cambio dentro de `node_modules`, así que hay que repetirlo después de cada `npm install`.

## Créditos

Los datos y las imágenes de los pokemon vienen de [PokeAPI](https://pokeapi.co/). Pokémon y sus nombres son marcas de Nintendo, Game Freak y Creatures; este proyecto es solo educativo.

## Autor

Leonardo Medina — [github.com/leomedinadev](https://github.com/leomedinadev)
