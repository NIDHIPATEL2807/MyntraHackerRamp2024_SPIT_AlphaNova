// buy-preloved.js

document.addEventListener('DOMContentLoaded', function() {
    const productList = JSON.parse(localStorage.getItem('products')) || [];
    const productContainer = document.querySelector('.product-list');

    productList.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productContainer.appendChild(productCard);
    });
});

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.classList.add('product');

    const img = document.createElement('img');
    img.src = product.image;  // Assuming product.image is a valid URL or base64 encoded image
    img.alt = product.name;
    card.appendChild(img);

    const name = document.createElement('h3');
    name.textContent = product.name;
    card.appendChild(name);

    const description = document.createElement('p');
    description.textContent = product.description;
    card.appendChild(description);

    const price = document.createElement('p');
    price.textContent = `Price: $${product.price}`;
    card.appendChild(price);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.dataset.productId = index;  // Set data-product-id to index for identification
    addToCartButton.addEventListener('click', function() {
        addToCart(product, index);  // Call addToCart with product and index
        productContainer.removeChild(card);  // Remove product card from display
        updateLocalStorageProducts(index);  // Remove from localStorage products
    });
    card.appendChild(addToCartButton);

    return card;
}

function addToCart(product, index) {
    // Add product to cart (localStorage)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateLocalStorageProducts(index) {
    // Remove product from localStorage products
    const productList = JSON.parse(localStorage.getItem('products')) || [];
    productList.splice(index, 1);  // Remove 1 item at index
    localStorage.setItem('products', JSON.stringify(productList));
}

