
let search = document.getElementById("search");
let category = document.getElementById("category");
let productList = document.getElementById("productList");
let resultcount = document.getElementById("resultcount");

let products = [
    {name: "Laptop", category: "electronics", price: 45000},
    {name: "Mobile", category: "electronics", price: 15000},
    {name: "Headphones", category: "electronics", price: 2000},
    {name: "T-Shirt", category: "clothing", price: 500},
    {name: "Jeans", category: "clothing", price: 1200},
    {name: "Shoes", category: "clothing", price: 1800},
    {name: "Watch", category: "accessories", price: 1500},
    {name: "Bag", category: "accessories", price: 800},
    {name: "Sunglasses", category: "accessories", price: 600}
];

function displayProducts() {
    let searchValue = search.value.toLowerCase();
    let categoryValue = category.value;

    let filtered = products.filter(function(product) {
        return product.name.toLowerCase().includes(searchValue) &&
        (categoryValue === "all" || product.category === categoryValue);
    });

    productList.innerHTML = "";

    filtered.forEach(function(product) {
        productList.innerHTML += `
            <div>
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: ₹${product.price}</p>
            </div>
            <hr>
        `;
    });

    resultcount.innerText = "Products Found: " + filtered.length;
}

search.addEventListener("input", displayProducts);
category.addEventListener("change", displayProducts);

displayProducts();
