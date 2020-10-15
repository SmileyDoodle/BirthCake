<template>
  <div class="edit-wrap">
      <div>
        <figure class="image is-128x128 figure" @click="upload()">
            <input type="file" name="thumbnail" id="thubnail" style="display: none" 
                ref="fileUpload" accept="image/png, image/jpeg"
                @change="previewFiles">
            <img class="is-rounded avatar-img" src="https://bulma.io/images/placeholders/128x128.png" v-if="!url" />
            <img class="is-rounded avatar-styling" :src="url" v-if="url" />
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
                    >
                </textarea>
            </p>
        </div>
        <button
            class="button btn-submit"
            type="submit"
            @click="updateUser()"
        > Save 
        </button>
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
            currentPhoto: ''
        }
    },
    methods: {
        fetchUser() {
            let db = firebase.firestore();

            db.collection("users").where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.userID)
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
            let desertRef = storageRef.child('avatar/' + this.photoName);
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

            db.collection("users").where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.userID)
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
            let ref = storageRef.child('avatar/' + timestamp + file.name);
            await ref.put(file)
            return ref;
        }
    },
    mounted() {
        this.recievedUserID = this.$route.params.userID;
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
.btn-submit {
    background-color: #dcc9cd;
}
</style>