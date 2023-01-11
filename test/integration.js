const { spawn } = require("child_process");
const { expect } = require("chai");

const startServer = () => new Promise((res, _rej) => {
    const server = spawn("node", ["../server.js"], {
        env: Object.assign({}, process.env, {PORT: Math.floor(Math.random() * 9999)}),
        cwd: __dirname
    })

    server.stdout.on("data", async (data) => {
        const msg = data.toString().trim();
        res({ server, msg })
    })

})

describe("Recipe API integration test", function() {

    it("GET /recipes/42", function() {
        return startServer().then(async ({ server, msg }) => {

            let url = /Server running at (.+)$/.exec(msg)[1];
            console.log("------>", url);

            const result = await fetch(`http://${url}/recipes/42`);

            let body = await result.json();

            expect(body.id).to.be.eq(42);

            server.kill();
        })
    })

})