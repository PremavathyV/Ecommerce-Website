// SAFE NAV + HAMBURGER HANDLING
(function(){
  const hamb = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');

  // run only if both exist
  if (hamb && nav) {
    hamb.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
      hamb.classList.toggle('open');
    });
  }

  // ACTIVE link highlight
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href && location.pathname.endsWith(href)) {
      a.classList.add("active");
    }

    a.addEventListener("click", () => {
      document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));
      a.classList.add("active");

      if (nav && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
      }
    });
  });

  // CONTACT form check
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      const f = new FormData(contactForm);
      const mailto = `mailto:youremail@example.com?subject=${encodeURIComponent('Contact: '+f.get('name'))}&body=${encodeURIComponent(
        'Name: ' + f.get('name') +
        '\nEmail: ' + f.get('email') +
        '\n\nMessage:\n' + f.get('message')
      )}`;
      window.location.href = mailto;
    });
  }
})();
// CART STORAGE
let cart = [];

// Update cart badge
function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

// Add item to cart
function addToCart(product) {
  cart.push(product);
  updateCartCount();
  renderCart();
}

// Render cart items in modal
function renderCart() {
  const cartBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");

  cartBox.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartBox.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <p>${item.title}<br><b>₹${item.price}</b></p>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalBox.innerText = total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

// Open / Close Cart Modal
const cartModal = document.getElementById("cartModal");
document.getElementById("openCart").onclick = () => cartModal.style.display = "flex";
document.getElementById("closeCart").onclick = () => cartModal.style.display = "none";

window.onclick = (e) => {
  if (e.target === cartModal) cartModal.style.display = "none";
};
