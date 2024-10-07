# Mood Tracker

## Summary

This web app was created to experiment with the CI/CD resources described in [part 11](https://fullstackopen.com/en/part11)

### This branch

- pm2 is just starting the node process, but now my "start" script in package.json involves starting two commands concurrently

### Other tasks

- look into separating out actions workflow to dependent (`needs`) steps. Maybe use pnpm and cache stuff to save time etc
- protect main branch; implement other such security measures
- get tailwindcss and/or chakra on there
- implement some sort of tagcloud of all the emotions that have been logged or something
  - test this tagcloud
  - add error tracking, maybe with middleware
  - test this error tracking
- separate backend into route file
- Reinstate husky while [understanding it more](https://typicode.github.io/husky/get-started.html)
