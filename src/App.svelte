<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { getWeatherData, icons } from './helpers'
  import Loader from './components/Loader.svelte'

  let data

  onMount(async () => {
    data = await getWeatherData()
    console.log(data)
  })
</script>

<main>
  <Loader hide={Boolean(data)} />

  {#if data}
    <div in:fade|local>
      <header>
        <h1>
          <span>{data.location}</span>
        </h1>
        <img src="https://source.unsplash.com/1600x900/?nature,{data.description}" alt="" class="lazyload" />
      </header>

      <img src={icons[data.description] || icons.default} alt="" />

    </div>
  {/if}
</main>

<style>
  main {
    margin: 0 auto;
  }
  header {
    position: relative;
    z-index: 5;
  }
  h1 {
    position: relative;
    margin: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: 2.5rem;
    z-index: 5;
  }
  h1 span {
    position: relative;
    z-index: 10;
  }
  h1::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 300px;
    object-fit: cover;
  }
</style>
