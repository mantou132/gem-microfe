import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactRouter from 'react-router'
import * as Vue from 'vue'
import * as Gem from '@mantou/gem';
import { html } from '@mantou/gem';

import { RouteItem } from '@mantou/gem/elements/route';
import '@mantou/gem/elements/title';
import 'gem-frame';

// https://github.com/mantou132/gem-frame/issues/11
const context = {
  Gem,
  React,
  ReactDOM,
  ReactRouter,
  Vue,
}

export default [
  {
    pattern: '/',
    redirect: '/r',
  },
  {
    title: '页面 A',
    pattern: '/a/*',
    path: '/a/a', // 给 <link> 用的
    // 不能使用 basepath，因为 history 共用
    // 必须使用 keep-alive，因为不能重复定义自定义元素
    content: html`
      <gem-frame keep-alive="on" src="/app/" .context=${context} @error=${console.log}></gem-frame>
    `,
  },
  {
    title: 'React',
    pattern: '/r/*',
    path: '/r', // 给 <link> 用的
    content: html`
      <gem-frame keep-alive="on" basepath="/r" src="/react/" .context=${context} @error=${console.log}></gem-frame>
    `,
  },
  {
    title: 'Vue',
    pattern: '/v/*',
    path: '/v', // 给 <link> 用的
    content: html`
      <gem-frame keep-alive="on" basepath="/v" src="/vue/" .context=${context} @error=${console.log}></gem-frame>
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
