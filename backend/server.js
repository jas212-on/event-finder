import express from "express"
import dotenv from "dotenv"
import path from "path"
import fileupload from "express-fileupload"
import { connectDB } from "./lib/db.js"
import cors from "cors"
import { createServer } from "http"
import Event from "./models/eventModel.js"
import cloudinary from "./lib/cloudinary.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()
const httpServer = createServer(app)

const uploadToCloudinary = async (file) =>{
    try {
       const result = await cloudinary.uploader.upload(file.tempFilePath,{
        resource_type:"auto"
       }) 
    return result.secure_url
    } catch (error) {
        console.log(error)
        throw new Error("error uplaoding")
    }
}

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use(fileupload({
    useTempFiles:true,
    tempFileDir : path.join(__dirname,"tmp"),
    createParentPath : true,
    limits : {
        fileSize : 10*1024*1024
    }
}))

app.get('/', (req, res) => {
  res.send('Hello, World! 👋');
});

app.post('/add-event', async (req, res) => {
  try {
    const imageFile = req.files.imageFile
    const imageUrl = await uploadToCloudinary(imageFile)
    const {title,description,category,location,date,time,maxParticipants} = req.body
    console.log(req.body)
    const newEvent = new Event({
      title: title,
      description: description,
      category: category,
      location: location,
      date: date,
      time: time,
      maxParticipants: maxParticipants,
      currParticipants: 0,
      imageUrl: imageUrl
    });

    await newEvent.save();
    res.send("✅ Event added successfully!");
  } catch (err) {
    res.status(500).send("❌ Error adding event: " + err.message);
  }
});

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all documents from 'events' collection
    res.json(events); // Send them as JSON
  } catch (err) {
    res.status(500).send("❌ Error fetching events: " + err.message);
  }
});


app.get('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).send("❌ Event not found");
    res.json(event);
  } catch (err) {
    res.status(500).send("❌ Error fetching event: " + err.message);
  }
});

httpServer.listen(PORT,()=>{
    console.log("Server starting at port "+PORT )
    connectDB()
})