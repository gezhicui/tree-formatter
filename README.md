# tree-formatter -- 一个操作树结构的工具函数库

git 地址：https://github.com/gezhicui/tree-formatter

**此库比较简单，适合初学者一起开发，欢迎交流提交 issue 或者 pr**

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
import { treeToFlat, flatToTree, findTreeParentById, findFlatParentById } from 'tree-formatter';
```

cjs 规范：

```js
const {treeToFlat, flatToTree,findTreeParentById,findFlatParentById  } = require('tree-formatter')
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

该方法把树转扁平数组 即传入示例结构中的`tree`，返回实例结构的`flat`

### 入参：

|        | 描述                                               | 类型         | 默认值                                    | 是否必传 |
| ------ | -------------------------------------------------- | ------------ | ----------------------------------------- | -------- |
| 参数 1 | 树结构数据                                         | array        | -                                         | 是       |
| 参数 2 | 配置项，可选择结构中 children 字段和自定义返回字段 | fieldOptions | {childField: 'children',returnFields: []} | 否       |

**fieldOptions**

|              | 描述                                                | 类型     | 默认值     | 是否必传 |
| ------------ | --------------------------------------------------- | -------- | ---------- | -------- |
| childField   | 树的子节点字段名                                    | string   | 'children' | 否       |
| returnFields | 返回的扁平结构中包含的字段,不传或传空则返回全部字段 | string[] | []         | 否       |

### 使用：

#### 示例 1

如果要处理的树结构中，子节点数组字段为`'children'`,同时想要返回全部字段，则与默认值一样,不需要传递`fieldOptions`

```js
const res = treeToFlat(tree); //tree为示例数据结构中的树结构tree
console.log(res);
```

输出结果为

```
[
  { id: '1', value: '我是1', pid: '0', children: [ [Object], [Object] ] },
  { id: '1-1', value: '我是1-1', pid: '1', children: [ [Object] ] },
  { id: '1-1-1', value: '我是1-1-1', pid: '1-1', children: [] },
  { id: '1-2', value: '我是1-2', pid: '1', children: [] },
  { id: '2', value: '我是2', pid: '0', children: [] }
]
```

#### 示例 2

如果要处理的树结构中，子节点的字段不为`children`，则可以自定义`childField`,

或者可以用`fieldOptions`来指定返回内容

```js
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
const fieldOptions = {
  childField: 'child',
  returnFields: ['nodeCode', 'value'],
};
const res = treeToFlat(tree2, fieldOptions);
console.log(res);
```

输出结果为

```
<!-- 指定了返回内容，只返回nodeCode和value，nodeparent和child不返回 -->
[
  { nodeCode: '1', value: '我是1' },
  { nodeCode: '1-1', value: '我是1-1' }
]
```

## flatToTree

该方法把扁平数组转树 即传入示例结构中的`flat`，返回`tree`

|        | 描述             | 类型       | 默认值                                     | 是否必传 |
| ------ | ---------------- | ---------- | ------------------------------------------ | -------- |
| 参数 1 | 扁平数组         | array      | -                                          | 是       |
| 参数 2 | 自定义节点字段名 | fieldNames | {id: 'id',pid: 'pid',children: 'children'} | 否       |

**fieldNames**

|          | 描述                 | 类型   | 默认值     | 是否必传 |
| -------- | -------------------- | ------ | ---------- | -------- |
| id       | 节点唯一标识         | string | 'id'       | 否       |
| pid      | 节点的父节点唯一标识 | string | 'pid'      | 否       |
| children | 生成的子节点字段名   | string | 'children' | 否       |

### 使用：

#### 示例 1

如果要处理的树结构中，唯一标识字段为`'id'`,父标识字段为`'pid'`,要生成的子节点字段为`'children'`，则与默认值一样，不需要传递`fieldNames`

```js
//flat为示例结构中的flat
const res1 = flatToTree(flat);

console.log(res1); //输出结果为示例结构中的tree
```

#### 示例 2

可以告诉函数所传入的结构中的唯一标识字段名、父标识字段名、子节点字段名

```js
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
```

输出结果为

```
 [
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
   }
 ];
```

## findTreeParentById

该方法用于查找树结构的某个节点的祖先列表

|        | 描述                                       | 类型             | 默认值                            | 是否必传 |
| ------ | ------------------------------------------ | ---------------- | --------------------------------- | -------- |
| 参数 1 | 树结构数据                                 | array            | -                                 | 是       |
| 参数 2 | 要查找的节点（节点唯一标识的值，如 id 值） | string 或 number |                                   | 是       |
| 参数 3 | 自定义节点字段名                           | fieldNames       | {id: 'id', children: 'children' } | 否       |

**fieldNames**

|          | 描述               | 类型   | 默认值     | 是否必传 |
| -------- | ------------------ | ------ | ---------- | -------- |
| id       | 节点唯一标识字段名 | string | 'id'       | 否       |
| children | 子节点字段名       | string | 'children' | 否       |

#### 使用：

#### 示例 1

如果要处理的扁平树结构中，唯一标识字段为`'id'`,子节点字段名`'children'`,则与默认值一样，不需要传递`fieldNames`

```js
//tree为示例结构中的tree
const res = findTreeParentById(tree, '1-1-1');
```

输出结果为:

```
[ '1', '1-1', '1-1-1' ]
```

#### 示例 2

如果结构中存在与默认值不同的字段,可以传入自定义节点字段名

```js
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
const fieldNames = {
  id: 'nodeCode',
  children: 'child',
};
const res = findTreeParentById(tree2, '1-1', fieldNames);
console.log(res);
```

输出结果为:

```
[ '1', '1-1' ]
```

## findFlatParentById

该方法用于查找扁平树结构的某个节点的祖先列表

|        | 描述                                       | 类型             | 默认值                | 是否必传 |
| ------ | ------------------------------------------ | ---------------- | --------------------- | -------- |
| 参数 1 | 扁平树结构数据                             | array            | -                     | 是       |
| 参数 2 | 要查找的节点（节点唯一标识的值，如 id 值） | string 或 number |                       | 是       |
| 参数 3 | 自定义节点字段名                           | fieldNames       | {id: 'id',pid: 'pid'} | 否       |

**fieldNames**

|     | 描述                 | 类型   | 默认值 | 是否必传 |
| --- | -------------------- | ------ | ------ | -------- |
| id  | 节点唯一标识字段名   | string | 'id'   | 否       |
| pid | 父节点唯一标识字段名 | string | 'pid'  | 否       |

#### 使用：

#### 示例 1

如果要处理的扁平树结构中，唯一标识字段为`'id'`,父标识字段为`'pid'`,则与默认值一样，不需要传递`fieldNames`

```js
//flat为示例结构中的flat
const res = findFlatParentById(flat, '1-1-1');
console.log(res);
```

输出结果为

```
[ '1', '1-1', '1-1-1' ]
```

#### 示例 2

如果结构中存在与默认值不同的字段,可以传入自定义节点字段名

```js
const flat = [
  { code: '1', value: '我是1', parentCode: '0' },
  { code: '1-1', value: '我是1-1', parentCode: '1' },
  { code: '1-1-1', value: '我是1-1-1', parentCode: '1-1' },
  { code: '1-2', value: '我是1-2', parentCode: '1' },
  { code: '2', value: '我是2', parentCode: '0' },
];

const fieldNames = {
  id: 'code',
  pid: 'parentCode',
};
const res = findFlatParentById(flat, '1-1-1', fieldNames);
console.log(res);
```

输出结果为

```
[ '1', '1-1', '1-1-1' ]
```
