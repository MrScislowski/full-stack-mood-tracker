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

  - allow github actions to log in to the `nodeapp` user...

    - generate the key pair

      ```sh
      ssh-keygen -t ed25519 -C "mr.scislowski@gmail.com"
      ```

    - add the public key to the `.ssh/authorized_keys` file of nodeapp user

    - use the private key in the github actions workflow with name `SERVER_SSH_KEY`

    - set the `KNOWN_HOSTS` secret on github to the output from

      ```sh
      ssh-keyscan <ip address of droplet>
      ```

      - then this pretty much worked:

      ```yml
      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - name: Install SSH key
              uses: shimataro/ssh-key-action@v2
              with:
                key: ${{ secrets.SERVER_SSH_KEY }}
                known_hosts: ${{ secrets.KNOWN_HOSTS }}

            - name: Deploy to DigitalOcean
              run: |
                ssh nodeapp@droplet-ip-address /bin/bash << EOF
                cd ~/full-stack-mood-tracker
                git pull origin main
                pnpm install
                pm2 restart ./backend/dist/backend/index.js
                EOF
      ```

#### Resources problems

I think we were running out of memory. Yikes. ChatGPT advised this as root:

```sh
# Allocate a 1GB swap file (or increase size if needed)
sudo fallocate -l 1G /swapfile
# Set permissions for the file
sudo chmod 600 /swapfile
# Setup swap area
sudo mkswap /swapfile
# Enable the swap file
sudo swapon /swapfile
# Confirm swap is active
sudo swapon --show
```

And that actually worked. I don't feel great about this, and it's really not coding so leaving it for now...

### Further advanced configuration

- set up a reverse proxy using nginx

  - install nginx

  ```sh
  sudo apt install nginx
  ```

  - edit configuration file `/etc/nginx/sites-available/full-stack-mood-tracker` to contain

  ```
  server {
    listen 80;
    server_name 159.223.191.151;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
  }                                                                                      }
  ```

  - enable the configuration

  ```sh
    ln -s /etc/nginx/sites-available/full-stack-mood-tracker /etc/nginx/sites-enabled
    sudo nginx -t
    sudo systemctl restart nginx
  ```

  - This worked! Since going to http://159.223.191.151 (without specifying a port number), loaded the page

- Set up SSL

  - bought `scislowski.dev` on cloudflare for ~$12/yr

  - update nginx configuration to use my domain name
    (change from the raw IP to `scislowski.dev` in /etc/nginx/sites-available/full-stack-mood-tracker)

  - generate a certificate (as root on droplet):

    ```sh
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
    ```

  - `/etc/nginx/sites-available-full-stack-mood-tracker`:

  ```
  server {
      listen 443 ssl;
      listen [::]:443 ssl;

      server_name your_domain.com;  # Replace with your domain or IP address

      ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
      ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

      location / {
          proxy_pass http://localhost:your_app_port;  # Forward traffic to your app
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
  }

  # Optional: Redirect HTTP to HTTPS
  server {
      listen 80;
      listen [::]:80;

      server_name your_domain.com;

      return 301 https://$host$request_uri;
  }

  ```

  - check configuration, and restart nginx:

    ```sh
    nginx -t
    systemctl restart nginx
    ```

### Deploying the `dist` directories so that my droplet doesn't run out of memory building

```yaml
- name: copy files over to Digital Ocean
  run: |
    scp package.json pnpm-lock.yaml nodeapp@159.223.191.151:~/full-stack-mood-tracker
    rsync -r backend/dist nodeapp@159.223.191.151:~/full-stack-mood-tracker/backend
    rsync -r frontend/dist nodeapp@159.223.191.151:~/full-stack-mood-tracker/frontend

- name: Install dependencies and start server
  run: |
    ssh nodeapp@159.223.191.151 /bin/bash << EOF
    cd ~/full-stack-mood-tracker
    pnpm --prod install
    pm2 restart ./backend/dist/backend/index.js
    EOF
```

### Now that I'm starting the db along with the backend, I should change my `pm2` commands

- stop the existing script

  ```sh
  pm2 unstartup # as nodeapp user
  sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 unstartup systemd -u nodeapp --hp /home/nodeapp # as root; pm2 told me what to type
  pm2 start npm --name "mood tracker" -- start # as nodeapp
  pm2 stop 0 # nodeapp
  pm2 delete 0 # nodeapp
  pm2 save # nodeapp
  pm2 startup # nodeapp
  sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u nodeapp --hp /home/nodeapp # root
  ```

## Tailwind

- install tailwind CSS

  ```sh
  pnpm install -D tailwindcss
  pnpm dlx tailwindcss init
  ```

- configure template paths by editing `tailwind.config.js` to have line `content: ["./frontend/src/*.{html,js,ts,jsx,tsx}"],`

- make file `frontend/src/input.css` with content:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

- add to build process for frontend stuff in `package.json`, e.g.

  ```json
    "build:frontend": "tailwindcss -i frontend/src/input.css -o frontend/src/output.css && cd ./frontend && tsc -b && vite build"
  ```

- add the compiled css file to the html
  ```html
  <head>
    <!-- ... -->
    <link href="" />
  </head>
  ```
