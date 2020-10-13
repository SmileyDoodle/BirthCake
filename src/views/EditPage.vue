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
            @click="saveUser()"
        > Submit 
        </button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app' 

export default {
    name: 'EditPage',
    data() {
        return {
            error: '',
            name: '',
            date: '',
            message: '',
            photo: '',
            url: '',
            file: ''
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

            const uploadedRef = await this.uploadPhoto(this.file)

            db.collection("users").add({
                name: this.name,
                date: this.date,
                message: this.message,
                photo: await uploadedRef.getDownloadURL()
            })
            // eslint-disable-next-line no-unused-vars
            .then(docRef => this.$router.push('/information'))
            .catch (error => console.log(error))                
        },
        async uploadPhoto(file) {
            let storageRef = firebase.storage().ref();
            let ref = storageRef.child('avatar/' + file.name);
            await ref.put(file)
            return ref;
        }
    }
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