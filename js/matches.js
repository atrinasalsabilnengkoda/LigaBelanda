const url='https://api.football-data.org/v2/competitions/2003/matches?status=SCHEDULED';


document.addEventListener('DOMContentLoaded',function(){
 getDataMatch(url);
 })

document.addEventListener('click',function(event){
  if(event.target.classList.contains('matchesBtn')){
    setTimeout(function(){
      reqDataMatches();
    },500)
  }
})


function getDataMatch(url){
  return fetch(url, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-Auth-Token": "bbed6372c05a4572ab966b03da24faf7",
      }
    })
      .then(resp => resp.json())
      .then(function(data) {
        return data;
      })
      .catch(function(error) {
        console.log(error);
      });
}



async function reqDataMatches(){
    const data= await getDataMatch(url);
    cardMatches(data.matches)


}


function cardMatches(dataItems){
    let cards='';
    for(let i=0;i<=10;i++){
      cards+=`
      <div class="card horizontal center">
        <div class="card-stacked">
          <div class="card-content">
            <p>Kick off : <b>${new Date(dataItems[i].utcDate).toLocaleDateString('en-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</b></p>
            <span class="away">${dataItems[i].awayTeam.name}</span>
            <span class="vs"><b>VS</b></span>
            <span class="home">${dataItems[i].homeTeam.name}</span>
            <p></p>
            <span>Stage : ${dataItems[i].stage}</span>
          </div>
        </div>
      </div>`
    }
    const matchesItems=document.querySelector('.matches-items');
    matchesItems.innerHTML=cards;
}