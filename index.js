const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin: ["https://assignment-11-31b97.web.app","http://localhost:5173"],
  
}))
app.use(express.json());


console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rwnqjqt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    


    const jobCollection = client.db('jobDB').collection('job');


app.get('/addproducts', async (req, res) => {
  try {
    const query = {};
    if (req.query.email) {
      query.email != req.query.email;
    }
    const result = await jobCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


    app.post('/addproducts', async(req, res) =>{
      const products = req.body;
      console.log(products);
      const result = await jobCollection.insertOne(products);
      res.send(result);
  
  })

    const jobsCollection = client.db('alljobs').collection('OnSiteJob')
    const jobsCollection2 = client.db('alljobs').collection('alljobs2')
    const jobsjobsCollection = client.db('alljobs').collection('jobs')



    app.get("/remote", async (req, res) => {
      const result = await jobsCollection.find().toArray();
      res.send(result);
    });


    app.get("/jobs", async (req, res) => {
      const result = await jobsCollection2.find().toArray();
      res.send(result);
    });

    app.get('/jobs/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const result=await jobsCollection.findOne(query);
      res.send(result)
    })

    app.delete("/addproducts/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete", id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await jobsjobsCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });



    // app.get('/addproducts/:id', async(req, res) => {
    //   const id = req.params.id;
    //   const query = {_id: new ObjectId(id)}
    //   const result = await jobCollection.findOne(query);
    //   res.send(result);
    // })


    app.get('/addproducts/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await jobCollection.findOne(query);
      res.send(result);
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('assignment 11 server is running')
})

app.listen(port, () => {
  console.log(`assignment server is running on port ${port}`)
})