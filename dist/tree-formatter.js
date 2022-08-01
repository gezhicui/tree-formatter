(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
 * @param {array<any>} tree 树(数组) 
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  treeToFlat,
  flatToTree,
  findParentById
});
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});