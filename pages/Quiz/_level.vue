<template>
  <div>
    <navbar />
    <div class="container">
      <!-- Conditionally render the question type -->
      <drag-drop-question
        v-if="currentQuestion && currentQuestion.type === 'drag'"
        :level="level"
        :question="currentQuestion"
        @next-question="goToNextQuestion"
        @record-answer="recordAnswer"
      />
      <question
        v-else-if="currentQuestion && currentQuestion.type === 'regular'"
        :level="level"
        :question="currentQuestion"
        @next-question="goToNextQuestion"
        @record-answer="recordAnswer"
      />
      <yes-no-question
        v-else-if="currentQuestion && currentQuestion.type === 'true-false'"
        :level="level"
        :question="currentQuestion"
        @next-question="goToNextQuestion"
        @record-answer="recordAnswer"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      level: parseInt(this.$route.params.level) || 1,
      questions: {},
      currentQuestionIndex: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
    }
  },
  computed: {
    currentQuestion() {
      if (
        this.questions[this.level] &&
        this.currentQuestionIndex < this.questions[this.level].length
      ) {
        return this.questions[this.level][this.currentQuestionIndex]
      }
      return null
    },
  },
  methods: {
    loadQuestions() {
      this.questions = {
        1: [
          {
            text: 'Apa warna langit pada hari cerah?',
            options: ['Merah', 'Biru', 'Hijau', 'Kuning'],
            correct: 'Biru',
            type: 'regular',
          },
          {
            text: 'Apa ibukota Indonesia?',
            options: ['Jakarta', 'Bandung', 'Surabaya', 'Medan'],
            correct: 'Jakarta',
            type: 'regular',
          },
          {
            text: 'Apa nama presiden pertama Indonesia?',
            options: [
              'Soeharto',
              'B.J. Habibie',
              'Soekarno',
              'Susilo Bambang Yudhoyono',
            ],
            correct: 'Soekarno',
            type: 'regular',
          },
          {
            text: 'Siapa penemu lampu pijar?',
            options: [
              'Alexander Graham Bell',
              'Thomas Edison',
              'Nikola Tesla',
              'Isaac Newton',
            ],
            correct: 'Thomas Edison',
            type: 'regular',
          },
          {
            text: 'Apa bentuk bumi?',
            options: ['Datar', 'Bulat', 'Tabung', 'Piramida'],
            correct: 'Bulat',
            type: 'regular',
          },
        ],
        2: [
          {
            text: 'Siapa yang menulis "Laskar Pelangi"?',
            options: [
              'Andrea Hirata',
              'Habibie',
              'Tere Liye',
              'Pramoedya Ananta Toer',
            ],
            correct: 'Andrea Hirata',
            type: 'regular',
          },
          {
            text: 'Berapa banyak pulau di Indonesia?',
            options: ['13.000', '17.000', '18.000', '15.000'],
            correct: '17.000',
            type: 'regular',
          },
          {
            text: 'Siapa penemu hukum gravitasi?',
            options: ['Einstein', 'Newton', 'Galileo', 'Kepler'],
            correct: 'Newton',
            type: 'regular',
          },
          {
            text: 'Apa warna bendera Indonesia?',
            options: [
              'Merah Putih',
              'Biru Putih',
              'Hijau Putih',
              'Kuning Putih',
            ],
            correct: 'Merah Putih',
            type: 'regular',
          },
          {
            text: 'Apa mata uang Indonesia?',
            options: ['Dollar', 'Euro', 'Rupiah', 'Yen'],
            correct: 'Rupiah',
            type: 'regular',
          },
        ],
        3: [
          {
            text: 'Apakah Indonesia adalah negara kepulauan?',
            correct: true,
            type: 'true-false',
          },
          {
            text: 'Apakah bumi datar?',
            correct: false,
            type: 'true-false',
          },
          {
            text: 'Apakah hewan dapat bernafas tanpa oksigen?',
            correct: false,
            type: 'true-false',
          },
          {
            text: 'Apakah semua burung bisa terbang?',
            correct: false,
            type: 'true-false',
          },
          {
            text: 'Apakah tanaman membutuhkan cahaya matahari untuk fotosintesis?',
            correct: true,
            type: 'true-false',
          },
        ],
        4: [
          {
            text: 'Mana logo yang benar?',
            options: ['/logo1.png', '/logo2.png', '/logo3.png', '/logo4.png'],
            correct: '/logo2.png',
            type: 'drag',
          },
          {
            text: 'Tempatkan gambar berikut ke kategori yang tepat.',
            options: [
              '/gambar1.png',
              '/gambar2.png',
              '/gambar3.png',
              '/gambar4.png',
            ],
            correct: ['/gambar2.png', '/gambar4.png'],
            type: 'drag',
          },
          {
            text: 'Tempatkan hewan ke dalam kelompok mamalia.',
            options: ['/anjing.png', '/ikan.png', '/kucing.png', '/burung.png'],
            correct: ['/anjing.png', '/kucing.png'],
            type: 'drag',
          },
          {
            text: 'Mana buah yang sehat?',
            options: ['/apel.png', '/keripik.png', '/pisang.png', '/cola.png'],
            correct: ['/apel.png', '/pisang.png'],
            type: 'drag',
          },
          {
            text: 'Tempatkan warna ke kategori hangat dan dingin.',
            options: ['/merah.png', '/biru.png', '/kuning.png', '/hijau.png'],
            correct: ['/merah.png', '/kuning.png'], // Hot colors
            type: 'drag',
          },
        ],
      }
    },
    goToNextQuestion() {
      this.currentQuestionIndex++
      if (this.currentQuestionIndex >= this.questions[this.level].length) {
        const levelProgress = {
          level: this.level,
          score: this.correctAnswers,
          correct: this.correctAnswers,
          incorrect: this.incorrectAnswers,
          totalQuestions: this.questions[this.level].length,
        }

        const userInfo = this.$cookies.get('user_info')
        let user
        if (userInfo) {
          user = JSON.parse(userInfo)
        }

        const updatedUser = {
          name: user.name,
          class: user.class,
          currentLevel: this.level,
        }
        this.$cookies.set('user_info', JSON.stringify(updatedUser), {
          expires: 7,
        })
        this.$cookies.set(
          `level_info_${this.level}`,
          JSON.stringify(levelProgress),
          { expires: 7 }
        )

        if (this.level < 4) {
          this.currentQuestionIndex = 0
          this.correctAnswers = 0
          this.incorrectAnswers = 0
          alert(`Level ${this.level} selesai!`)
        } else {
          alert('Quiz selesai!')
        }

        window.location.href = '/games'
      }
    },
    recordAnswer(isCorrect) {
      if (isCorrect) {
        this.correctAnswers++
      } else {
        this.incorrectAnswers++
      }
    },
  },
  mounted() {
    this.loadQuestions()
  },
}
</script>
