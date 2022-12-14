import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Home from "../pages/Home.vue"
import CategoryList from "../pages/category/index.vue"
import CreateCategory from "../pages/category/create.vue"
import EditCategory from '../pages/category/edit.vue'
//product
import ProductList from "../pages/product/index.vue"
import CreateProduct from "../pages/product/create.vue"
import EditProduct from '../pages/product/edit.vue'

const routes = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
        },
        {
            path: '/category',
            component: CategoryList,
            name: 'category-list',
        },
        {
            path: '/category/create',
            component: CreateCategory,
            name: 'create-category',
        },
        {
            path: '/category/edit/:id',
            component: EditCategory,
            name: 'edit-category',
        },
        {
            path: '/product',
            component: ProductList,
            name: 'product-list',
        },
        {
            path: '/product/create',
            component: CreateProduct,
            name: 'create-product',
        },
        {
            path: '/product/edit/:id',
            component: EditProduct,
            name: 'edit-product',
        }
    ]
});


export default routes;
