# Mood Tracker

## Summary

This web app was created to experiment with the CI/CD resources described in [part 11](https://fullstackopen.com/en/part11)

## This branch

- protect main branch; implement other such security measures
- implement some sort of tagcloud of all the emotions that have been logged or something
  - test this tagcloud
  - add error tracking, maybe with middleware
  - test this error tracking

### Other tasks

- get tailwindcss and/or chakra on there
- separate backend into route file
- Reinstate husky while [understanding it more](https://typicode.github.io/husky/get-started.html)
- the unit tests are usually passing, but the extensive tests are failing because the json-server isn't starting, because there's already a service started on that port... (this is on Windows; maybe ignore this?)
