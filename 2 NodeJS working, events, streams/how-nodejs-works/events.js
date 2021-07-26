// Event Driven Architechure - Observer Pattern
const EventEmitter = require('events');
const http = require('http');


class Sales extends EventEmitter {
    constructor() {
        super();
    }
}


const myEmitter = new Sales();


//oberver
myEmitter.on('newSale', () => {
    console.log('There was a new sale !');
});

//oberver
myEmitter.on('newSale', () => {
    console.log('Customer name: Vaish');
});

//oberver
myEmitter.on('newSale', (stock) => {
    console.log(`There are ${stock} items left in stock !`);
});

// emitter
myEmitter.emit('newSale', 10);




// -----------    Create Server    -------------


const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request Received');
    res.end('Request Recieved');
});

server.on('request', (req, res) => {
    console.log('Another Request');
});

server.on('close', () => {
    console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for request...');
});