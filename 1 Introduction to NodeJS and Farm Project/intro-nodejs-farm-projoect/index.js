// imports
const fs = require('fs');
const http = require('http');
const { dirname } = require('path');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');          // current location - root folder



//---------    FILES    -------------

// Blocking, synchronous way

// // Read File
// // utf-8 - character encoding
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);


// // Write file
// const textOutput = `This is what we know about the avocado: ${textInput}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log(textOutput);




// Non-Blocking, asynchronous way

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });


// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//     });
// });


// // merge two file's content and write in another file
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

//     if (err) return console.log('Error !');

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);

//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('File written successfully !');
//             });
//         });
//     });
// });



//---------    SERVER    -------------



// Load pages
// Make functions Sync only
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


// Load JSON file
// __dirname - root file name
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));


const server = http.createServer((req, res) => {

    // console.log(url.parse(req.url, true));
    const {query, pathname} = url.parse(req.url, true);


    // Overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    
        res.end(output);

    

    // Product page    
    } else if(pathname === '/product') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        const product = dataObj[query.id];
        
        const output = replaceTemplate(tempProduct, product);

        res.end(output);



    // API page    
    } else if(pathname === '/api') {
        res.writeHead(200, {
                'Content-Type': 'application/json',
        });
        res.end(data);



    // Not found page    
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Page not found !</h1>');

    }

});


server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});





