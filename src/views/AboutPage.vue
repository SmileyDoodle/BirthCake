<template>
  <div class="about">
     <h1>About</h1>
     <div class="about-wrap">
        <p class="description">With all the hustle and bustle of our daily life, it is easy to forget about some truly important things. However, using BirthCake, you can be sure that you will keep track of all the coming birthdays of your dear people.</p>
        <p class="description">If you like the application, have some ideas how to improve it, or want to collaborate, let's get in touch:</p>
        <p><a href="mailto:anya.sk.rus@gmail.com" class="contact">contact me</a></p>
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
  width: 80%;
  margin: 0 auto;
  padding-bottom: 1rem;
}
.contact {
  color: #3a5184;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity ease 0.5s;
}
.contact:hover {
  opacity: 1;
  transition: opacity ease 0.5s;
}
</style>