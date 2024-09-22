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
            text: 'Pengertian K3 menurut WHO adalah',
            options: [
              'K3 adalah sebuah upaya untuk meningkatkan kualitas produk kerja.',
              'Kesehatan dan Keselamatan Kerja (K3) adalah suatu upaya untuk melindungi pekerja dari risiko kecelakaan kerja serta menjaga kesehatan fisik dan mental selama bekerja.',
              'K3 adalah tindakan untuk mengurangi absensi pekerja.',
              'Kesehatan Kerja adalah cara untuk meningkatkan produktivitas dengan menambah jam kerja',
              'Kesehatan kerja hanya mencakup keselamatan fisik pekerja',
            ],
            correct:
              'Kesehatan dan Keselamatan Kerja (K3) adalah suatu upaya untuk melindungi pekerja dari risiko kecelakaan kerja serta menjaga kesehatan fisik dan mental selama bekerja.',
            type: 'regular',
          },
          {
            text: 'Fungsi K3LH bagi pekerja adalah',
            options: [
              'Melindungi pekerja dari bahaya kecelakaan dan penyakit akibat kerja',
              'Memperpanjang jam kerja agar lebih produktif',
              'Mengurangi gaji untuk biaya keselamatan tambahan',
              'Memberikan sanksi kepada pekerja yang melanggar aturan',
              'Menghentikan semua proses produksi jika ada kecelakaan kecil',
            ],
            correct:
              'Melindungi pekerja dari bahaya kecelakaan dan penyakit akibat kerja',
            type: 'regular',
          },
          {
            text: 'Rambu peringatan ini memiliki makna',
            imgQ: '/k3/Rambu K3 Peringatan (bahaya kebisingan).jpg',
            options: [
              'Rambu Bahaya Kebisingan',
              'Rambu Bahaya Ledakan',
              'Rambu Bahaya Pengisian Baterai',
              'Rambu Bahaya Permukaan Tajam',
              'Rambu Peringatan Mudah Terbakar',
            ],
            correct: 'Rambu Bahaya Kebisingan',
            type: 'regular',
          },
          {
            text: 'Penggunaan warna merah pada rambu K3LH memiliki arti...',
            options: [
              'Mengindikasikan wilayah yang aman untuk bekerja',
              'Menunjukkan tempat untuk beristirahat',
              'Menandakan bahaya atau peringatan yang membutuhkan tindakan segera, seperti rambu darurat atau alat pemadam kebakaran',
              'Menandakan area yang memerlukan perlindungan ekstra',
              'Tempat penyimpanan barang-barang penting',
            ],
            correct:
              'Menandakan bahaya atau peringatan yang membutuhkan tindakan segera, seperti rambu darurat atau alat pemadam kebakaran',
            type: 'regular',
          },
          {
            text: 'Dua jenis limbah B3 yang ada dalam bidang manufaktur otomotif adalah',
            options: [
              'Oli bekas & Baterai bekas',
              'Kertas bekas & Plastik pembungkus',
              'Kaleng soda & Kardus bekas',
              'Serbuk kayu & Sisa makanan',
              'Besi tua & Plastik botol',
            ],
            correct: 'Oli bekas & Baterai bekas',
            type: 'regular',
          },
        ],
        2: [
          {
            text: 'Pengertian jenis limbah b3 dari rambu peringatan diatas adalah',
            imgQ: '/k3/korosif.png',
            options: [
              'Limbah mudah meledak (Hal ini dikarenakan bahwa limbah tersebut bisa menghasilkan gas dan suhu melalui reaksi fisika dan kimia yang sederhana sekalipun)',
              'Limbah Pengoksidasi (limbah pengoksidasi ialah limbah yang mampu melepaskan panas karena teroksidasi sehingga dapat menimbulkan api saat bereaksi dengan bahan kimia lainnya)',
              'Limbah Korosif (Sifat korosif yang dimaksud ialah limbah yang mempunyai ciri untuk dapat menimbulkan iritasi pada kulit, menyebabkan pengkaratan pada baja, memiliki tingkat keasaman pH kurang dari 2 atau pH lebih dari 12,5)',
              'd.	Limbah iritasi (limbah tersebut dapat menyebabkan sensitasi pada kulit manusia, peradangan hingga iritasi pada pernapasan, pusing dan menyebabkan rasa mengantuk apabila seseorang menghirup limbah tersebut)',
              'e.	Limbah berbahaya bagi lingkungan (limbah tersebut diketahui dapat menimbulkan kerusakan bagi lingkungan maupun kerusakan pada ekosistem tertentu)',
            ],
            correct:
              'Limbah Korosif (Sifat korosif yang dimaksud ialah limbah yang mempunyai ciri untuk dapat menimbulkan iritasi pada kulit, menyebabkan pengkaratan pada baja, memiliki tingkat keasaman pH kurang dari 2 atau pH lebih dari 12,5)',
            type: 'regular',
          },
          {
            text: 'Nama dan fungsi alat pelindung ini adalah',
            imgQ: '/k3/Masker (Respirator).png',
            options: [
              'Masker / Respirator (berfungsi untuk menyaring udara yang digunakan ketika pekerja bernafas)',
              'Kacamata Safety (berfungsi untuk melindungi mata dari percikan benda kerja maupun cahaya yang dapat membahayakan mata)',
              'Ear Plug / Penutup Telinga (berfungsi untuk melindungi telinga pekerja dari suara bising yang dapat merusak pendengaran pekerja)',
              'Safety Helmet (berfungsi untuk melindungi kepala dari berbagai macam bahaya yang dapat mengenai kepala secara langsung)',
              'Safety belt (berfungsi untuk melindungi pekerja agar tetap pada posisi aman)',
            ],
            correct:
              'Masker / Respirator (berfungsi untuk menyaring udara yang digunakan ketika pekerja bernafas)',
            type: 'regular',
          },
          {
            text: 'Arti simbol ini adalah',
            imgQ: '/k3/WARNING (ORANGE).jpg',
            options: [
              'Mengindikasikan bahaya, pemberhentian, atau adanya peralatan perlindungan dari kebakaran',
              'Menunjukkan kehati-hatian dan digunakan untuk menandakan peralatan yang tidak boleh untuk digunakan',
              'Menandakan bagian berbahaya dari mesin atau peralatan yang berenergi yang dapat menyebabkan tergores, terpotong, tertabrak, tersetrum, atau melukai pekerja',
              'Menandakan bahaya fisik dan berarti peringatan/hati-hati',
              'Digunakan untuk bahaya radiasi',
            ],
            correct:
              'Menandakan bagian berbahaya dari mesin atau peralatan yang berenergi yang dapat menyebabkan tergores, terpotong, tertabrak, tersetrum, atau melukai pekerja',
            type: 'regular',
          },
          {
            text: 'Arti simbol ini adalah',
            imgQ: '/k3/DANGER (RED).jpg',
            options: [
              'Mengindikasikan bahaya, pemberhentian, atau adanya peralatan perlindungan dari kebakaran',
              'Menunjukkan kehati-hatian dan digunakan untuk menandakan peralatan yang tidak boleh untuk digunakan',
              'Menandakan bagian berbahaya dari mesin atau peralatan yang berenergi yang dapat menyebabkan tergores, terpotong, tertabrak, tersetrum, atau melukai pekerja',
              'Menandakan bahaya fisik dan berarti peringatan/hati-hati',
              'Digunakan untuk bahaya radiasi',
            ],
            correct:
              'Mengindikasikan bahaya, pemberhentian, atau adanya peralatan perlindungan dari kebakaran',
            type: 'regular',
          },
          {
            text: 'Fungsi dari rambu K3 ini adalah',
            imgQ: '/k3/Rambu K3 Peringatan (bahaya jatuhnya tumpukan barang).jpg',
            options: [
              'Rambu bahaya jatuhnya tumpukan barang',
              'Rambu bahaya permukaan tajam',
              'Rambu bahaya permukaan panas',
              'Rambu bahaya benda berputar',
              'Rambu bahaya kebisingan',
            ],
            correct: 'Rambu bahaya jatuhnya tumpukan barang',
            type: 'regular',
          },
        ],
        3: [
          {
            text: 'Benar Atau Salah rambu ini memiliki fungsi “bahaya tengangan tinggi”  ?',
            imgQ: '/k3/Rambu K3 Peringatan (bahaya tegangan tinggi).jpg',
            correct: true,
            type: 'true-false',
          },
          {
            text: 'Benar Atau Salah rambu ini memiliki fungsi “Rambu Bahaya Permukaan Tajam”',
            imgQ: '/k3/Rambu K3 Peringatan (bahaya radioaktif).jpg',
            correct: false,
            type: 'true-false',
          },
          {
            text: 'Benar Atau Salah rambu ini memiliki fungsi “Bahaya benda berputar” ',
            imgQ: '/k3/Rambu K3 Peringatan (bahaya benda berputar).jpg',
            correct: true,
            type: 'true-false',
          },
          {
            text: 'Benar Atau Salah rambu ini memiliki informasi tentang “Dilarang Membuat Api Terbuka”',
            imgQ: '/k3/Rambu K3 Peringatan (mudah terbakar).jpg',
            correct: false,
            type: 'true-false',
          },
          {
            text: 'Benar Atau Salah rambu ini memiliki informasi tentang “Dilarang Mendekat Area Tegangan Listrik Tinggi” ',
            imgQ: '/k3/Rambu K3 Larangan(dilarang mendekat area tengangan tinggi).jpg',
            correct: true,
            type: 'true-false',
          },
        ],
        4: [
          {
            text: 'Tempatkan alat pelindung diri (APD) yang termasuk dalam kategori wajib digunakan di lokasi konstruksi.',
            options: [
              '/k3/Safety Helmet (Helm Safety).png',
              '/k3/Kacamata Safety (Safety Glasses).png',
              '/k3/topi.jpeg',
              '/k3/sandal.jpeg',
              '/k3/Sepatu Safety (Safety Shoes).png',
            ],
            correct: [
              '/k3/Safety Helmet (Helm Safety).png',
              '/k3/Kacamata Safety (Safety Glasses).png',
              '/k3/Sepatu Safety (Safety Shoes).png',
            ],
            type: 'drag',
          },
          {
            text: 'Kelompokkan jenis bahan berbahaya di tempat kerja.',
            options: [
              '/k3/bahan bakar.jpeg',
              '/k3/sabun.jpeg',
              '/k3/minyak goreng.jpeg',
              '/k3/bahan kimia.jpeg',
              '/k3/air minum.jpeg',
            ],
            correct: ['/k3/bahan bakar.jpeg', '/k3/bahan kimia.jpeg'],
            type: 'drag',
          },
          {
            text: 'Identifikasi alat yang digunakan untuk mencegah kebakaran.',
            options: [
              '/k3/pemadam api.jpeg',
              '/k3/bahan kimia.jpeg',
              '/k3/bahan bakar.jpeg',
              '/k3/fire sprinkler.jpeg',
              '/k3/pembersih kaca.jpeg',
            ],
            correct: ['/k3/pemadam api.jpeg', '/k3/fire sprinkler.jpeg'],
            type: 'drag',
          },
          {
            text: 'Tentukan jenis APD yang diperlukan untuk bekerja di ketinggian.',
            options: [
              '/k3/Safety Belt (Sabuk Pengaman).png',
              '/k3/topi.jpeg',
              '/k3/Safety Helmet (Helm Safety).png',
              '/k3/Masker (Respirator).png',
              '/k3/Ear Plug (Penutup Telinga).png',
            ],
            correct: [
              '/k3/Safety Belt (Sabuk Pengaman).png',
              '/k3/Safety Helmet (Helm Safety).png',
            ],
            type: 'drag',
          },
          {
            text: 'Kelompokkan peringatan yang terkait dengan rambu larangan',
            options: [
              '/k3/Rambu K3 Larangan(dilarang memadamkan dengan air).jpg',
              '/k3/Rambu K3 Larangan(dilarang merokok).jpg',
              '/k3/Limbah Beracun.png',
              '/k3/Rambu K3 Peringatan (mudah terbakar).jpg',
              '/k3/Rambu K3 Peringatan (bahaya tegangan tinggi).jpg',
            ],
            correct: [
              '/k3/Rambu K3 Larangan(dilarang memadamkan dengan air).jpg',
              '/k3/Rambu K3 Larangan(dilarang merokok).jpg',
            ],
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
