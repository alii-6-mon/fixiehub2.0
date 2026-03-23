let cart = [];

// ADD TO CART FUNCTION
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    
    // Toast notification style
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Added to Cart!";
    btn.style.backgroundColor = "#ce8f08";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "#111";
    }, 1500);
}

// UPDATE CART UI
function updateCartUI() {
    const list = document.getElementById("cart-items-list");
    const totalDisplay = document.getElementById("total-price");
    const countDisplay = document.getElementById("cart-count");
    
    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#888;">Your cart is empty.</p>';
    } else {
        list.innerHTML = "";
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>
                    ₱${item.price.toLocaleString()}
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">✕</button>
                </span>
            </div>
        `;
    });

    totalDisplay.innerText = total.toLocaleString();
    countDisplay.innerText = cart.length;
}

// REMOVE FROM CART
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// OPEN/CLOSE MODAL
function openCart() { document.getElementById("cart-modal").style.display = "block"; }
function closeCart() { document.getElementById("cart-modal").style.display = "none"; }

// SEARCH FILTER
document.getElementById("searchInput").addEventListener("input", function() {
    let filter = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.getAttribute("data-name").toLowerCase();
        if (name.includes(filter)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// WISHLIST TOGGLE
function toggleWishlist(el) {
    el.classList.toggle("active");
    el.innerHTML = el.classList.contains("active") ? "♥" : "♡";
}

// CHECKOUT SIMULATION
function processCheckout() {
    if(cart.length === 0) return alert("Your cart is empty!");
    
    let message = "Order Summary from FixieHub:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (₱${item.price.toLocaleString()})%0A`;
    });
    
    // Redirects to a WhatsApp-style link or alert
    alert("Order Received! Please contact 0987-656-523 to finalize payment.");
    console.log("Order details sent to owner.");
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modal = document.getElementById("cart-modal");
    if (event.target == modal) closeCart();
}
// --- TYPING ANIMATION LOGIC ---
const words = ["urban rides.", "track frames.", "custom fixies.", "gear in Manila."];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    currentWord = words[i];
    if (isDeleting) {
        document.getElementById("dynamic-text").textContent = currentWord.substring(0, j - 1);
        j--;
        if (j == 0) {
            isDeleting = false;
            i++;
            if (i == words.length) i = 0;
        }
    } else {
        document.getElementById("dynamic-text").textContent = currentWord.substring(0, j + 1);
        j++;
        if (j == currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause at end of word
            return;
        }
    }
    setTimeout(type, isDeleting ? 50 : 100);
}

// --- SCROLL REVEAL LOGIC ---
function reveal() {
    var reveals = document.querySelectorAll(".card");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Initialize
window.addEventListener("scroll", reveal);
window.onload = function() {
    type();
    // Add reveal class to all cards for the scroll animation
    document.querySelectorAll('.card').forEach(card => card.classList.add('reveal'));
    reveal(); // Run once in case items are already in view
};