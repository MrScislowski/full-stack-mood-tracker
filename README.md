# Mood Tracker

## Summary

This web app was created to experiment with the CI/CD resources described in [part 11](https://fullstackopen.com/en/part11). I decided to experiment with using the build tools to try to deploy to a Digital Ocean droplet. It's hosted at [scislowski.dev](https://scislowski.dev).

## This branch

- make a dev.Dockerfile for the database (e.g. using [this link](https://github.com/typicode/json-server/issues/1009#issuecomment-1910141114))
- make a dev.Dockerfile for the backend
- make a dev.Dockerfile for the frontend
- join them all together in a docker-compose-dev.yml and nginx.conf

### Other tasks

- Reinstate husky while [understanding it more](https://typicode.github.io/husky/get-started.html)
- the unit tests are usually passing, but the extensive tests are failing because the json-server isn't starting, because there's already a service started on that port... (this is on Windows; maybe ignore this?)
