<script>
    import "$lib/app.css";
    import { score, selectedCategories } from "$lib/stores.js";
    import {categoriesIcons, colors } from "$lib/stores.js";
    export let data;
    let arr = [];
    $: ({ scores } = data);
    function CutAndArray(value){
    arr = value.split(",")
        return arr.join(" , ")
    }


    var index = 0;
</script>
<main>
    <h1 class="text-5xl text-black text-center p-5">Leaderboard</h1>
    <div class=" mx-80 p-5 flex flex-col justify-center">
    {#each scores as rank, index }
        {#if index== 0}
        <div class="flex flex-col bg-yellow-200 rounded-full border-4 border-yellow-500 p-2 m-2">
            <h4 class="text-2xl text-black text-center"><strong class="text-yellow-500">{index+1}</strong> : {rank.username} | Score:
                <strong class="text-red-500">{rank.score}</strong> | 
                {String(rank.time).substring(3,25)} <br>
                {CutAndArray(rank.categories)}</h4>
        </div>
        {:else if index== 1}
        <div class="flex flex-col bg-gray-300 rounded-full border-4 border-gray-400 p-2 m-2">
            <h4 class="text-xl text-black text-center"><strong class="text-gray-400">{index+1}</strong> : {rank.username} | Score:
                <strong class="text-red-500">{rank.score}</strong> | 
                {String(rank.time).substring(3,25)}<br>
                {CutAndArray(rank.categories)}</h4>
        </div>
        {:else if index== 2}
        <div class="flex flex-col bg-orange-300 rounded-full border-4 border-amber-700 p-2 m-2">
            <h4 class="text-large text-black text-center"><strong class="text-amber-700">{index+1}</strong> : {rank.username} | Score:
                <strong class="text-red-500">{rank.score}</strong> | 
                {String(rank.time).substring(3,25)}<br>
                {CutAndArray(rank.categories)}</h4>
        </div>
        {:else}
        <div class="flex flex-col p-2 m-2">
            <h4 class=" text-black text-center text-xs"><strong>{index+1}</strong> : {rank.username} | Score:
                <strong>{rank.score}</strong> | 
                {String(rank.time).substring(3,25)} <br>
                {CutAndArray(rank.categories)}</h4>
        </div>        
        {/if}
    {/each}
    </div>
    <style>
        h1 {
            font-family: "Permanent Marker", cursive;
            padding-bottom: 75px;
        }
        thead{
            font-family: "Permanent Marker", cursive;

        }
    </style>
</main>

