import { $ } from "./../utils.js";
import Chart from "chart.js";
import CategoryAPI from "./../api/categoryAPI.js";
import ProductAPI from "./../api/productAPI.js";

const ChartCategories = {
  render() {
    return /*html*/`
        <div id="chart_category_info" class="max-w-4xl">
          <canvas id="chart_categories_bar"></canvas>
        </div>
      `;
  },
  async afterRender() {
    const promise = new Promise(async (resolve, reject) => {
      const { data: categories } = await CategoryAPI.getCategories();
      const arr_product_quantity = [];
      async function getProductOfCategoryId (id) {
        const { data: product } = await ProductAPI.getWithCateAll(id);
        return product;
      }
      categories.forEach(async cate => {
        const quantity = await getProductOfCategoryId(cate.id);
        arr_product_quantity.push(quantity.length);
      });
      return resolve(arr_product_quantity);
    })
    .then(async (data) => {
      const { data: categories } = await CategoryAPI.getCategories();
      const category_name = await categories.map(cate => cate.name);
      const chart_category = $("#chart_categories_bar").getContext("2d");
      const myChart = new Chart(chart_category, {
        type: "bar",
        data: {
          labels: category_name,
          datasets: [
            {
              label: "The number of products",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(255, 206, 86, 0.4)",
                "rgba(75, 192, 192, 0.4)",
                "rgba(153, 102, 255, 0.4)",
                "rgba(255, 159, 64, 0.4)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
      });
    });
  },
};

export default ChartCategories;
