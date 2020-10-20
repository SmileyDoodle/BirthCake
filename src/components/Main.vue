<template>
    <div class="desktop-main-wrap">
        <div class="desktop-left-wrap">
            <div class="main-page">
                <h1> BirthCake </h1>
                <p> Keep all the birthdays in one place </p>
            </div>
            <div class="img-wrap">
                <img alt="birthday" src="../assets/images/birthday.png"> 
            </div>
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


@media only screen and (min-width: 1024px) {
.desktop-main-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.desktop-left-wrap {
    width: 60%;
}
.main-page {
    width: 80%;
    padding-top: 0;
    padding-left: 6rem;
    padding-right: 0;
    margin: 0 auto;
}
.main-page h1 {
    font-size: 3.5rem;
}
.img-wrap { 
    width: 80%;
    margin: 0 auto;
    padding-top: 1rem;
}
.img-wrap img { 
    width: 70%;
}
.main-button {
    display: flex;
    width: 30%;
    margin-left: 0;
}
.main-button .button {
    width: 70%;
}
}
</style> 