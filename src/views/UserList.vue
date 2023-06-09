<template>
    <div class='user-list'>
        <h2>User List</h2>
        <div class='user-list__content'>
            <div class='user-list__header'>
                <input v-model="searchQuery" type="text" placeholder="Search for users" class="user-list__search-bar">
                <router-link to="/add" class="user-list__button">Add User</router-link>
            </div>
            <ul>
                <li v-for="user in filteredUserList" :key="user.id">
                    <img :src="user.avatar" :alt="`${user.first_name} ${user.last_name}`">
                    <span>{{ user.first_name }} {{ user.last_name }}</span>
                    <router-link :to="`/edit/${user.id}`">Edytuj</router-link>
                    <button @click="deleteUser(user)">Usuń</button>
                </li>
            </ul>
            <Pagination :total-pages="totalPages" :current-page="currentPage" @page-change="onPageChange" />
        </div>

    </div>
</template>

<script setup lang="ts">
import {onMounted, watch} from 'vue';
import Pagination from '@/components/Pagination.vue';
import useUserList from "@/composable/useUserList";

const {
    filteredUserList,
    totalPages,
    currentPage,
    searchQuery,
    fetchUserList,
    onPageChange,
    deleteUser,
    filterUsers
} = useUserList();

onMounted(() => {
    fetchUserList(currentPage.value);
});

watch(searchQuery, () => {
    filterUsers();
});
</script>

<style scoped lang="scss">
.user-list {
  width: 62.5rem;

  &__content {
    border-radius: 4px;
    background: white;
    width: 100%;
    padding: 2rem 1rem;
    box-shadow: 0 0 1.6875rem 0 rgba(66, 68, 90, 0.1);
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    background: #459671;
    color: #fff;
    border: 0;
    border-radius: 1.25rem;
    padding: 0.5rem 1rem;
    font-weight: bold;
  }
}
</style>