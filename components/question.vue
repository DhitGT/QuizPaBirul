<template>
  <div class="flex flex-col items-center justify-center min-h-screen pt-16">
    <h2 class="text-2xl font-bold text-white mb-4">Soal Level {{ level }}</h2>

    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-xl">
      <!-- Display question text and image if both are available -->
      <div class="mb-4">
        <p v-if="question.text" class="text-lg mb-4 text-gray-900">
          {{ question.text }}
        </p>
        <img
          v-if="question.imgQ"
          :src="question.imgQ"
          alt="Question Image"
          class="w-full object-contain max-h-32"
        />
      </div>

      <div class="space-y-10">
        <!-- Display image options if the options are images -->
        <div v-if="isImageOptions">
          <button
            v-for="(option, index) in question.options"
            :key="index"
            :style="{
              backgroundColor: buttonColors[index],
              color: getContrastColor(buttonColors[index]),
            }"
            class="w-full text-left py-3 px-4 rounded-lg hover:opacity-80 transition my-3"
            :disabled="isCooldown"
            @click="selectAnswer(option)"
          >
            <img
              :src="option"
              alt="Option Image"
              class="w-full object-contain max-h-32"
            />
          </button>
        </div>

        <!-- Display text options if the options are text -->
        <div v-else>
          <button
            v-for="(option, index) in question.options"
            :key="index"
            :style="{
              backgroundColor: buttonColors[index],
              color: getContrastColor(buttonColors[index]),
            }"
            class="w-full text-left py-3 px-4 rounded-lg hover:opacity-80 transition my-3"
            :disabled="isCooldown"
            @click="selectAnswer(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <p v-if="selectedAnswer" class="mt-4 text-white">
      Anda memilih: {{ selectedAnswer }}
      <span v-if="isCorrect" class="text-green-500">✔️ Benar!</span>
      <span v-else class="text-red-500"
        >❌ Salah!<br />Jawaban yang benar adalah: {{ question.correct }}</span
      >
    </p>

    <div v-if="isCooldown" class="mt-4 w-full">
      <div class="bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-600 h-2 rounded-full"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      <p class="text-white mt-2">Cooldown: {{ cooldownTime }} detik</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      required: true,
    },
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedAnswer: null,
      isCorrect: null,
      buttonColors: [],
      isCooldown: false,
      progress: 0,
      cooldownTime: 3, // Cooldown time in seconds
    }
  },
  computed: {
    // Check if the options are images (assuming they are URLs)
    isImageOptions() {
      return (
        this.question.options &&
        this.question.options.every((option) => this.isImage(option))
      )
    },
  },
  mounted() {
    this.generateButtonColors()
  },
  methods: {
    selectAnswer(option) {
      if (!this.isCooldown) {
        this.selectedAnswer = option
        this.isCorrect = option === this.question.correct
        this.startCooldown()
      }
    },
    generateButtonColors() {
      this.buttonColors = this.question.options.map(() => this.getRandomColor())
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    getContrastColor(hex) {
      if (!hex) return '#000000' // Fallback color
      hex = hex.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b
      return luminance > 186 ? '#000000' : '#FFFFFF'
    },
    startCooldown() {
      this.isCooldown = true
      this.progress = 0
      this.cooldownTime = 3 // Reset cooldown time
      const interval = setInterval(() => {
        this.cooldownTime -= 1
        this.progress += 33 // Progress bar fills up
        if (this.cooldownTime <= 0) {
          clearInterval(interval)
          this.isCooldown = false
          this.progress = 0
          this.selectedAnswer = null // Reset selected answer after cooldown

          this.$emit('record-answer', this.isCorrect) // Emit event to go to the next question
          this.$emit('next-question') // Emit event to go to the next question
        }
      }, 1000)
    },
    // Check if a value is an image URL (basic check based on file extension)
    isImage(option) {
      return (
        typeof option === 'string' && option.match(/\.(jpeg|jpg|gif|png|svg)$/i)
      )
    },
  },
}
</script>
