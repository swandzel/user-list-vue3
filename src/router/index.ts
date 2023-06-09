import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/UserList.vue'
import AddEditUser from '../views/AddEditUser.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: UserList },
    {
      path: '/add',
      component: AddEditUser,
      props: { isEditing: false }
    },
    {
      path: '/edit/:id',
      component: AddEditUser,
      props: () => ({ isEditing: true})
    }
  ]
});

export default router
