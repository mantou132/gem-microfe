import { html } from '@mantou/gem';

import { RouteItem } from '@mantou/gem/elements/route';
import '@mantou/gem/elements/title';

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
      import('../dist/app/');
      return html`
        <app-a-root></app-a-root>
      `;
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
