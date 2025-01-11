# Tsngo - LinkedIn's Tango replica

Tsngo (TS + Tango, pronounced as "_tee-san-go_") is a replica of Tango (a puzzle game created by LinkedIn) in TypeScript.

## Running the demo

If you just want to play the game, I have already implemented a working example as a CLI for you to have some fun with it. Simply do the following:

- Clone the repository and visit the directory:
  `git clone https://github.com/travistang/tsngo && cd tsngo`

- Install the dependencies:
  `npm install`
- Run:
  `npx ts-node examples/tsngo-cli.ts`

I assume you know how to play the original game. If you don't please check out LinkedIn's tutorial!

## Using it in your own project

- Install it with npm (or any of your favourite package manager):
  `npm install tsngo`
- Then use it in your code like:

```
import Tsngo from 'tsngo';

const tsngo = new Tsngo();
tsngo.initialize();
// Do whatever you want with the game
```
