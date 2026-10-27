
"use strict";

const products = [
    {
        id: "keyboard",
        name: "RGB Gaming Keyboard",
        description: "A colorful mechanical keyboard for your gaming setup.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "headset",
        name: "Gaming Headset",
        description: "Comfortable headphones for immersive gaming audio.",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "mouse",
        name: "RGB Gaming Mouse",
        description: "A lightweight mouse for precise movement.",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "controller",
        name: "Wireless Gaming Controller",
        description: "A controller for your favorite games.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80"
    }
];

function getCart() {
    try {
        const savedCart = Cookies.get("cart");

        if (!savedCart) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);

        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    Cookies.set("cart", JSON.stringify(cart), {
        expires: 7,
        sameSite: "Lax"
    });
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = getCart().length;
    }
}

function addToCart(product) {
    const cart = getCart();

    cart.push({ ...product });

    saveCart(cart);
    updateCartCount();

    const message = document.getElementById("message");

    if (message) {
        message.textContent = product.name + " added to your cart!";
    }
}

function renderProducts() {
    const container = document.getElementById("products");

    if (!container) {
        return;
    }

    products.forEach(function (product) {
        const card = document.createElement("article");
        card.className = "product";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const title = document.createElement("h2");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "$" + product.price.toFixed(2);

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "Add to Cart";

        button.addEventListener("click", function () {
            addToCart(product);
        });

        card.append(image, title, description, price, button);
        container.appendChild(card);
    });
}

renderProducts();
updateCartCount();
