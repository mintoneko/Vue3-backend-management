import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/Main.vue"),
    redirect: "/user",
    children: [
      {
        // 注意这里不要有/
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "user",
        name: "User",
        component: () => import("../views/User.vue"),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
