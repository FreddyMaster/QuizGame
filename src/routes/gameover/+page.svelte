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
        <a href="/play">
            <button class="btn bg-blue-500 text-white border-4 border-black">Try Again</button>
            
        </a>

        <form action="?/submitScore&score={value}&categories={balueArray}" method="post">
            <button class="btn" type="submit">Add Score</button>    
        </form>        
        <a href="/leaderboard">
            <button class="btn bg-green-800 text-white border-4 border-black">Veiw Leaderboard</button>
        </a>
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