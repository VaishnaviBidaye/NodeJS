const fs = require("fs");
const { fileURLToPath } = require("url");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // // Solution 1
  // fs.readFile('test-file.txt', (err, data) => {
  //     if (err) {
  //         console.log(err);
  //     }

  //     res.end(data);
  // });



  // // Soltion 2 - streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });

  // readable.on("end", () => {
  //   res.end();
  // });

  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found !");
  // });



  // Solution 3 - pipe
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);       // consuming and writing stream

  //readableSource.pipe(writeabledest)


});

server.listen(8001, "127.0.0.1", () => {
  console.log("Listening...");
});
