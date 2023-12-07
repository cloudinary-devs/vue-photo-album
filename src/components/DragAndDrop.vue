<script setup>
import { ref, onBeforeUnmount } from 'vue'

const dragOver = ref(false)
const droppedFiles = ref([])
const loadingStates = ref([])
let abourtController = new AbortController()

const handleDragOver = (e) => {
  e.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
}

const handleDrop = async (e) => {
  e.preventDefault()
  dragOver.value = false

  const files = Array.from(e.dataTransfer.files)
  droppedFiles.value = []
  loadingStates.value = new Array(files.length).fill(true)

  abourtController.abort()
  abourtController = new AbortController()

  if (files && files.length > 0) {
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`

    for (let file of files) {
      try {
        const formData = new FormData()
        const fields = {
          file,
          upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
          tags: ['myphotoalbum-vue'],
          multiple: true,
          resource_type: 'image'
        }

        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value)
        })

        const options = {
          method: 'POST',
          body: formData,
          signal: abourtController.signal
        }

        const response = await fetch(url, options)

        if (!response.ok) {
          throw new Error('Failed to execute file upload via the Fetch API')
        }

        const json = await response.json()
        const secureUrl = json.secure_url
        const previewUrl = secureUrl.replace('/upload/', '/upload/w_400/f_auto,q_auto/')

        droppedFiles.value.push({ file, previewUrl })

        loadingStates.value = loadingStates.value.map((state, index) =>
          file === files[index] ? false : state
        )
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error)
        }

        loadingStates.value = loadingStates.value.map((state, index) =>
          file === files[index] ? false : state
        )
      }
    }
  }
}

onBeforeUnmount(() => {
  abourtController.abort()
})
</script>

<template>
  <div
    :class="{ dragArea: true, dragOver: dragOver }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <p>Drag and drop images here</p>
  </div>
  <template v-if="loadingStates.some((loading) => loading)">
    <p>Image upload in progress</p>
    <span class="loading loading-spinner text-primary"></span>
  </template>
  <template v-if="droppedFiles.length !== 0">
    <div class="flex flex-wrap">
      <h2 class="w-full text-xl font-bold">Uploaded images</h2>
      <div
        v-for="(droppedFile, idx) in droppedFiles"
        :key="idx"
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
      >
        <img
          class="w-full"
          :src="droppedFile.previewUrl"
          :alt="`Preview of ${droppedFile.file.name}`"
        />
      </div>
    </div>
  </template>
</template>

<style scoped>
.dragArea {
  width: 600px;
  height: 400px;
  border: 2px dashed #000;
  background-color: #eee;
  padding: 20px;
  text-align: center;
  transition:
    border-color 0.3s,
    background-color 0.3s;
}

.dragOver {
  border-color: #2196f3;
  background-color: #87ff8f;
}
</style>
