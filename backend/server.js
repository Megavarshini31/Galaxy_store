const express = require ('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const app = express();
const PORT = 7000;

const MONGO_URL= 'mongodb://localhost:27017';
const DB_NAME = 'admin';
const COLLECTION_NAME = 'products';

app.use(cors());
app.use(bodyParser.json());

let productsCollection = null;
app.use((req,res,next) => {
    if(!productsCollection){
        return res.status(503).json({message: 'Database not connected'});
    }
    next();
});

app.post('/addproduct',async (req,res)=>{
    try{
        const {pid,pname,price,brand} = req.body;
        if(pid === undefined || !pname || price === undefined || !brand){
            return res.status(400).json({message: 'All the fields (pid, pname, price, brand) are required'});
        }
        const newProduct = {
            pid: Number(pid),
            pname,
            price: Number(price),
            brand
        };
        const result = await productsCollection.insertOne(newProduct);
        res.status(201).json({message: 'Product added successfully'});
    }catch(err){
        console.log('Error adding product: ',err);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/getallproducts',async (req,res)=>{
    try{
        const products = await productsCollection.find({}).toArray();
        res.status(200).json(products);
    }catch(err){
        console.log('Error fetching products: ',err);
        res.status(500).json({message: 'Server error'});
    }
});
async function startServer(){
    try{
        console.log('Connecting to MongoDB at ',MONGO_URL);
        const client = new MongoClient(MONGO_URL);
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(DB_NAME);
        productsCollection = db.collection(COLLECTION_NAME);

        const count = await productsCollection.countDocuments();
        if(count === 0){
            await productsCollection.insertMany([
                {pid: 101,pname: 'Mobile',price: 45123,brand: 'Samsung'},
                {pid: 102,pname: 'Laptop',price: 95123,brand: 'HP'},
                {pid: 103,pname: 'TV',price: 85123,brand: 'Sony'}
            ]);
            console.log('Products added.');
        }
    }catch(err){
        console.log('Failed to connect: ',err);
    }
}
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    startServer();
});

