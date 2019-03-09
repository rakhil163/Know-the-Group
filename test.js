const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'e3a3a109ca2c4b63aea013e7bfa11be2'
});

// app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
//       .then(generalModel => {
//         return generalModel.predict("https://tinyjpg.com/images/social/website.jpg");
//       })
//       .then(response => {
//         var concepts = response['outputs'][0]//['data']['concepts']
//         console.log(concepts)
//       })

      app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", "https://www.aaj.tv/wp-content/uploads/2019/01/deenimage-960x540.jpg").then(
        function(response) {
          // do something with response
          //total Count of people in the frame
          console.log(response.outputs[0].data.regions) 
          //console.log(response.outputs[0].data.regions[0].data.face.age_appearance.concepts)
          for(var i=0;i<response.outputs[0].data.regions.length;i++)
          {
            var arrayElement = response.outputs[0].data.regions[i].data.face.age_appearance.concepts;
            var arrayElement1 = response.outputs[0].data.regions[i].data.face.gender_appearance.concepts;
            var arrayElement2 = response.outputs[0].data.regions[i].data.face.multicultural_appearance.concepts;
            console.log(`Age ${arrayElement[0].name}`); 
            console.log(`Gender ${arrayElement1[0].name}`);
            console.log(`Race ${arrayElement2[0].name}`);
          }
        
        },
        function(err) {
          // there was an error
        }
      );


