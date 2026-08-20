const {expect}=require('chai')
const User=require('../schemas/userSchema');
const logger=require('../src/config/logger');
const {login}=require('../functions/postFunctions');
const utils=require('../functions/utils');
const sinon=require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


describe("Controller Login", ()=>{

let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: sinon.stub().callsFake((code) => {
                res.statusCode = code;
                return res; 
            }),
            json: sinon.stub().returnsThis(),
            cookie: sinon.stub()
        };
    });

afterEach(()=>{
    sinon.restore();
})

it("shpudl return 400 for missing fields", async()=>{
    req.body={usernameOrEmail: "testuser"};
    sinon.stub(logger, 'warn');

    try{
await login(req, res);

    }
catch(error){
    throw error;
}        
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledOnce).to.be.true;

        const resData = res.json.getCall(0).args[0];
        expect(resData.success).to.be.false;
        expect(resData.message).to.equal("Username/Email and password are required.");
})


it("should login th user successfully", async()=>{
    req.body = { usernameOrEmail: "testuser", password: "testPass" };

    const loggedInUser = {
            _id: 'user_123',
            username: 'testuser',
            password: 'test_pass'
        };

        sinon.stub(User, 'findOne').resolves(loggedInUser);
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(jwt, 'sign').returns('test_token');
        sinon.stub(logger, 'info');

        try{
        await login(req, res);
        }
        catch(error){
throw error;
        }


        expect(res.status.calledWith(200)).to.be.true;

        const resData = res.json.getCall(0).args[0];
        expect(resData.success).to.be.true;
        expect(resData.message).to.equal("Login successful");
})



})