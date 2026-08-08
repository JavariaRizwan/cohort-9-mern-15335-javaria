const { expect } = require('chai');
const authenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
require('dotenv').config();

describe('Authorization Middleware Testing', () => {
    process.env.JWT_SECRET = "mySecretCode";

    it("should handle missing tokens", async () => {
        try {
            const req = { headers: {} };
            let status;
            const res = {
                status: function (code) {
                    status = code;
                    return {
                        json: function (data) {
                            return { code, data };
                        }
                    };
                }
            };

            const next = () => { };

            await authenticate(req, res, next);
            //   expect(status).to.equal(401);  ---Update to 401 to match the original function status code

            expect(status).to.equal(403);

        } catch (error) {

            expect.fail(`Missing token test failed: ${error.message}`);
        }
    });

    it("should handle invalid token", async () => {

        try {
            const req = { headers: { authorization: "Bearer invalidToken" } };
            let status;
            const res = {
                status: function (code) {
                    status = code;
                    return {
                        json: function (data) {
                            return { code, data };
                        }
                    };
                }
            };
            const next = () => { };

            await authenticate(req, res, next);
            //   expect(status).to.equal(401);  ---Update to 401 to match the original function status code
            expect(status).to.equal(403);

        } catch (error) {
            expect.fail(`Invalid token test failed: ${error.message}`);

        }
    });

    it("should validate the token", async () => {
        try {
            const token = jwt.sign({ id: 1, username: "testuser" }, process.env.JWT_SECRET);
            const req = { cookies: { token }, headers: {} };
            let nextCalled = false;
            const res = {};
            await authenticate(req, res, () => { nextCalled = true; });
            expect(nextCalled).to.be.true;

        } catch (error) {
            expect.fail(`Validation token failed: ${error.message}`)
        }
    })


});