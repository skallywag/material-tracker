/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  semi: false,
  doubleQuote: true,
  trailingComma: "all",
  pluginSearchDirs: false,
  importOrder: ["^@", "^[a-zA-Z0-9-]+", "^[./]"],
};

export default config;
