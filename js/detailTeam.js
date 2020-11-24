import {getDataIndexDbById} from './favorite.js';



 const mainContainer=document.querySelector('main');
document.addEventListener('click',async event=>{
    if(event.target.classList.contains('teamItems')){
        // loader
        mainContainer.innerHTML=` <img src="./images/preloader.gif" alt="loading" srcset="" class="loader">;`

        const id=event.target.dataset.id;
        const url = `https://api.football-data.org/v2/teams/${id}`;
        await getData(url)

}
})

function getData(url){
    return fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          "X-Auth-Token": "bbed6372c05a4572ab966b03da24faf7",
        }
      })
        .then(resp => resp.json())
        .then(function(data) {
          // render card detail 
          cardDetail(data)
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  


 async function cardDetail(data){

  // check data favorite
  let gradeIcon='';
  if(await getDataIndexDbById(data.id)===undefined){
    gradeIcon='favorite';
  }else{
    gradeIcon='my-favorite';
  }

      let card= ` 
              <div class="col s12 m6 l6 detailTeam" data-id="${data.id}">
                <br>
                <span style="float:right"><img src="./images/like.png" class="${gradeIcon} responsive-img" width="32px" height="32px"></span>
                <br><br>
                <div class="card center">
                    <img class="responsive-img" src="${data.crestUrl}" width="192px" height="192px">
                    <div class="card-stacked">
                      <div class="card-content detail-content">
                          <h5>${data.shortName}</h5>
                          <p>Name : ${data.name}</p>
                          <p>Address : ${data.address}</p>
                          <p>Phone : ${data.phone}</p>
                          <p>Website : ${data.website}</p>
                          <p>Email : ${data.email}</p>
                          <p>Founded : ${data.founded}</p>
                          <p>Venue : ${data.venue}</p>
                      </div>
                    </div>
                </div>
              </div> 

                <!-===================TABLE START===========================-!>
                <table class="striped-bordered">
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Nation</th>
                  </tr>
                </thead>
                `

                // squad team
                data.squad.forEach(item=>{
                  if(item.position===null){
                    card+=`
                    <tbody>
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.role}</td>
                        <td>${item.nationality}</td>
                      </tr>
                    </tbody>
                  `
                  }else{
                    card+=`
                    <tbody>
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.position}</td>
                        <td>${item.nationality}</td>
                      </tr>
                    </tbody>
                  `
                  }
                 
                })

                // table end
                card+=`</table>`

         // add card to main container on index.html
    mainContainer.innerHTML=card;
  }


 