
const express = require("express"); // es el nostre servidor web
const cors = require('cors'); // ens habilita el cors recordes el bicing???

const app = express();
const baseUrl = '/miapi';
app.use(cors());

//La configuració de la meva bbdd
ddbbConfig = {
   user: 'alejandro-gonzalez-7e3',
   host: 'postgresql-alejandro-gonzalez-7e3.alwaysdata.net',
   database: 'alejandro-gonzalez-7e3_motos',
   password: 'contraseña123*',
   port: 5432
};
//El pool es un congunt de conexions
const Pool = require('pg').Pool
const pool = new Pool(ddbbConfig);

//Exemple endPoint
//Quan accedint a http://localhost:3000/miapi/test   ens saludará
const getMotos = (request, response) => {
   var consulta ;
   let marca = request.query.marca
   let consultaFiltro;
   pool.query(consulta, (error, results) => {
       if (marca == undefined) {
        consulta = "SELECT * FROM  motos"
       }else{
        consultaFiltro = `SELECT * FROM motos WHERE marca=${marca}` 
       }
       //a qui retornem la el status 200 (OK) i en el cos de la resposta les motos en json
       response.status(200).json(results.rows)
       console.log(results.rows);
   });
}
app.get(baseUrl + '/getmotos', getMotos);

//Inicialitzem el servei
const PORT = process.env.PORT || 3000; // Port
const IP = process.env.IP || null; // IP

app.listen(PORT, IP, () => {
   console.log("El servidor está inicialitzat en el puerto " + PORT);
});
