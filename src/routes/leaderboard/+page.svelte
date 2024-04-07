<script>
    import "$lib/app.css";
    import { score } from "$lib/stores.js";
    import { selectedCategories } from "$lib/stores.js"



</script>
<main>
    <h1 class="text-lg text-black text-center">Leaderboard</h1>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>User Name</th>
                <th>Score</th>
                <th>Categories</th>
            </tr>
        </thead>
        
    </table>
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