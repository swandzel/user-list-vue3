<template>
    <div class='user-list'>
        <h2 class='user-list__title'>User List</h2>
        <div class='user-list__content'>
            <div class='user-list__header'>
                <input v-model="searchQuery" type="text" placeholder="Search for users" class="user-list__search-bar" />
                <router-link to="/add" class="user-list__button">&#43; Add User</router-link>
            </div>
            <div class='user-list__table-header'>
                <div class='user-list__table-header__image' />
                <div class='user-list__table-header__full-name'>Full name</div>
                <div class='user-list__table-header__action'>Action</div>
            </div>
            <ul class='user-list__users'>
                <SingleUser v-for="user in filteredUserList" :key="user.id" :user='user' />
            </ul>
            <Pagination :total-pages="totalPages" :current-page="currentPage" @page-change="onPageChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, watch} from 'vue';
import Pagination from '@/components/Pagination.vue';
import useUserList from "@/composable/useUserList";
import SingleUser from "@/components/SingleUser.vue";

const {
    filteredUserList,
    totalPages,
    currentPage,
    searchQuery,
    fetchUserList,
    onPageChange,
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
  margin: auto;

  @media only screen and (max-width: 1000px) {
    padding: 0 0.625rem;
    width: 100%;
  }

  &__title {
    font-size: 2rem;
    margin: 2rem 0;
  }

  &__content {
    border-radius: 4px;
    background: white;
    width: 100%;
    padding: 2rem 1.5rem;
    box-shadow: 0 0 1.6875rem 0 rgba(66, 68, 90, 0.1);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  &__search-bar {
    background: #f8f8f9;
    color: #757f95;
    border-radius: 4px;
    border: 0;
    width: 20rem;
    padding: 0 1rem;

    @media only screen and (max-width: 1000px) {
      width: 10rem;
    }
  }

  &__button {
    background: #459671;
    color: #fff;
    border: 0;
    border-radius: 1.25rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    user-select: none;
  }

  &__table-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;

    &__full-name {
      width: 100%;
      text-align: left;
      font-weight: bold;
      color: #495056;
    }

    &__image, &__action {
      color: #495056;
      font-weight: bold;
      width: 6.25rem;
    }
  }

  &__users {
    border-top: 1px solid #f8f9fb;
    padding-left: 0;
  }
}
</style>