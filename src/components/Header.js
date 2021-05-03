import ProductAPI from "./../api/productAPI.js";
import { $ } from "./../utils.js";

const HeaderHome = {
  render() {
    window.scrollTo(0, 0);
    return /*html*/`
      <section id="top-bar" class="bg-gray-700 px-10">
        <section id="top-bar__contain" class="max-w-7xl mx-auto flex justify-between items-center h-10 text-sm text-gray-400">
          <div class="flex items-center">
            <i class="fas fa-headset text-lg text-red-400"></i>
            <span class="text-gray-500 mx-2">Support</span>
            <span class="hover:text-gray-200 font-bold cursor-pointer text-md">(00) 33 169 7720</span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-chevron-left text-gray-400 text-xl cursor-pointer"></i>
            <span class="mx-6">Free shipping for order over $200</span>
            <i class="fas fa-chevron-right text-gray-400 text-xl cursor-pointer"></i>
          </div>
          <div class="flex justify-between">
            <div class="flex items-center mr-8 cursor-pointer">
              <i class="fas fa-map-marker-alt text-lg text-red-400"></i>
              <span class="ml-2 hover:text-gray-200">Order tracking</span>
            </div>
            <div class="flex justify-between items-center">
              <img class="w-8 h-8" src="./src/public/image/flag/en.png" alt="image">
              <span class="text-gray-300 ml-2">Eng / $</span>
            </div>
          </div>
        </section>
      </section>
      <section id="navbar" class="bg-gray-100 px-10">
        <div class="max-w-7xl mx-auto h-24 flex justify-between items-center">
          <a href="#"><img class="w-36" src="./src/public/image/home/logo-dark.png" alt=""></a>
          <div class="flex items-center">
            <ul class="flex justify-between text-lg text-gray-600">
              <a href="/" class="mr-3 text-red-400 hover:text-red-400"><li>Home</li></a>
              <a href="/#/shop" class="mx-3 hover:text-red-400"><li>Shop</li></a>
              <a href="#" class="mx-3 hover:text-red-400"><li>About Us</li></a>
              <a href="#" class="mx-3 hover:text-red-400"><li>Contacts</li></a>
              <a href="#" class="mx-3 hover:text-red-400"><li>Blog</li></a>
            </ul>
            <div class="relative ml-5">
              <input id="q-search" type="text" autocomplete="off" class="w-64 px-4 py-2 pr-10 text-gray-700 rounded border-2 border-gray-300 focus:outline-none focus:border-red-300" placeholder="Search for products">
              <i class="fas fa-search z-10 absolute top-3 right-4 text-lg text-gray-400 cursor-pointer"></i>
              <div id="list-search" class="opacity-0 z-10 absolute top-12 -left-10 overflow-y-auto max-h-48 w-96 bg-gray-100 text-gray-600 py-2.5 px-2 rounded"></div>
            </div>
          </div>
          <div class="flex">
            <div class="h-12 w-12 bg-white rounded-full flex items-center justify-center group cursor-pointer">
              <i class="fas fa-heart text-xl text-gray-400 group-hover:text-red-400"></i>
            </div>
            <div class="flex justify-center mx-4 relative group">
              <div class="h-12 w-12 bg-white rounded-full flex items-center justify-center cursor-pointer">
                <img class="rounded-full" src="./src/public/image/users/admin.png" alt="">
              </div>
              <div class="flex flex-col ml-2">
                <a href="/#/admin" class="text-sm text-gray-400">Administrator</a>
                <span class="text-gray-600 font-medium cursor-pointer">An Luu Hung</span>
              </div>
              <div class="absolute top-12 -right-3 px-3 py-1 text-right invisible group-hover:visible">
                <a href="#" class="text-sm font-medium text-gray-600 hover:text-red-400">Profile</a>
                <a href="/#/admin" class="text-sm font-medium text-gray-600 hover:text-red-400">Administration</a>
              </div>
            </div>
            <div id="cart-form" class="flex justify-center relative">
              <div class="h-12 w-12 relative bg-white rounded-full flex items-center justify-center">
                <i class="fas fa-shopping-cart text-xl text-gray-400 cursor-pointer"></i>
                <span id="quantity-to-cart" class="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-red-400 text-gray-100 text-sm font-medium flex justify-center items-center">0</span>
              </div>
              <div class="flex flex-col ml-2">
                <span class="text-sm text-gray-400">My cart</span>
                <span class="text-gray-600 font-medium">$ <span id="total-money">0.00</span></span>
              </div>

              <div id="cart-info" class="absolute top-14 right-0 w-80 p-2 rounded bg-red-300 z-10 bg-opacity-50">
                <div id="list-cart" class="max-h-56 overflow-y-auto"></div>
                <div class="flex justify-between items-center mb-2">
                  <div class="py-1 text-sm text-gray-900 font-medium flex items-center">Subtotal: $<span class="ml-2 text-blue-600 text-2xl font-bold font-mono" id="total-money"></span></div>
                  <a href="/#/shop-cart" class="px-2 py-1.5 rounded focus:outline-none bg-gray-100 hover:bg-gray-300 hover:text-gray-900 font-medium text-gray-700">
                    Expand cart
                    <i class="fas fa-chevron-right ml-2"></i>
                  </a>
                </div>
                <a href="/#/checkout/details" class="flex justify-center items-center w-full px-2 py-2 rounded focus:outline-none bg-yellow-200 hover:bg-yellow-400 hover:text-gray-900 font-medium text-gray-700">
                  <i class="fas fa-credit-card mr-3"></i>
                  Checkout
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#q-search").onkeyup = async () => {
      $("#list-search").type = focus;
      if ($("#q-search").value.length !== 0) {
        $("#list-search").classList.remove("opacity-0");
        const { data: product_search } = await ProductAPI.getSearch($("#q-search").value);
        const result = await product_search.map(item =>
          `<a href="/#/shop/product/${item.id}" class="flex justify-between items-center bg-gray-200 hover:bg-gray-300 px-2.5 py-1.5 rounded cursor-pointer">
            <img src="${item.image}" class="w-10 h-10" alt="">
            <div class="font-medium">${item.name}</div>
            <div class="text-red-500">$ ${item.price}</div>
          </a>`
        ).join("");
        $("#list-search").innerHTML = result;
      } else {
        if (!$("#list-search").classList.contains("opacity-0")) $("#list-search").classList.add("opacity-0");
      }
    };
  },
  async reRenderCart() {
    renderCart();
    function renderCart () {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const result = cart.map(product =>
        `<div id="hover-cart" class="group bg-gray-100 px-2.5 py-1.5 flex items-center rounded cursor-pointer mb-1">
          <a href="/#/shop/product/${product.id}" class="flex-1 flex items-center">
            <img src="${product.image}" class="w-12 h-12 mr-3" alt="">
            <div class="font-medium text-sm text-gray-700">
              ${product.name}
              <div class="text-md text-gray-500 flex items-center">
                $ <div id="" class="text-red-500 w-12">${product.price}</div>
                <div class="ml-5 flex items-center">
                  <i class="fas fa-times pr-2"></i>
                  <span id="product-quantity" class="text-xl text-blue-500 font-bold">${product.quantity}</span>
                </div>
              </div>
            </div>
          </a>
          <button id="icon-remove-product" data-id="${product.id}" class="cursor-pointer focus:outline-none">
            <i class="fas fa-times text-red-100 group-hover:text-red-400 ml-3"></i>
          </button>
        </div>`
      ).join("");
      $("#list-cart").innerHTML = result;
      const total_money = cart.reduce((accumulator, currentValue) => accumulator += parseFloat(currentValue.price) * parseInt(currentValue.quantity), 0);
      $("#total-money").forEach(item => item.innerHTML = total_money.toFixed(2));
      $("#quantity-to-cart").innerHTML = cart.reduce((accumulator, currentValue) => accumulator += parseInt(currentValue.quantity), 0);
      removeItemInCart();
    }
    removeItemInCart();
    function removeItemInCart () {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      if (cart.length !== 1) {
        $("#icon-remove-product").forEach(item => {
          item.addEventListener("click", function () {
            let index = cart.map(obj => obj.id).indexOf(parseInt(this.dataset.id));
            cart.splice(index, 1);
            loadData();
          });
        });
      } else {
        $("#icon-remove-product").addEventListener("click", function () {
          let index = cart.map(obj => obj.id).indexOf(parseInt(this.dataset.id));
          cart.splice(index, 1);
          loadData();
        });
      }
      function loadData () {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      }
    }
  }
};

export default HeaderHome;