import * as net from "net";

let responseDataTpl = `HTTP/1.1 200 OK
Connection: keep-alive
Date: ${new Date()}
Content-Type: text/plain
Content-Length: 12

Hello world!
`;

var server = net.createServer(socket => {
  socket.write(responseDataTpl);

  socket.on("data", function(data) {
    console.log("DATA " + socket.remoteAddress + ": " + data);
  });

  socket.on("close", function() {
    console.log("connection closed, goodbye!\n\n\n");
  });
});

server
  .listen(
    {
      host: "0.0.0.0",
      port: 7500,
      exclusive: true
    },
    () => {
      console.log("opened server on", server.address());
    }
  )
  .on("error", err => {
    throw err;
  });
