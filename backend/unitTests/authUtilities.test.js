const {hashPassword} = require('../functions/utils');
const {expect}=require('chai');
const bcrypt=require("bcryptjs")

describe("Password Hash Function", ()=>{
        const password="MyTestingPassword";
        it("shoudl hash the password", async()=>{
            const hashPass=await hashPassword(password);
            expect(hashPass).to.exist;
            expect(hashPass).to.not.equal(password);
        
        const isMatched=await bcrypt.compare(password, hashPass);
        expect(isMatched).to.be.true;

        const isWrong=await bcrypt.compare("DummyTestingPassword", hashPass);
        expect(isWrong).to.be.false;
        });
        
    })
