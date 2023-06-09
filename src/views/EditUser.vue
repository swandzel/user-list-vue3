<template>
    <div class='edit-user'>
        <h2 class='edit-user__title'>Edit User</h2>
        <form @submit.prevent="editUser(userId)" class='edit-user__form'>
            <div class='edit-user__form__name'>
                <div class='edit-user__form__name__item__inputs'>
                    <div class='edit-user__form__name__item'>
                        <label for="first-name">First name:</label>
                        <input id="first-name" v-model="firstName" required />
                    </div>
                    <div class='edit-user__form__name__item'>
                        <label for="last-name">Last name:</label>
                        <input id="last-name" v-model="lastName" required />
                    </div>
                </div>

                <button type="submit" class='edit-user__form__name__button'>Save user</button>
            </div>
            <div class='edit-user__form__avatar'>
                <img :src='avatarUrl' alt='User photo' />
                <label for="avatar">Avatar:</label>
                <input id="avatar" v-model="avatarUrl" required />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
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

<style scoped lang="scss">
.edit-user {
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

  &__form {
    display: flex;
    height: 500px;
    gap: 20px;


    &__name {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #fff;
      height: 100%;
      padding: 2rem 1.5rem;
      box-shadow: 0 0 1.6875rem 0 rgba(66, 68, 90, 0.1);
      border-radius: 4px;
      flex: 2;
      gap: 1.25rem;

      &__item {
        display: flex;
        flex-direction: column;

        &__inputs {
          display: flex;
          gap: 0.625rem
        }

        label {
          margin-bottom: 0.625rem;
          font-weight: bold;
        }

        input {
          border-radius: 4px;
          border: 1px solid black;
          width: 20rem;
          padding: 1rem;
        }
      }

      &__button {
        background: #459671;
        color: #fff;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        text-decoration: none;
        user-select: none;
        width: 12.5rem;
      }
    }

    &__avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      height: 100%;
      padding: 2rem 1.5rem;
      box-shadow: 0 0 1.6875rem 0 rgba(66, 68, 90, 0.1);
      border-radius: 4px;
      flex: 1;

      img {
        width: 18.75rem;
        height: 18.75rem;
        border-radius: 50%;
      }
    }
  }
}
</style>