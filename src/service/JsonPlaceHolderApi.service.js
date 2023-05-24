import { jspApi } from '@/api/jsonplaceholder';

export class JsonPlaceholderApi {
    static async getTodos() {
        try {
            const { data } = await jspApi.get('/todos');
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUsers() {
        try {
            const { data } = await jspApi.get('/users');
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    static async addTodo(todo) {
        try {
            return await jspApi.post('/posts', todo);
        } catch (error) {
            console.log(error);
        }
    }
}
