# Mood Tracker

## Summary

This web app was created to experiment with the CI/CD resources described in [part 11](https://fullstackopen.com/en/part11). I decided to experiment with using the build tools to try to deploy to a Digital Ocean droplet. It's hosted at [scislowski.dev](https://scislowski.dev).

## This branch

- make a dev.Dockerfile for the backend
  - make sure Dockerfile for database still works
  - make sure Dockerfile forbackend still works
- make a dev.Dockerfile for the frontend
- join them all together in a docker-compose-dev.yml and nginx.conf

### Other tasks

- Look into digital ocean system restart/upgrade (I got this message when ssh-ing in):

  ```txt
  *** System restart required ***
  Pending kernel upgrade!
  Running kernel version:
    6.8.0-36-generic
  Diagnostics:
    The currently running kernel version is not the expected kernel version 6.8.0-47-generic.
  Last login: Wed Oct  9 17:14:01 2024 from 37.19.210.22
  ```

- Reinstate husky while [understanding it more](https://typicode.github.io/husky/get-started.html)
- the unit tests are usually passing, but the extensive tests are failing because the json-server isn't starting, because there's already a service started on that port... (this is on Windows; maybe ignore this?)

## Info about server on digital ocean

- Ubuntu 24.04 LTS
- node v18.19.1
- npm 9.2.0
