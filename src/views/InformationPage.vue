<template>
  <div>
      <div class="calendar-wrap">
        <vc-calendar 
          title-position="left"
          :attributes='currentDate'
          class="restyle"
        >
        </vc-calendar>
      </div>
      <hr class="customShadow">
      <div class="dates-wrap">
        <h3 class="has-text-weight-semibold">This month birthdays:</h3>
        <div class="dates-lp-wrap">
            <div>
              <span class="has-text-weight-semibold">&#183;</span>
            </div>
            <div class="birthday-name">
              <h3>Topias</h3>
              <p class="date-age">11 Oct 1989 - 31 y.o.</p>
            </div>
        </div>
        <div class="dates-lp-wrap">
            <div>
              <span class="has-text-weight-semibold">&#183;</span>
            </div>
            <div class="birthday-name">
              <h3>Zuzana</h3>
              <p class="date-age">29 Oct 1991 - 24 y.o.</p>
            </div>
        </div>
      </div>
      <div class="sticked-button">
        <router-link to="/edit" tag="button" class="button is-rounded">+</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'InformationPage',
  data() {
  return {
    currentDate: [
      {
        key: 'today',
        highlight: true,
        dates: new Date()
      }
    ]
  }
}
}
</script>

<style>
.calendar-wrap {
  display: flex;
  justify-content: center;
  padding-bottom: 0;
  margin-top: 1rem;
  /* margin-bottom: 3rem !important; */
}
.customShadow {
  margin-top: 0;
  margin-bottom: 2rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 0 rgba(10,10,10,.02);
}
.restyle {
  border-style: none;
  width: 80%;
}
.dates-wrap {
  display: flex;
  flex-direction: column;
  width: 70%;
  text-align: left;
  margin: 0 auto;
}
.dates-lp-wrap {
  width: 75%;
  display: flex;
  text-align: left;
  margin-top: 1rem;
}
.birthday-name {
  margin-left: 1rem;
}
.date-age {
  font-size: 0.7rem;
}
.sticked-button {
  position: fixed;
  bottom: 50px;
  right: 35px;
}
.sticked-button button {
  padding: 7px 14px !important;
  background-color: #dcc9cd;
}
</style>