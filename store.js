// ===== Elloraa Shared Store (cart, wishlist, product data) =====

var WHATSAPP_NUMBER = "911234567890";
var INSTAGRAM_URL = "https://www.instagram.com/elloraa.in/";

var FALLBACK_SVG = "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#E8DCCB'/><stop offset='100%' stop-color='#B86445'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='50%' font-family='Georgia,serif' font-size='28' fill='#F8F3EA' text-anchor='middle' dy='.3em'>ELLORAA</text></svg>";
var FALLBACK_IMG = 'data:image/svg+xml,' + encodeURIComponent(FALLBACK_SVG);

var IMG = [
 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1610189844303-23f68be9e71f?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1583391733981-3b4f6e0b3b4c?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1519657337289-077653f724ed?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80&auto=format&fit=crop',
 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80&auto=format&fit=crop'
];
var FABRIC_CLOSEUP = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=80&auto=format&fit=crop';

var PRODUCTS = [
 {id:1,name:'Rosewood Bloom Three-Piece Set',fabric:'Jaipur Cotton',occasion:'Everyday',price:2499,originalPrice:2999,isNew:true,colors:[{name:'Terracotta',hex:'#B86445'},{name:'Sage',hex:'#8E9A83'},{name:'Maroon',hex:'#5A2631'}],sizes:['S','M','L','XL'],images:[IMG[0],IMG[1],IMG[2],FABRIC_CLOSEUP]},
 {id:2,name:'Ivory Whisper Mul Cotton Set',fabric:'Mul Cotton',occasion:'Casual',price:1999,originalPrice:1999,isNew:false,colors:[{name:'Ivory',hex:'#F8F3EA'},{name:'Sage',hex:'#8E9A83'}],sizes:['S','M','L'],images:[IMG[3],IMG[4],IMG[5],FABRIC_CLOSEUP]},
 {id:3,name:'Saffron Bloom Chanderi Set',fabric:'Chanderi',occasion:'Festive',price:3499,originalPrice:3999,isNew:false,colors:[{name:'Terracotta',hex:'#B86445'},{name:'Maroon',hex:'#5A2631'}],sizes:['M','L','XL'],images:[IMG[6],IMG[7],IMG[8],FABRIC_CLOSEUP]},
 {id:4,name:'Sage Whisper Jaipur Cotton Set',fabric:'Jaipur Cotton',occasion:'Everyday',price:2299,originalPrice:2299,isNew:true,colors:[{name:'Sage',hex:'#8E9A83'},{name:'Sand',hex:'#E8DCCB'}],sizes:['S','M','L','XL'],images:[IMG[9],IMG[0],IMG[1],FABRIC_CLOSEUP]},
 {id:5,name:'Maroon Mirage Chanderi Set',fabric:'Chanderi',occasion:'Festive',price:3799,originalPrice:4299,isNew:false,colors:[{name:'Maroon',hex:'#5A2631'},{name:'Terracotta',hex:'#B86445'}],sizes:['S','M','L'],images:[IMG[2],IMG[3],IMG[4],FABRIC_CLOSEUP]},
 {id:6,name:'Sand Dune Mul Cotton Set',fabric:'Mul Cotton',occasion:'Casual',price:1899,originalPrice:1899,isNew:false,colors:[{name:'Sand',hex:'#E8DCCB'},{name:'Ivory',hex:'#F8F3EA'}],sizes:['S','M','L','XL'],images:[IMG[5],IMG[6],IMG[7],FABRIC_CLOSEUP]},
 {id:7,name:'Terracotta Bloom Cotton Set',fabric:'Jaipur Cotton',occasion:'Everyday',price:2599,originalPrice:2899,isNew:false,colors:[{name:'Terracotta',hex:'#B86445'},{name:'Sage',hex:'#8E9A83'}],sizes:['M','L','XL'],images:[IMG[8],IMG[9],IMG[0],FABRIC_CLOSEUP]},
 {id:8,name:'Ivory Whisper Chanderi Set',fabric:'Chanderi',occasion:'Festive',price:3999,originalPrice:3999,isNew:true,colors:[{name:'Ivory',hex:'#F8F3EA'},{name:'Maroon',hex:'#5A2631'}],sizes:['S','M','L'],images:[IMG[1],IMG[2],IMG[3],FABRIC_CLOSEUP]}
];

