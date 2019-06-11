import Vue from 'vue';
import Router from 'vue-router';

// pages
import PageAdmin from '../pages/PageAdmin';
import PageEmployee from '../pages/PageEmployee'

Vue.use(Router);

export const constantRouterMap = [
    { path: '/', redirect: '/employee' },
    { path: '/employee', component: PageEmployee },
    { path: '/admin', component: PageAdmin }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

