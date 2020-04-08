const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

 repositories.push(repository);

 return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
  const {url, title, techs} = request.body;
  const {id} = request.params;
  
  const repoIndex = repositories.findIndex( repository => repository.id === id);
  if (repoIndex < 0){

     return response.status(400).json({error: 'Repository not Found!'});
  }

  const repository = {
    id,
    url,
    title,
    techs,
    likes: 0,
  }
  repositories[repoIndex] = repository;

  return response.json(repository);
}); 

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;
  //ja está procurando no index
  const repository = repositories.find(repository => repository.id === id);
    if(!repository){
    return res.status(400).send();
  }
  const repoIndex = repositories.findIndex(repository => repository.id === id);
  repositories.splice(repoIndex, 1);
  return res.status(204).send();//é recomendado enviar
  
  
});

app.post("/repositories/:id/like", (request, response) => {
 const {id} = request.params;
 const repository = repositories.find(repository => repository.id === id);

 if(!repository){
   return response.status(400).send();
 }
 repository.likes ++;

 return response.json(repository);
});

module.exports = app;
