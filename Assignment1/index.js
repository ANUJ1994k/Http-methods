
let container=document.getElementById("container");

let list=document.getElementById("list");


let data=[];

//getting the data from API
fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries")  //fetching URL for retriving data from API url
.then(function(res){      // fetch takes time to execute .then retrun promise
    return res.json();     //convert fetch data into json format
})
.then(function(res){
    data=res.data;
    console.log("data=", data);
    
})


function displayData(data){
    container.innerHTML = '';
    data.forEach(function(desh){

        let card=document.createElement("div");
        card.id="card-design";
        card.className="kard";

        let country=document.createElement("h4");
        country.innerText=`Country-Name :  ${desh.country}`;

        let Rank=document.createElement("p");
        Rank.textContent=`Rank : ${desh.Rank}`;

        let population=document.createElement("p");
        population.textContent=`Population  : ${desh.population}`;

        card.append(country,Rank,population);

        container.appendChild(card);
    })
}

list.addEventListener("click" ,function(e){
    e.preventDefault();
displayData(data);
})

// Function to sort and render the country list in ascending order
function sortAscending(data) {
    const sortedCountries = data.sort((a, b) => a.population - b.population);
    displayData(sortedCountries);
    
}

// Function to sort and render the country list in descending order
function sortDescending(data) {
    const sortedCountries = data.sort((a, b) => b.population - a.population);
   displayData(sortedCountries);
   
}

    // Applying Event listeners for sorting buttons

    let sortAscBtn=document.getElementById("sorting-asc");
    let sortDescBtn=document.getElementById("sorting-desc");

    sortAscBtn.addEventListener('click', () => sortAscending(data));
    sortDescBtn.addEventListener('click', () => sortDescending(data));


