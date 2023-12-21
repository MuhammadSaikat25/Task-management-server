const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("welcome");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://smsaikat000:${process.env.DB_PASS}@cluster0.ng9tele.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (uncomment this line)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    const Users = client.db("TASK").collection("Users");
    const TODO = client.db("TASK").collection("TODO");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // * post user into database
    app.post("/postUser", async (req, res) => {
      const data = await req.body;
      const result = await Users.insertOne(data);
      res.send(result);
    });
    // * post user todo data 
    app.post(`/addTodo`,async(req,res)=>{
        const data=req.body 
        const result=await TODO.insertOne(data)
        res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}

run().catch(console.dir);

app.listen(port);
