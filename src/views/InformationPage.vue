<template>
  <div>
      <div class="calendar-wrap">
        <vc-calendar 
          title-position="left"
          :attributes='currentDate'
        >
        </vc-calendar>
      </div>
      <hr>
      <div class="dates-wrap">
        <div class="dates-lw-wrap">
          <ul>
            <li>Topias</li>
            <li>Mia</li>
          </ul>
        </div>
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
}
.dates-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dates-lw-wrap {
  width: 75%;
  text-align: left;
}
</style>