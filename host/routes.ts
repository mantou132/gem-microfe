import { html, history } from '@mantou/gem';

import { RouteItem } from '@mantou/gem/elements/route';
import '@mantou/gem/elements/title';

if (process.env.NODE_ENV !== 'development') {
  history.basePath = '/gem-microfe/dist/host';
}

function once(fn: Function) {
  let e = false;
  return function(...rest: any[]) {
    if (!e) {
      fn(...rest);
      e = true;
    }
  };
}

const importAApp = once(function() {
  const script = document.createElement('script');
  script.src = '/gem-microfe/dist/app/index.js';
  document.body.append(script);
  script.remove();
});

export default [
  {
    pattern: '/',
    redirect: '/a/a',
  },
  {
    title: '页面 A',
    pattern: '/a/*',
    path: '/a/a', // 给 <link> 用的
    get content() {
      if (process.env.NODE_ENV === 'development') {
        import('../dist/app/');
        return html`
          <app-a-root></app-a-root>
        `;
      } else {
        importAApp();
        return html`
          <app-a-root></app-a-root>
        `;
      }
    },
  },
  {
    title: '页面 B',
    pattern: '/b',
    content: html`
      这是页面 B
    `,
  },
  {
    title: '页面 C',
    pattern: '/c',
    content: html`
      这是页面 C
    `,
  },
  {
    title: '页面 D',
    pattern: '/d',
    content: html`
      这是页面 D
    `,
  },
] as (RouteItem & { path: string })[];
