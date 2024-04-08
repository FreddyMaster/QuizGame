<script>
    import "$lib/app.css";
    import { score, selectedCategories } from "$lib/stores.js";
    export let data;

    $: ({ leaderboard } = data);
</script>
<main>
    <h1 class="text-5xl text-black text-center">Leaderboard</h1>
    <table class="table table-zebra border-solid bg-white">
        <thead>
            <tr>
                <th>Rank</th>
                <th>User Name</th>
                <th>Score</th>
                <th>Time</th>
                <th>Categories</th>
            </tr>
        </thead>
        {#each leaderboard as rank }
        <tbody>
            <tr>
                <td>
                    <div class="font-bold">
                        {rank.rank}
                    </div>
                </td>
                <td>
                    {rank.username}
                </td>
                <td>
                    {rank.score}
                </td>
                <td>
                    {rank.time}
                </td>
                <td>
                    {rank.categories}
                </td>
            </tr>
        </tbody>
    {/each}
        
    </table>
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

