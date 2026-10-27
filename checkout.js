
"use strict";

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
    if (cart.length === 0) {
        Cookies.remove("cart");
    } else {
        Cookies.set("cart", JSON.stringify(cart), {
            expires: 7,
            sameSite: "Lax"
        });
    }
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("empty-message");
    const totalElement = document.getElementById("total");

    container.replaceChildren();

    const cart = getCart();

    if (cart.length === 0) {
        emptyMessage.textContent =
            "Your cart is empty. Go back to the shop to pick something!";
        totalElement.textContent = "";
        return;
    }

    emptyMessage.textContent = "";
    let total = 0;

    cart.forEach(function (item, index) {
        total += item.price;

        const card = document.createElement("article");
        card.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const details = document.createElement("div");
        details.className = "item-details";

        const title = document.createElement("h2");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "$" + item.price.toFixed(2);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete One";

        deleteButton.addEventListener("click", function () {
            const updatedCart = getCart();

            updatedCart.splice(index, 1);

            saveCart(updatedCart);
            renderCart();
        });

        details.append(title, description, price);
        card.append(image, details, deleteButton);
        container.appendChild(card);
    });

    totalElement.textContent = "Total: $" + total.toFixed(2);
}

document.getElementById("clear-cart").addEventListener("click", function () {
    saveCart([]);
    renderCart();
});

renderCart();
