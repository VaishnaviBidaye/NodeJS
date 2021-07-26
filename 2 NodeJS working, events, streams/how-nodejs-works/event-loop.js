const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;

// Event Loop process cycle

setTimeout(() => console.log('Timer 1 finished'),0);
setImmediate(() => console.log('Immediate 1 finished'));

// callback
fs.readFile('test-file.txt', () => {
    console.log('i/o finished');
    console.log('----------------');

    setTimeout(() => console.log('Timer 2 finished'),0);
    setTimeout(() => console.log('Timer 3 finished'),3000);
    setImmediate(() => console.log('Immediate 2 finished'));

    process.nextTick(() => console.log('Process.nextTick'));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'password encrypted');
    })
});

console.log('hello from top -level');


// Output :
// hello from top -level
// Timer 1 finished
// Immediate 1 finished
// i/o finished
// ----------------
// Process.nextTixk
// Immediate 2 finished
// Timer 2 finished
// Timer 3 finished