<template>
    <div>
        <h2>Edit User</h2>
        <form @submit.prevent="editUser(userId)">
            <label for="first-name">First name:</label>
            <input id="first-name" v-model="firstName" required />

            <label for="last-name">Last name:</label>
            <input id="last-name" v-model="lastName" required />

            <label for="avatar">Avatar:</label>
            <input id="avatar" v-model="avatarUrl" required />

            <button type="submit">Save user</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserList from "@/composable/useUserList";

const router = useRouter();
const userId = ref<string>(`${router.currentRoute.value.params.id}`);

const {
    firstName,
    lastName,
    avatarUrl,
    fetchUser,
    editUser,
} = useUserList();
onMounted(() => fetchUser(userId.value))

</script>