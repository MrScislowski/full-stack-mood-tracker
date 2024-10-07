# Mood Tracker

## Summary

This web app was created to experiment with the CI/CD resources described in [part 11](https://fullstackopen.com/en/part11)

### feature/production-db-subprocess

- get rid of husky, I guess? Or maybe make it a devDependency? The thing is, if `prepare` in package.json always gets run (even in production), this seems like a suboptimal setup

### Other tasks

- separate backend into route file
- look into separating out actions workflow to dependent (`needs`) steps. Maybe use pnpm and cache stuff to save time etc
- protect main branch; implement other such security measures
- get tailwindcss and/or chakra on there
- implement some sort of tagcloud of all the emotions that have been logged or something
  - test this tagcloud
  - add error tracking, maybe with middleware
  - test this error tracking
