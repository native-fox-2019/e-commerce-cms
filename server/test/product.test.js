const app=require('../app');
const request=require('supertest');

describe('POST /product',()=>{
    it('response with json',(done)=>{
        request(app)
        .post('/product')
        .send({name:'Sepatu nike',image_url:'img.png',price:30000,stock:10})
        .set('Accept', 'application/json')
        .expect(201)
        .end(function(err,res){
            if(err) return done(err);
            done()
        })
    }) 
});