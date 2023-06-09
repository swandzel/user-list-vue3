<template>
    <div class="pagination">
        <button @click="goToPreviousPage" :disabled="currentPage === 1">Poprzednia strona</button>
        <span>Strona {{ currentPage }} z {{ totalPages }}</span>
        <button @click="goToNextPage" :disabled="currentPage === totalPages">Następna strona</button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
    totalPages: {
        type: Number,
        required: true
    }
});

const currentPage = ref<number>(1);

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

<style>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    margin: 0 5px;
}
</style>