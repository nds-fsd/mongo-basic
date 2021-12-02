const express = require('express');
const mongo = require('./mongo');
const { Schema, model }  = require('mongoose');

const blogSchema = new Schema({
    title:  {type: String, required: true}, // String is shorthand for {type: String}
    author: {type: String},
    body:   String,
});

const Blog = model('blogs', blogSchema);


const app = express();
app.use(express.json()) // for parsing application/json


app.get('/blogs', async (req, res) => {
    const allBlogs = await Blog.find();
    res.json(allBlogs);
})

app.post("/blogs", async(req, res) => {
    //recogemos el body de la request
    const body = req.body;

    //creamos una nueva instancia de blog,
    const newBlog = new Blog(body);

    //lo guardamos en mongo
    await newBlog.save()

    //devolvemos respuesta
    res.json(newBlog);
});

app.listen(5000,()=>{
    console.log("App is listening on port: ", 5000);
});


