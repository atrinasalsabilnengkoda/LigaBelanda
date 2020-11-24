const url='https://api.football-data.org/v2/competitions/2003/teams';


document.addEventListener('DOMContentLoaded',function(){
 getDataClub(url);
 })

document.addEventListener('click',function(event){
  if(event.target.classList.contains('clubsBtn')){
    setTimeout(function(){
      reqDataClubs();
    },500)
  }
})


function getDataClub(url){
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



async function reqDataClubs(){
    const data= await getDataClub(url);
    cardClubs(data.teams)


}


function cardClubs(dataItems){
      let card='';
      for(let i=0;i<=10;i++){
          card+=`
            <div class="card">
                <div class="card-content">
                    <div class="center"><img width="64" height="64" src="${dataItems[i].crestUrl}"></div>
                    <div class="center flow-text"><b>${dataItems[i].name}</b></div>
                    <div class="center">${dataItems[i].venue}</div>
                </div>
                <div class="card-action right-align">
                    <a class="btn-small blue website-action" href="${dataItems[i].website}" target="_blank">WEBSITE</a>
                    <a class="btn-small green teamItems" data-id=${dataItems[i].id}>SEE DETAILS</a>
                </div>
            </div>`
      }
      const clubItems=document.querySelector('.clubs-items');
      clubItems.innerHTML=card;
  }
  