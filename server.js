const express = require("express");
const http = require("http");
const { Recipe } = require("./recipe");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

// root path
app.get('/', (_, res) => {
    res.end("Hello from Test-Ci")
})

// endpoint to get prepare recipes
app.get("/recipes/:id", async (req, res) => {
    let { id } = req.params;

    let recipe = new Recipe(id);
    await recipe.hydrate();

    res.json(recipe)
})

// start server
server.listen(PORT, HOST, () => {
    console.log(`Server running at ${HOST}:${PORT}`);
})