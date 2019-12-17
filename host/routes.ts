import { html, history } from '@mantou/gem';

import { RouteItem } from '@mantou/gem/elements/route';
import '@mantou/gem/elements/title';
import 'gem-frame';

if (process.env.NODE_ENV !== 'development') {
  history.basePath = '/gem-microfe/dist/host';
}

export default [
  {
    pattern: '/',
    redirect: '/a/a',
  },
  {
    title: '页面 A',
    pattern: '/a/*',
    path: '/a/a', // 给 <link> 用的
    content: html`
      <gem-frame tag="app-a-root" src="https://mantou132.github.io/gem-microfe/dist/app/index.js"></gem-frame>
    `,
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
