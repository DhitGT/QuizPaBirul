<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h2 class="text-2xl font-bold text-white mb-4">Soal Level {{ level }}</h2>
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-xl">
      <p class="text-lg mb-4 text-gray-900">{{ question.text }}</p>

      <!-- True/False Buttons -->
      <div class="flex justify-center gap-4 mt-4">
        <button
          @click="selectAnswer(true)"
          :disabled="isCooldown"
          class="bg-green-500 text-white py-4 px-8 rounded-lg hover:bg-green-600 transition w-full max-w-xs"
        >
          Benar
        </button>

        <button
          @click="selectAnswer(false)"
          :disabled="isCooldown"
          class="bg-red-500 text-white py-4 px-8 rounded-lg hover:bg-red-600 transition w-full max-w-xs"
        >
          Salah
        </button>
      </div>
    </div>

    <!-- Feedback Section -->
    <p v-if="selectedAnswer !== null" class="mt-4 text-white">
      Anda memilih: <span>{{ selectedAnswer ? 'Benar' : 'Salah' }}</span>
      <span v-if="isCorrect" class="text-green-500">✔️ Benar!</span>
      <span v-else class="text-red-500"
        >❌ Salah! Jawaban yang benar adalah:
        {{ question.correct ? 'Benar' : 'Salah' }}</span
      >
    </p>

    <!-- Cooldown Progress -->
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
      selectedAnswer: null, // User's selected answer (true/false)
      isCorrect: null, // Whether the answer is correct
      isCooldown: false, // Cooldown state
      progress: 0, // Cooldown progress bar
      cooldownTime: 3, // Cooldown time in seconds
    }
  },
  methods: {
    selectAnswer(answer) {
      if (!this.isCooldown) {
        // Set the selected answer
        this.selectedAnswer = answer

        // Check if the answer is correct
        this.isCorrect = answer === this.question.correct

        // Start cooldown after answering
        this.startCooldown()
      }
    },

    startCooldown() {
      this.isCooldown = true
      this.progress = 0
      this.cooldownTime = 3

      // Interval for cooldown timer
      const interval = setInterval(() => {
        this.cooldownTime -= 1
        this.progress += 33
        if (this.cooldownTime <= 0) {
          clearInterval(interval)
          this.isCooldown = false
          this.progress = 0
          this.selectedAnswer = null

          // Emit the result after cooldown finishes
          this.$emit('record-answer', this.isCorrect)
          this.$emit('next-question')
        }
      }, 1000)
    },
  },
}
</script>

<style>
/* Optional: Add any necessary styles here */
</style>
