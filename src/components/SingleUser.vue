<template>
    <li class='user'>
        <div class='user__image__wrapper'>
            <img :src="user.avatar" :alt="`${user.first_name} ${user.last_name}`"
                 class='user__image'>
        </div>
        <span class='user__name'>{{ user.first_name }} {{ user.last_name }}</span>
        <div class='user__action'>
            <router-link :to="`/edit/${user.id}`" class='user__action__icon'><img :src='EditIcon' alt='Edit' /></router-link>
            <button @click="deleteUser(user.id)" class='user__action__icon'><img :src='DeleteIcon' alt='Delete' /></button>
        </div>
    </li>
</template>

<script setup lang="ts">
import useUserList from "@/composable/useUserList";
import type {User} from "@/types/global";
import EditIcon from '@/assets/edit.svg'
import DeleteIcon from '@/assets/delete.svg'

defineProps({
    user: {
        type: Object as () => User,
        required: true
    }
});

const {
    deleteUser,
} = useUserList();
</script>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;
  list-style: none;
  width: 100%;
  padding: 1rem;

  &:nth-child(even) {
    background: #f6f8f9;
  }

  &__image {
    border-radius: 50%;
    width: 3.125rem;
    height: 3.125rem;

    &__wrapper {
      width: 6.25rem;
    }
  }

  &__name {
    width: 100%;
    font-weight: bold;
  }

  &__action {
    display: flex;
      gap: 10px;
    width: 6.25rem;

      &__icon {
          background: transparent;
          border: 0;
          width: 1.5625rem;
          height: 1.5625rem;

          img {
              width: 100%;
              height: 100%;
          }
      }
  }
}
</style>