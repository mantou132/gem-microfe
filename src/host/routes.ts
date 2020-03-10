import { html } from '@mantou/gem';

import { RouteItem } from '@mantou/gem/elements/route';
import '@mantou/gem/elements/title';
import 'gem-frame';

export default [
  {
    pattern: '/',
    redirect: '/r',
  },
  {
    title: '页面 A',
    pattern: '/a/*',
    path: '/a/a', // 给 <link> 用的
    get content() {
      // @ts-ignore
      import(/* webpackIgnore: true */ '/app/main.js');
      return html`
        <app-a-root></app-a-root>
      `;
    },
  },
  {
    title: 'React',
    pattern: '/r/*',
    path: '/r', // 给 <link> 用的
    content: html`
      <gem-frame keep-alive="on" basepath="/r" src="/react/" @error=${console.log}></gem-frame>
    `,
  },
  {
    title: 'Vue',
    pattern: '/v/*',
    path: '/v', // 给 <link> 用的
    content: html`
      <gem-frame keep-alive="on" basepath="/v" src="/vue/" @error=${console.log}></gem-frame>
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
