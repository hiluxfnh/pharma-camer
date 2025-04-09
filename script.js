import { auth, onAuthStateChanged, signOut } from './firebase.js';

// Authentication Management
onAuthStateChanged(auth, (user) => {
    const logoutBtn = document.getElementById('logout-btn');
    const loginLink = document.getElementById('login-link');
    const userEmail = document.getElementById('user-email');

    if (user) {
        userEmail.textContent = user.email;
        logoutBtn.classList.remove('hidden');
        loginLink.classList.add('hidden');
    } else {
        userEmail.textContent = '';
        logoutBtn.classList.add('hidden');
        loginLink.classList.remove('hidden');
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/';
    });
});

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelectorAll('#cart-counter span').forEach(el => {
        el.textContent = cart.length;
    });
}

// Initialize cart display
updateCart();