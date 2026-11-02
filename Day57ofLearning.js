let productInput = document.getElementById("productInput");
let priceInput = document.getElementById("priceInput");
let quantityInput = document.getElementById("quantity");

let cartForm = document.getElementById("cartform");
let cartDisplay = document.getElementById("cart");
let totalDisplay = document.getElementById("Total");

let cartproducts = [];

cartForm.addEventListener("submit", function(event) {

event.preventDefault();

let productValue = productInput.value.trim();
let priceValue = Number(priceInput.value);
let quantityValue = Number(quantityInput.value);


cartproducts.push({

    name: productValue,
    price: priceValue,
    quantity: quantityValue

});

cartDisplay.innerHTML = "";

cartproducts.forEach(function(product, index) {

    let productTotal = product.price * product.quantity;

    let productElement = document.createElement("div");

    productElement.innerHTML = `

        <p>
            <strong>${product.name}</strong><br>

            Price: ₹${product.price}<br>

            Quantity: ${product.quantity}<br>

            Product Total: ₹${productTotal}
        </p>

        <button type="button" onclick="removeProduct(${index})">
            Remove
        </button>

        <hr>

    `;

    cartDisplay.appendChild(productElement);

});


let grandTotal = cartproducts.reduce(function(total, product) {

    return total + (product.price * product.quantity);

}, 0);


totalDisplay.textContent = "Grand Total: ₹" + grandTotal;

productInput.value = "";
priceInput.value = "";
quantityInput.value = 1;

});

function removeProduct(index) {

cartproducts.splice(index, 1);

if (cartproducts.length === 0) {
    cartDisplay.textContent = "Your cart is empty.";
} else {
    cartDisplay.innerHTML = "";

    cartproducts.forEach(function(product, index) {

        let productTotal = product.price * product.quantity;

        let productElement = document.createElement("div");

        productElement.innerHTML = `

            <p>
                <strong>${product.name}</strong><br>
                Price: ₹${product.price}<br>
                Quantity: ${product.quantity}<br>
                Product Total: ₹${productTotal}
            </p>

            <button type="button" onclick="removeProduct(${index})">
                Remove
            </button>

            <hr>

        `;

        cartDisplay.appendChild(productElement);

    });
}


let grandTotal = cartproducts.reduce(function(total, product) {

    return total + (product.price * product.quantity);

}, 0);

totalDisplay.textContent = "Grand Total: ₹" + grandTotal;

}