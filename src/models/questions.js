import environment from '../environment/environment';
const questions=[
{
  question: "Which of all Star Wars movies has the longest opening crawl?"
  , answerFn: function(successCallback){
    fetch(environment.servicesHost + "api/longestCrawl")
    .then(result =>{ 
     result.text().then( (text) => {
        successCallback(undefined, {type: "String", value:text})
       });
    })
    .catch(error => {
        successCallback(error, undefined)
    });
  }
},
{
    question: "What character appeared in most of the Star Wars films?"
    , answerFn: function(successCallback){
        fetch(environment.servicesHost + "api/personMostAppeared")
        .then(result =>{ 
         result.text().then(function (result) {
          try{
            let resultArr = JSON.parse(result);
            let formattedArr =[];
             resultArr.forEach(element => {
              formattedArr.push(element.name )
            });
            successCallback(undefined, {type: "Array", value:formattedArr})
          }catch(err){
            successCallback(undefined, {type: "String", value:result})
          }
        })
       })
        .catch(error => {
            successCallback(error, undefined)
        });
      }
  },{
    question: "What species appeared in the most number of Star Wars films?", answerFn: function(successCallback){
      fetch("http://localhost:8080/api/speciesMostAppeared")
      .then(result =>{ 
       result.text().then(function (result) {
        try{
          let resultArr = JSON.parse(result);
          let formattedArr =[];
           resultArr.forEach(element => {
            formattedArr.push(element.name + ' - (' +element.people.length+ ')' )
          });
          successCallback(undefined, {type: "Array", value:formattedArr})
        }catch(err){
          successCallback(undefined, {type: "String", value:result})
        }
         });
      })
      .catch(error => {
          successCallback(error, undefined)
      });
    }
  },{
    question: "What planet in Star Wars universe provided largest number of vehicle pilots?", answerFn: function(successCallback){
      fetch("http://localhost:8080/api/planetsWithMostPilots")
      .then(result =>{ 
       result.text().then(function (result) {
        try{
          let resultArr = JSON.parse(result);
          let formattedArr =[];
           resultArr.forEach(planet => {
            let peopleStr='';
            if(planet.pilots && planet.pilots.length > 0){
              planet.pilots.forEach(pilot => {
                peopleStr = peopleStr + ", "+ pilot.name;
                if(pilot.species && pilot.species.length > 0){
                  peopleStr = peopleStr + ' - ' + pilot.species[0];
                } 
              })
              peopleStr = peopleStr.replace(", ","");
            }
            let pilotLength = planet && planet.pilots && planet.pilots.length ? planet.pilots.length : 0;
            formattedArr.push({planetName:  planet.home, pilots: pilotLength, pilotsStr: peopleStr})
          });
          let outputStr = '';
          if(formattedArr.length > 0 ){
            formattedArr.sort( (a,b) => { return b.pilots - a.pilots })
            let planet = formattedArr[0];
            outputStr = 'Planet: ' + planet.planetName + ' - Pilots: (' + planet.pilots + ') ' +  planet.pilotsStr
          }
          successCallback(undefined, {type: "String", value:outputStr})
        }catch(err){
          successCallback(undefined, {type: "String", value:result})
        }
         });
      })
      .catch(error => {
          successCallback(error, undefined)
      });
    }
  }
]

export default questions;