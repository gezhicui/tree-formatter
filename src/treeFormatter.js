/** 
  * 树转扁平数组
  * @param {Array<any>} tree 树(数组) 
  * @param {string} childLabel 子节点属性名，默认 children
  * @returns 返回树扁平后的数组
  */
const treeToFlat = (tree, childLabel = 'children') => {
  var resultList = [];
  function flatTree(data) {
    data.forEach(item => {
      resultList.push(item)
      if (item[childLabel]?.length) {
        flatTree(item[childLabel]);
      }
    });
  }
  flatTree(tree)
  return resultList
}

/** 
 * 扁平数组转树
 * @param {array<any>} data 扁平数组
 * @param {object} fieldNames 	自定义节点 id、pid、children 的字段
 * @returns {array<any>} 返回树结构
 * */
const flatToTree = (data, fieldNames) => {
  const attr = {
    id: 'id',
    pid: 'pid',
    children: 'children',
    ...fieldNames
  }
  var map = {}
  data.forEach(item => {
    map[item[attr.id]] = item
  })
  var result = []
  data.forEach(item => {
    var parent = map[item[attr.pid]]
    if (parent) {
      (parent[attr.children] || (parent[attr.children] = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/** 
 * 查找树的某个节点的祖先列表
 * @param {Array<any>} tree 树(数组) 
 * @param {string | number} nodeId 字段名对应的要查找的值
 * @param {string} idLabel 节点唯一标识字段名,默认为id
 * @returns {Array<any>} 返回祖先列表
 * */
const findParentById = (tree, nodeId, idLabel = 'id') => {
  const parentArr = []
  try {
    const findParent = (treeData) => {
      treeData.forEach(item => {
        parentArr.push(item[idLabel])
        if (item[idLabel] === nodeId) {
          throw ''
        } else {
          if (item.children) {
            findParent(item.children)
          }
          parentArr.pop()
        }
      })
    }
    findParent(tree)
  } catch (error) {
  }
  return parentArr
}
export default {
  treeToFlat,
  flatToTree,
  findParentById
}