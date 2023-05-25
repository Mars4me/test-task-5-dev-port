<template>
    <div class="wrapper">
      <h2>{{getCurrentUser.name}}</h2>
      <div class="container">
        <button @click="clickMe">PressMe</button>
       
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'UserPage',
    data() {
      return {

      };
    },
    methods: {
      ...mapActions(['initialCurrentUser']),
      clickMe() {
        this.$forceUpdate()
        console.log(this.getCurrentUser)
      }
     
    },
    computed: {
      ...mapGetters(['getCurrentUser'])
    },
    async mounted() {
      try {
        this.initialCurrentUser()
      } catch (error) {
        console.log(error)
      }
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
    background-color: #A5A5A5;
  }
  
  .container {
    padding: 15px 25px 30px;
    background-color: #C4C4C4;
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
  