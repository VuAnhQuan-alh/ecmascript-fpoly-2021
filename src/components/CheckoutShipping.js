import { $ } from "./../utils.js";

const CheckoutShipping = {
  render() {
    return /*html*/`
      <section id="checkout-shipping">
        <div class="text-gray-700 font-bold mb-5">Choose shipping method</div>
        <div class="text-gray-500 text-sm">
          <table>
            <thead class="text-gray-700 text-md font-medium">
              <tr>
                <th class="w-16"></th>
                <th class="text-left w-96">Shipping method</th>
                <th class="w-40 text-right">Delivery time</th>
                <th class="text-right w-44">Handling free</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-gray-100">
                <td><input type="radio" checked name="choose-shipping" data-money="26.5"></td>
                <td class="py-2">
                  <span class="text-gray-700 text-md font-medium">Courier</span>
                  <div class="">All addresses (default zone), United States & Canada</div>
                </td>
                <td class="text-right">2 - 4 days</td>
                <td class="text-right">$26.50</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td><input type="radio" name="choose-shipping" data-money="10"></td>
                <td class="py-2">
                  <span class="text-gray-700 text-md font-medium">Local Shipping</span>
                  <div class="">All addresses (default zone), United States & Canada</div>
                </td>
                <td class="text-right">up to one week</td>
                <td class="text-right">$10.00</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td><input type="radio" name="choose-shipping" data-money="0"></td>
                <td class="py-2">
                  <span class="text-gray-700 text-md font-medium">Local Pickup from store</span>
                  <div class="">All addresses (default zone)</div>
                </td>
                <td class="text-right">-</td>
                <td class="text-right">$0.00</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td><input type="radio" name="choose-shipping" data-money="37"></td>
                <td class="py-2">
                  <span class="text-gray-700 text-md font-medium">Same-Day Delivery</span>
                  <div class="">Only Nghệ Tĩnh</div>
                </td>
                <td class="text-right">24 hours</td>
                <td class="text-right">$37.00</td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td><input type="radio" name="choose-shipping" data-money="28"></td>
                <td class="py-2">
                  <span class="text-gray-700 text-md font-medium">International Shipping</span>
                  <div class="">All addresses (default zone)</div>
                </td>
                <td class="text-right">up to 15 days</td>
                <td class="text-right">$28.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-between items-center mt-40">
          <a href="/#/checkout/details" class="text-gray-600 text-center w-96 py-2 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200">
            <i class="fas fa-chevron-left"></i>
            <span class="ml-3">Back to Details</span>
          </a>
          <a href="/#/checkout/payment" class="text-gray-100 text-center w-96 py-2 bg-red-400 rounded hover:bg-red-500">
            <span class="mr-3">Proceed to Payment</span>
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </section>
    `;
  },
  afterRender() {
    clickInput();
    function clickInput (value = 26.5) {
      let transport = localStorage.getItem('transport');
      transport = transport ? JSON.parse(transport) : 0;
      transport = value;
      localStorage.setItem('transport', JSON.stringify(transport));
    }
    $("input[type=radio]").forEach(item => {
      item.addEventListener("click", function() {
        let value = parseFloat(item.dataset.money);
        clickInput(value);
      });
    });
  }
}

export default CheckoutShipping;