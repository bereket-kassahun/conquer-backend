import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { Player } from './constants/player';
import { Payload } from './constants/payload'
import { giveDeciderCards } from './initiation';
import { parseJson } from './utils/parser';

const app: Express = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: { origin: '*' } // allow all origins for testing
});

let players: Player[] = [];
let gameStarted: boolean = false;

app.get('/', (req: Request, res: Response) => {
  res.send('Socket.io server is running 🚀');
});

app.get('initiate', (req: Request, res: Response) => {
  if(gameStarted){
    res.send(JSON.stringify(players));
  }else{
    gameStarted = true;
    const numberOfPlayers = Number(req.query.numberOfPlayers) || 3;
    players = giveDeciderCards(numberOfPlayers);
    io.emit("player1", players[0]);
    io.emit("player1", players[1]);
    io.emit("player1", players[2]);
    console.log('players', players);
    res.send(JSON.stringify(players));
  }
});

app.get('/stop', (req: Request, res: Response) => {
  gameStarted = false;
  players = [];
  res.send('Game stopped');
});

io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);
  socket.emit('welcome', 'Hello from server!');

  socket.on('message', (msg: string) => {
    console.log('Message:', msg);
    io.emit('message', msg);
  });

  // socket.on('initate', (msg: string) => {
  //   console.log('Message:', msg);
  //   io.emit('message', msg);
  // });

  // socket.on('player1', (msg: string) => {
  //   // const payload: Payload = parseJson(msg);
  //   const player = players[0];
  //   console.log('Message:', msg);
  //   io.emit('message', JSON.stringify(player));
  // });

  // socket.on('player2', (msg: string) => {
  //   const player = players[1];
  //   console.log('Message:', msg);
  //   io.emit('message', JSON.stringify(player));
  // });

  // socket.on('player3', (msg: string) => {
  //   const player = players[2];
  //   console.log('Message:', msg);
  //   io.emit('message', JSON.stringify(player));
  // });

  socket.on('player4', (msg: string) => {
    console.log('Message:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const port: string | number = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});