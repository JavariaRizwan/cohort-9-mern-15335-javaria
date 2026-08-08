const {expect}=require('chai');
const User=require('../schemas/userSchema');

describe("User model schema", ()=>{
    it("should fail validaton because of missing fields", async()=>{
        const error=await new User({}).validate().catch(err=>err);
        expect(error).to.exist;
        expect(error.errors.password).to.exist;
        expect(error.errors.email).to.exist;
    });

    it("shoudl pass all validation because fields are provided to it", async()=>{
        const error = await new User({
            username:"Testing 1",
            email:"test@gmail.com",
            password:"dummyPassword"
        }).validate().catch(err=>err);
        expect(error).to.be.undefined;
        })
})