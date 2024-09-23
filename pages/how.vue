<template>
  <div>
    <navbar />
    <div
      class="min-h-screen flex flex-col py-24 items-center justify-center bg-gray-900"
    >
      <h1 class="text-3xl font-bold text-white mb-8">Cara Bermain</h1>

      <!-- Instruction Images -->
      <div class="flex md:flex-row flex-col items-center gap-8">
        <!-- Multiple Choice -->
        <div class="text-center">
          <img
            src="1.png"
            alt="Multiple Choice Icon"
            class="w-96 object-contain"
          />
        </div>

        <!-- True/False -->
        <div class="text-center">
          <img src="2.png" alt="True False Icon" class="w-96 object-contain" />
        </div>

        <!-- Drag and Drop -->
        <div class="text-center">
          <img src="/3.png" alt="Drag Drop Icon" class="w-96 object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowToPlay',
}
</script>

<style scoped>
/* Add any additional styling you want here */
</style>
