<script>
    // @ts-nocheck
    import "$lib/app.css";
    import { score,selectedCategories } from "$lib/stores.js";
    import { onMount } from "svelte";
    import  Icon  from "@iconify/svelte";
    
    import { get } from 'svelte/store';
    //import { enhance } from '$app/forms'

    let points = 0;

    onMount(() => {
    setInterval(() => {
      if (points < $score) {
        points+=1;
      }
    }, 500);
  });
  const value = get(score);
  let balue = get(selectedCategories);
  const balueArray = [].concat(...balue.map(obj => obj.category));
console.log(value," ", balueArray);


</script>



<main>

    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-sky-300 p-4">
        <div class="card w-full max-w-md bg-base-100 shadow-xl">
          <div class="card-body">
            <div
              class="space-y-6"
            >
              <div class="text-center space-y-4">
                <h1 class="text-4xl md:text-5xl font-bold text-primary">
                  Game Over!
                </h1>
                <div class="relative">
                  <div
                    class="text-xl text-neutral"
                  >
                    You got <span class="font-bold text-2xl text-primary">{value}</span> right
                </div>
                  

                </div>
              </div>
      
              <div class="flex flex-col gap-4">
                <a href="/play">
                <button class="btn btn-primary w-full">
                  <Icon icon="lucide:rotate-ccw" height="16" width="16" class="mr-2 text-white" />
                  Try Again
                </button>
                </a>
      
                <div class="grid grid-cols-2 gap-4">
                    <form action="?/submitScore&score={value}&categories={balueArray}" method="post">
                  <button type="submit" class="btn w-full">
                    Add Score
                  </button>
                </form>
                <a href="/leaderboard">
                  <button class="btn btn-outline btn-secondary w-full">
                    <Icon icon="lucide:list-ordered" height="16" width="16" class="mr-2" />
                    Leaderboard
                  </button>
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</main>