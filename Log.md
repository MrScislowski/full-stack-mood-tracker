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
      "prettier --write"
    ]
  },
```

Put this in `.husky/pre-commit`:

```sh
pnpm lint-staged
```

## Digital Ocean

- Log in to the droplet

  ```sh
  ssh root@digital-ocean-droplet-ip
  ```

  (I could verify the fingerprint of the digital ocean droplet by running `ssh-keygen -lf /etc/ssh/ssh_host_ecdsa_key.pub` on the digital ocean web console)

- set up node

  ```sh
  sudo apt update
  sudo apt install nodejs npm
  node --version # v18.19.1
  npm --version # 9.2.0
  ```

- set up github access to private repos on droplet

  ```
  ssh-keygen -t rsa -b 4096 -C "mr.scislowski@gmail.com"
  cat ~/.ssh/id_rsa.pub
  ```

  and copy/paste this into a new github ssh key
