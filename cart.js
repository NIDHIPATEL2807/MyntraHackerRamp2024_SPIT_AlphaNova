// cart.js

document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');

    cartItems.forEach((product, index) => {
        const cartItem = createCartItem(product, index);
        cartContainer.appendChild(cartItem);
    });

    const purchaseButton = document.getElementById('purchaseButton');
    purchaseButton.addEventListener('click', purchaseItems);
});

function createCartItem(product, index) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const img = document.createElement('img');
    img.src = product.image;  // Assuming product.image is a valid URL or base64 encoded image
    img.alt = product.name;
    cartItem.appendChild(img);

    const name = document.createElement('h3');
    name.textContent = product.name;
    cartItem.appendChild(name);

    const description = document.createElement('p');
    description.textContent = product.description;
    cartItem.appendChild(description);

    const price = document.createElement('p');
    price.textContent = `Price: $${product.price}`;
    cartItem.appendChild(price);

    return cartItem;
}

function purchaseItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove purchased items from Buy PreLoved
    const productList = JSON.parse(localStorage.getItem('products')) || [];
    cartItems.forEach(item => {
        const index = productList.findIndex(product => product.name === item.name);
        if (index !== -1) {
            productList.splice(index, 1);
        }
    });

    localStorage.setItem('products', JSON.stringify(productList));
    localStorage.removeItem('cart');

    // Redirect or update UI as needed
    alert('Items purchased successfully!');
    window.location.href = 'cart.html';  // Reload cart page or handle as per your UI design
}
