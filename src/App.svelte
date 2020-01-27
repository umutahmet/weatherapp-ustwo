<script>
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { getWeatherData, icons } from './helpers'
  import Loader from './components/Loader.svelte'

  let data
  let error = false
  let show
  let celcius = true

  function ready() {
    show = true
  }

  onMount(async () => {
    data = await getWeatherData()
    console.log(data)

    if (!data.location) {
      error = true
    }
  })
</script>

<main class:hasError={error}>
  <Loader loaded={Boolean(data)} on:ready={ready} />

  {#if show}
    <div transition:fade|local>
      {#if !error}
        <p class="location" in:fly={{ y: 20, duration: 2000, delay: 500 }}>{data.location}</p>

        <div class="icon" in:fly={{ y: 20, duration: 2000, delay: 600 }}>
          <img src={icons[data.description] || icons.default} alt="" />
        </div>

        <div class="temp" in:fly={{ y: 20, duration: 2000, delay: 700 }} on:click={() => (celcius = !celcius)}>
          <div>{data.temp[celcius ? 'c' : 'f']}&deg;</div>

          <div class="measurements">
            <span class:selected={celcius}>C</span>
            |
            <span class:selected={!celcius}>F</span>
          </div>
        </div>
        <div class="details" in:fly={{ y: 20, duration: 2000, delay: 800 }}>
          <div class="row">
            <div class="label">Wind</div>
            <div class="value">
              {data.wind.speed}km/h
              <strong>{data.wind.direction}</strong>
            </div>
          </div>
          <div class="row">
            <div class="label">Humidity</div>
            <div class="value">{data.humidity}%</div>
          </div>
          <div class="row">
            <div class="label">Pressure</div>
            <div class="value">{data.pressure} hPa</div>
          </div>
        </div>
      {:else}
        <div class="error">
          <p class="error-msg" in:fly={{ y: -20 }}>{data}</p>
          <img
            src="https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="" />
        </div>
      {/if}
    </div>
  {/if}

</main>

<style>
  main {
    padding: 0 2rem;
    margin: 0 auto;
    max-width: 460px;
  }
  main.hasError {
    padding: 0;
  }
  .location {
    font-size: 2.6rem;
    font-weight: 700;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 0;
  }
  .temp {
    margin: 0;
    font-size: 7rem;
    line-height: 1;
    font-weight: 800;
    text-align: center;
  }
  .measurements {
    text-align: center;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  .measurements span {
    color: #999;
  }
  .measurements :global(.selected) {
    color: black;
  }
  .icon {
    text-align: center;
  }
  .icon img {
    margin-top: 2rem;
    margin-bottom: 2rem;
    min-width: 100%;
    max-height: 140px;
  }
  .details {
    margin-top: 2rem;
    font-size: 1.5rem;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .label {
    font-weight: 700;
  }
  .error {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #212121;
  }
  .error img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .error-msg {
    color: white;
    font-size: 1.8rem;
    text-align: center;
    padding: 2rem;
    position: relative;
    z-index: 10;
  }
</style>
