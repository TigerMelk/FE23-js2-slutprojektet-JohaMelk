import { Post, User } from "./types";

const apiUrl = 'http://localhost:3000/api/users';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function fetchPerson(id) {
    
    const url = `http://localhost:3000/api/users/${id}`
    const res = await fetch(url);
    const dataPerson = await res.json();
    console.log(dataPerson);
    return dataPerson
}


async function fetchUserData(userId: string, dataType: string): Promise<Comment[] | Post[] | { message: string }> {
    try {
        const response = await fetch(`${apiUrl}/${userId}?dataType=${dataType}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
async function fetchAddUser({ user }: { user: User; }): Promise<UserWithoutPassword> {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

async function fetchDeleteUser(userId: string): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export { fetchData, fetchUserData, fetchAddUser, fetchDeleteUser, fetchPerson };

