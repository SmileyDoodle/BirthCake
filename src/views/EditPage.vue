<template>
  <div class="edit-wrap">
      <div class="desktop-edit-wrap">
        <figure class="image is-128x128 figure" @click="upload()" 
            :style="{'background-image': 'url(' + (url ? url : src=require('../assets/images/photo.png')) + ')'}">
            <input type="file" name="thumbnail" id="thubnail" style="display: none" 
                ref="fileUpload" accept="image/png, image/jpeg"
                @change="previewFiles">
        </figure>
        <div class="edit-lp-wrap">
            <p>
                <label for="name">Name</label>
                <input
                class="input"
                id="name"
                v-model="name"
                type="text"
                name="name"
                placeholder="John Doe"
                autocomplete="off"
                required
                >
            </p>
            <p>
                <label for="age">Date of birth</label>
                <input
                disabled
                class="input"
                id="age"
                v-model="date"
                type="date"
                name="date"
                min="0"
                placeholder="dd.mm.yyyy"
                autocomplete="off"
                required
                >
            </p>
            <p>
                <label for="age">Message</label>
                <textarea 
                    class="textarea"
                    id="message"
                    v-model="message"
                    type="text"
                    name="message"
                    min="0" 
                    placeholder="I wish you...."
                    autocomplete="off"
                    maxlength="1000"
                >
                </textarea>
                <span v-if="message.length > 975" class="characterLimit"> {{message.length}}/1000</span>
            </p>
        </div>
        <div class="btn-submit-wrap">
            <button
                class="button btn-submit"
                type="submit"
                @click="updateUser()"
            > Save 
            </button>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
    name: 'AddPage',
    data() {
        return {
            recievedUserID: '',
            name: '',
            date: '',
            message: '',
            photo: '',
            url: '',
            file: '',
            photoName: '',
            currentPhoto: '',
            uid: ''
        }
    },
    methods: {
        fetchUser() {
            let db = firebase.firestore();

            db.collection("users").doc(this.uid).collection("birthdays")
                .where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.userID)
                .get().then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        this.name = doc.data().name,
                        this.date = doc.data().date,
                        this.message = doc.data().message,
                        this.url = doc.data().photo,
                        this.photoName = doc.data().photoName // old photo
                    })
                })
        },
        upload() {
            this.$refs.fileUpload.click();        
        },
        deleteFile() {
            let storageRef = firebase.storage().ref();
            let desertRef = storageRef.child('avatar/' + this.uid +'/' + this.photoName);
            desertRef.delete()
        },
        previewFiles(event) {
          console.log(event.target.files);
          this.file = event.target.files[0];
          this.url = URL.createObjectURL(this.file);

        //   this.uploadPhoto(file)
        },
        async updateUser() {
            let db = firebase.firestore();

            if (this.file) {
                const timestamp = new Date().getTime();
                const uploadedRef = await this.uploadPhoto(this.file, timestamp);
                this.currentPhoto = await uploadedRef.getDownloadURL();
                this.deleteFile();
                this.photoName = timestamp + this.file.name // new photo

            } else {
                this.currentPhoto = this.url;
            }

            db.collection("users").doc(this.uid).collection("birthdays")
                .where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.userID)
                .get().then(querySnapshot => {
                    querySnapshot.forEach( async (doc) => {
                        doc.ref.update ({
                            name: this.name,
                            date: this.date,
                            message: this.message,
                            photo: this.currentPhoto,
                            photoName: this.photoName
                        })
                    })
                })
            // eslint-disable-next-line no-unused-vars
            .then(() => {
                this.$router.push({name: 'SinglePage', params: { userID: this.recievedUserID }})
            })
            .catch (error => console.log(error))                
        },
        async uploadPhoto(file, timestamp) {
            let storageRef = firebase.storage().ref();
            let ref = storageRef.child('avatar/'  + this.uid + '/' + timestamp + file.name);
            await ref.put(file)
            return ref;
        }
    },
    mounted() {
        this.recievedUserID = this.$route.params.userID;
        this.uid = firebase.auth().currentUser.uid;
        // console.log('userID', this.$route.params.userID);
        this.fetchUser();
    },
}
</script>

<style>
.edit-wrap {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    text-align: left;
}
.figure {
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
.edit-lp-wrap {
    margin-top: 2rem;
}
.edit-lp-wrap p {
    margin: 1rem 0;
}
.edit-lp-wrap p:last-child {
    display: flex;
    flex-direction: column;
    height: 170px;
}
.characterLimit {
    width: 100%;
    text-align: right;
    font-size: 0.7rem;
    margin-top: 0.3rem;
}
.btn-submit-wrap {
    display: flex;
    justify-content: flex-end;
}
.btn-submit {
    background-color: #3a5184;
    color: #fff;
}


@media only screen and (min-width: 1024px) {
.desktop-edit-wrap {
    width: 25%;
}
.btn-submit {
  opacity: 0.8;
  transition: opacity .3s ease;
}
.btn-submit:hover {
  color: #fff;
  opacity: 1;
  transition: opacity .3s ease;
}
}
</style>