import { $, parseRequestUrl } from "./../utils.js";
import HeaderHome from "./../components/Header.js";
import PromoCode from "../api/promoCodeAPI.js";

const Checkout = {
  render() {
    let cart = localStorage.getItem('cart');
    cart = cart === null ? 0 : JSON.parse(cart);
    const total_money = cart !== 0 ? cart.reduce((accumulator, currentValue) => accumulator += parseFloat(currentValue.price) * parseInt(currentValue.quantity), 0) : 0;
    return /*html*/`
      <section id="checkout-cart">
        <div class="w-full h-40 bg-gray-700 px-10 text-2xl text-red-400 font-bold py-6">
          <i class="fas fa-credit-card animate-bounce mr-4 text-gray-100"></i>"Checkout !"
        </div>
        <section class="-mt-20 mx-10 flex justify-between min-h-screen">
          <div id="" class="flex-1 py-5 mr-24">
            <div id="process-order" class="flex items-center text-gray-100 font-medium">
              <div class="flex-1 text-center">
                <div class="h-1 bg-red-400 relative">
                  <span class="absolute -top-2.5 left-1/2 w-6 h-6 rounded-full bg-red-400 transform -translate-x-1/2">1</span>
                </div>
                <div class="text-gray-400 mt-5">
                  <a href="/#/shop-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="">Cart</span>
                  </a>
                </div>
              </div>
              <div class="flex-1 text-center">
                <div class="h-1 bg-red-400 relative">
                  <span class="absolute -top-2.5 left-1/2 w-6 h-6 rounded-full bg-red-400 transform -translate-x-1/2">2</span>
                </div>
                <div class="text-gray-400 mt-5">
                  <a href="/#/checkout/details">
                    <i class="far fa-user-circle"></i>
                    <span class="">Details</span>
                  </a>
                </div>
              </div>
              <div class="flex-1 text-center">
                <div id="bg-icon" class="h-1 bg-gray-500 relative">
                  <span id="bg-icon" class="absolute -top-2.5 left-1/2 w-6 h-6 rounded-full bg-gray-500 transform -translate-x-1/2">3</span>
                </div>
                <div class="text-gray-400 mt-5">
                  <a href="/#/checkout/shipping">
                    <i class="fas fa-box-open"></i>
                    <span class="">Shopping</span>
                  </a>
                </div>
              </div>
              <div class="flex-1 text-center">
                <div id="bg-icon" class="h-1 bg-gray-500 relative">
                  <span id="bg-icon" class="absolute -top-2.5 left-1/2 w-6 h-6 rounded-full bg-gray-500 transform -translate-x-1/2">4</span>
                </div>
                <div class="text-gray-400 mt-5">
                  <a href="/#/checkout/payment">
                    <i class="fas fa-credit-card"></i>
                    <span class="">Payment</span>
                  </a>
                </div>
              </div>
              <div class="flex-1 text-center">
                <div id="bg-icon" class="h-1 bg-gray-500 relative">
                  <span id="bg-icon" class="absolute -top-2.5 left-1/2 w-6 h-6 rounded-full bg-gray-500 transform -translate-x-1/2">5</span>
                </div>
                <div class="text-gray-400 mt-5">
                  <a href="/#/checkout/review">
                    <i class="far fa-check-circle"></i>
                    <span class="">Review</span>
                  </a>
                </div>
              </div>
            </div>

            <section id="checkout-action" class="my-10"></section>

          </div>
          <div id="order-summary" class="w-96 px-10 bg-gray-100 rounded-xl divide-y divide-gray-300">
            <div class="mt-6">
              <div class="mb-5 text-center text-xl font-medium text-gray-700">Order summary</div>
              <div class="divide-y divide-gray-300 overflow-y-auto max-h-96">
                ${cart.map(product => 
                  `<div class="py-2 flex items-center">
                    <img src="${product.image}" alt="" class="w-16 h-16 mr-3">
                    <div class="">
                      <div class="text-gray-700 font-medium">${product.name}</div>
                      <div class="text-gray-500 font-medium">
                        <span class="text-blue-500 font-mono text-xl mr-2">$${product.price}</span>
                        <i class="fas fa-times"></i>
                        <span class="text-xl font-medium">${product.quantity}</span>
                      </div>
                    </div>
                  </div>`
                ).join("")}
              </div>
            </div>
            <div class="py-4 text-sm text-gray-500">
              <div class="flex justify-between items-center">
                <span>Subtotal:</span>
                <div class="text-gray-600 text-md">$ ${total_money.toFixed(2)}</div>
              </div>
              <div class="flex justify-between items-center">
                <span>Shipping:</span>
                <div id="transport-fee" class="text-gray-600 text-md">-</div>
              </div>
              <div class="flex justify-between items-center">
                <span>Taxes:</span>
                <div class="text-gray-600 text-md">$ 9.50</div>
              </div>
              <div class="flex justify-between items-center">
                <span>Discount:</span>
                <div id="display-discount" class="text-gray-600 text-md">-</div>
              </div>
            </div>
            <div class="mb-10">
              <div id="amount-money" class="text-center my-5 text-3xl font-mono text-gray-700"></div>
              <input id="discount" type="text" class="py-2 px-3 w-full rounded border border-gray-300 placeholder-gray-300 focus:outline-none focus:border-red-300 text-gray-600" placeholder="Promo code">
              <button id="btn-apply-code" class="mt-4 w-full py-2 text-red-400 font-medium rounded border border-red-300 hover:bg-red-400 hover:text-gray-100 focus:outline-none">Apply promo code</button>
            </div>
          </div>
        </section>
      </section>
    `;
  },
  afterRender() {
    let transport = localStorage.getItem('transport');
    transport = transport ? JSON.parse(transport) : 0;
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    let promo = localStorage.getItem('promo');
    promo = promo ? JSON.parse(promo) : 0;
    
    let total_money = cart ? cart.reduce((accumulator, currentValue) => accumulator += parseFloat(currentValue.price) * parseInt(currentValue.quantity), 0) + transport + 9.5 : 0;
    total_money -= promo;
    $("#amount-money").innerHTML = total_money !== 0 ? `$${total_money.toFixed(2)}` : '-';
    $("#transport-fee").innerHTML = `$ ${transport.toFixed(2)}`;
    localStorage.setItem('transport', JSON.stringify(transport));

    if (promo !== 0) $("#display-discount").innerHTML = `$ ${promo.toFixed(2)}`;
    $("#btn-apply-code").addEventListener("click", async () => {
      if ($("#discount").value) {
        const { data: promoCode } = await PromoCode.getCode();
        const existed = promoCode.map(promo => promo.code).indexOf($("#discount").value.toLowerCase());
        if (existed !== -1) {
          const { data: code } = await PromoCode.getMoney(existed + 1);
          promo = code.money;
          total_money -= promo;
          $("#amount-money").innerHTML = total_money === 0 ? '-' : `$${total_money.toFixed(2)}`;
          $("#display-discount").innerHTML = `$ ${promo.toFixed(2)}`;
          localStorage.setItem('promo', JSON.stringify(promo));
        }
      }
    });

    const { less } = parseRequestUrl();
    function handleChangeColor (x) {
      let n = 1;
      $("#bg-icon").forEach(item => {
        if (item.classList.contains("bg-gray-500")) {
          if (n <= x) {
            item.classList.remove("bg-gray-500");
            item.classList.add("bg-red-400");
            n ++;
          }
        }
      });
    }
    if (less === "shipping") {
      handleChangeColor(2);
    } else if (less === "payment") {
      handleChangeColor(4);
    } else if (less === "review") {
      handleChangeColor(6);
    }
    HeaderHome.reRenderCart();
  }
}

export default Checkout;