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
        <div class="dates-lp-wrap" v-for="user in users" :key="user.date" @click="goSingle(user.id)">
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
      <div class="sticked-button">
        <router-link to="/add" tag="button" class="button is-rounded">+</router-link>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import moment from 'moment';

export default {
  name: 'InformationPage',
  data() {
    return {
      currentDate: [
        {
          key: 'today',
          highlight: true,
          dates: new Date(),
        }
      ],
      users: [],
      currentYear: '',
      isFirstRun: false
    }
  },
  methods: {
    goSingle(userID) {
     this.$router.push({ name: 'SinglePage', params: { userID: userID }});
    },
    getTime(payload) {
      this.currentYear = payload.year;
      // console.log('currentYear', this.currentYear);
      // console.log('cal', payload);
      if (this.isFirstRun === false) {
        this.init()
      }
      this.isFirstRun = false;
    },
    init() {

      let db = firebase.firestore();

      this.users = [];
    
      db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log('doc', doc);
            var ms = Number(moment(doc.data().date, 'YYYY'));
            var b = new Date(ms).getFullYear()
            var diff = this.currentYear - b;
  
            const data = {
              'id': doc.id,
              'name': doc.data().name,
              'date': moment(doc.data().date).format('DD MMM YYYY'),
              'shortDate': moment(doc.data().date).format('DD MMM'),
              'checked': doc.data().checkboxYear,
              'age': diff
              // 'age': moment(doc.data().date, "YYYYMMDD").fromNow().replace('years ago', 'y.o')
            }     
            this.users.push(data);
          });
      });
      this.isFirstRun = true;
    }
  },
  created() {
    this.init();
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