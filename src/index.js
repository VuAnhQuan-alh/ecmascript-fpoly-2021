import Home from "./pages/Home.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import Error404Page from "./pages/Error404Page.js";
import { parseRequestUrl, $ } from "./utils.js";
import ShopPage from "./pages/ShopPage.js";
import AdminPage from "./pages/admin/AdminPage.js";
import HeaderHome from "./components/Header.js";
import FooterHome from "./components/Footer.js";
import Main from "./pages/Main.js";
import ProductAd from "./pages/admin/ProductAd.js";
import Chart from "./components/Chart.js";
import ListProductAd from "./components/ListProductAd.js";
import ProductDetailAd from "./components/ProductDetailAd.js";
import ProductFromAd from "./components/ProductFormAd.js";
import ChartProduct from "./components/ChartProduct.js";
import CategoriesActionAd from "./components/CategoriesActionAd.js";
import CategoryAd from "./pages/admin/CategoryAd.js";
import ChartCategories from "./components/ChartCategory.js";
import Checkout from "./pages/CheckoutCart.js";
import ShopCart from "./pages/ShopCart.js";
import CheckoutDetails from "./components/CheckoutDetails.js";
import CheckoutShipping from "./components/CheckoutShipping.js";
import CheckoutPayment from "./components/CheckoutPayment.js";
import CheckoutReview from "./components/CheckoutReview.js";
import CheckoutComplete from "./pages/CheckoutComplete.js";
import OrdersAd from "./pages/admin/OrderAd.js";
import ListOrders from "./components/ListOrders.js";
import ChartOrder from "./components/ChartOrder.js";
import OrderDetail from "./components/OrderDetail.js";

const routeFirst = {
  '/': Home,
  '/shop': ShopPage,
  '/shop/category/:id': ShopPage,
  '/shop/object/:id': ShopPage,
  '/shop/product/:id': ProductDetailPage,
  '/checkout': Checkout,
  '/checkout/details': Checkout,
  '/checkout/shipping': Checkout,
  '/checkout/payment': Checkout,
  '/checkout/review': Checkout,
  '/checkout-complete': CheckoutComplete,
  '/shop-cart': ShopCart,
  '/admin': Chart,
  '/admin/product': ProductAd,
  '/admin/product/:abc': ProductAd,
  '/admin/product/:abc/:id': ProductAd,
  '/admin/category': CategoryAd,
  '/admin/category/:abc': CategoryAd,
  '/admin/order': OrdersAd,
  '/admin/order/:abc': OrdersAd,
  '/admin/order/:abc/:id': OrdersAd,
};
const routeSecond = {
  '': Chart,
  '/order': ChartOrder,
  '/order/list': ListOrders,
  '/order/detail/:id': OrderDetail,
  '/product': ChartProduct,
  '/product/list': ListProductAd,
  '/product/detail/:id': ProductDetailAd,
  '/product/creat': ProductFromAd,
  '/product/edit/:id': ProductFromAd,
  '/category': ChartCategories,
  '/category/action': CategoriesActionAd,
  '/details': CheckoutDetails,
  '/shipping': CheckoutShipping,
  '/payment' : CheckoutPayment,
  '/review': CheckoutReview,
};

const header = HeaderHome;
const footer = FooterHome;
const main = Main;
const admin = AdminPage;

const router = async () => {
  const { resource, less, then, id } = parseRequestUrl();
  const parseURL = (resource ? `/${resource}` : '/') + (less ? `/${less}` : '') + (then ? '/:abc' : '') + (id ? '/:id' : '');
  const adParseURL = (less ? `/${less}` : '') + (then ? `/${then}` : '') + (id ? '/:id' : '');
  const page = routeFirst[parseURL] ? routeFirst[parseURL] : Error404Page;
  const comp = routeSecond[adParseURL] ? routeSecond[adParseURL] : Error404Page;
  if (parseURL.indexOf("admin") !== -1) {
    $("body").innerHTML = await admin.render();
    $("#admin-content").innerHTML = await page.render();
    $("#action-admin").innerHTML = await comp.render();
    if (parseURL.indexOf("product") !== -1) page.afterRender();
    await comp.afterRender();
  } else {
    $("body").innerHTML = await main.render();
    $("#header-main").innerHTML = await header.render();
    await header.afterRender();
    $("#footer-main").innerHTML = footer.render();
    $("#main-content").innerHTML = await page.render();
    if (parseURL.indexOf("checkout") !== -1) {
      $("#checkout-action").innerHTML = await comp.render();
      await comp.afterRender();
    }
    await page.afterRender();
  }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);