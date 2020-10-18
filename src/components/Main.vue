<template>
    <div>
        <div class="main-page">
            <h1> BirthCake </h1>
            <p> Keep all the birthdays in one place </p>
        </div>
        <div class="img-wrap">
            <img alt="birthday" src="../assets/images/birthday.png"> 
        </div>
        <div class="main-button">
            <router-link to="/login" tag="button" class="button btn-colour">Login</router-link>
            <router-link to="/signup" tag="button" class="button btn-light-colour">Sign up</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem;
    text-align: left;
}
.main-page h1 {
    font-family: 'Maven Pro', sans-serif;
    font-size: 2.5rem;
}
.img-wrap img { 
    height: 80%;
    width: 80%;
}
.main-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
}
.btn-colour {
    margin: 2rem 0 0.5rem 0;
    background-color: #3a5184;
    color: #fff;
}
.btn-light-colour {
   background-color: #f2eee8; 
}
</style> 