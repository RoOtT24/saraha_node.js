import express from 'express';
import initApp from './src/app.router.js';
import connectDB from "./DB/connection.js";

const app = express();
const PORT = 3000;

app.use(express.json());

initApp(app, express);
connectDB().then(()=>{
    app.listen(parseInt(process.env.PORT) || PORT, ()=>{console.log("server listening on port " + PORT)})
})