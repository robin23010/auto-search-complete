// end point to fetch city and states
const endPoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
//selecting dom elements
const searchInput = document.querySelectorAll('.search');
const searchSuggestion = document.querySelectorAll('.suggestions');
let cities = [];


//binding event on search node
searchInput.forEach(search => {
    search.addEventListener('change', displayMatch)
});
searchInput.forEach(search => {
    search.addEventListener('keyup', displayMatch)
});
searchInput.forEach(search => {
    search.addEventListener('keyup', clearSuggestion)
});


// fetching cities data
fetch(endPoint).then(blob => blob.json()).then(data => {
    cities = data;
});

// to find matched element in data
function findMatch(wordToMatch, cities) {
    let regex = new RegExp(wordToMatch, 'gi');
    return cities.filter(place => {
        return place.city.match(regex) || place.state.match(regex);
    });
};

// to show display matches 
function displayMatch() {
    let matchArray = findMatch(this.value, cities);
    let html
    if (matchArray.length) {
        html = matchArray.map(match => {
            return `<li>
            <span class="name">${match.city}, ${match.state}</span>
                </li>`;
        }).join('');

    } else {
        html = "<span>No match found</span>"
    }
    searchSuggestion[0].innerHTML = html;

    if (matchArray.length) {
        bindEvent();
    }
}

//binding click event to each city
function bindEvent() {
    let name = document.querySelectorAll('.name');
    name.forEach(nam => {
        nam.addEventListener("click", selectCity);
    });
};

//to show highligted city
function selectCity() {
    this.style.fontWeight=700;
    this.style.color='deeppink';
    searchInput[0].value = this.innerHTML;
};

//clear suggestion once input get clear
function clearSuggestion(){
    if(!this.value){
        searchSuggestion[0].innerHTML = " ";
    };
};