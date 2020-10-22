<template>
  <div class="singlePage-wrap">
      <figure class="image is-128x128 figure" 
            :style="{'background-image': 'url(' + (photo ? photo : src=require('../assets/images/photo.png')) + ')'}">
      </figure>
      <div class="info-wrap">
          <div class="details-wrap">
            <h1><strong> {{name}} </strong></h1>
            <h6> {{checked === false ? date : shortDate}} </h6>
            <p> {{message}} </p>
          </div>
      </div>
      <div class="btn-wrap">
          <button
                class="button btn-edit btn-light-colour"
                type="edit"
                @click="editUser(gotUserID)"
          > Edit 
          </button>
          <button
                class="button btn-delete"
                type="delete"
                @click="deleteUser()"
          > Delete 
          </button>
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
            shortDate: '',
            checked: false,
            message: '',
            photo: '',
            photoName: '',
        }
    },
    methods: {
        fetchUser() {
            let db = firebase.firestore();

            const uid = firebase.auth().currentUser.uid;
            db.collection("users").doc(uid).collection("birthdays")
                .where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.userID)
                .get().then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        this.name = doc.data().name,
                        this.checked = doc.data().checkboxYear,
                        this.date = moment(doc.data().date).format('DD MMM YYYY'),
                        this.shortDate = moment(doc.data().date).format('DD MMM'),
                        this.message = doc.data().message,
                        this.photo = doc.data().photo,
                        this.photoName = doc.data().photoName
                    })
                })
        },
        editUser(gotUserID) {
            this.$router.push({ name: 'EditPage', params: { userID: gotUserID }});
        },
        deleteFile() {
            let storageRef = firebase.storage().ref();
            const uid = firebase.auth().currentUser.uid;
            let desertRef = storageRef.child('avatar/' + uid + '/' + this.photoName);
            desertRef.delete()
        },
        deleteUser() {
            if(confirm('Are you sure?')) {
                
                if(this.photoName) {
                    this.deleteFile();
                }

                let db = firebase.firestore();

                const uid = firebase.auth().currentUser.uid;
                db.collection("users").doc(uid).collection("birthdays").
                    where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.userID)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach((doc) => {
                            doc.ref.delete().then(()=>{
                                this.$router.push('/information');
                            });
                        })
                })
            }
        },
    },
    mounted() {
        this.gotUserID = this.$route.params.userID;
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
    width: 100%;
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
    height: 205px;
    overflow-x: auto;
}
.btn-wrap {
    display: flex;
    width: 70%;
    justify-content: flex-end;
}
.btn-light-colour {
   background-color: #f2eee8; 
}
.btn-delete {
    background-color: #3a5184;
    color: #fff;
    margin-top: 1rem;
}
.btn-edit {
    margin-top: 1rem;
    margin-right: 0.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}


@media only screen and (min-width: 1024px) {
.details-wrap {
    width: 25%;
}
.btn-wrap {
    width: 25%;
}
.btn-delete {
    margin-top: 2rem;
    opacity: 0.8;
    transition: opacity .3s ease;
}
.btn-edit {
    margin-top: 2rem;
    opacity: 0.8;
    transition: opacity .3s ease;
}
.btn-delete:hover {
  color: #fff;
  opacity: 1;
  transition: opacity .3s ease;
}
.btn-edit:hover {
  opacity: 1;
  transition: opacity .3s ease;
}
}
</style>