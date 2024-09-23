<template>
  <div>
    <audio ref="bgm" src="/Stardew Valley OST - Luau Festival.mp3" loop></audio>
    <nav class="fixed top-0 left-0 w-full bg-transparent z-50">
      <div class="max-w-screen-xl flex items-center justify-center mx-auto p-4">
        <div class="w-full justify-center my-auto block" id="navbar-default">
          <ul
            class="font-medium flex justify-center items-center gap-6 p-0 mt-0"
          >
            <li>
              <a
                href="/"
                class="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src="/logo-smkn2.png" class="h-6 md:h-8" alt="Logo" />
              </a>
            </li>
            <li>
              <a
                href="/"
                class="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src="/logo-pembatik.png" class="h-6 md:h-8" alt="Logo" />
              </a>
            </li>
            <li>
              <a
                href="/"
                class="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src="/pmm.png" class="h-6 md:h-8" alt="Logo" />
              </a>
            </li>
            <li>
              <a
                href="/"
                class="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src="/tut-wuri.png" class="h-6 md:h-8" alt="Logo" />
              </a>
            </li>
            <li>
              <button
                @click="toggleBGM"
                class="bg-blue-500 text-white mx-3 px-4 rounded flex items-center"
                style="z-index: 999"
              >
                <span v-if="isMuted" class="mdi mdi-volume-off"></span>
                <span v-else class="mdi mdi-volume-high"></span>
                <span class="ml-2 text-xs md:text-md">BGM</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isMuted: true, // Track mute state
      bgmAudio: null, // Reference to audio element
    }
  },
  mounted() {
    this.bgmAudio = this.$refs.bgm // Reference your audio element
  },
  methods: {
    toggleBGM() {
      this.isMuted = !this.isMuted // Toggle mute state

      if (this.isMuted) {
        this.bgmAudio.pause() // Mute the BGM
      } else {
        this.bgmAudio.play().catch((error) => {
          console.error('Error playing BGM:', error) // Handle error
        })
      }
    },
  },
}
</script>


<style scoped>
/* Optional: adds a blur effect to the background */
nav {
  background-color: rgba(0, 0, 0, 0); /* Transparent background */
}

ul {
  list-style: none; /* Remove list bullets */
}
</style>
