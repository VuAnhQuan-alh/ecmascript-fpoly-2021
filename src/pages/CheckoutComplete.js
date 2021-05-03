import OrderAPI from "./../api/orderAPI.js";

const CheckoutComplete = {
  async render() {
    const { data: ordersAll } = await OrderAPI.getAllOrders();
    const { data: order } = await OrderAPI.getOrder(ordersAll.length);
    return /*html*/`
      <section id="checkout-complete" class="text-center rounded-xl border border-gray-300 mx-10 mt-24 bg-gray-100">
        <div class="w-full py-16 max-w-2xl mx-auto">
          <div class="text-3xl font-bold text-gray-700 mb-10">Thank you for your order!</div>
          <p class="text-gray-600">
            Your order has been placed and will be processed as soon as possible.<br>
            Make sure you make note of your order number, which is <span class="text-md font-medium text-gray-700">${order.code}</span>.<br>
            You will be receiving an email shortly with confirmation of your order. <span class="underline">You can now:</span>
          </p>
          <div class="mt-10 flex justify-center">
            <a href="/#/shop" class="mr-5">
              <button class="py-2 w-60 border border-gray-300 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 font-light focus:outline-none">
                Go back shopping
              </button>
            </a>
            <a href="">
              <button  class="py-2 w-60 border bg-red-400 rounded hover:bg-red-500 text-gray-100 font-light focus:outline-none">
                <i class="fas fa-map-marker-alt"></i>
                Track Order
              </button>
            </a>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {}
}

export default CheckoutComplete;