import { createRouter, createWebHistory } from 'vue-router'
import AddUser from '../views/AddUser.vue'
import UserList from '../views/UserList.vue'
import EditUser from '../views/EditUser.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: UserList },
    { path: '/add', component: AddUser },
    { path: '/edit/:id', component: EditUser }
  ]
})

export default router
