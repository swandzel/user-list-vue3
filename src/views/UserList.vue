<template>
    <div>
        <h2>User List</h2>
        <router-link to="/add">Add User</router-link>
        <div class="search-bar">
            <input v-model="searchQuery" type="text" placeholder="Search for users">
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

<style scoped>
.search-bar {
    margin-bottom: 20px;
}

input {
    padding: 5px;
}
</style>