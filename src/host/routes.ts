import { html } from '@mantou/gem';

import { RouteItem } from '@mantou/gem/elements/route';
import '@mantou/gem/elements/title';
import 'gem-frame';

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
      <gem-frame tag="app-a-root" src="/app/"></gem-frame>
    `,
  },
  {
    title: 'React',
    pattern: '/r/*',
    path: '/r/a', // 给 <link> 用的
    content: html`
      <gem-frame src="/react/"></gem-frame>
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
