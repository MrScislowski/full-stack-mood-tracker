# Mood Tracker

## Summary

This web app was created to experiment with the CI/CD resources described in [part 11](https://fullstackopen.com/en/part11)

### This branch

- it's OK for the backend to talk to `localhost:3001` for the DB, because backend and DB are going to be on the same place. But that's not the case for the frontend right now. I think I need node-env stuff to define where the backend is. Probably a config.ts that looks at process.env or whatever. Then use cross-env to set these variables.

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
