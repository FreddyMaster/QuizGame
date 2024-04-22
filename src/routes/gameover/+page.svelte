<script>
    // @ts-nocheck
    import "$lib/app.css";
    import { score,selectedCategories } from "$lib/stores.js";
    import { onMount } from "svelte";
    
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
    <!-- Game Interface Section -->
    <div class="text-center">
        <h1 class="text-black text-6xl">Game Over!</h1>
        <h3 class="text-lg text-black">You got {#if points === $score}<strong class="text-red-600"> {points} </strong>{:else} <span class="text-red-600">{points}</span> {/if} {$score === 1 ? "question" : "questions"} right.</h3>
        <div class="flex flex-row justify-center align-middle">
            <a href="/play">
                <button class="btn bg-primary text-white">Try Again</button>
            </a>

            <form action="?/submitScore&score={value}&categories={balueArray}" method="post">
                <button type="submit" class="btn bg-secondary text-white">Add Score</button>    
            </form> 

            <a href="/leaderboard">
                <button class="btn bg-neutral text-white">Leaderboard</button>
            </a>
    </div>
    </div>
    <style>
        h1 {
            font-family: "Permanent Marker", cursive;
            padding-bottom: 75px;
        }
        button{
            font-family: "Permanent Marker", cursive;

        }
    </style>
</main>