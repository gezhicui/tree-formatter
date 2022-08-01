# tree-formatter -- 一个操作树结构的工具函数库

在前端业务开发中，经常遇到下拉框或者级联选择器中对树结构的处理问题，本库对常见的一些场景转换进行了处理

安装：

```bash
npm i tree-formatter
或
yarn add tree-formatter
或
pnpm i tree-formatter

```

# 使用：

esm 规范：

```js
import { treeToFlat, flatToTree, findParentById } from 'tree-formatter';
```

cjs 规范：

```js
const {treeToFlat, flatToTree,findParentById  } = require('tree-formatter')
`
```

# 方法介绍

假设我们现在有两种格式数据如下：

```js
// 树结构
const tree = [
  {
    id: '1',
    value: '我是1',
    pid: '0',
    children: [
      {
        id: '1-1',
        value: '我是1-1',
        pid: '1',
        children: [
          {
            id: '1-1-1',
            value: '我是1-1-1',
            pid: '1-1',
            children: [],
          },
        ],
      },
      {
        id: '1-2',
        value: '我是1-2',
        pid: '1',
        children: [],
      },
    ],
  },
  {
    id: '2',
    value: '我是2',
    pid: '0',
    children: [],
  },
];

// 扁平树结构

const flat = [
  { id: '1', value: '我是1', pid: '0' },
  { id: '1-1', value: '我是1-1', pid: '1' },
  { id: '1-1-1', value: '我是1-1-1', pid: '1-1' },
  { id: '1-2', value: '我是1-2', pid: '1' },
  { id: '2', value: '我是2', pid: '0' },
];
```

## treeToFlat

该方法把树转扁平数组 即传入示例结构中的`tree`，返回`flat`

入参：

|        | 描述                             | 类型   | 默认值   | 是否必传 |
| ------ | -------------------------------- | ------ | -------- | -------- |
| 参数 1 | 树结构数据                       | array  | -        | 是       |
| 参数 2 | 传入的树结构数据中的子节点属性名 | string | children | 否       |

使用：

```js
//tree为示例数据结构中的tree
const res = treeToFlat(tree, 'children');
console.log(res); //输出结果为示例结构中的flat

const tree2 = [
  {
    nodeCode: '1',
    value: '我是1',
    nodeParent: '0',
    child: [
      {
        nodeCode: '1-1',
        value: '我是1-1',
        nodeParent: '1',
      },
    ],
  },
];
const res = treeToFlat(tree2, 'child');
console.log(res);
//输出结果
// [
//   { nodeCode: '1', value: '我是1', nodeParent: '0', child: [ [Object] ] },
//   { nodeCode: '1-1', value: '我是1-1', nodeParent: '1' }
// ]
```

## flatToTree

该方法把扁平数组转树 即传入示例结构中的`flat`，返回`tree`

|        | 描述                                                   | 类型   | 默认值                                      | 是否必传 |
| ------ | ------------------------------------------------------ | ------ | ------------------------------------------- | -------- |
| 参数 1 | 扁平数组                                               | array  | -                                           | 是       |
| 参数 2 | id:节点标识,pid:父节点标识,children:生成的子节点属性名 | object | {id: 'id',pid: 'pid',children: 'children',} | 否       |

使用：

```js
//flat为示例结构中的flat
const res1 = flatToTree(flat, {
  id: 'id',
  pid: 'pid',
  children: 'children',
});

console.log(res1); //输出结果为示例结构中的tree

const flat2 = [
  { nodeCode: '1', value: '我是1', nodeParent: '0' },
  { nodeCode: '1-1', value: '我是1-1', nodeParent: '1' },
];

const res2 = flatToTree(flat2, {
  id: 'nodeCode',
  pid: 'nodeParent',
  children: 'child',
});

console.log(res2);
// 输出结果：
// [
//   {
//     nodeCode: '1',
//     value: '我是1',
//     nodeParent: '0',
//     child: [
//       {
//         nodeCode: '1-1',
//         value: '我是1-1',
//         nodeParent: '1',
//       },
//     ],
//   }
// ];
```

## findParentById

该方法用于查找树的某个节点的祖先列表

|        | 描述                                       | 类型             | 默认值 | 是否必传 |
| ------ | ------------------------------------------ | ---------------- | ------ | -------- |
| 参数 1 | 树结构数据                                 | array            | -      | 是       |
| 参数 2 | 要查找的节点（节点唯一标识的值，如 id 值） | string 或 number |        | 是       |
| 参数 3 | 节点唯一标识字段名                         | string 或 number | id     | 否       |

使用：

```js
//flat为示例结构中的flat
const res = findParentById(tree, '1-1-1');
//输出结果
//[ '1', '1-1', '1-1-1' ]
```
