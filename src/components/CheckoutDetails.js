import Validator from "./../public/javascript/Validate.js";

const CheckoutDetails = {
  render() {
    return /*html*/`
      <section id="checkout-details">
        <div class="bg-gray-100 py-5 px-8 rounded-xl flex justify-between items-center">
          <div class="flex items-center">
            <div class="border border-gray-300 p-2 w-28 h-28 box-content rounded-full">
              <img src="./src/public/image/users/admin.png" alt="Avatar" class="">
            </div>
            <div class="ml-3">
              <div class="text-gray-700 text-lg font-bold">An Luu Hung</div>
              <div class="text-sm text-blue-500 font-medium">quanvaph11537@fpt.edu.vn</div>
            </div>
          </div>
          <button class="text-sm text-gray-600 py-2 px-3 bg-gray-50 shadow-2xl hover:text-red-400 hover:shadow-none focus:outline-none">
            <i class="far fa-edit"></i>
            Edit profile
          </button>
        </div>
        <form action="" id="form-details" class="mt-8 text-gray-700 font-medium divide-y divide-gray-300">
          <div class="font-bold mb-5">Shipping Address</div>
          <div class="mb-5">
            <div class="flex justify-between mt-5">
              <div id="formGroup" class="flex flex-col items-start">
                <label for="first-name" class="mb-2">
                  First Name
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="text" id="first-name" rules="required" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
              <div id="formGroup" class="flex flex-col items-start">
                <label for="last-name" class="mb-2">
                  Last Name
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="text" id="last-name" rules="required" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
            </div>
            <div class="flex justify-between mt-5">
              <div id="formGroup" class="flex flex-col items-start">
                <label for="email-address" class="mb-2">
                  E-mail Address
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="text" id="email-address" rules="required|email" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
              <div id="formGroup" class="flex flex-col items-start">
                <label for="phone-number" class="mb-2">
                  Phone Number
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="number" id="phone-number" rules="required|phone" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
            </div>
            <div class="flex justify-between mt-5">
              <div id="formGroup" class="flex flex-col items-start">
                <label for="company" class="mb-2">
                  Company
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="text" id="company" rules="required" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
              <div id="formGroup" class="flex flex-col items-start">
                <label for="zip-code" class="mb-2">
                  ZIP Code
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="number" id="zip-code" rules="required|max:8|min:6" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
            </div>
            <div class="flex justify-between mt-5">
              <div id="formGroup" class="flex flex-col items-start">
                <label for="first-address" class="mb-2">
                  Address 1
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="text" id="first-address" rules="required" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
              <div id="formGroup" class="flex flex-col items-start">
                <label for="second-address" class="mb-2">
                  Address 2
                  <span id="errorMessage" class="text-sm font-light text-purple-600 ml-5"></span>
                </label>
                <input type="text" id="second-address" class="w-96 py-2 px-3 rounded border border-gray-300 text-gray-600 focus:outline-none focus:border-red-300">
              </div>
            </div>
          </div>
          <div class="font-bold py-5">Billing address</div>
          <div class="flex justify-between items-center pt-5">
            <a href="/#/shop-cart" class="text-gray-600 text-center w-96 py-2 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200 focus:outline-none">
              <i class="fas fa-chevron-left"></i>
              <span class="ml-3">Back to Cart</span>
            </a>
            <button type="submit" class="text-gray-100 text-center w-96 py-2 bg-red-400 rounded hover:bg-red-500 focus:outline-none">
              <span class="mr-3">Proceed to Shipping</span>
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </form>
      </section>
    `;
  },
  afterRender() {
    Validator.valid("#form-details", {
      onSubmit: data => {
        let ship_address = localStorage.getItem('shipping-address');
        ship_address = ship_address ? JSON.parse(ship_address) : {};
        ship_address = data;
        localStorage.setItem('shipping-address', JSON.stringify(ship_address));
        window.location.href = 'http://localhost:6969/#/checkout/shipping';
      }
    });
  }
}

export default CheckoutDetails;