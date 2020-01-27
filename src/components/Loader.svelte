<script>
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'

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

  let visible
  let message = messages[0]

  onMount(() => {
    const imageinterval = setInterval(() => {
      visible = visible < images.length - 1 ? visible + 1 : 0
    }, 1000)

    const messageinterval = setInterval(() => {
      message = messages[Math.floor(Math.random() * 4)]
    }, 2000)

    return () => {
      clearInterval(imageinterval)
      clearInterval(messageinterval)
    }
  })

  export let hide
</script>

{#if hide === false}
  <div in:fade|local>
    <div class="images">
      {#each images as src, i}
        {#if visible === i}
          <img {src} alt="" in:fly={{ x: 20 }} out:fly={{ x: -20 }} />
        {/if}
      {/each}
    </div>
    <p class="message">{message}...</p>
  </div>
{/if}

<style>
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
  }
</style>
