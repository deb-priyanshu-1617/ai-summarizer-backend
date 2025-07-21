const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/summarize",async(req,res)=>{   
    try{
         const fetch = (await import("node-fetch")).default;
         const response =await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
               headers:{ "Content-Type": "application/json", },
                method: "POST",
                body : JSON.stringify({
                    contents :  [{parts : [{text : req.body.text}]}]
                })
            }
         );
         let data = await response.json();

         res.json({summary : data.candidates[0].content.parts[0].text});
    }catch(error){
       res.status(500).json({ error: error.message });
    }
    
})

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000/summarize")
})