<template>
    <div class="pagination">
        <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination__button">
            <img :src='ArrowIcon'
                 alt='Next page'
                 class="pagination__button--rotate" />
        </button>
        <span>{{ currentPage }} of {{ totalPages }}</span>
        <button @click="goToNextPage" :disabled="currentPage === totalPages" class="pagination__button"><img
                :src='ArrowIcon' alt='Next page' /></button>
    </div>
</template>

<script setup lang="ts">
import {ref, defineEmits, defineProps} from 'vue';
import ArrowIcon from '../assets/arrow.png'
import type {Page} from "@/types/global";

const props = defineProps({
    totalPages: {
        type: Number,
        required: true
    }
});

const currentPage = ref<Page>(1);

const emit = defineEmits(['page-change']);

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        emit('page-change', currentPage.value);
    }
};

const goToNextPage = () => {
    if (currentPage.value < props.totalPages) {
        currentPage.value++;
        emit('page-change', currentPage.value);
    }
};
</script>

<style scoped lang='scss'>
.pagination {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.625rem;
  margin-top: 0.625rem;

  &__button {
    width: 1.25rem;
    height: 1.25rem;
    background: #fff;
    border: 1px solid rgba(117, 127, 149, 0.5);
    border-radius: 4px;
    cursor: pointer;

    &--rotate {
      transform: rotate(180deg);
    }

    img {
      width: 50%;
      height: 50%;
    }
  }
}


</style>