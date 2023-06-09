import {ref} from 'vue';
import {useRouter} from "vue-router";
import type {Avatar, First_Name, Id, Last_Name, Page, User} from "@/types/global";

export default function useUserList() {
    const router = useRouter();

    const userList = ref<User[]>([]);
    const filteredUserList = ref<User[]>([]);
    const totalPages = ref<Page>(0);
    const currentPage = ref<Page>(1);
    const searchQuery = ref<string>('');
    const firstName = ref<First_Name>('');
    const lastName = ref<Last_Name>('');
    const avatarUrl = ref<Avatar>('');

    async function fetchUserList(page: Page) {
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

    function onPageChange(page: Page) {
        fetchUserList(page);
        router.push(`/?page=${page}`);
    }

    async function deleteUser(userId: Id) {
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert(`User ${userId} deleted`);
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

    async function fetchUser(userId: Id) {
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

    async function editUser(userId: Id) {
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