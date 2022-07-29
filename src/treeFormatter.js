/** 
  * 树转扁平数组
  * @param {Array<any>} tree 树(数组) 
  * @returns 返回树扁平后的数组
  */
const treeToFlat = (tree) => {
  var resultList = [];
  function flatTree(data) {
    data.forEach(item => {
      resultList.push(item)
      if (item.children?.length) {
        flatTree(item.children);
      }
    });
  }
  flatTree(tree)
  return resultList
}

/** 
 * 扁平数组转树
 * @param {Array<any>} tree 树(数组) 
 * @param {string} id (节点唯一标识字段名，默认id) 
 * @param {string} pid (节点的父节点唯一标识字段名，默认pId)
 * @param {string} children (子节点字段名)
 * @returns {Array<any>} 返回树结构
 * */
const flatToTree = (data, id = 'id', pid = 'pid', children = 'children') => {
  var map = {}
  data.forEach(item => {
    map[item[id]] = item
  })
  var result = []
  data.forEach(item => {
    var parent = map[item[pid]]
    if (parent) {
      (parent[children] || (parent[children] = [])).push(item)
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