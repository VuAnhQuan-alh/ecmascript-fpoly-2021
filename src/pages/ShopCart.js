import { $ } from "./../utils.js";
import HeaderHome from "./../components/Header.js";

const ShopCart = {
  render() {
    let cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
    const total_money = cart.reduce((accumulator, currentValue) => accumulator += parseFloat(currentValue.price) * parseInt(currentValue.quantity), 0);
    return /*html*/`
      <section id="shop-cart">
        <div class="w-full h-40 bg-gray-700 px-10 text-2xl text-red-400 font-bold py-6">
          <i class="fas fa-cart-arrow-down animate-bounce mr-4 text-gray-100"></i>"Your cart !"
        </div>
        <section class="-mt-20 mx-10 flex justify-between min-h-screen">
          <div id="manage-cart" class="flex-1 py-5 mr-24">
            <div class="flex justify-between items-center">
              <span class="text-gray-200 text-lg font-medium">Products</span>
              <a href="/#/shop/" class="py-2 px-3 rounded border border-red-400 text-red-400 font-thin">
                <i class="fas fa-chevron-left"></i>
                <span class="ml-3">Continue shopping</span>
              </a>
            </div>
            <div id="list-product-cart" class="my-5 divide-y divide-gray-300">
              ${cart.map(product => 
                `<div class="flex justify-between items-center bg-gray-50">
                  <img src="${product.image}" alt="" class="w-44 h-40">
                  <div class="mx-5 w-80 text-gray-600">
                    <div class="text-gray-700 text-lg font-medium">${product.name}</div>
                    <div class="text-md font-light">Size: <span class="text-lg font-medium">8.5</span></div>
                    <div class="text-md font-light">Color: <span class="text-lg font-medium">White & Blue</span></div>
                    <div class="text-xl font-mono text-blue-500">$${product.price}</div>
                  </div>
                  <div class="flex flex-col items-end text-gray-700 font-medium text-lg">
                    Quantity
                    <input id="total-product-quantity" data-id="${product.id}" type="number" min="1" value="${product.quantity}" class="w-32 my-2 py-2 px-3 rounded border border-gray-300 focus:outline-none">
                    <button id="btn-remove-product" data-id="${product.id}" class="text-md text-red-400 focus:outline-none py-1">
                      <i class="far fa-times-circle mr-2"></i>
                      Remove
                    </button>
                  </div>
                </div>`
              ).join("")}
            </div>
            <button id="btn-update-cart" class="my-10 py-2 flex justify-center items-center w-full text-blue-500 text-lg font-medium rounded focus:outline-none border border-blue-400 hover:bg-blue-400 hover:text-gray-100">
              <i class="fas fa-sync-alt transform -rotate-45 mr-4"></i>
              Update Cart
            </button>
          </div>
          <div id="comment-cart" class="w-96 px-10 bg-gray-100 rounded-xl divide-y divide-gray-300">
            <div class="my-5 text-center text-gray-700 font-medium">
              <div class="text-xl">Subtotal</div>
              <div class="text-3xl font-mono text-blue-500 mt-5">$ <span id="total-money">${total_money}</span></div>
            </div>
            <div class="">
              <div class="mt-5">
                <span class="mr-3 text-sm text-gray-100 font-medium px-2 py-1 rounded-lg bg-blue-400">Note</span>
                <span class="text-gray-700 font-medium">Additional comments</span>
              </div>
              <textarea id="" rows="4" style="width: 19rem;" class="my-5 border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-red-300"></textarea>
              <div class="divide-y divide-gray-300 border border-gray-300 rounded-xl text-gray-700 font-medium">
                <div class="flex justify-between items-center py-4 px-6 cursor-pointer">
                  <span class="hover:text-red-500">Apply promo code</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
                <div class="flex justify-between items-center py-4 px-6 cursor-pointer">
                  <span class="hover:text-red-500">Shipping estimates</span>
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
              <a href="/#/checkout/details" class="mt-5 flex justify-center items-center py-2 rounded bg-red-400 text-gray-100 shadow-2xl focus:outline-none">
                <i class="fas fa-credit-card mr-3"></i>
                <span class="">Proceed to Checkout</span>
              </a>
            </div>
          </div>
        </section>
      </section>
    `;
  },
  afterRender() {
    HeaderHome.reRenderCart();
    updateToCart();
    function updateToCart () {
      $("#btn-update-cart").addEventListener("click", () => {
        let cart = localStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        if (cart.length !== 1) {
          $("#total-product-quantity").forEach(item => {
            let index = cart.map(obj => obj.id).indexOf(parseInt(item.dataset.id));
            cart[index].quantity = parseInt(item.value);
          });
        } else {
          const self = $("#total-product-quantity");
          cart[0].quantity = parseInt(self.value);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        HeaderHome.reRenderCart();
      });
    }
    function renderCart () {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const total_money = cart.reduce((accumulator, currentValue) => accumulator += parseFloat(currentValue.price) * parseInt(currentValue.quantity), 0);
      const result = cart.map(product => 
        `<div class="flex justify-between items-center bg-gray-50">
          <img src="${product.image}" alt="" class="w-44 h-40">
          <div class="mx-5 w-80 text-gray-600">
            <div class="text-gray-700 text-lg font-medium">${product.name}</div>
            <div class="text-md font-light">Size: <span class="text-lg font-medium">8.5</span></div>
            <div class="text-md font-light">Color: <span class="text-lg font-medium">White & Blue</span></div>
            <div class="text-xl font-mono text-blue-500">$${product.price}</div>
          </div>
          <div class="flex flex-col items-end text-gray-700 font-medium text-lg">
            Quantity
            <input type="number" value="${product.quantity}" class="w-32 my-2 py-2 px-3 rounded border border-gray-300 focus:outline-none">
            <button id="btn-remove-product" data-id="${product.id}" class="text-md text-red-400 focus:outline-none py-1">
              <i class="far fa-times-circle mr-2"></i>
              Remove
            </button>
          </div>
        </div>`
      ).join("");
      $("#list-product-cart").innerHTML = result;
      $("#total-money").innerHTML = total_money;
      removeItemInCart();
      loadData(cart);
    }
    removeItemInCart();
    function removeItemInCart () {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      if (cart.length !== 1) {
        $("#btn-remove-product").forEach(item => {
          item.addEventListener("click", function () {
            let index = cart.map(obj => obj.id).indexOf(parseInt(this.dataset.id));
            cart.splice(index, 1);
            loadData(cart);
          });
        });
      } else {
        $("#btn-remove-product").addEventListener("click", function () {
          let index = cart.map(obj => obj.id).indexOf(parseInt(this.dataset.id));
          cart.splice(index, 1);
          loadData(cart);
        });
      }
    }
    function loadData (cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateToCart();
    }
  }
}

export default ShopCart;