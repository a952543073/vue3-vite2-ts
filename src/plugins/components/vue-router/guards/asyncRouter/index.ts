/*
 * @Author: ShiJunJie
 * @Date: 2021-10-25 17:50:35
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 11:33:20
 * @Descripttion: 自动化路由
 */

import { BasicLayout, RouterView } from "/@/layouts";
const modules = import.meta.glob("/@/views/**/*.vue");

export default function getAsyncRoutes(routes: any): any[] {
  let res: {}[] = [];
  // 定义路由中需要的自定名
  const keys = ["id", "path", "name", "children", "redirect", "meta"];
  // 遍历路由数组去重组可用的路由
  // console.log(routes)
  routes.forEach((item: { component: String; children: {} }) => {
    let newItem = {};

    if (item.component) {
      // 判断 item.component 是否等于 'Layout',若是则直接替换成引入的 Layout 组件
      if (item.component === "BasicLayout") {
        newItem["component"] = BasicLayout;
      } else if (item.component === "RouterView") {
        newItem["component"] = RouterView;
      } else {
        //  item.component 不等于 'Layout',则说明它是组件路径地址，因此直接替换成路由引入的方法
        if (item.component[0] === "/") {
          item.component = item.component.substring(1);
        }
        newItem["component"] = modules[`../../views/${item.component}.vue`];
      }
    }
    for (const key in item) {
      if (keys.includes(key)) {
        newItem[key] = item[key];
        if (key === "meta") {
          newItem[key] = {
            requiresAuth: true,
            ...item[key],
            buttons: item["buttons"],
          };
        }
      }
    }
    // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
    if (newItem["children"] && newItem["children"].length) {
      newItem["children"] = getAsyncRoutes(item.children);
    }
    res.push(newItem);
  });
  // 返回处理好且可用的路由数组
  // console.log("返回处理好且可用的路由数组", res)
  return res;
}
