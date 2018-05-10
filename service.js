"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
var responseDataTpl = "HTTP/1.1 200 OK\nConnection: keep-alive\nDate: " + new Date() + "\nContent-Type: text/plain\nContent-Length: 12\n\nHello world!\n";
var server = net.createServer(function (socket) {
    socket.write(responseDataTpl);
    socket.on("data", function (data) {
        console.log("DATA " + socket.remoteAddress + ": " + data);
    });
    socket.on("close", function () {
        console.log("connection closed, goodbye!\n\n\n");
    });
});
server
    .listen({
    host: "0.0.0.0",
    port: 7500,
    exclusive: true
}, function () {
    console.log("opened server on", server.address());
})
    .on("error", function (err) {
    throw err;
});
