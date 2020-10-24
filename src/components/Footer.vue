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

<style scoped>
footer p {
    font-size: 0.7rem;
    height: 100%;
    padding: 2rem 0 1rem;
}
</style>