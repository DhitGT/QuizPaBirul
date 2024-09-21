<template>
  <div class="flex flex-col mt-9 items-center">
    <h2 class="text-2xl font-bold mb-4 text-white">Pilih Level Kuis</h2>
    <div class="flex flex-col space-y-4 w-full max-w-xs">
      <div
        v-for="level in levels"
        :key="level"
        class="flex flex-col items-center"
      >
        <button
          class="relative rounded-lg w-full h-16 bg-blue-700 text-white px-6 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-all"
          @click="selectLevel(level)"
          :disabled="level > currentLevel"
        >
          <div class="flex justify-between w-full">
            <div>
              <span class="text-xl">Level {{ level }}</span>
            </div>
            <div class="flex ms-auto items-end max-w-fit justify-end">
              <span class="text-sm mr-2"
                >Benar: {{ getCorrectAnswers(level) }}</span
              >
              <span class="text-sm"
                >Salah: {{ getIncorrectAnswers(level) }}</span
              >
            </div>
          </div>
          <div class="w-full my-3 bg-gray-200 rounded-full h-2 mt-2">
            <div
              class="bg-green-600 h-2 rounded-full"
              :style="{ width: `${getProgress(level)}%` }"
            ></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentLevel: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      levels: [1, 2, 3, 4], // Daftar level
      progress: {}, // Progress untuk setiap level
      totalQuestions: 5, // Total soal per level
      user: {}, // User data
    }
  },
  methods: {
    loadUserInfo() {
      const userInfo = this.$cookies.get('user_info')
      if (userInfo) {
        this.user = JSON.parse(userInfo)
        this.currentLevel = this.user.currentLevel || 1 // Set current level from user info
      }
    },
    loadProgressFromCookies() {
      this.levels.forEach((level) => {
        const levelInfo = this.$cookies.get(`level_info_${level}`)
        if (levelInfo) {
          const parsedInfo = JSON.parse(levelInfo)
          this.$set(this.progress, level, {
            correct: parsedInfo.correct || 0,
            incorrect: parsedInfo.incorrect || 0,
          })
        } else {
          // Initialize progress if no cookie is found
          this.$set(this.progress, level, { correct: 0, incorrect: 0 })
        }
      })
    },
    selectLevel(level) {
      // this.user.currentLevel = level // Update user's current level
      // this.$cookies.set('user_info', JSON.stringify(this.user), { expires: 7 }) // Update cookie
      // this.$emit('level-selected', level)
      window.location.href = `/quiz/${level}`

    },
    getProgress(level) {
      const { correct } = this.progress[level] || { correct: 0 }
      return (correct / this.totalQuestions) * 100 // Menghitung progress dalam persen
    },
    getCorrectAnswers(level) {
      return this.progress[level]?.correct || 0 // Mengambil jumlah jawaban benar
    },
    getIncorrectAnswers(level) {
      return this.progress[level]?.incorrect || 0 // Mengambil jumlah jawaban salah
    },
  },
  mounted() {
    this.loadUserInfo() // Load user info on mount
    this.loadProgressFromCookies() // Load progress from cookies
  },
}
</script>

<style scoped>
button:disabled {
  background-color: #343b44; /* Warna latar belakang saat disabled */
  cursor: not-allowed; /* Mengubah kursor menjadi tidak diizinkan */
}
</style>
