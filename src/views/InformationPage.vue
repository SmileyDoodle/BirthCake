<template>
  <div>
      <div class="calendar-wrap">
        <vc-calendar 
          title-position="left"
          :attributes='currentDate'
          class="restyle"
          @update:to-page="getTime($event)"
        >
        </vc-calendar>
      </div>
      <hr class="customShadow">
      <div class="dates-wrap">
        <h3 class="has-text-weight-semibold">This month birthdays:</h3>
        <div class="scroll-data">
          <div v-for="user in users" :key="user.id">
            <div class="dates-lp-wrap" v-if="currentMonth === user.month"  @click="goSingle(user.id)">
                <div>
                  <span class="has-text-weight-semibold">&#183;</span>
                </div>
                <div class="birthday-name">
                  <h3> {{user.name}} </h3>
                  <p class="date-age"> 
                    {{user.checked === false ? user.date : user.shortDate}} 
                    {{user.checked === false ? "- turns " + user.age + " y.o." : " " }}
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sticked-button">
        <router-link to="/add" tag="button" class="button is-rounded">+</router-link>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import moment from 'moment';

export default {
  name: 'InformationPage',
  data() {
    return {
      currentDate: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#edcebe',
            fillMode: 'solid',
            class: 'customHighlight'
          },
          dates: new Date(),
        }
      ],
      users: [],
      currentDates: [],
      currentYear: '',
      currentMonth: '',
      isFirstRun: false
    }
  },
  methods: {
    goSingle(userID) {
     this.$router.push({ name: 'SinglePage', params: { userID: userID }});
    },
    getTime(payload) {
      this.currentYear = payload.year;
      this.currentMonth = payload.month;
    },
    init() {

      let db = firebase.firestore();

      this.users = [];
    
      const uid = firebase.auth().currentUser.uid;
      db.collection("users").doc(uid).collection("birthdays").orderBy('birthdayDay').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var ms = Number(moment(doc.data().date, 'YYYY'));
            var b = new Date(ms).getFullYear()
            var diff = this.currentYear - b;
  
            const data = {
              'id': doc.id,
              'name': doc.data().name,
              'date': moment(doc.data().date).format('DD MMM YYYY'),
              'shortDate': moment(doc.data().date).format('DD MMM'),
              'checked': doc.data().checkboxYear,
              'age': diff,
              'month': 1 + moment(doc.data().date, 'YYYY/MM/DD').month(),
              'monthForDots': moment(doc.data().date, 'YYYY/MM/DD').month(),
              'yearForDots': moment().year(),
              'birthdayDay': doc.data().birthdayDay
              // 'age': moment(doc.data().date, "YYYYMMDD").fromNow().replace('years ago', 'y.o')
            }
            this.currentDates.push(new Date(data.yearForDots, data.monthForDots, data.birthdayDay));
            this.users.push(data);
          });
          const dot = {
            dot: {
              backgroundColor: '#3a5184',
              fillMode: 'solid',
              class: 'customDot'
            },
            dates: this.currentDates
          }
          this.currentDate.push(dot)
      });
    }
  },
  watch: {
    currentYear: {
        handler: function() {
              this.init();        
        },
        deep: true
        
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
}
.customShadow {
  margin-top: 0;
  margin-bottom: 2rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 0 rgba(10,10,10,.02);
}
.scroll-data {
  height: 255px;
  overflow: auto;
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
  cursor: pointer;
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
  background-color: #3a5184;
  color: #fff;
}
.customHighlight {
  background-color: #edcebe;
}
.customDot {
  background-color: #3a5184;
}


@media only screen and (min-width: 1024px) {
.restyle {
  border-style: none;
  width: 25%;
}
.scroll-data {
  height: 360px;
}
.customShadow {
  width: 30%;
  margin: 0 auto 2rem;
}
.dates-wrap {
  width: 25%;
}
.sticked-button {
  bottom: 70px;
  right: 45px;
}
.sticked-button button {
  opacity: 0.8;
  transition: opacity .3s ease;
}
.sticked-button button:hover {
  color: #fff;
  opacity: 1;
  transition: opacity .3s ease;
}
}
</style>