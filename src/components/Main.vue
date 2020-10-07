<template>
    <div>
        <div class="main-page">
            <h1> BirthCake </h1>
            <p> Keep all the birthdays in one place </p>
        </div>
        <div class="img-wrap">
            <img alt="birthday" src="../assets/images/birthday.svg"> 
        </div>
        <div class="main-button">
            <button class="button button-colour"><router-link to="/login">Login</router-link></button>
            <button class="button"><router-link to="/signup">Sign up</router-link></button>
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
    height: 70%;
    width: 70%;
    margin-top: 1.5rem;
}
.main-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
}
.button-colour {
    margin: 2rem 0 0.5rem 0;
    background-color: #dcc9cd;
}
</style> 