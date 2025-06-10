import express from "express";
import path from "path";
import {dirname} from "path"
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const app = express();  
const port =3000;

let posts =[]

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get("/", (req, res)=>{
    res.render("index.ejs",{posts});
});

app.get("/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/new", (req, res)=>{
    console.log("Form submitted:",req.body);
    const {title, content} = req.body;
    posts.push({title, content});
    res.redirect("/");
})

app.get("/post/:id", (req, res)=>{
    const post = posts[req.params.id];
    if (post){
        res.render('post.ejs',{post})
    }else{
        res.status(404).send("Post not found");
    }
});

app.post("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    if (posts[id]) {
        posts.splice(id, 1);
    }
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Listening at ${port}`);
})