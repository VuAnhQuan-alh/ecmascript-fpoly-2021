import OrderAPI from "../api/orderAPI";

const ChartOrder = {
  async render() {
    const { data: orders } = await OrderAPI.getAllOrders();
    const total_product = orders.reduce((accumulator, currentValue) => {
      const { cartDetail: products } = currentValue;
      const quantity = products.reduce((acc, cur) => acc += cur.quantity, 0);
      accumulator += quantity;
      return accumulator;
    }, 0);
    const total_money = orders.reduce((accumulator, currentValue) => {
      const { cartDetail: products } = currentValue;
      const prices =  products.reduce((acc, cur) => acc += cur.price * cur.quantity, 0);
      accumulator += prices;
      return accumulator;
    }, 0);
    return /*html*/`
      <section id="statistic-product" class="flex justify-around">
        <div id="table-product-info" class="grid grid-cols-2">
          <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
            <div class="text-5xl font-medium text-blue-400">${total_money}</div>
            <div class="mt-3 text-xl font-bold text-gray-300">Total money</div>
          </div>
          <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
            <div class="text-5xl font-medium text-red-500"></div>
            <div class="mt-3 text-xl font-bold text-gray-300"></div>
          </div>
          <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
            <div class="text-5xl font-medium text-yellow-500"></div>
            <div class="mt-3 text-xl font-bold text-gray-300"></div>
          </div>
          <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
            <div class="text-5xl font-medium text-green-400">${total_product}</div>
            <div class="mt-3 text-xl font-bold text-gray-300">Total products</div>
          </div>
        </div>
        <div id="chart-product-info" class="">
          <canvas id="chart-product__pie" style="height: 400px; width: 400px;"></canvas>
        </div>
      </section>
    `;
  },
  afterRender() {
    return ``
  }
}

export default ChartOrder;