var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
const Clarifai = require('clarifai');

var mySql = require('mysql')

const clara = new Clarifai.App({
    apiKey: 'e3a3a109ca2c4b63aea013e7bfa11be2'
   });

var connection = mySql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456789',
    database : 'sampleDB'

});

connection.connect(function(error){
    if(!!error)
        console.log(error);
    else
        console.log("Success")
})
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    
    var jsonData =[]
    clara.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", "https://c8.alamy.com/comp/EC1K41/indian-college-group-friends-fun-EC1K41.jpg").then(
        function(response) {
          // do something with response
          //total Count of people in the frame
         // console.log(response.outputs[0].data.regions.length) 
          var details = []
          for(var i=0;i<response.outputs[0].data.regions.length;i++)
          {
            var arrayElement = response.outputs[0].data.regions[i].data.face.age_appearance.concepts;
            var arrayElement1 = response.outputs[0].data.regions[i].data.face.gender_appearance.concepts;
            var arrayElement2 = response.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts;  
            var object = {
                Age : arrayElement[0].name,
                Gender : arrayElement1[0].name,
                Race : arrayElement2[0].name
            }
            
            details.push(object)
            // jsonData.push()
            // jsonData.push(arrayElement1[0].name)
            // jsonData.push(arrayElement2[0].name)
            // console.log(`Age ${arrayElement[0].name}`); 
            // console.log(`Gender ${arrayElement1[0].name}`);
            // console.log(`Race ${arrayElement2[0].name}`);
           // console.log("Inside here"+details)
          }
          console.log(details)
          res.send(details)
        },
        function(err) {
          // there was an error
        }
      );
   
     
})




    connection.query("INSERT INTO `sampleDB`.`new_table` (`ID`, `Name`) VALUES ('6', 'Neethu');",function(error,rows,fields){
        if(error)
            console.log(error)
        else
            console.log(rows)
    })

    connection.query("SELECT * FROM sampleDB.new_table",function(error,rows,fields){
        if(error)
            console.log(error)
        else
            console.log(rows)
    })
    
app.listen(3001)
console.log("Server Listening on port 3001");