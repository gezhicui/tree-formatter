/**
 * 树转扁平数组
 * @param {Array<any>} tree 树(数组)
 * @param {object} fieldOptions 自定义节点children 的字段以及返回内容
 * @returns 返回树扁平后的数组
 */
export const treeToFlat = (tree, fieldOptions) => {
  const attr = {
    childField: 'children',
    returnFields: [],
    ...fieldOptions,
  };
  const { childField, returnFields } = attr;
  var resultList = [];
  function flatTree(data) {
    data.forEach(item => {
      if (Array.isArray(returnFields) && returnFields.length !== 0) {
        //返回自定义内容
        const filterItem = {};
        returnFields.forEach(label => (filterItem[label] = item[label]));
        resultList.push(filterItem);
      } else {
        //返回全部内容
        resultList.push(item);
      }

      if (item[childField]?.length) {
        flatTree(item[childField]);
      }
    });
  }
  flatTree(tree);
  return resultList;
};

/**
 * 扁平数组转树
 * @param {array<any>} data 扁平数组
 * @param {object} fieldNames 	自定义节点 id、pid、children 的字段
 * @returns {array<any>} 返回树结构
 * */
export const flatToTree = (data, fieldNames) => {
  const attr = {
    id: 'id',
    pid: 'pid',
    children: 'children',
    ...fieldNames,
  };
  const { id, pid, children } = attr;
  const map = {};
  data.forEach(item => {
    map[item[id]] = item;
  });
  const result = [];
  data.forEach(item => {
    var parent = map[item[pid]];
    if (parent) {
      (parent[children] || (parent[children] = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

/**
 * 查找树的某个节点的祖先列表
 * @param {Array<any>} tree 树(数组)
 * @param {string | number} nodeId 字段名对应的要查找的值
 * @param {object} fieldNames 	自定义节点 id、children 的字段
 * @returns {Array<any>} 返回祖先列表
 * */
export const findTreeParentById = (tree, nodeId, fieldNames) => {
  const attr = {
    id: 'id',
    children: 'children',
    ...fieldNames,
  };
  const { id, children } = attr;
  const parentArr = [];
  try {
    const findParent = treeData => {
      treeData.forEach(item => {
        parentArr.push(item[id]);
        if (item[id] === nodeId) {
          throw '';
        } else {
          if (item[children]) {
            findParent(item[children]);
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
 * @param {array<any>} data 扁平数组
 * @param {string | number} nodeId 字段名对应的要查找的值
 * @param {string} fieldNames 	自定义节点 id、pid的字段
 * @returns {Array<any>} 返回祖先列表
 **/

export const findFlatParentById = (data, nodeId, fieldNames) => {
  const attr = {
    id: 'id',
    pid: 'pid',
    ...fieldNames,
  };
  const { id, pid } = attr;
  const parentArr = [];
  let curId = nodeId;

  while (curId) {
    const curItem = data.find(item => item[id] == curId);
    if (curItem) {
      curId = curItem[pid];
      parentArr.unshift(curItem[id]);
    } else {
      return parentArr;
    }
  }
};

// export default {
//   treeToFlat,
//   flatToTree,
//   findTreeParentById,
//   findFlatParentById,
// };
