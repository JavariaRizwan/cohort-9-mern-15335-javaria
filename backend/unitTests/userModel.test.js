const {expect}=require('chai');
const User=require('../schemas/userSchema');

describe("User model schema", ()=>{
    it("should fail validaton because of missing fields", ()=>{
        const error=new User({}).validateSync();
        expect(error).to.exist;
        expect(error.errors.password).to.exist;
        expect(error.errors.email).to.exist;
    });

    it("shoudl pass all validation because fields are provided to it", ()=>{
        const error =new User({
            username:"Testing 1",
            email:"test@gmail.com",
            password:"dummyPassword"
        }).validateSync();
        expect(error).to.be.undefined;
        })
})