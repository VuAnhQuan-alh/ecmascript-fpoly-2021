import OrderAPI from "./../api/orderAPI.js";

const ListOrders = {
  async render() {
    const { data: orders } = await OrderAPI.getAllOrders();
    const card = orders.map(item => item.cardDetail);
    const cart = orders.map(item => item.cartDetail);
    const moneys = cart.map(item => {
      const money = item.reduce((accumulator, currentValue) => {
        accumulator += parseFloat(currentValue.price) * currentValue.quantity;
        return accumulator;
      }, 0);
      return money.toFixed(2);
    });
    return /*html*/`
      <table class="table-auto mx-5 mx-auto">
        <thead class="text-gray-400 text-center border-b border-gray-400">
          <tr>
            <th class="w-40">Code</th>
            <th class="w-56">Date</th>
            <th class="w-40">Payment</th>
            <th class="w-28">Total</th>
            <th class="w-24">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-500 divide-opacity-50">
          ${orders.map((item, index) => /*html*/`
            <tr class="text-center py-2 text-gray-300">
              <th class="py-2">${item.code}</th>
              <th>${item.date}</th>
              <th>${card[index].cardName}</th>
              <th>${moneys[index]}</th>
              <th>
                <i class="fas fa-trash-alt"></i>
                <i class="fas fa-edit">
              </th>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  },
  afterRender() {
    const date = new Date;
    console.log(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
  }
}

export default ListOrders;