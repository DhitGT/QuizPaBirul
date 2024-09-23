<template>
  <section
    class="relative pt-16 overflow-y-hidden w-screen h-screen bg-[#475D7E]"
  >
    <!-- Video Background -->
    <video
      class="absolute top-0 left-0 w-full h-full object-cover bg-[#475D7E]"
      src="bumper.mp4"
      autoplay
      loop
      muted
      playsinline
    ></video>

    <!-- Black Gradient Overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Content Section -->
    <v-container
      class="relative container z-10 py-8 px-4 mx-auto lg:max-w-full max-w-md grid lg:grid-cols-2 gap-8 lg:gap-16"
    >
      <!-- Image with Text Overlay on Mobile -->
      <div class="relative flex justify-center max-w-md lg:hidden rounded-lg">
        <!-- Image -->
        <img
          src="pabirul.jpg"
          alt="Pabirul"
          class="w-full h-auto max-w-md object-contain rounded-lg shadow-lg"
        />
        <!-- Black Gradient Overlay on Image -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-60"
        ></div>
        <!-- Text on Top of the Image -->
        <div class="absolute inset-0 flex flex-col justify-end p-4">
          <p class="text-lg font-normal text-white lg:text-xl">
            By: Ahmad Birul Walid || SMK Negeri 2 Kota Bekasi
          </p>
          <p class="text-lg font-normal text-white lg:text-xl">
            Fase E || Kelas X
          </p>
        </div>
      </div>

      <!-- Left Side: Text Content -->
      <div class="flex flex-col justify-center">
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
        >
          Keselamatan dan Kesehatan Kerja (K3)
        </h1>
        <div class="hidden lg:block">
          <!-- Show the text only on larger screens (outside the image) -->
          <p class="text-lg font-normal text-gray-300 lg:text-xl">
            By: Ahmad Birul Walid || SMK Negeri 2 Kota Bekasi
          </p>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl">
            Fase E || Kelas X
          </p>
        </div>
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 max-h-fit">
          <a
            href="/games"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
            style="color: white"
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
          </a>
          <a
            href="/how"
            class="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-400 focus:outline-none bg-gray-800 rounded-lg border border-gray-600 hover:bg-gray-700"
          >
            Cara Bermain
          </a>
        </div>
      </div>

      <!-- Right Side: Image of Pabirul on Larger Screens -->
      <div class="hidden lg:flex justify-center rounded-lg">
        <img
          src="pabirul.jpg"
          alt="Pabirul"
          class="w-full h-auto max-w-md object-contain rounded-lg shadow-lg"
        />
      </div>
    </v-container>
  </section>
</template>

<style scoped>
/* Ensure the video is positioned correctly */
video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the video covers the area */
  z-index: 1; /* Place video behind text and image */
}

/* Gradient overlay */
.bg-black {
  background-color: rgb(0, 0, 0); /* Black gradient overlay */
  z-index: 3;
}

.bg-gradient-to-t {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    transparent
  ); /* Soften the gradient */
}

/* Ensure content is visible above the video */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.z-10 {
  z-index: 10; /* Ensure content is above the video */
}

@media (min-width: 768px) {
  /* Adjust gradient intensity on medium screens */
  .bg-gradient-to-t {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  }
}
</style>
