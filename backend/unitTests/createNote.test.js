const {expect}=require('chai')
const Note=require('../schemas/noteSchema');
const logger=require('../src/config/logger');
const {createNewNote}=require('../functions/postFunctions');
const utils=require('../functions/utils');
const sinon=require('sinon');


describe("Controller: Create new Note", ()=>{
    let req, res;
    beforeEach(()=>{
        req={
            body: {},
            user: {}
        }
        res={
            status: sinon.stub().callsFake((code) => {
                res.statusCode = code;
                return res; 
            }),
            json: sinon.stub().returnsThis()
        }
    });
    afterEach(() => {
        sinon.restore();
    });

    it("shold throw unauthorized error(401) for missing user id", async()=>{
        req.user={};
        req.body={title:"Test ttle", description:"test descritpion"};

        await createNewNote(req, res);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledOnce).to.be.true;

        const resData = res.json.getCall(0).args[0];
        expect(resData.success).to.be.false;
        expect(resData.message).to.equal("Unauthorized! Token is missing or invalid.");
    });

it("should save note to db", async()=>{
    req.user={userId: '123'};
    req.body={title: "test title", description:"test descrption"};

    const createdNote={
        _id:'gf12543jgde3',
        userId:'123',
        title:"test title",
        description:"test description"
    };

    sinon.stub(Note, 'create').resolves(createdNote);

        await createNewNote(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledOnce).to.be.true;

        const resData = res.json.getCall(0).args[0];
        expect(resData.success).to.be.true;
        expect(resData.message).to.equal("Note created successfully");


})


})