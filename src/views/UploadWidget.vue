<script setup>
import { onMounted, ref } from 'vue'
const isDisabled = ref(false)
const uploadedImages = ref([])

const scriptLoaded = ref(false)

const processResults = (error, result) => {
  if (result.event === 'close') {
    isDisabled.value = false
  }
  if (result && result.event === 'success') {
    const secureUrl = result.info.secure_url
    const previewUrl = secureUrl.replace('/upload/', '/upload/w_400/f_auto,q_auto/')
    uploadedImages.value.push(previewUrl)
    isDisabled.value = false
  }
  if (error) {
    isDisabled.value = false
  }
}

const cloudName = import.meta.env.VITE_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET

const uploadWidget = () => {
  isDisabled.value = true
  window.cloudinary.openUploadWidget(
    {
      cloudName,
      uploadPreset,
      sources: ['local', 'url'],
      tags: ['myphotoalbum-vue'],
      clientAllowedFormats: ['image'],
      resourceType: 'image'
    },
    processResults
  )
}

onMounted(() => {
  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', 'uw')
  script.src = 'https://upload-widget.cloudinary.com/global/all.js'
  script.addEventListener('load', () => (scriptLoaded.value = true))

  script.onerror = () => {
    console.error('Failed to load third-party script.')
  }
  document.head.appendChild(script)
})
</script>
<template>
  <div class="m-2 space-y-4">
    <h1 class="text-5xl font-bold">Upload (Upload Widget)</h1>
    <p class="m-2">
      This example shows how to integrate the Cloudinary Upload Widget into a Vue application.
    </p>
    <div class="m-2">
      Please note that the following defaults are being used:
      <ul class="list-disc list-inside">
        <li>The upload source is limited to the local filesystem or to a remote URL.</li>
        <li>
          The
          <code class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm"> myphotoalbum-vue</code>
          tag gets added to all photos uploaded via this method (this is used in the photo album to
          retrieve images).
        </li>
        <li>Only images can be uploaded.</li>
      </ul>
      <button
        class="btn"
        :class="{ 'btn-primary': true, 'btn-disabled': isDisabled }"
        @click="uploadWidget"
        :disabled="isDisabled"
      >
        {{ isDisabled ? 'Opening Widget' : 'Upload Image' }}
      </button>
      <div v-if="uploadedImages.length !== 0">
        <div class="flex flex-wrap">
          <h2 class="w-full text-xl font-bold">Uploaded images</h2>
          <div
            v-for="(uploadedImage, index) in uploadedImages"
            :key="index"
            class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
          >
            <img class="w-full" :src="uploadedImage" alt="uploaded image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
