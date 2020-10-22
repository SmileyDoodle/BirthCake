<template>
  <div class="add-wrap">
      <div class="desktop-add-wrap">
        <figure class="image is-128x128 figure" @click="upload()" 
            :style="{'background-image': 'url(' + (url ? url : src=require('../assets/images/photo.png')) + ')'}">
            <input type="file" name="thumbnail" id="thubnail" style="display: none" 
                ref="fileUpload" accept="image/png, image/jpeg"
                @change="previewFiles">
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
            <p class="chackbox-spacing">
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
                    maxlength="1000"
                    >
                </textarea>
                <span v-if="message.length > 975" class="characterLimit"> {{message.length}}/1000</span>
            </p>
        </div>
        <div class="btn-submit-wrap">
            <button
                class="button btn-submit"
                :class="{'is-loading': isLoading}"
                type="submit"
                :disabled="!name || !date"
                @click="saveUser()"
            > Submit 
            </button>
        </div>
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
            currentPhoto: '',
            isLoading: false
        }
    },
    methods: {
        upload() {
            this.$refs.fileUpload.click();        
        },
        previewFiles(event) {
          this.file = event.target.files[0];
          this.url = URL.createObjectURL(this.file);

          const fsize = this.file.size; 
          const file = Math.round((fsize / 1024)); 
                // The size of the file. 
                if (file >= 2048) { 
                    alert( 
                      "File too Big, please select a file less than 2mb");
                    this.file = "";
                    this.url = "";
                }
        },
        async saveUser() {
            this.isLoading = true;

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
            .catch (() => console.log("err"))                
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
    width: 100%;
}
.chackbox-spacing {
    margin-bottom: 0 !important;
}
.add-lp-wrap p:last-child {
    display: flex;
    flex-direction: column;
    height: 170px;
}
.btn-submit-wrap {
    display: flex;
    justify-content: flex-end;
}
.btn-submit {
    background-color: #3a5184;
    color: #fff;
}
.btn-submit:disabled {
    background-color: #fff;
    color: #2c3e50;
}
.characterLimit {
    width: 100%;
    text-align: right;
    font-size: 0.7rem;
    margin-top: 0.3rem;
}


@media only screen and (min-width: 1024px) {
.desktop-add-wrap {
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