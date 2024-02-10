//imported npm packages
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//set of values required to run a simple node server
const app = express();
const PORT = 3000;

//requirements for passing data and directory management
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//lyrics.ovh api base link to used for the whole project
const API_URL = "https://api.lyrics.ovh/v1/"

//rendering of the home page 
app.get("/", async (req,res)=>{
    try {
        res.render("index.ejs");
    } catch (error) {
        res.render("index.ejs");
    }
    
})

//rendering of the page that shows the lyrics
app.post("/lyrics",async (req,res)=>{
    try {
        //artist name
        const artist = req.body["artist"];
        //title of song
        const title = req.body["title"];
        const response = await axios.get(API_URL + artist + "/" + title);
        const result = response.data;
        res.render("lyrics.ejs",{
            content:result.lyrics
        });
    } catch (error) {
        res.render("lyrics.ejs",{
            content:"No data was found. Please try again later..."
        });
    }
})

//console message to check if the server started
app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})