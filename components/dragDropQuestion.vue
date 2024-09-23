<template>
  <div class="flex flex-col py-20 items-center justify-center min-h-screen">
    <h2 class="text-2xl font-bold text-white mb-4">Soal Level {{ level }}</h2>
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-xl">
      <p class="text-lg mb-4 text-gray-900">{{ question.text }}</p>

      <!-- Drag and Drop Container -->
      <div class="grid grid-cols-2 gap-4">
        <!-- Draggable options -->
        <div>
          <h3 class="text-lg font-bold mb-2">Opsi:</h3>
          <draggable
            v-model="draggableOptions"
            group="options"
            :disabled="isCooldown"
            class="bg-gray-100 p-4 rounded-lg min-h-[200px]"
          >
            <div
              v-for="(option, index) in draggableOptions"
              :key="index"
              class="bg-blue-100 p-3 mb-2 rounded-lg cursor-pointer flex items-center justify-center"
            >
              <!-- Display image or text based on option type -->
              <img
                v-if="isImage(option)"
                :src="option"
                alt="Option Image"
                class="w-full object-contain max-h-24"
              />
              <span v-else>{{ option }}</span>
            </div>
          </draggable>
        </div>

        <!-- Drop target (answer area) -->
        <div>
          <h3 class="text-lg font-bold mb-2">Tempatkan Jawaban di Sini:</h3>
          <draggable
            v-model="draggableAnswer"
            group="options"
            class="bg-gray-100 p-4 rounded-lg min-h-[200px]"
          >
            <div
              v-for="(option, index) in draggableAnswer"
              :key="index"
              class="bg-blue-300 p-3 mb-2 rounded-lg cursor-pointer flex items-center justify-center"
            >
              <!-- Display image or text based on option type -->
              <img
                v-if="isImage(option)"
                :src="option"
                alt="Answer Image"
                class="w-full object-contain max-h-24"
              />
              <span v-else>{{ option }}</span>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <!-- Modal for Feedback -->
    <transition name="modal-fade">
      <div
        v-if="selectedAnswer !== null"
        class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
          <p class="text-lg mb-4">
            Anda memilih: <strong>{{ selectedAnswer }}</strong>
          </p>
          <p v-if="isCorrect" class="text-green-500 text-xl">
            ✔️ Jawaban Anda Benar!
          </p>
          <p v-else class="text-red-500 text-xl">
            ❌ Jawaban Anda Salah! <br />
            Jawaban yang benar adalah:
            <strong>{{ question.correct.join(', ') }}</strong>
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

    <button
      @click="checkAnswer"
      :disabled="draggableAnswer.length === 0 || isCooldown"
      class="bg-green-500 text-white py-2 px-6 mt-4 rounded-lg hover:bg-green-600 transition"
    >
      Submit Jawaban
    </button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
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
      draggableOptions: this.question.options,
      draggableAnswer: [],
      progress: 0,
      cooldownTime: 3, // Cooldown time in seconds
    }
  },
  watch: {
    // Watch for changes in the question and reset options and answers
    question: {
      handler(newQuestion) {
        this.resetDraggableItems(newQuestion)
      },
      immediate: true,
    },
  },
  methods: {
    isImage(option) {
      return (
        typeof option === 'string' && option.match(/\.(jpeg|jpg|gif|png|svg)$/i)
      )
    },
    checkAnswer() {
      if (!this.isCooldown && this.draggableAnswer.length > 0) {
        const selectedAnswers = this.draggableAnswer
        const correctAnswers = this.question.correct

        // Handle both cases: multiple correct answers and single correct answer
        const correctAnswerArray = Array.isArray(correctAnswers)
          ? correctAnswers
          : [correctAnswers]

        // Check if all selected answers are correct
        const allCorrect =
          selectedAnswers.length === correctAnswerArray.length &&
          selectedAnswers.every((answer) => correctAnswerArray.includes(answer))

        this.isCorrect = allCorrect
        this.selectedAnswer = selectedAnswers.join(',')

        this.startCooldown()
      }
    },
    startCooldown() {
      this.isCooldown = true
      this.progress = 0
      this.cooldownTime = 3
      const interval = setInterval(() => {
        this.cooldownTime -= 1
        this.progress += 33
        if (this.cooldownTime <= 0) {
          clearInterval(interval)
          this.isCooldown = false
          this.progress = 0
          this.selectedAnswer = null

          this.$emit('record-answer', this.isCorrect)
          this.$emit('next-question')
        }
      }, 1000)
    },
    resetDraggableItems(newQuestion) {
      // Reset draggable items when question changes
      this.draggableOptions = [...newQuestion.options]
      this.draggableAnswer = []
      this.isCorrect = null
      this.selectedAnswer = null
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
