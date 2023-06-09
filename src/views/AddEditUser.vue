<template>
    <div class="edit-user">
        <h2 class="edit-user__title">{{ formTitle }}</h2>
        <form @submit.prevent="submitForm" class="edit-user__form">
            <div class="edit-user__form__name">
                <div class="edit-user__form__name__item__inputs">
                    <div class="edit-user__form__name__item">
                        <label for="first-name">First name:</label>
                        <input id="first-name" v-model="firstName" required class="edit-user__form__input"
                               placeholder='First name' />
                    </div>
                    <div class="edit-user__form__name__item">
                        <label for="last-name">Last name:</label>
                        <input id="last-name" v-model="lastName" required class="edit-user__form__input"
                               placeholder='Last name'
                        />
                    </div>
                </div>
                <button type="submit" class="edit-user__form__name__button">
                    {{ submitButtonLabel }}
                </button>
            </div>
            <div class="edit-user__form__avatar">
                <img :src="image" alt="User photo" />
                <input id="avatar" v-model="avatarUrl" required class="edit-user__form__input"
                       placeholder='Past image link here' />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import useUserList from '@/composable/useUserList';
import PlaceholderImage from '../assets/placeholder.png'
import type {Id} from "@/types/global";

const router = useRouter();
const userId = ref<Id>(+router.currentRoute.value.params.id)

const props = defineProps({
    isEditing: Boolean
})

const {
    firstName,
    lastName,
    avatarUrl,
    fetchUser,
    editUser,
    addUser
} = useUserList();

const formTitle = computed(() => (props.isEditing ? 'Edit User' : 'Add User'));
const submitButtonLabel = computed(() => (props.isEditing ? 'Update details' : 'Add User'));
const image = computed(() => avatarUrl.value === "" ? PlaceholderImage : avatarUrl.value)

onMounted(() => {
    if (props.isEditing) {
        fetchUser(userId.value);
    }
});

const submitForm = () => {
    if (props.isEditing) {
        editUser(userId.value);
    } else {
        addUser();
    }
};
</script>

<style scoped lang="scss">
.edit-user {
  width: 62.5rem;
  margin: auto;

  @media only screen and (max-width: 1180px) {
    padding: 0 0.625rem;
    width: 100%;
  }

  &__title {
    font-size: 2rem;
    margin: 2rem 0;
  }

  &__form {
    display: flex;
    height: 31.25rem;
    gap: 1.25rem;

    @media only screen and (max-width: 1180px) {
      flex-direction: column;
    }

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
          gap: 0.625rem;

          @media only screen and (max-width: 768px) {
            flex-direction: column;
          }
        }

        label {
          margin-bottom: 0.625rem;
          font-weight: bold;
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
        cursor: pointer;
      }
    }

    &__input {
      border-radius: 4px;
      border: 1px solid black;
      width: 20rem;
      padding: 1rem;

      @media only screen and (max-width: 768px) {
        width: 100%;
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
      gap: 1.25rem;

      img {
        width: 18.75rem;
        height: 18.75rem;
        border-radius: 50%;
        object-fit: contain;
      }
    }
  }
}
</style>