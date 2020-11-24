document.addEventListener('DOMContentLoaded',function(){
    setTimeout(function(){
      standingsDisplay();
    },1000)
   })
   
   document.addEventListener('click',function(){
     if(event.target.classList.contains('standingsBtn')){
       setTimeout(function(){
        standingsDisplay();
       },1000)
     }
   })
   
   
   // display list team
   function standingsDisplay(){
     const url = "https://api.football-data.org/v2/competitions/2003/standings";
     fetch(url, {
       method: "GET",
       withCredentials: true,
       headers: {
         "X-Auth-Token": "bbed6372c05a4572ab966b03da24faf7",
       }
     })
       .then(resp => resp.json())
       .then(function(data) {
          cardStandings(data.standings[0].table)
         // console.log(data);
       })
       .catch(function(error) {
         console.log(error);
       });
   }
   
   //display team classement on card
   function cardStandings(dataItems){
     const classementItems=document.querySelector('.standings-items');
       let card='';
       dataItems.forEach(data => {
           card+=`
           <div class="card horizontal teamItems" data-id=${data.team.id}>
             <div class="card-image">
               <img src=${data.team.crestUrl} alt="icon of team">
             </div>
             <div class="card-stacked">
               <div class="card-content ">
                 <p><b>${data.position}. ${data.team.name}</b></p>
                 <span class="playedgames">played games : ${data.playedGames}</span>
                 <span class="won">won : ${data.won}</span>
                 <span class="draw">draw : ${data.draw}</span>
                 <span class="lost">lost : ${data.lost}</span>
                 <span class="point">point : ${data.points}</span>
                 <span class="goalsFor">goals for : ${data.goalsFor}</span>
                 <span class="goalsAgainst">goals against : ${data.goalsAgainst}</span>
                 <span class="goalDifference">goal difference : ${data.goalDifference}</span>
               </div>
             </div>
           </div>`
       });
      
       classementItems.innerHTML=card;
   }
   