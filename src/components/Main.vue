<template>
    <div>
        <div class="main-page">
            <h1> BirthCake </h1>
            <p> Keep all the birthdays in one place </p>
        </div>
        <div class="img-wrap">

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
</style> 