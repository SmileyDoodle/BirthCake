<template>
  <div class="about">
     <h1>About</h1>
     <div class="about-wrap">
        <p class="description">With all the hustle and bustle of our daily life, it is easy to forget about some truly important things. However, using BirthCake, you can be sure that you will keep track of all the coming birthdays of your dear people.</p>
        <p class="description">If you like the application, have some ideas how to improve it, or want to collaborate, let's get in touch:</p>
        <a href="mailto:anya.sk.rus@gmail.com" class="button btn-contact">Contact me</a>
     </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style>
.about {
  position: flex;
}
.about h1 {
  font-size: 2rem;
  padding: 2rem; 
}
.description {
  width: 75%;
  margin: 0 auto;
  padding-bottom: 1rem;
}
.btn-contact {
  background-color: #3a5184;
  color: #fff;
  margin-top: 1.5rem;
}


@media only screen and (min-width: 1024px) {
.about {
    width: 25%;
    margin: 0 auto;
}
.description {
  width: 100%;
}
.btn-contact {
  opacity: 0.8;
  transition: opacity .3s ease;
}
.btn-contact:hover {
  color: #fff;
  opacity: 1;
  transition: opacity .3s ease;
}
}
</style>