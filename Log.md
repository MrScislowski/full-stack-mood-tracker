## Installation / set-up

- Create the project using vite

  ```sh
  pnpm create vite@latest full-stack-mood-tracker --template react-ts
  ```

- Linting rules using prettier + eslint

  ```sh
  pnpm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
  ```

  (then change the `eslint.config.js` file; I used chatgpt to tell me how)

- Get backend running
  - ```sh
    pnpm install express
    pnpm install --save-dev @types/express
    pnpm install -D ts-node-dev
    ```
  - Use this weird line to straddle commonjs and es modules:
    ```ts
    import * as express from "express";
    ```
  - rename `eslint.config.js` to `eslint.config.mjs`
  - add `"esModuleInterop": true` to the `compilerOptions` of tsconfig.node.json
  - refactor the `package.json` starting scripts:
    ```json
    "dev:frontend": "vite",
    "dev:backend": "ts-node-dev backend.ts",
    ```

## Linting prior to commits

```sh
pnpm add -D husky lint-staged
npx husky init
```

Add this to `package.json` (not inside "scripts"; in its own root level):

```json
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "perttier --write"
    ]
  },
```

Put this in `.husky/pre-commit`:

```sh
pnpm lint-staged
```
