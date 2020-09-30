<template>
    <div>
        <div class="main-page">
            <h1> BirthCake </h1>
            <p> Keep all the birthdays in one place </p>
        </div>
        <div>
            <button class="button is-rounded"><router-link to="/login">Login</router-link></button>
            <button class="button is-rounded"><router-link to="/signin">Sign in</router-link></button>
        </div>
        <div class="img-wrap">
            <img alt="bear" src="../assets/images/bear.jpg"> 
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
    font-size: 2.5rem;
}
.button {
    margin: 0 1rem;
}
.img-wrap img { 
    height: 80%;
    width: 80%;
    margin-top: 2rem;
}
</style> 