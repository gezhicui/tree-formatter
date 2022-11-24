type fieldType = string | number;

// 树结构节点对象
interface TreeItem {
  [propName: string]: string | number | Array<any>;
}

// 树转扁平数组配置对象
interface FieldOptions {
  childField?: string;
  returnFields?: string[];
}

//自定义属性名配置对象
interface FieldNames {
  id?: fieldType;
  pid?: fieldType;
  children?: string;
}

interface DataMap {
  [datakey: fieldType]: TreeItem;
}

/**
 * 树转扁平数组
 * @param {Array<TreeItem>} tree 树(数组)
 * @param {FieldOptions} fieldOptions 自定义节点children 的字段以及返回内容
 * @returns 返回树扁平后的数组
 */

export const treeToFlat = (tree: TreeItem[], fieldOptions?: FieldOptions): TreeItem[] => {
  const attr = {
    childField: 'children',
    returnFields: [],
    ...fieldOptions,
  };
  const { childField = 'children', returnFields = [] } = attr;
  var resultList: TreeItem[] = [];
  function flatTree(data: TreeItem[]) {
    data.forEach((item: TreeItem) => {
      if (Array.isArray(returnFields) && returnFields.length !== 0) {
        //返回自定义内容
        const filterItem: TreeItem = {};
        returnFields.forEach(label => (filterItem[label] = item[label]));
        resultList.push(filterItem);
      } else {
        //返回全部内容
        resultList.push(item);
      }

      if ((item[childField] as TreeItem[])?.length) {
        flatTree(item[childField] as TreeItem[]);
      }
    });
  }
  flatTree(tree);
  return resultList;
};

/**
 * 扁平数组转树
 * @param {Array<TreeItem>} data 扁平数组
 * @param {FieldNames} fieldNames 	自定义节点 id、pid、children 的字段
 * @returns {Array<TreeItem>} 返回树结构
 * */
export const flatToTree = (data: TreeItem[], fieldNames?: FieldNames) => {
  const attr = {
    id: 'id',
    pid: 'pid',
    children: 'children',
    ...fieldNames,
  };
  const { id, pid, children } = attr;
  const map: DataMap = {};
  data.forEach(item => {
    map[item[id] as fieldType] = item;
  });
  const result: TreeItem[] = [];
  data.forEach(item => {
    var parent = map[item[pid] as fieldType];
    if (parent) {
      ((parent[children] || (parent[children] = [])) as TreeItem[]).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

/**
 * 查找树的某个节点的祖先列表
 * @param {Array<TreeItem>} tree 树(数组)
 * @param {string | number} nodeId 字段名对应的要查找的值
 * @param {FieldNames} fieldNames 	自定义节点 id、children 的字段
 * @returns {Array<TreeItem>} 返回祖先列表
 * */
export const findTreeParentById = (
  tree: TreeItem[],
  nodeId: fieldType,
  fieldNames?: FieldNames
) => {
  const attr = {
    id: 'id',
    children: 'children',
    ...fieldNames,
  };
  const { id, children } = attr;
  const parentArr: fieldType[] = [];
  try {
    const findParent = (treeData: TreeItem[]) => {
      treeData.forEach(item => {
        parentArr.push(item[id] as fieldType);
        if (item[id] === nodeId) {
          throw '';
        } else {
          if (item[children]) {
            findParent(item[children] as TreeItem[]);
          }
          parentArr.pop();
        }
      });
    };
    findParent(tree);
  } catch (error) {}
  return parentArr;
};

/**
 * 查找扁平树的某个节点的祖先列表
 * @param {Array<TreeItem>} data 扁平数组
 * @param {string | number} nodeId 字段名对应的要查找的值
 * @param {FieldNames} fieldNames 	自定义节点 id、pid的字段
 * @returns {Array<TreeItem>} 返回祖先列表
 **/

export const findFlatParentById = (
  data: TreeItem[],
  nodeId: fieldType,
  fieldNames?: FieldNames
) => {
  const attr = {
    id: 'id',
    pid: 'pid',
    ...fieldNames,
  };
  const { id, pid } = attr;
  const parentArr: fieldType[] = [];
  let curId = nodeId;

  while (curId) {
    const curItem = data.find(item => item[id] == curId);
    if (curItem) {
      curId = curItem[pid] as fieldType;
      parentArr.unshift(curItem[id] as fieldType);
    } else {
      return parentArr;
    }
  }
};
