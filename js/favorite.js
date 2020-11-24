const dbPromised = idb.open("FavoriteTeam", 1, function(upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("team", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
  });




// save data team to indexDB
document.addEventListener('click',event=>{
    const favItem=event.target;
    if(favItem.classList.contains('favorite')){

        // beri waktu untuk toogle class dengan setTimeOut
        setTimeout(async function(){
            favItem.classList.add('my-favorite');
            favItem.classList.remove('favorite');

            // simpan data team ke indexDB
            const dataId=document.querySelector('.detailTeam');
            const id=dataId.dataset.id;
            // fetch dari service worker
            const url = `https://api.football-data.org/v2/teams/${id}`;
            const dataTeamFav= await getDataFavTeam(url);
            saveFavTeam(dataTeamFav);
        },100)
        
    

      
    }
})

// delete data dari indexDB
document.addEventListener('click',event=>{
    const favItem=event.target;
    if(favItem.classList.contains('my-favorite')){
        setTimeout(function(){
            console.log('delete')
            favItem.classList.remove('my-favorite');
            favItem.classList.add('favorite');

            const dataId=document.querySelector('.detailTeam');
            const id=parseInt(dataId.dataset.id);
      
            dbPromised.then(function(db) {
            
            const tx = db.transaction('team','readwrite');
            const store = tx.objectStore('team');
            store.delete(id);
            return tx.complete;
          }).then(function() {
            console.log('Item deleted');
          });
        },100)
        
    }
})


// display data to favorite.html when favBtn on click

document.addEventListener('click',async function(){
  if(event.target.classList.contains('favoriteBtn')){
    setTimeout(async function(){
      await renderDataIndexDb();
    },500)
  
  }
})




// get data team favorite from indexDB
async function renderDataIndexDb(){
  dbPromised.then(function(db) {
    const tx = db.transaction('team', 'readonly');
    const store = tx.objectStore('team');
    return store.getAll();
  }).then(function(items) {
    cardFavorite(items)
  });
}


// getDataIndexDb by id

function getDataIndexDbById(id){
 return dbPromised.then(function(db) {
    const tx = db.transaction('team', 'readonly');
    const store = tx.objectStore('team');
    // mengambil primary key berdasarkan id
    return store.get(id); 
  }).then(function(val) {
    return val;
  });
}




// get data 
  function getDataFavTeam(url){
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


  // save data on indexDB
  function saveFavTeam(dataTeam) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("team", "readwrite");
        const store = tx.objectStore("team");
        console.log(dataTeam);
        store.add(dataTeam);
        return tx.complete;
      })
      .then(function() {
        console.log("data berhasil di simpan.");
      })
      .catch(err=>{
       
      })
  }

  // card favorite display
function cardFavorite(dataItems){
  const favoriteItems=document.querySelector('.favorite-items');
    let card='';
    dataItems.forEach(data => {
        card+=`
        <div class="card horizontal teamItems" data-id=${data.id}>
          <div class="card-image">
            <img src=${data.crestUrl} alt="icon of team">
          </div>
          <div class="card-stacked">
            <div class="card-content ">
              <p><b>${data.name}</b></p>
              <span>Founded : ${data.founded}</span>
              <br>
              <span>Venue : ${data.venue}</span>
            </div>
          </div>
        </div>`;
    });
    if (dataItems.length == 0) card += '<div class="center-align">You haven`t added a favorite team </div>';
   
    favoriteItems.innerHTML=card;
}


export {dbPromised,getDataIndexDbById};