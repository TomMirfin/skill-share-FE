import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory,
} from "vue-router"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
// import Feed from "../views/Feed.vue"
import { Unsubscribe, getAuth, onAuthStateChanged } from "firebase/auth"
import ErrorPage from "../views/ErrorPage.vue"
import Success from "../views/Success.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
  {
    path: "/error",
    name: "Error",
    component: ErrorPage,
  },
  //   {
  // path: "/feed",
  // name: "Feed",
  // component: Feed,
  // meta: {
  //   requiresAuth: true,
  // },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

const getCurrentUser = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const removeListener: Unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser) {
      next()
    } else {
      alert("You don't have access!")
      next("/")
    }
  } else {
    next()
  }
})

export default router