/* ================= CART ================= */
function getCart(){
  try { return JSON.parse(localStorage.getItem('elloraa_cart')) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem('elloraa_cart', JSON.stringify(cart));
  renderCartBadge();
}
function addToCart(item){
  var cart = getCart();
  var existing = cart.find(function(c){ return c.id === item.id && c.color === item.color && c.size === item.size; });
  if (existing) existing.qty += item.qty;
  else cart.push(item);
  saveCart(cart);
}
function removeFromCart(index){
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}
function updateCartQty(index, qty){
  var cart = getCart();
  if (qty <= 0) cart.splice(index, 1);
  else cart[index].qty = qty;
  saveCart(cart);
}
function cartSubtotal(){
  return getCart().reduce(function(sum, c){ return sum + c.price * c.qty; }, 0);
}
function cartItemCount(){
  return getCart().reduce(function(sum, c){ return sum + c.qty; }, 0);
}
function clearCart(){
  localStorage.removeItem('elloraa_cart');
  renderCartBadge();
}

/* ================= WISHLIST ================= */
function getWishlist(){
  try { return JSON.parse(localStorage.getItem('elloraa_wishlist')) || []; }
  catch(e){ return []; }
}
function saveWishlist(ids){
  localStorage.setItem('elloraa_wishlist', JSON.stringify(ids));
  renderWishlistBadge();
}
function toggleWishlist(id){
  var ids = getWishlist();
  if (ids.indexOf(id) !== -1) ids = ids.filter(function(x){ return x !== id; });
  else ids.push(id);
  saveWishlist(ids);
}
function isWishlisted(id){
  return getWishlist().indexOf(id) !== -1;
}

/* ================= BADGES ================= */
function renderCartBadge(){
  var el = document.getElementById('cartCount');
  if (!el) return;
  var count = cartItemCount();
  if (count > 0){ el.textContent = count; el.classList.remove('hidden'); }
  else el.classList.add('hidden');
}
function renderWishlistBadge(){
  var el = document.getElementById('wishlistCount');
  if (!el) return;
  var count = getWishlist().length;
  if (count > 0){ el.textContent = count; el.classList.remove('hidden'); }
  else el.classList.add('hidden');
}

/* ================= TOAST ================= */
function showToastGlobal(msg){
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden'); t.classList.add('flex');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function(){ t.classList.add('hidden'); t.classList.remove('flex'); }, 2000);
}

/* ================= DRAWERS ================= */
function openCart(){
  renderCartDrawerUI();
  var d = document.getElementById('cartDrawer'), o = document.getElementById('cartOverlay');
  if (d) d.classList.remove('translate-x-full');
  if (o) o.classList.remove('hidden');
}
function closeCart(){
  var d = document.getElementById('cartDrawer'), o = document.getElementById('cartOverlay');
  if (d) d.classList.add('translate-x-full');
  if (o) o.classList.add('hidden');
}
function openWishlist(){
  renderWishlistDrawerUI();
  var d = document.getElementById('wishlistDrawer'), o = document.getElementById('cartOverlay');
  if (d) d.classList.remove('translate-x-full');
  if (o) o.classList.remove('hidden');
}
function closeWishlist(){
  var d = document.getElementById('wishlistDrawer'), o = document.getElementById('cartOverlay');
  if (d) d.classList.add('translate-x-full');
  if (o) o.classList.add('hidden');
}

function renderCartDrawerUI(){
  var cart = getCart();
  var container = document.getElementById('cartItems');
  if (!container) return;
  if (cart.length === 0){
    container.innerHTML = '<p class="text-sm text-charcoal/50 text-center py-10">Your bag is empty.</p>';
  } else {
    container.innerHTML = cart.map(function(item, i){
      return '<div class="flex gap-3 pb-4 border-b border-sand">' +
        '<img src="' + item.image + '" onerror="this.onerror=null;this.src=FALLBACK_IMG;" class="w-16 h-20 object-cover rounded-lg flex-shrink-0">' +
        '<div class="flex-1 min-w-0">' +
          '<p class="text-sm font-semibold text-charcoal truncate">' + item.name + '</p>' +
          '<p class="text-xs text-charcoal/50 mb-1">' + item.color + ' &middot; ' + item.size + '</p>' +
          '<p class="text-sm font-semibold text-maroon mb-2">₹' + item.price.toLocaleString('en-IN') + '</p>' +
          '<div class="flex items-center gap-2">' +
            '<button class="qty-minus-cart w-7 h-7 border border-sand rounded-lg flex items-center justify-center text-sm" data-i="' + i + '">−</button>' +
            '<span class="text-xs font-semibold w-5 text-center">' + item.qty + '</span>' +
            '<button class="qty-plus-cart w-7 h-7 border border-sand rounded-lg flex items-center justify-center text-sm" data-i="' + i + '">+</button>' +
            '<button class="remove-cart-item ml-auto text-xs text-terracotta underline" data-i="' + i + '">Remove</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }
  var subtotalEl = document.getElementById('cartSubtotal');
  if (subtotalEl) subtotalEl.textContent = '₹' + cartSubtotal().toLocaleString('en-IN');
  if (window.lucide) lucide.createIcons();
}

function renderWishlistDrawerUI(){
  var ids = getWishlist();
  var container = document.getElementById('wishlistItems');
  if (!container) return;
  if (ids.length === 0){
    container.innerHTML = '<p class="text-sm text-charcoal/50 text-center py-10">Nothing saved yet.</p>';
    return;
  }
  container.innerHTML = ids.map(function(id){
    var p = PRODUCTS.find(function(x){ return x.id === id; });
    if (!p) return '';
    return '<div class="flex gap-3 pb-4 border-b border-sand">' +
      '<img src="' + p.images[0] + '" onerror="this.onerror=null;this.src=FALLBACK_IMG;" class="w-16 h-20 object-cover rounded-lg flex-shrink-0">' +
      '<div class="flex-1 min-w-0">' +
        '<p class="text-sm font-semibold text-charcoal truncate">' + p.name + '</p>' +
        '<p class="text-sm font-semibold text-maroon mb-2">₹' + p.price.toLocaleString('en-IN') + '</p>' +
        '<div class="flex items-center gap-3">' +
          '<button class="move-to-bag-item text-xs text-terracotta font-semibold underline" data-id="' + p.id + '">Move to Bag</button>' +
          '<button class="remove-wishlist-item text-xs text-charcoal/50 underline" data-id="' + p.id + '">Remove</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ================= GLOBAL EVENT WIRING ================= */
document.addEventListener('DOMContentLoaded', function(){
  renderCartBadge();
  renderWishlistBadge();

  var cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);

  var closeCartBtn = document.getElementById('closeCart');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

  var wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlist);

  var closeWishlistBtn = document.getElementById('closeWishlist');
  if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlist);

  var overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.addEventListener('click', function(){ closeCart(); closeWishlist(); });

  var cartItemsEl = document.getElementById('cartItems');
  if (cartItemsEl){
    cartItemsEl.addEventListener('click', function(e){
      var cart = getCart();
      var minus = e.target.closest('.qty-minus-cart');
      var plus = e.target.closest('.qty-plus-cart');
      var remove = e.target.closest('.remove-cart-item');
      if (minus){ var i = Number(minus.dataset.i); updateCartQty(i, cart[i].qty - 1); renderCartDrawerUI(); }
      if (plus){ var j = Number(plus.dataset.i); updateCartQty(j, cart[j].qty + 1); renderCartDrawerUI(); }
      if (remove){ var k = Number(remove.dataset.i); removeFromCart(k); renderCartDrawerUI(); }
    });
  }

  var wishlistItemsEl = document.getElementById('wishlistItems');
  if (wishlistItemsEl){
    wishlistItemsEl.addEventListener('click', function(e){
      var remove = e.target.closest('.remove-wishlist-item');
      var moveToBag = e.target.closest('.move-to-bag-item');
      if (remove){
        toggleWishlist(Number(remove.dataset.id));
        renderWishlistDrawerUI();
        if (typeof render === 'function') render();
      }
      if (moveToBag){
        var id = Number(moveToBag.dataset.id);
        var p = PRODUCTS.find(function(x){ return x.id === id; });
        if (p){
          addToCart({ id: p.id, name: p.name, image: p.images[0], price: p.price, color: p.colors[0].name, size: p.sizes[0], qty: 1 });
          toggleWishlist(id);
          renderWishlistDrawerUI();
          showToastGlobal('Moved to bag 🤍');
        }
      }
    });
  }

  var whatsappCheckoutBtn = document.getElementById('cartWhatsappCheckout');
  if (whatsappCheckoutBtn){
    whatsappCheckoutBtn.addEventListener('click', function(){
      var cart = getCart();
      if (cart.length === 0){ alert('Your bag is empty'); return; }
      var msg = "Hi Elloraa! I'd like to place an order:\n\n";
      cart.forEach(function(item){
        msg += '• ' + item.name + ' (' + item.color + ', ' + item.size + ') x' + item.qty + ' — ₹' + (item.price * item.qty) + '\n';
      });
      msg += '\nTotal: ₹' + cartSubtotal().toLocaleString('en-IN');
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }
});