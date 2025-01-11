import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('Cliente conectado');

  ws.on('error', console.error);

  ws.on('message', function message(data) {

    const payload = JSON.stringify({
      type: 'message',
      payload: data.toString(),
    })

    //* Enviar mensaje a todos incluso al que envia el mensaje (emisor)
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    // * Enviar mensaje a todos excepto al que envia el mensaje (emisor)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
    

  });

  // * evento de que un usuario de desconecto   
  ws.on('close', () => {
    console.log('Cliente desconectado');
  })

});


console.log('ws://localhost:3000');