<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const navItems = [
  {
    href: '/',
    text: 'Home'
  },
  {
    href: '/upload',
    text: 'Upload (Upload Widget)'
  },
  { href: '/apiupload', text: 'API Upload' },
  { href: '/album', text: 'Photo Album' }
]
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden" @click="toggleDropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          v-show="isDropdownOpen"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li v-for="(navItem, index) in navItems" :key="index">
            <router-link :to="navItem.href">{{ navItem.text }}</router-link>
          </li>
        </ul>
      </div>
      <router-link to="/" class="btn btn-ghost text-xl"> Cloudinary Vue Photo Album </router-link>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-for="(navItem, index) in navItems" :key="index">
          <router-link :to="navItem.href">{{ navItem.text }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
