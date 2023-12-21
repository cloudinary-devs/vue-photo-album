<script setup>
import { ref, onMounted } from 'vue'
import CldImage from '../components/CldImage.vue'

const photos = ref([])
const loading = ref(true)

const getData = async (tag) => {
  const response = await fetch(
    `https://res.cloudinary.com/${import.meta.env.VITE_CLOUD_NAME}/image/list/${tag}.json`
  )
  const data = await response.json()
  photos.value = data.resources
  loading.value = false
}

onMounted(() => {
  getData('myphotoalbum-vue')
})
</script>

<template>
  <div class="m-2 space-y-4">
    <h1 class="text-5xl font-bold">Photo Album</h1>
    <p class="m-2">This page shows how to display images uploaded to your Cloudinary account.</p>
    <div class="m-2">
      Please note that the following defaults are being used:
      <ul class="list-disc list-inside">
        <li>
          Images are using the
          <code class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm"> placeholder()</code>
          plugin.
        </li>
        <li>
          Images tagged as
          <code class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm">myphotoalbum-vue</code>
          are displayed.
        </li>
        <li>
          Images are transformed using the following actions:
          <code
            class="bg-black text-gray-100 px-2 py-1 rounded-md text-sm whitespace-normal overflow-auto break-words"
          >
            .resize(thumbnail().width(300).height(300).gravity(autoGravity())).delivery(format('auto')).delivery(quality('auto'));</code
          >
          .
        </li>
      </ul>
    </div>
    <template v-if="loading">
      <p class="font-bold">Loading gallery</p>
    </template>
    <template v-else-if="photos.length !== 0">
      <div class="flex flex-wrap -mx-4">
        <div v-for="(photo, idx) in photos" :key="idx" class="lg:w-1/3 md:w-1/2 w-full p-4">
          <CldImage :publicId="photo.public_id" />
        </div>
      </div>
    </template>
    <template v-else>
      <p class="text-xl p-4">
        No photos found. Please make sure that you have uploaded some images using this app.
      </p>
    </template>
  </div>
</template>
