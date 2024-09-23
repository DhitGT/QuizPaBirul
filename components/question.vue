<template>
  <div class="flex flex-col items-center justify-center min-h-screen pt-16">
    <h2 class="text-2xl font-bold text-white mb-4">Soal Level {{ level }}</h2>
    <audio ref="audioCorrect" src="/correct.mp3"></audio>
    <div
      class="bg-white backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-xl"
    >
      <!-- Display question text and image if both are available -->
      <div class="mb-4">
        <p
          v-if="question.text"
          class="text-2xl font-extrabold mb-4 text-gray-200"
        >
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
            class="w-full text-left py-3 px-4 rounded-lg hover:opacity-80 transition my-3 wood-texture"
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
            class="w-full text-left py-3 px-4 rounded-lg hover:opacity-80 transition my-3 wood-texture"
            :disabled="isCooldown"
            @click="selectAnswer(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for displaying answer feedback and cooldown -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        class="bg-gray-900 rounded-lg shadow-lg p-6 text-center w-[80vw] md:w-1/2"
      >
        <p class="text-lg text-gray-900">
          Anda memilih: {{ selectedAnswer }}
          <span v-if="isCorrect" class="text-green-500">✔️ Benar!</span>
          <span v-else class="text-red-500"
            >❌ Salah!<br />Jawaban yang benar adalah:
            {{ question.correct }}</span
          >
        </p>

        <div class="mt-4 w-full">
          <div class="bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <p class="text-gray-900 mt-2">Cooldown: {{ cooldownTime }} detik</p>
        </div>
      </div>
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
      isCooldown: false,
      progress: 0,
      cooldownTime: 3, // Cooldown time in seconds
      showModal: false, // Controls modal visibility
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
  methods: {
    selectAnswer(option) {
      if (!this.isCooldown) {
        this.selectedAnswer = option
        this.isCorrect = option === this.question.correct
        this.showModal = true // Show modal popup when answer is selected

        // Play correct audio if the answer is correct
        if (this.isCorrect) {
          this.$refs.audioCorrect.play()
        }

        this.startCooldown()
      }
    },
    // Check if a value is an image URL (basic check based on file extension)
    isImage(option) {
      return (
        typeof option === 'string' && option.match(/\.(jpeg|jpg|gif|png|svg)$/i)
      )
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

          // Close modal after cooldown
          this.showModal = false

          this.$emit('record-answer', this.isCorrect) // Emit event to go to the next question
          this.$emit('next-question') // Emit event to go to the next question
        }
      }, 1000)
    },
  },
}
</script>

<style scoped>
.wood-texture {
  background-color: #234234;
  color: white; /* Ensure text is readable on the texture */
  border: none;
}

.bg-white {
  background-color: rgba(255, 255, 255, 0.068);
}

.backdrop-blur-lg {
  backdrop-filter: blur(10px);
}

/* Modal Styles */
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.z-50 {
  z-index: 50;
}
.bg-opacity-50 {
  background-opacity: 0.5;
}
</style>
