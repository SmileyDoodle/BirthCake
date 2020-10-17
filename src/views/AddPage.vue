<template>
  <div class="add-wrap">
      <div>
        <figure class="image is-128x128 figure" @click="upload()">
            <input type="file" name="thumbnail" id="thubnail" style="display: none" 
                ref="fileUpload" accept="image/png, image/jpeg"
                @change="previewFiles">
            <img class="is-rounded avatar-img" src="https://bulma.io/images/placeholders/128x128.png" v-if="!url" />
            <img class="is-rounded avatar-styling" :src="url" v-if="url" />
        </figure>
        <div class="add-lp-wrap">
            <p>
                <label for="name">Name*</label>
                <input
                class="input"
                id="name"
                v-model="name"
                type="text"
                name="name"
                placeholder="John Doe"
                autocomplete="off"
                >
            </p>
            <p>
                <label for="age">Date of birth*</label>
                <input
                class="input"
                id="age"
                v-model="date"
                type="date"
                name="date"
                min="0"
                placeholder="dd.mm.yyyy"
                autocomplete="off"
                >
            </p>
            <label class="checkbox">
                <input 
                type="checkbox" 
                class="checkbox-styling"
                id="checkbox" 
                v-model="checked"
                >
                Don't know the year (pick any)
            </label>
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
            :disabled="!name || !date"
            @click="saveUser()"
        > Submit 
        </button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import moment from 'moment';


export default {
    name: 'AddPage',
    data() {
        return {
            error: '',
            name: '',
            date: '',
            'birthdayDay': '',
            checked: false,
            message: '',
            photo: '',
            url: '',
            file: '',
            photoName: '',
            currentPhoto: ''
        }
    },
    methods: {
        upload() {
            this.$refs.fileUpload.click();        
        },
        previewFiles(event) {
          console.log(event.target.files);
          this.file = event.target.files[0];
          this.url = URL.createObjectURL(this.file);

        //   this.uploadPhoto(file)
        },
        async saveUser() {
            let db = firebase.firestore();


            if (this.file) {
                const timestamp = new Date().getTime();
                const uploadedRef = await this.uploadPhoto(this.file, timestamp)
                this.currentPhoto = await uploadedRef.getDownloadURL()
                this.photoName =  timestamp + this.file.name
            }
            
            const uid = firebase.auth().currentUser.uid;
            db.collection("users").doc(uid).collection("birthdays").add({
                name: this.name,
                date: this.date,
                birthdayDay: moment(this.date, 'YYYY/MM/DD').date(),
                checkboxYear: this.checked,
                message: this.message,
                photo: this.currentPhoto,
                photoName: this.photoName
            })
            // eslint-disable-next-line no-unused-vars
            .then(docRef => this.$router.push('/information'))
            .catch (error => console.log(error))                
        },
        async uploadPhoto(file, timestamp) {
            let storageRef = firebase.storage().ref();
            const uid = firebase.auth().currentUser.uid;
            let ref = storageRef.child('avatar/' + uid + '/' + timestamp + file.name);
            await ref.put(file)
            return ref;
        }
    }
}
</script>

<style>
.add-wrap {
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
.checkbox-styling {
    height: 10px;
}
.checkbox {
    font-size: 0.7rem;
    opacity: 0.7;
}
.add-lp-wrap {
    margin-top: 2rem;
}
.add-lp-wrap p {
    margin: 1rem 0;
}
.btn-submit {
    background-color: #dcc9cd;
}
</style>