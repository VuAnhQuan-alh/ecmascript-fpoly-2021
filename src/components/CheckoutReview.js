import OrderAPI from "./../api/orderAPI.js";
import { $ } from "./../utils.js";

const CheckoutReview = {
  async render() {
    let cart = localStorage.getItem('cart');
    let ship = localStorage.getItem('shipping-address');
    let card = localStorage.getItem('card-detail');
    cart = cart ? JSON.parse(cart) : [];
    ship = ship ? JSON.parse(ship) : {};
    card = card ? JSON.parse(card) : {};
    return /*html*/`
      <section id="checkout-review" class="divide-y divide-gray-300">
        <div class="text-gray-700 font-bold mb-5">Review your Order</div>
        <div class="my-8">
          ${cart.map(item => /*html*/`
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img src="${item.image}" alt="" class="w-44 mr-8">
                <div class="flex flex-col">
                  <span class="text-sm text-gray-500">${item.title}</span>
                  <a href="/#/shop/product/${item.id}" class="hover:text-red-400 text-lg font-bold text-gray-700">${item.name}</a>
                  <span class="text-xl font-medium font-mono text-blue-500">$${item.price}</span>
                  <div class="text-sm text-yellow-500">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <div class="text-gray-500">Quantity: <span class="text-gray-700 font-medium text-lg">${item.quantity}</span></div>
                <span class="text-red-400 cursor-pointer">
                  <i class="far fa-edit mr-2"></i>Edit
                </span>
              </div>
            </div>
          `
          ).join("")}
        </div>
        <div class="flex justify-between py-8 text-sm text-gray-500">
          <div class="flex-1 w-96">
            <div class="text-gray-700 font-bold text-md mb-2">Shipping to:</div>
            <div class="">Client: <span class="text-gray-600 ml-2 font-medium">${`${ship['first-name']} ${ship['last-name']}`}</span></div>
            <div class="">Address: <span class="text-gray-600 ml-2 font-medium">${ship['first-address']}</span></div>
            <div class="">Phone: <span class="text-gray-600 ml-2 font-medium">+84 ${ship['phone-number'].slice(1)}</span></div>
          </div>
          <div class="flex-1 w-96">
            <div class="text-gray-700 font-bold text-md mb-2">Payment method</div>
            <div class="">Credit Card: <span class="text-gray-600 ml-2 font-medium">**** **** **** ${card['cardNumber'].slice(15,19)}</span></div>
          </div>
        </div>
        <div class="flex justify-between items-center pt-10">
          <a href="/#/checkout/payment" class="text-gray-600 text-center w-96 py-2 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200">
            <i class="fas fa-chevron-left"></i>
            <span class="ml-3">Back to Payment</span>
          </a>
          <button type="button" id="btn-complete" href="/#/checkout-complete" class="text-gray-100 text-center w-96 py-2 bg-red-400 rounded hover:bg-red-500 focus:outline-none">
            <span class="mr-3">Complete order</span>
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#btn-complete").addEventListener("click", function() {
      let cart = localStorage.getItem('cart');
      let ship = localStorage.getItem('shipping-address');
      let card = localStorage.getItem('card-detail');
      cart = cart ? JSON.parse(cart) : [];
      ship = ship ? JSON.parse(ship) : {};
      card = card ? JSON.parse(card) : {};
      function makeCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `#${result}`;
      }
      const date = new Date();
      const code = makeCode(11);
      const order = {
        cartDetail: cart,
        deliveryAddress: ship,
        cardDetail: card,
        date: `${date.getFullYear()}/${date.getMonth() <= 8 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getDate()} ${date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()}`,
        code: code
      };
      OrderAPI.addOrder(order);
      localStorage.clear();
      window.location.href = 'http://localhost:6969/#/checkout-complete';
    });
  }
}

export default CheckoutReview;