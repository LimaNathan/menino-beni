let cart = [];

function addToCart(item, price) {
  const existingItem = cart.find((cartItem) => cartItem.item === item);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ item, price, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  const totalElement = document.getElementById('total');
  cartList.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');

    const addButton = document.createElement('button');
    addButton.className = 'fas fa-plus';

    addButton.onclick = () => addToCart(item.item, item.price);

    const subtractButton = document.createElement('button');
    subtractButton.className = 'fas fa-minus';
    subtractButton.onclick = () => subtractFromCart(index);

    li.textContent = `${item.item} - R$ ${item.price.toFixed(2)} x ${
      item.quantity
    }`;
    li.appendChild(subtractButton);
    li.appendChild(addButton);
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalElement.textContent = total.toFixed(2);
}

function subtractFromCart(index) {
  const item = cart[index];
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}
