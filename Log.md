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

### Initial Configuration

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

  ```sh
  ssh-keygen -t rsa -b 4096 -C "mr.scislowski@gmail.com"
  cat ~/.ssh/id_rsa.pub
  ```

  and copy/paste this into a new github ssh key

- add a new user so we're not running things from root

  ```sh
  adduser nodeapp --disabled-password
  su - nodeapp
  ```

- clone the repo

  ```sh
  git clone git@github.com:MrScislowski/full-stack-mood-tracker.git
  ```

- install pnpm (as root)

  ```sh
  npm install -g pnpm
  ```

- build and serve the app

  ```sh
  pnpm install
  pnpm run build
  node backend/dist/backend/index.js
  ```

- And now if I go to the IP address, I get the website :)

### More advanced configuration

- Allow nodeapp user to have sudo for npm and pm2

  - start the editor

    ```sh
    EDITOR=vi visudo
    ```

  - add the line:

    ```
    nodeapp ALL=(ALL) NOPASSWD: /usr/bin/npm, /usr/bin/pm2
    ```

  - it worked to install pm2!

    ```sh
    sudo npm install -g pm2
    ```

  - configure pm2 to do the right thing.
    ```sh
    pm2 start backend/dist/backend/index.js
    pm2 save
    pm2 startup
    # this gave me a command that I had to switch to root to run
    sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u nodeapp --hp /home/nodeapp
    # It tols me I could cancel this using
    # pm2 unstartup systemd
    ```

### Still to do

- set up a reverse proxy using nginx
- set up ssl using let's encrypt
- make a github actions workflow to do all this
