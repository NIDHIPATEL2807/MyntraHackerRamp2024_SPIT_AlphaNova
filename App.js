document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is loaded');

    // Sample products data
    const products = [
        {
            image: 'product1.jpg',
            name: 'Product 1',
            description: 'Description for product 1'
        },
        {
            image: 'product2.jpg',
            name: 'Product 2',
            description: 'Description for product 2'
        },
        // Add more products as needed
    ];

    const productContainer = document.querySelector('.product-list');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;

        productContainer.appendChild(productElement);
    });
});
