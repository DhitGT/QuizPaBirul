<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h2 class="text-2xl font-bold text-white mb-4">Soal Level {{ level }}</h2>
     <audio ref="audioCorrect" src="/correct.mp3"></audio>
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-xl">
      <!-- Check if the question has an image -->
      <div v-if="isImageQuestion" class="mb-4">
        <img
          :src="question.imgQ"
          alt="Question Image"
          class="w-full object-contain max-h-32"
        />
      </div>

      <!-- Display question text -->
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

    <!-- Modal Popup for Feedback -->
    <transition name="modal-fade">
      <div
        v-if="selectedAnswer !== null"
        class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
          <p class="text-lg mb-4">
            Anda memilih:
            <strong>{{ selectedAnswer ? 'Benar' : 'Salah' }}</strong>
          </p>
          <p v-if="isCorrect" class="text-green-500 text-xl">
            ✔️ Jawaban Anda Benar!
          </p>
          <p v-else class="text-red-500 text-xl">
            ❌ Jawaban Anda Salah! <br />
            Jawaban yang benar adalah:
            <strong>{{ question.correct ? 'Benar' : 'Salah' }}</strong>
          </p>

          <!-- Cooldown progress bar inside the modal -->
          <div class="mt-4 w-full">
            <div class="bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <p class="text-gray-700 mt-2">Cooldown: {{ cooldownTime }} detik</p>
          </div>
        </div>
      </div>
    </transition>
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
  computed: {
    // Check if the question contains an image
    isImageQuestion() {
      return this.question.imgQ && this.isImage(this.question.imgQ)
    },
  },
  methods: {
    selectAnswer(answer) {
      if (!this.isCooldown) {
        // Set the selected answer
        this.selectedAnswer = answer

        // Check if the answer is correct
        this.isCorrect = answer === this.question.correct

        if (this.isCorrect) {
          this.$refs.audioCorrect.play()
        }

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
    // Check if a value is an image URL (basic check based on file extension)
    isImage(option) {
      return (
        typeof option === 'string' && option.match(/\.(jpeg|jpg|gif|png|svg)$/i)
      )
    },
  },
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
