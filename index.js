
const webSocketsServerPort = 8000;
const webSocketsServer = require('websocket').server;
const http = require('http');
const getProcesses = require('./src/data/processos');
const getMemoria = require('./src/data/memoria');

const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('escutando a porta :' + webSocketsServerPort)

const wsServer = new webSocketsServer({
    httpServer: server
})

const clients = [];

wsServer.on('request', function (request){
    const connection = request.accept(null, request.origin);
    clients.push(connection);
})

function sendMessageToClients(msg){
    for(key in clients){
        clients[key].send(JSON.stringify(msg));
    }
}

setInterval(async () => {
    const processes = await getProcesses();
    const memoria = await getMemoria();
    sendMessageToClients({processes, memoria});
}, 5000);



