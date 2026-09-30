const priceInput = document.getElementById("priceInput");
const searchButton = document.getElementById("searchButton");

const productContainer = document.getElementById("productContainer");
const emptyMessage = document.getElementById("emptyMessage");

const errorMessage = document.getElementById("errorMessage");
const resultCount = document.getElementById("resultCount");


// Search button

searchButton.addEventListener("click", findProducts);


// Allow Enter key

priceInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        findProducts();
    }

});


// Main function

function findProducts() {

    const targetPrice = Number(priceInput.value);


    // Check input

    if (targetPrice <= 0 || priceInput.value === "") {

        errorMessage.textContent = "Please enter a valid price.";

        productContainer.innerHTML = "";
        resultCount.textContent = "";

        emptyMessage.style.display = "block";

        return;
    }


    errorMessage.textContent = "";


    /*
        Find difference between every product
        and the target price.
    */

    const productsWithDifference = products.map(function (product) {

        const difference = Math.abs(product.price - targetPrice);

        return {
            product: product,
            difference: difference
        };

    });


    /*
        Sort products according to
        their distance from target price.
    */

    productsWithDifference.sort(function (a, b) {

        return a.difference - b.difference;

    });


    /*
        Show only the closest 3 products.
    */

    const closestProducts = productsWithDifference.slice(0, 3);


    displayProducts(closestProducts);

}


// Display product cards

function displayProducts(productList) {

    productContainer.innerHTML = "";

    emptyMessage.style.display = "none";


    resultCount.textContent =
        `${productList.length} products found`;


    productList.forEach(function (item) {

        const product = item.product;


        const card = document.createElement("div");

        card.classList.add("product-card");


        card.innerHTML = `

            <h3>${product.name}</h3>

            <p class="brand">
                ${product.brand}
            </p>

            <p class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p class="rating">
                ⭐ ${product.rating}
            </p>

            <button
                class="view-button"
                onclick="viewProduct(${product.id})"
            >
                View Product
            </button>

        `;


        productContainer.appendChild(card);

    });

}


// View product

function viewProduct(productId) {

    const product = products.find(function (product) {

        return product.id === productId;

    });


    if (!product) {
        return;
    }


    alert(
        `${product.name}\n\n` +
        `Brand: ${product.brand}\n` +
        `Price: ₹${product.price.toLocaleString("en-IN")}\n` +
        `Rating: ⭐ ${product.rating}`
    );

}