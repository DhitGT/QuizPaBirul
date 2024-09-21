<template>
  <div>
    <question
      v-if="currentQuestion"
      :level="level"
      :question="currentQuestion"
      @next-question="goToNextQuestion"
      @record-answer="recordAnswer"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      level: parseInt(this.$route.params.level) || 1,
      questions: {}, // Load your questions here
      currentQuestionIndex: 0,
      correctAnswers: 0, // Track correct answers
      incorrectAnswers: 0, // Track incorrect answers
    }
  },
  computed: {
    currentQuestion() {
      // Check if the level exists and if the current index is valid
      if (
        this.questions[this.level] &&
        this.currentQuestionIndex < this.questions[this.level].length
      ) {
        return this.questions[this.level][this.currentQuestionIndex]
      }
      return null // Return null if there's no valid question
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
          },
          {
            text: 'Apa ibukota Indonesia?',
            options: ['Jakarta', 'Bandung', 'Surabaya', 'Medan'],
            correct: 'Jakarta',
          },
          {
            text: 'Siapa presiden pertama Indonesia?',
            options: ['Sukarno', 'Suharto', 'Jokowi', 'B.J. Habibie'],
            correct: 'Sukarno',
          },
          {
            text: 'Apa nama hewan yang bisa terbang?',
            options: ['Kucing', 'Burung', 'Anjing', 'Ikan'],
            correct: 'Burung',
          },
          {
            text: 'Siapa penemu telepon?',
            options: [
              'Alexander Graham Bell',
              'Thomas Edison',
              'Nikola Tesla',
              'Isaac Newton',
            ],
            correct: 'Alexander Graham Bell',
          },
        ],
        2: [
          {
            text: 'Apa ibukota Jepang?',
            options: ['Tokyo', 'Seoul', 'Beijing', 'Bangkok'],
            correct: 'Tokyo',
          },
          {
            text: 'Siapa penulis Harry Potter?',
            options: [
              'J.K. Rowling',
              'Stephen King',
              'George R.R. Martin',
              'Tolkien',
            ],
            correct: 'J.K. Rowling',
          },
          {
            text: 'Apa nama planet kedua dari matahari?',
            options: ['Bumi', 'Venus', 'Mars', 'Merkurius'],
            correct: 'Venus',
          },
          {
            text: 'Apa nama benua terbesar?',
            options: ['Afrika', 'Asia', 'Eropa', 'Amerika'],
            correct: 'Asia',
          },
          {
            text: 'Siapa yang menciptakan teori relativitas?',
            options: [
              'Isaac Newton',
              'Albert Einstein',
              'Galileo',
              'Nikola Tesla',
            ],
            correct: 'Albert Einstein',
          },
        ],
        3: [
          {
            text: 'Apa ibu kota Perancis?',
            options: ['Paris', 'London', 'Berlin', 'Madrid'],
            correct: 'Paris',
          },
          {
            text: 'Apa alat musik yang memiliki 88 tuts?',
            options: ['Gitar', 'Biola', 'Piano', 'Drum'],
            correct: 'Piano',
          },
          {
            text: 'Apa gas yang kita hirup?',
            options: ['Karbon dioksida', 'Oksigen', 'Hidrogen', 'Nitrogen'],
            correct: 'Oksigen',
          },
          {
            text: 'Siapa pelukis Mona Lisa?',
            options: [
              'Vincent van Gogh',
              'Pablo Picasso',
              'Leonardo da Vinci',
              'Claude Monet',
            ],
            correct: 'Leonardo da Vinci',
          },
          {
            text: 'Apa nama sungai terpanjang di dunia?',
            options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
            correct: 'Nile',
          },
        ],
        4: [
          {
            text: 'Apa nama hewan terbesar di darat?',
            options: ['Gajah', 'Jerapah', 'Bison', 'Kuda'],
            correct: 'Gajah',
          },
          {
            text: 'Apa nama kota terpadat di dunia?',
            options: ['Tokyo', 'Delhi', 'Shanghai', 'Sao Paulo'],
            correct: 'Tokyo',
          },
          {
            text: 'Apa bahan utama dalam roti?',
            options: ['Gula', 'Garam', 'Tepung', 'Susu'],
            correct: 'Tepung',
          },
          {
            text: 'Apa nama sistem planet kita?',
            options: [
              'Galaksi Bima Sakti',
              'Galaksi Andromeda',
              'Galaksi Sombrero',
              'Galaksi Triangulum',
            ],
            correct: 'Galaksi Bima Sakti',
          },
          {
            text: 'Siapa penemu hukum gravitasi?',
            options: [
              'Albert Einstein',
              'Isaac Newton',
              'Galileo',
              'Nikola Tesla',
            ],
            correct: 'Isaac Newton',
          },
        ],
      }
    },
    goToNextQuestion() {
      this.currentQuestionIndex++
      if (this.currentQuestionIndex >= this.questions[this.level].length) {
        // Save user progress
        const levelProgress = {
          level: this.level,
          score: this.correctAnswers,
          correct: this.correctAnswers,
          incorrect: this.incorrectAnswers,
          totalQuestions: this.questions[this.level].length,
        }

        let user
        const userInfo = this.$cookies.get('user_info')
        if (userInfo) {
          user = JSON.parse(userInfo)
          this.level
        }

        const usernew = {
          name: user.name,
          class: user.class,
          currentLevel: this.level,
        }
        this.$cookies.set('user_info', JSON.stringify(usernew), { expires: 7 }) // expires in 7 days

        this.$cookies.set(
          `level_info_${this.level}`,
          JSON.stringify(levelProgress),
          { expires: 7 }
        ) // expires in 7 days

        // Check if there are more levels
        if (this.level < 4) {
          this.currentQuestionIndex = 0 // Reset index for the new level
          this.correctAnswers = 0 // Reset correct answers for new level
          this.incorrectAnswers = 0 // Reset incorrect answers for new level
          alert(`Level ${this.level - 1} selesai!`)
        } else {
          // Handle completion logic
          alert('Quiz selesai!') // Replace with your desired logic
        }

        // Redirect to games page after completing the level or quiz
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
