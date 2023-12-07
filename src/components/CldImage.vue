<script setup>
import { AdvancedImage, responsive, placeholder } from '@cloudinary/vue'
import { Cloudinary } from '@cloudinary/url-gen'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'

const props = defineProps({
  publicId: {
    type: String,
    required: true
  }
})

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME
  }
})
const myImage = cld
  .image(props.publicId)
  .resize(thumbnail().width(300).height(300).gravity(autoGravity()))
  .delivery(format('auto'))
  .delivery(quality('auto'))
const plugins = [responsive(), placeholder()]
</script>

<template>
  <AdvancedImage
    :cldImg="myImage"
    style="max-width: 100%"
    :plugins="plugins"
    className="w-full h-64 object-cover max-w-sm rounded-lg shadow-lg"
  />
</template>
