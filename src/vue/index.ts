import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

new Vue({
  router: new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/v/a',
        name: 'home',
        component: () => import('./Home.vue'),
      },
      {
        path: '/v/b',
        name: 'about',
        component: () => import('./About.vue'),
      },
    ],
  }),
  render: h => h(App),
}).$mount(document.body.appendChild(document.createElement('div')));
