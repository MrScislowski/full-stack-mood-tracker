# Mood Tracker

## Summary

This web app was created to experiment with the CI/CD resources described in [part 11](https://fullstackopen.com/en/part11)

## This branch

- checking development mode doesn't work on the frontend b/c vite build sets node_env automatically. But the frontend is being served up by the backend! So we don't need environment variables there! Localhost:3000 will always work, right?
- once a post for a new emotion entry is successful, put it in the array w/o a manual refresh
- test this tagcloud
- add error tracking, maybe with middleware
- test this error tracking

### Other tasks

- get tailwindcss and/or chakra on there
- separate backend into route file
- Reinstate husky while [understanding it more](https://typicode.github.io/husky/get-started.html)
- the unit tests are usually passing, but the extensive tests are failing because the json-server isn't starting, because there's already a service started on that port... (this is on Windows; maybe ignore this?)
