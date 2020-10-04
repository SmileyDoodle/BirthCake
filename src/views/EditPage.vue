<template>
  <div class="edit-wrap">
      <div>
        <figure class="image is-128x128 figure" @click="upload()">
            <input type="file" name="thumbnail" id="thubnail" style="display: none" 
                ref="fileUpload" accept="image/png, image/jpeg"
                @change="previewFiles">
            <img class="is-rounded avatar-img" src="https://bulma.io/images/placeholders/128x128.png" v-if="!url" />
            <img class="is-rounded" :src="url" v-if="url" />
        </figure>
        <p>
            <label for="name">Name</label>
            <input
            class="input is-rounded"
            id="name"
            v-model="name"
            type="text"
            name="name"
            >
        </p>
        <p>
            <label for="age">Date of birth</label>
            <input
            class="input is-rounded"
            id="age"
            v-model="date"
            type="number"
            name="date"
            min="0"
            >
        </p>
            <p>
            <label for="age">Message</label>
            <input
            class="input is-rounded"
            id="message"
            v-model="message"
            type="text"
            name="message"
            min="0"
            >
        </p>
        <button
        class="button is-rounded"
        type="submit"
        > Submit 
        </button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'EditPage',
    data() {
        return {
            errors: [],
            name: null,
            date: null,
            message: '',
            url: null,
        }
    },
    methods:{
        upload() {
            this.$refs.fileUpload.click();        
        },
        previewFiles(event) {
          console.log(event.target.files);
          const file = event.target.files[0];
          this.url = URL.createObjectURL(file);
        }
    }
}
</script>

<style>
.edit-wrap {
    display: flex;
    justify-content: center;
}
.figure {
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
</style>