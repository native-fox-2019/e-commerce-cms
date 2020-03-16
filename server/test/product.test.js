const app=require('../app');
const request=require('supertest');

function onDone(done){
    return function(err,res){
        if(err) return done(err);
        done()
    }
   
}

describe('POST /product',()=>{
    it('response with json',(done)=>{
        request(app)
        .post('/product')
        .send({name:'Sepatu nike',image_url:'img.png',price:30000,stock:10})
        .set('Accept', 'application/json')
        .expect(201)
        .end(onDone(done))
    }) 
});

describe.only('PUT /product/id',()=>{
    it('response with json',(done)=>{
        request(app)
        .put('/product/1')
        .send({name:'Sepatu adidas'})
        .set('Accept', 'application/json')
        .expect(200)
        .end(onDone(done))
    })
})