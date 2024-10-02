# Mood Tracker

## Summary

## Goals

## To-do

### This branch

- fix the issue with child process spawning on Windows
- separate backend into route file
- implement some sort of tagcloud of all the emotions that have been logged or something
- test this tagcloud
- add error tracking, maybe with middleware
- test this error tracking
- figure out why frontend is trying to get favicon.ico
- should I be tracking this in git: `tsconfig.app.tsbuildinfo`?

### Long term

- look into separating out actions workflow to dependent (`needs`) steps. Maybe use pnpm and cache stuff to save time etc
- protect main branch; implement other such security measures
- deploy to digital ocean
- send notifications to slack from github actions
- get tailwindcss and/or chakra on there
- start using db from oracle or azure or aws
