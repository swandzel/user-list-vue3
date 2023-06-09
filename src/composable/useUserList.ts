import {ref} from 'vue';
import {useRouter} from "vue-router";
import type {User} from "@/types/global";

export default function useUserList() {
    const router = useRouter();

    const userList = ref<User[]>([]);
    const filteredUserList = ref<User[]>([]);
    const totalPages = ref<number>(0);
    const currentPage = ref<number>(1);
    const searchQuery = ref<string>('');
    const firstName = ref<string>('');
    const lastName = ref<string>('');
    const avatarUrl = ref<string>('');

    async function fetchUserList(page: number) {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            const data = await response.json();
            userList.value = data.data;
            filterUsers();
            totalPages.value = data.total_pages;
            currentPage.value = data.page;
        } catch (error) {
            console.error('Something goes wrong', error);
        }
    }

    function filterUsers() {
        if (searchQuery.value === '') {
            filteredUserList.value = userList.value;
        } else {
            const query = searchQuery.value.toLowerCase();
            filteredUserList.value = userList.value.filter((user) => {
                const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                return fullName.includes(query);
            });
        }
    }

    function onPageChange(page: number) {
        fetchUserList(page);
        router.push(`/?page=${page}`);
    }

    async function deleteUser(userId: number) {
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const index = userList.value.findIndex((u) => u.id === userId);
                userList.value.splice(index, 1);
                filterUsers();
            } else {
                alert('Something goes wrong with deleting user');
            }
        } catch (error) {
            console.error('Something goes wrong', error);
        }
    }

    async function addUser() {
        try {
            const response = await fetch('https://reqres.in/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName.value,
                    last_name: lastName.value,
                    avatar: avatarUrl.value,
                }),
            });

            if (response.ok) {
                alert(`User ${firstName.value} ${lastName.value} has been added`)
                router.push('/');
            } else {
                alert('Something goes wrong with adding user');
            }
        } catch (error) {
            console.error('Something goes wrong', error);
        }
    }

    async function fetchUser(userId: string) {
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`);
            const {data} = await response.json();
            firstName.value = data.first_name;
            lastName.value = data.last_name;
            avatarUrl.value = data.avatar;
        } catch (error) {
            console.error('Something goes wrong', error);
        }
    }

    async function editUser(userId: string) {
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName.value,
                    last_name: lastName.value,
                    avatar: avatarUrl.value,
                }),
            });

            if (response.ok) {
                alert(`User ${firstName.value} ${lastName.value} has been updated`);
                router.push('/');
            } else {
                alert('Something goes wrong');
            }
        } catch (error) {
            console.error('Something goes wrong', error);
        }
    }

    return {
        userList,
        filteredUserList,
        totalPages,
        currentPage,
        searchQuery,
        filterUsers,
        fetchUserList,
        onPageChange,
        deleteUser,
        addUser,
        firstName,
        lastName,
        avatarUrl,
        fetchUser,
        editUser,
    };
}