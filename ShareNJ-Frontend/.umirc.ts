import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash'
  },
  routes: [
    { path: '/', exact: true, redirect: '/login' },
    { path: '/login', exact: true, component: '@/pages/login' },
    {
      path: '/user',
      component: '@/layouts/UserHeader',
      routes: [
        { exact: true, path: '/user/userHome', component: '@/pages/userHome' },
        { exact: true, path: '/user/productList', component: '@/pages/userSide/productList' },
        { exact: true, path: '/user/productList/productDetail', component: '@/pages/userSide/productDetail' },
        { exact: true, path: '/user/userDemand', component: '@/pages/userDemand' },
        { exact: true, path: '/user/machineInfo', component: '@/pages/machineInfo' },
      ]
    },
    {
      path: '/offer',
      component: '@/layouts/OfferHeader',
      routes: [
        { exact: true, path: '/offer/offerHome', component: '@/pages/offerSide/offerHome' },
        { exact: true, path: '/offer/productList', component: '@/pages/offerSide/productList' },
        { exact: true, path: '/offer/userDemand', component: '@/pages/offerSide/userDemand' },
        { exact: true, path: '/offer/machineInfo', component: '@/pages/offerSide/machineInfo' },
      ]
    },
    {
      path: '/deliver',
      component: '@/layouts/DeliverHeader',
      routes: [
        { exact: true, path: '/deliver/deliverHome', component: '@/pages/deliverSide/deliverHome' },
        { exact: true, path: '/deliver/myAllDeliverTask', component: '@/pages/deliverSide/myAllDeliverTask' },
      ]
    },
    {
      path: '/admin',
      component: '@/layouts/AdminHeader',
      routes: [
        { exact: true, path: '/admin/adminHome', component: '@/pages/adminSide/adminHome' },
        { exact: true, path: '/admin/product', component: '@/pages/adminSide/productManager' },
        { exact: true, path: '/admin/transaction', component: '@/pages/adminSide/transactionManager' },
      ]
    }
  ],
});
