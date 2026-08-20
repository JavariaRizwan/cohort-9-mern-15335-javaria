
const {expect}=require('chai')
const User=require('../schemas/userSchema');
const logger=require('../src/config/logger');
const {saveUser}=require('../functions/postFunctions');
const utils=require('../functions/utils');
const sinon=require('sinon');


describe("Controller: Save User", ()=>{
    let req, res;
beforeEach(()=>{
    req={
        body:{}
    }
    res={
        
        status: sinon.stub().callsFake((code) => {
                res.statusCode = code;
                return res;
            }),
        json:sinon.stub().returnsThis()
    }
});

afterEach(()=>{
    sinon.restore();
});


it("shoudl throw error 409 if fields are missing", async()=>{
    req.body={username:'testing',
        email: null, 
        password: ''
    };
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(logger, 'warn');


    try{

    await saveUser(req, res);
    }
 catch(error){
    throw error;
 }
 
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledOnce).to.be.true;

    const resData=res.json.getCall(0).args[0];
    expect(resData.success).to.be.false;
    expect(resData.message).to.equal("Please fill all the required fields for signup");

});


it("should give error 409 if yser already exists", async()=>{
    req.body={username:'tetsing',
        email:'testing1@gmail.com',
        password:'123456'
    };

    sinon.stub(User, 'findOne').resolves({email:'testing1@gmail.com'});
    sinon.stub(logger, 'warn');

    try{
    await saveUser(req, res);

    }
catch(error){
    throw error;
}
    const resData=res.json.getCall(0).args[0];
    expect(resData.success).to.be.false;
    expect(resData.message).to.equal("User with this email already exists.");

});


it("shoudl save a user", async()=>{
    req.body={
    username:'tetsing',
        email:'testing1@gmail.com',
        password:'123456',
        emailUpdates:false
    };

    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(utils, 'hashFunction').resolves('hashed_password_123');

    const savedUser = {
            _id: '60c72b2f9b1d8b2bad567890',
            username: 'tetsing',
            email: 'testing1@gmail.com',
            emailUpdates: false
        };
        sinon.stub(User, 'create').resolves(savedUser);
        
        sinon.stub(logger, 'info');

try{
await saveUser(req, res);

}
catch(error){
    throw error;
}    
    const resData=res.json.getCall(0).args[0];
    expect(res.status.calledWith(201)).to.be.true;
    expect(resData.success).to.be.true;
    expect(resData.message).to.equal("User registered successfully");


})




})