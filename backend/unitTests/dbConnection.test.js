require('dotenv').config();
const mongoose=require('mongoose');
const {expect}=require('chai');
const connectDB=require('../connection/connectDB');

describe('Database Connection', function() {

    this.timeout(10000);
    it("should successfuly connect to the mongoDB", async()=>{
        await connectDB();
        expect(mongoose.connection.readyState).to.equal(1);
    });
    after(async()=>{
        if(mongoose.connection.readyState!==0){
            await mongoose.connection.close();
        }
    })
})