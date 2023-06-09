<template>
  <div>
    <h2>Add User</h2>
    <form @submit.prevent="addUser">
      <label for="first-name">First name:</label>
      <input id="first-name" v-model="firstName" required />

      <label for="last-name">Last name:</label>
      <input id="last-name" v-model="lastName" required />

      <label for="avatar">Avatar:</label>
      <input id="avatar" v-model="avatarUrl" required />

      <button type="submit">Add user</button>
    </form>
  </div>
</template>

<script setup>
import useUserList from "@/composable/useUserList";

const {
    addUser,
    firstName,
    lastName,
    avatarUrl,
} = useUserList();
</script>
