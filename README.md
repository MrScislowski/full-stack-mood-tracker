# Mood Tracker

## Summary

## Goals

## To-do

### This branch

### Long term

- deploy to digital ocean

- the deployed backend doesn't work; it's trying to go to "localhost:3000" etc...
- improve package.json scripts to not have stuff like `cd` in them
- if you're trying to test out github action scripts, and they don't show up unless you push to main (since workflow_dispatch triggered ones don't show until you do that), which is a real pain... is there a way around that?
- separate backend into route file
- implement some sort of tagcloud of all the emotions that have been logged or something
- test this tagcloud
- add error tracking, maybe with middleware
- test this error tracking
- figure out why frontend is trying to get favicon.ico

- look into separating out actions workflow to dependent (`needs`) steps. Maybe use pnpm and cache stuff to save time etc
- protect main branch; implement other such security measures
- send notifications to slack from github actions
- get tailwindcss and/or chakra on there
- start using db from oracle or azure or aws
