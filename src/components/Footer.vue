<template>
  <footer>
      <p>© {{ new Date().getFullYear() }} - SmileyDoodle</p>
  </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
footer {
    height: 30px;
}
footer p {
    font-size: 0.7rem;
}
</style>