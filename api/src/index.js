
import express from "express";
import cors from 'cors';
import { enviroment } from "./enviroment/enviroment";

console.log(enviroment)
const app = express();
const PORT = enviroment.API_SETTINGS.PORT
app.use(cors())
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Expose-Headers", "*")
  next()
});
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running on ${PORT}`)
  } else {
    console.log(err)
  }
});