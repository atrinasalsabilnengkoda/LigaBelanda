document.addEventListener("DOMContentLoaded",function(){
    let nav=document.querySelector('.sidenav');
    M.Sidenav.init(nav);
    loadPage('standings');

    fetch('./pages/nav.html')
    .then(response=>{
    return response.text();
})
    .then(res=>{
        // add sidenav items from nav.html to index.html
        nav.innerHTML=res;

        // get items from tag a to load page
        const items =document.querySelectorAll('.sidenav .items a ,.topnav a');
        items.forEach(item=>{
            item.addEventListener('click',event=>{
                event.preventDefault();
                // close the sidenav
                const sidenav = document.querySelector('.sidenav');
                M.Sidenav.getInstance(sidenav).close();
                // set page
                const page = event.target.getAttribute('href').substr(1);
                //load page
                loadPage(page);
                // reques data
            })
        })

        
    })

});

// load page function
function loadPage(page){
    fetch(`./pages/${page}.html`)
    .then(response=>{
        return response.text();
    })
    .then(response=>{
        const container=document.querySelector('main');
        container.innerHTML=response;

    
    })
}


