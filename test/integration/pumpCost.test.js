const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");
const endpoint = "/capacity";

describe("/capacity endpoint", () => {
  describe("GET", () => {
    it("should return a 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });
    it("should return a json", async () => {
      const response = await request(app).get(endpoint);
      expect(response.type).toBe("application/json");
    });
    it("should return a json with data", async () => {
      const response = await request(app).get(endpoint);
      expect(response.body.data).toBe("please provide correct pump capacity");
    });
  });
  describe("get /capacity/:capacity", () => {
    it("should return a json with data", async () => {
      const response = await request(app).get(`${endpoint}/?capacity=100`);
      expect(response.body.data).toBe("please provide correct pump capacity");
    });
    it("should return a pump greater than  or equal heat loss", async () => {
      const response = await request(app).get(`${endpoint}/?capacity=6`);
      expect(response.statusCode).toBe(200);
      expect(
        response.body.data.breakDown.outputCapacity
      ).toBeGreaterThanOrEqual(6);
    });
    it("should return all the correct fields: breakdown, vat rat, total subtotal", async () => {
        const response = await request(app).get(`${endpoint}/?capacity=6`);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.breakDown).toHaveProperty("costs");
        expect(response.body.data.breakDown).toHaveProperty("outputCapacity");
        expect(response.body.data).toHaveProperty("subtotal");
        expect(response.body.data).toHaveProperty("vat rate");
        expect(response.body.data).toHaveProperty("total");
    });
  });
});
