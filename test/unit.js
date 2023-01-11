const { Recipe } = require("../recipe");
const { expect } = require("chai")
const _ = require("underscore");

describe("Recipe API", () => {
    it("Recipe#hydrate", async () => {
        const r = new Recipe(42);
        await r.hydrate();
        expect(r.name).to.eq("Recipe: #42", "Name equality")
    })

    it("Recipe#serialize", () => {
        const r = new Recipe(17)
        expect(_.isEqual(r.toJSON(),{id: 17, name: null})).to.eq(true, "Serialize properly")
    })
})