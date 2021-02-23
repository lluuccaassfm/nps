import express, { request, response } from 'express';

const app = express();

// https:

// 1 param => Rota(resurso API)
// 2 param => request,response

app.get("/", (request, response)=>{
  return response.json({message: "Hello World - NLW04"});
})

app.post("/", (request, response)=>{
  return response.json({message: "Os dados doram salvos com sucesso!"});
})

app.listen(3333, () => console.log("Server is runing!"));

