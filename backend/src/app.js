import express from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import cors from 'cors';
import axios from 'axios';

//Todo: Init Service
config();

const app = express()

app.set('port', 3001)

//Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: false}))


//Routes
app.get ('/posts', async (req, res) => {
    try {
        console.log(process.env.API + '/posts');
        const { data } = await axios.get(process.env.API + '/posts')
        //console.log("data:", data)
        res.json(data)
    } catch (error) {
        console.log("error", error);
    }
})


app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params

        const { data } = await axios.get(process.env.API + '/posts/' + id)
        res.json(data)
    } catch (error) {
        console.log("error", error);
    }
})

app.get('/posts/:id/comments', async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(id) )
            return res.status(304).json({ message: ".. It's not a number"})

        const { data } = await axios.get(`${process.env.API}/posts/${id}/comments`)
        res.json(data)
       
    } catch (error) {
        console.log("error", error);
    }
});


// /posts/1/comments

app.listen( app.get('port'), () => {
    console.log('server on port:', app.get('port'))
})

