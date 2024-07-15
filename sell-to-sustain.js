// sell-to-sustain.js

productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImageFile = productImage.files[0];

    // Read the file as a data URL (base64 encoded)
    const reader = new FileReader();
    reader.onload = function(event) {
        const productImageBase64 = event.target.result;
        
        // Simulate adding product to Buy PreLoved page
        const productList = JSON.parse(localStorage.getItem('products')) || [];
        const newProduct = {
            name: productName,
            description: productDescription,
            price: productPrice,
            image: productImageBase64  // Store base64 encoded image
        };
        productList.push(newProduct);
        localStorage.setItem('products', JSON.stringify(productList));

        // Redirect to Buy PreLoved page
        window.location.href = 'buy-preloved.html';
    };
    reader.readAsDataURL(productImageFile);  // Convert file to base64
});
