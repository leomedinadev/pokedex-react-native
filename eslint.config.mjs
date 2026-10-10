import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    // Archivos de configuración (CommonJS) y carpetas nativas o generadas
    ignores: ["*.config.js", ".prettierrc.js", "jest.setup.js", "android/", "ios/", "node_modules/", "coverage/"]
  },
  {
    languageOptions: { globals: globals.browser },
    settings: { react: { version: "detect" } }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
