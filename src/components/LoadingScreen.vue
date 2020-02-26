<template>
  <div id="loadingScreen">
    <div
      class="container d-flex flex-column justify-content-center align-items-center h-100 p-5"
    >
      <h2 class="mb-5">Loading...</h2>
      <div class="progress w-100">
        <div class="progress-bar bg-success" role="progressbar"></div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="sass" scoped>
#loadingScreen
  width: 100%
  height: 100%
  background: black
  .progress-bar
    animation: loading 100ms forwards

@keyframes loading
  0%
    width: 0%
  100%
    width: 100%
</style>
