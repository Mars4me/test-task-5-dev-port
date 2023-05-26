<template>
    <div class="wrapper">
        <h2>Sign in</h2>
        <div class="container">
            <form @submit.prevent="login">
                <p v-if="loginError">Oh no, login error.</p>
                <p v-else>Please enter your credentials</p>
                <div class="form-group">
                    <input
                        type="text"
                        id="username"
                        required
                        placeholder="Username"
                        v-model="username"
                        @keypress="handleInput"
                    />
                    <p v-if="usernameError" class="error-message">Username should only contain letters.</p>
                </div>
                <div class="form-group last-form-item">
                    <input
                        type="text"
                        id="phoneNumber"
                        @keypress="handleInput"
                        required
                        v-model="phoneNumber"
                        placeholder="Phone Number"
                    />
                    <p v-if="phoneNumberError" class="error-message">
                        Phone number should only contain digits and (+-.,:;).
                    </p>
                </div>
                <div class="button-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validation } from '@/utils/validation';
export default {
    data() {
        return {
            username: '',
            phoneNumber: '',
            usernameError: false,
            phoneNumberError: false,
            loginError: false,
        };
    },
    methods: {
        ...mapActions(['initialUsers']),
        login() {
            const user = this.fakeLogin();

            if (!user) {
                this.loginError = true;
                return;
            }
            localStorage.setItem('user', JSON.stringify(user));
            this.$router.push('/');
        },
        handleInput(event) {
            const { id } = event.target;
            const keyPressed = event.key;

            if (!validation(keyPressed, id)) {
                this[`${id}Error`] = true;

                event.preventDefault();
            } else {
                this[`${id}Error`] = false;
            }
        },
        fakeLogin() {
            return this.getUsers.find((el) => el.name === this.username && el.phone === this.phoneNumber);
        },
    },
    computed: {
        ...mapGetters(['getUsers']),
    },
    mounted() {
        this.initialUsers();
    },
};
</script>

<style scoped>
h2 {
    text-align: center;
    padding: 15px 0;
}

.wrapper {
    margin: 0 auto;
    flex-basis: 447px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #a5a5a5;
}

.container {
    padding: 15px 25px 30px;
    background-color: #c4c4c4;
}

form p {
    margin-bottom: 14px;
}
.form-group {
    position: relative;
    padding-bottom: 20px;
}
.last-form-item {
    padding-bottom: 25px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 5px;
}

.error-message {
    position: absolute;
    top: -14px;
    left: 5px;
    color: red;
    font-size: 12px;
}

.button-container {
    text-align: center;
}

.button-container button {
    width: 100%;
    padding: 10px 30px;
    color: white;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.025em;
    background-color: #519945;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
</style>
