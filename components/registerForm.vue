<template>
  <div>
    <navbar />
    <div class="min-h-[80vh] mt-16 flex items-center flex-col justify-center">
      <h3
        class="mb-4 text-4xl font-extrabold tracking-tight text-center leading-none text-white md:text-4xl lg:text-4xl"
      >
        Keselamatan dan Kesehatan Kerja (K3) Games
      </h3>
      <div class="p-7 w-[90vw] md:w-[50vw] rounded">
        <form
          @submit.prevent="startGame"
          class="mx-auto flex flex-col gap-5 md:max-w-[50vw]"
        >
          <label
            for="nama"
            class="mb-2 text-md font-medium text-gray-900 sr-only dark:text-white"
          >
            Nama
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="userInputName"
              id="nama"
              class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukan nama anda"
              required
            />
          </div>
          <label
            for="Kelas"
            class="mb-2 text-md font-medium text-gray-900 sr-only dark:text-white"
          >
            Kelas
          </label>
          <div class="relative">
            <input
              type="text"
              v-model="userInputClass"
              id="Kelas"
              class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="masukan kelas anda. Cth : X TBSM 2"
              required
            />
          </div>
          <button
            type="submit"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            Mulai Game
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInputName: '', // Initialize userInputName
      userInputClass: '', // Initialize userInputName
    }
  },

  mounted() {
    const cookieValue = this.$cookies.get('user_info')
    if (cookieValue) {
      window.location.href = '/games'
    }
  },

  methods: {
    startGame() {
      // Set the cookie when starting the game
      const user = {
        name: this.userInputName,
        class: this.userInputClass,
        currentLevel: 0,
      }
      this.$cookies.set('user_info', JSON.stringify(user), { expires: 7 }) // expires in 7 days

      // Redirect to the games page
      window.location.href = '/games'
    },
  },
}
</script>
