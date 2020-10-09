<template>
  <div class="singlePage-wrap">
      <figure class="image is-128x128 figure">
         <img class="is-rounded avatar-img" src="https://bulma.io/images/placeholders/128x128.png" />
      </figure>
      <div class="info-wrap">
          <div class="details-wrap">
            <h1><strong>Zuzana</strong></h1>
            <h6>12 June 1991</h6>
            <p>Lorem ipsum dolor sit amet, consecte adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.singlePage-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}
.info-wrap {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}
.details-wrap {
    width: 70%;
}
.details-wrap h6 {
    margin-top: 0.5rem;
}
.details-wrap p {
    text-align: left;
    margin-top: 1rem;
}
</style>