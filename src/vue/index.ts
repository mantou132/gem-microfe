import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './Home.vue';
import About from './About.vue';

Vue.use(VueRouter);

new Vue({
  router: new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/v/a',
        name: 'home',
        component: Home,
      },
      {
        path: '/v/b',
        name: 'about',
        component: About,
      },
    ],
  }),
  render: h => h(App),
}).$mount(document.body.appendChild(document.createElement('div')));
