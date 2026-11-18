
let search = document.getElementById("search");
let region = document.getElementById("regionfilter");
let countryContainer = document.getElementById("countryContainer");
let detailsContent = document.getElementById("detailsContent");

let countries = [];

fetch("https://countries.dev/countries?fields=name,nativeName,capital,region,subregion,population,languages,currencies,flags,flag")
.then(response => {
    if (!response.ok) {
        throw new Error("API Error");
    }

    return response.json();
})
.then(data => {

    countries = data;

    countries.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    displayCountries(countries);

})
.catch(error => {

    countryContainer.innerHTML =
        "<p>Unable to load countries. Please try again!</p>";

    console.log(error);

});

function displayCountries(data) {

    countryContainer.innerHTML = "";

    if (data.length === 0) {
        countryContainer.innerHTML = "<p>No countries found!</p>";
        return;
    }

    data.forEach((country, index) => {

        let card = document.createElement("div");

        card.className = "card";

        let flag = country.flags?.png || country.flags?.svg;

        card.innerHTML = `
            ${flag ? `<img src="${flag}" alt="Country Flag">` : `<h1>${country.flag || "🌍"}</h1>`}
            <h3>${country.name}</h3>
            <p>Capital: ${country.capital || "N/A"}</p>
            <p>Region: ${country.region || "N/A"}</p>
            <button class="viewBtn" data-index="${index}">View Details</button>
        `;

        countryContainer.appendChild(card);

    });

    document.querySelectorAll(".viewBtn").forEach(button => {

        button.addEventListener("click", function() {

            let country = data[this.dataset.index];

            showDetails(country);

        });

    });

}

function showDetails(country) {

    let languages = country.languages
        ? country.languages.map(language => language.name).join(", ")
        : "N/A";

    let currency = country.currencies
        ? country.currencies.map(currency => currency.name).join(", ")
        : "N/A";

    detailsContent.innerHTML = `
        <p>Country Name: ${country.name}</p>
        <p>Official / Native Name: ${country.nativeName || country.name}</p>
        <p>Capital: ${country.capital || "N/A"}</p>
        <p>Region: ${country.region || "N/A"}</p>
        <p>Subregion: ${country.subregion || "N/A"}</p>
        <p>Population: ${country.population ? country.population.toLocaleString() : "N/A"}</p>
        <p>Languages: ${languages}</p>
        <p>Currency: ${currency}</p>
    `;

    document.getElementById("CountryDetails").scrollIntoView({
        behavior: "smooth"
    });

}

function filterCountries() {

    let searchValue = search.value.toLowerCase();
    let regionValue = region.value;

    let filtered = countries.filter(country => {

        return country.name.toLowerCase().includes(searchValue) &&
        (regionValue === "all" || country.region === regionValue);

    });

    displayCountries(filtered);

}

search.addEventListener("input", filterCountries);

region.addEventListener("change", filterCountries);
