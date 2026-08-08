const {expect}=require('chai');
const Note=require('../schemas/noteSchema');
const mongoose=require('mongoose');

describe("Note model schema", ()=>{
    it("should fail validaton because of missing fields", async()=>{
        const error=await new Note({}).validate().catch(err=>err);
        expect(error).to.exist;
        expect(error.errors.title).to.exist;
        expect(error.errors.userId).to.exist;
        expect(error.errors.description).to.exist;
    });

    it("shoudl pass all validation because fields are provided to it", async()=>{
        const error = await new Note({
            userId: new mongoose.Types.ObjectId(),
            title:"Testing Note 1",
            description:"This is the testing Note description"
        }).validate().catch(err=>err);
        expect(error).to.be.undefined;
        });
})