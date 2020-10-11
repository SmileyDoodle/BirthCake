<template>
  <div class="singlePage-wrap">
      <figure class="image is-128x128 figure">
         <img class="is-rounded avatar-img" src="https://bulma.io/images/placeholders/128x128.png" />
      </figure>
      <div class="info-wrap">
          <div class="details-wrap">
            <h1><strong> {{name}} </strong></h1>
            <h6> {{date}} </h6>
            <p> {{message}} </p>
          </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import moment from 'moment';

export default {
    name: 'SinglePage',
    data() {
        return {
            gotUserID: '',
            name: '',
            date: '',
            message: ''
        }
    },
    methods: {
        fetchUser() {
            let db = firebase.firestore();

            db.collection("users").where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.userID)
                .get().then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        this.name = doc.data().name,
                        this.date = moment(doc.data().date).format('DD MMM YYYY'),doc.data().date,
                        this.message = doc.data().message
                    })
                })
        }
    },
    mounted() {
        this.gotUserID = this.$route.params.userID;
        console.log('id', this.$route.params.userID);
        this.fetchUser();
    },
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