const express = require("express");

const server = require("./server");

server.listen(8080, () => console.log(`Server is on http://localhost:8080`));
