import { $ } from "./../utils.js";
import Chart from "chart.js";
import ProductAPI from "./../api/productAPI.js";

const ChartProduct = {
  async render() {
    const { data: total_products } = await ProductAPI.getAll();
    const product__in_stock = total_products.filter(product => product.quantity > 0).length;
    const product__out_stock = total_products.length - product__in_stock;
    return /*html*/`
        <section id="statistic-product" class="flex justify-around">
          <div id="table-product-info" class="grid grid-cols-2">
            <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
              <div class="text-5xl font-medium text-blue-400">${product__in_stock}</div>
              <div class="mt-3 text-xl font-bold text-gray-300">In of Stock</div>
            </div>
            <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
              <div class="text-5xl font-medium text-red-500">${product__out_stock > 9 ? product__out_stock : `0${product__out_stock}`}</div>
              <div class="mt-3 text-xl font-bold text-gray-300">Out of Stock</div>
            </div>
            <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
              <div class="text-5xl font-medium text-yellow-500">05</div>
              <div class="mt-3 text-xl font-bold text-gray-300">Products sold</div>
            </div>
            <div class="w-44 h-48 my-2 mx-5 bg-gray-600 border rounded-xl border-gray-500 flex flex-col justify-center items-center">
              <div class="text-5xl font-medium text-green-400">${total_products.length}</div>
              <div class="mt-3 text-xl font-bold text-gray-300">Total products</div>
            </div>
          </div>
          <div id="chart-product-info" class="">
            <canvas id="chart-product__pie" style="height: 400px; width: 400px;"></canvas>
          </div>
        </section>
      `;
  },
  async afterRender() {
    const chart_product = $("#chart-product__pie").getContext("2d");
    const { data: product_women } = await ProductAPI.getWithObjAll(1);
    const { data: product_kids } = await ProductAPI.getWithObjAll(2);
    const { data: product_men } = await ProductAPI.getWithObjAll(3);
    const my_chart = new Chart(chart_product, {
      type: "pie",
      data: {
        labels: ["Women", "Kids", "Men"],
        datasets: [
          {
            label: "Products chart",
            data : [product_women.length, product_kids.length, product_men.length],
            backgroundColor: [
              "rgba(255, 99, 132, 0.4)",
              "rgba(255, 206, 86, 0.4)",
              "rgba(153, 102, 255, 0.4)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  },
};

export default ChartProduct;
