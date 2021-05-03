import { $ } from "./../utils.js";

const CheckoutPayment = {
  render() {
    return /*html*/`
      <section id="checkout-payment">
        <div class="text-gray-700 font-bold mb-5">Choose payment method</div>
        <div class="">
          <div class="flex justify-between items-center rounded-t-xl border border-gray-300 px-6 py-3">
            <div class="text-gray-700 font-bold">
              <i class="fas fa-credit-card"></i>
              <span class="">Pay with Credit Card</span>
            </div>
            <button class="w-8 h-8 bg-gray-300 text-gray-400 rounded-full focus:outline-none">
              <i class="fas fa-chevron-up"></i>
            </button>
          </div>
          <div class="px-6 py-3 border border-gray-300">
            <div class="flex items-center my-2">
              <span class="text-sm text-gray-500 mr-5">We accept following credit cards:</span>
              <img src="./src/public/image/home/cards-alt.png" alt="" class="w-48">
            </div>
            <div class="my-2">
              <div class="text-center">
                <i style="font-size: 16rem;" class="fas fa-credit-card text-gray-400"></i>
              </div>
              <form id="form-card" class="my-2">
                <div class="flex justify-between mb-5">
                  <input id="card-number" type="text" style="width: 22rem;" class="card-payment py-2 px-3 border border-gray-300 text-gray-600 rounded focus:outline-none focus:border-red-300" placeholder="Card Number">
                  <input id="card-name" type="text" style="width: 22rem;" class="card-payment py-2 px-3 border border-gray-300 text-gray-600 rounded focus:outline-none focus:border-red-300" placeholder="Full Name">
                </div>
                <div class="flex justify-between">
                  <input id="card-date" type="text" style="width: 158px;" class="card-payment py-2 px-3 border border-gray-300 text-gray-600 rounded focus:outline-none focus:border-red-300" placeholder="MM / YY">
                  <input id="card-cvc" type="text" style="width: 158px;" class="card-payment py-2 px-3 border border-gray-300 text-gray-600 rounded focus:outline-none focus:border-red-300" placeholder="CVC">
                  <button type="submit" style="width: 22rem;" class="py-2 text-red-400 hover:bg-red-400 hover:text-gray-100 rounded border border-red-300 focus:outline-none">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div class="flex justify-between items-center border border-gray-300 px-6 py-3">
            <div class="text-gray-700 font-bold">
              <i class="fab fa-paypal"></i>
              <span class="">Pay with PayPal</span>
            </div>
            <button class="w-8 h-8 bg-gray-300 text-gray-400 rounded-full focus:outline-none">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
          <div class="flex justify-between items-center rounded-b-xl border border-gray-300 px-6 py-3">
            <div class="text-gray-700 font-bold">
              <i class="fas fa-gift"></i>
              <span class="">Redeem Reward Points</span>
            </div>
            <button class="w-8 h-8 bg-gray-300 text-gray-400 rounded-full focus:outline-none">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
        <div class="flex justify-between items-center mt-20">
          <a href="/#/checkout/shipping" class="text-gray-600 text-center w-96 py-2 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200">
            <i class="fas fa-chevron-left"></i>
            <span class="ml-3">Back to Shipping</span>
          </a>
          <a href="/#/checkout/review" class="text-gray-100 text-center w-96 py-2 bg-red-400 rounded hover:bg-red-500">
            <span class="mr-3">Review your order</span>
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#card-number").oninput = function(event) {
      let cardNumber = event.target.value;
      if (cardNumber.length > 19) {
        this.value = cardNumber.slice(0, 19);
      }
      if (isNaN(cardNumber.split('').pop())) {
        this.value = cardNumber.slice(0, cardNumber.length - 1);
      } else {
        if (cardNumber.length === 4 || cardNumber.length === 9 || cardNumber.length === 14) {
          this.value = cardNumber + ' ';
        }
      }
    };
    $("#card-date").oninput = function(event) {
      let cardDate = event.target.value;
      if (cardDate.length > 9) {
        this.value = cardDate.slice(0, 9);
      }
      if (isNaN(cardDate.split('').pop())) {
        this.value = cardDate.slice(0, cardDate.length - 1);
      } else {
        if (cardDate.length === 1 && cardDate !== '0') {
          this.value = '0' + cardDate + ' / ';
        } else if (cardDate.length === 2) {
          this.value = cardDate + ' / ';
        }
        if (cardDate.length === 5 || cardDate.length === 4) {
          this.value = cardDate.slice(0, 1);
        }
      }
    };
    $("#card-cvc").oninput = function(event) {
      let cardDate = event.target.value;
      if (isNaN(cardDate.split('').pop())) {
        this.value = cardDate.slice(0, cardDate.length - 1);
      }
      if (cardDate.length > 4) {
        this.value = cardDate.slice(0, 4);
      }
    };
    {
    // $(".card-payment").forEach(input => {
    //   input.onfocus = function() {
    //     if (this.classList.contains("border-yellow-400")) this.classList.remove("border-yellow-400");
    //   };
    // });
    // $("#card-number").onblur = function() {
    //   if (this.value.length !== 19) {
    //     this.classList.add("border-yellow-400");
    //   }
    // };
    // $("#card-date").onblur = function() {
    //   if (this.value.length !== 9) {
    //     this.classList.add("border-yellow-400");
    //   }
    // };
    // $("#card-cvc").onblur = function() {
    //   if (this.value.length !== 4) {
    //     this.classList.add("border-yellow-400");
    //   }
    // };
    // $("#card-name").onblur = function() {
    //   if (this.value.length = 0) {
    //     if (this.classList.contains("border-yellow-400")) this.classList.add("border-yellow-400");
    //   } else {
    //     if (this.classList.contains("border-yellow-400")) this.classList.remove("border-yellow-400");
    //   }
    // };
    };
    $("#form-card").addEventListener("submit", event => {
      event.preventDefault();
      let cardDetail = localStorage.getItem('card-detail');
      cardDetail = cardDetail ? JSON.parse(cardDetail) : {};
      cardDetail = {
        ...cardDetail,
        cardNumber: $("#card-number").value,
        cardName: $("#card-name").value,
        cardDate: $("#card-date").value,
        cardCVC: $("#card-cvc").value
      };
      localStorage.setItem('card-detail', JSON.stringify(cardDetail));
    });
  }
}

export default CheckoutPayment;