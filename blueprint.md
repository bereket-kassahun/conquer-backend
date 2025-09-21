# Conquer - Socket.io Backend Blueprint

This document outlines the architecture and conventions for the Conquer backend server.

## Project Overview

This project is the backend for a card game called "Conquer", built with Node.js, Express, TypeScript, and Socket.io.

## Project Structure

```
.
├── constants/
│   └── cards.ts      # Defines the card data for the game.
├── .idx/
│   └── dev.nix       # IDX workspace configuration
├── index.ts          # Main server entry point, handles socket connections.
├── initiation.ts     # Handles game initiation logic.
├── package.json      # Project dependencies and scripts.
├── package-lock.json # Lockfile for dependencies.
└── tsconfig.json     # TypeScript compiler configuration (should be created).
```

## Game Logic

The core game logic is distributed across different files.
- **Game State:** The game state should be managed on the server.
- **Turns:** The server will manage player turns.
- **Actions:** Player actions (e.g., playing a card, ending a turn) are sent via socket events.

## Socket.io Events

The server communicates with clients using Socket.io. Here is a list of proposed events:

### Server -> Client Events

- `game:state` - Sent to all players in a room when the game state changes. Payload: the full game state.
- `game:turn` - Sent to the player whose turn it is. Payload: { playerId: string }.
- `game:error` - Sent to a player when an invalid action is attempted. Payload: { message: string }.
- `player:connected` - Broadcast when a new player connects.
- `player:disconnected` - Broadcast when a player disconnects.

### Client -> Server Events

- `game:join` - A player requests to join a game. Payload: { gameId: string, playerId: string }.
- `game:start` - The host requests to start the game.
- `player:action` - A player performs an action. Payload: { type: 'PLAY_CARD', cardId: string } or { type: 'END_TURN' }.

## Development

1.  **Install dependencies:** `npm install`
2.  **Run the server:** `npm start`
3.  The server will run on `http://localhost:3000`.

