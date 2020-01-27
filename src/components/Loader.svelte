<script>
  import { fade, fly } from 'svelte/transition'
  import { createEventDispatcher, onMount } from 'svelte'

  const images = [
    'images/cloud-lightning.svg',
    'images/cloud-night-half.svg',
    'images/cloud.svg',
    'images/half-moon.svg',
    'images/moon.svg',
    'images/night-cloud-full.svg',
    'images/rain-lightning.svg',
    'images/rain-night.svg',
    'images/rain.svg',
    'images/sunny-cloud.svg',
    'images/sunny-rain.svg',
    'images/sunny.svg',
  ]

  const messages = ['Getting location', 'Contacting weather centre', 'Receiving weather conditions', 'Loading app']

  let current = 0
  let message = messages[0]
  let show = true
  const dispatch = createEventDispatcher()

  export let loaded

  onMount(() => {
    const imageinterval = setInterval(() => {
      current = current < images.length - 1 ? current + 1 : 0

      if (loaded && current > 1) {
        show = false
        dispatch('ready')
      }
    }, 1000)

    const messageinterval = setInterval(() => {
      message = messages[Math.floor(Math.random() * 4)]
    }, 2000)

    return () => {
      clearInterval(imageinterval)
      clearInterval(messageinterval)
    }
  })
</script>

{#if show}
  <div class="container" transition:fade|local>
    <div class="images">
      {#each images as src, i}
        {#if current === i}
          <img {src} alt="" in:fly={{ x: 20 }} out:fly={{ x: -20 }} />
        {/if}
      {/each}
    </div>
    <p class="message">{message}...</p>
  </div>
{/if}

<style>
  .container {
    position: relative;
  }
  .images {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  img {
    position: absolute;
  }
  .message {
    position: absolute;
    bottom: 15%;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
  }
  /*.block {
    width: 100vw;
    height: 100vh;
    background: #6fadcd;
  }*/
</style>
