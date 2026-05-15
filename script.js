
let cart = JSON.parse(localStorage.getItem('pmm_cart') || '[]');

function renderProducts(list = products){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="placeholder">Add Product Image Here</div>
      <span class="badge">${p.badge}</span>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">${p.price}</div>
      <button onclick="addToCart('${p.id}')">Add to Cart</button>
    </article>
  `).join('');
}

function filterProducts(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  const cat = document.getElementById('categoryFilter').value;
  const filtered = products.filter(p =>
    (!cat || p.category === cat) &&
    (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );
  renderProducts(filtered);
}

function setSearch(term){
  document.getElementById('searchInput').value = term;
  document.getElementById('categoryFilter').value = '';
  filterProducts();
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
}

function addToCart(id){
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem('pmm_cart', JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  document.getElementById('cartCount').textContent = cart.length;
  const box = document.getElementById('cartItems');
  box.innerHTML = cart.length ? cart.map((item, index) => `
    <div class="cart-item">
      <strong>${item.name}</strong><br>
      <small>${item.category}</small><br>
      <button onclick="removeItem(${index})">Remove</button>
    </div>
  `).join('') : '<p>Your cart is empty.</p>';
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem('pmm_cart', JSON.stringify(cart));
  renderCart();
}

function toggleCart(){
  document.getElementById('cartPanel').classList.toggle('open');
}

function checkout(){
  if(!cart.length){ alert('Cart is empty'); return; }
  const items = cart.map(i => '- ' + i.name + ' (' + i.category + ')').join('\n');
  alert('Copy this inquiry and send it by WhatsApp or email:\n\n' + items);
}

renderProducts();
renderCart();
