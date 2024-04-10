<script>
	import "$lib/app.css";
	export let data;

	$: ({ scores } = data);
	let deleteScores = [];
	let searchInput = '';

$: filteredScores = scores.filter(score => 
	score.username.toLowerCase().includes(searchInput.toLowerCase())
);
</script>

<main>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content mx-4">
			<!-- Page content here -->
			<label
				for="my-drawer-2"
				class="btn btn-primary drawer-button lg:hidden"
				>Open drawer</label
			>
			<label class="input input-bordered flex items-center my-4 max-w-xs float-right">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
				<input type="text" class="grow ml-4" placeholder="Search" bind:value={searchInput} />
			</label>
			<table class="table table-zebra border-solid bg-white">
				<thead>
					<tr>
						<th>
							<label>
								<input
									type="checkbox"
									class="checkbox"
									bind:group={deleteScores}
									value={scores}
								/>
							</label>
						</th>
						<th>Rank</th>
						<th>Username</th>
						<th>Score</th>
						<th>Time</th>
						<th>User ID</th>
						<th>Categories</th>
					</tr>
				</thead>
				{#each filteredScores as score}
					<tbody>
						<tr>
							<td>
								<label class="m-0">
									<input
										type="checkbox"
										class="checkbox"
										bind:group={deleteScores}
										value={score.rank}
									/>
								</label>
							</td>
							<td>
								<div class="font-bold">
									{score.rank}
								</div>
							</td>
							<td>
								{score.username}
							</td>
							<td>
								{score.score}
							</td>
							<td>
								{score.time}
							</td>
							<td>
								{score.user_id}
							</td>
							<td>
								{score.categories}
							</td>
						</tr>
					</tbody>
				{/each}
				<!-- foot -->
				<tfoot>
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<th>Rank</th>
						<th>Username</th>
						<th>Score</th>
						<th>Time</th>
						<th>User ID</th>
						<th>Categories</th>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="drawer-side">
			<label
				for="my-drawer-2"
				aria-label="close sidebar"
				class="drawer-overlay"
			></label>
			<ul
				class="menu p-4 w-48 h-full bg-gray-100 text-base-content"
			>
				<!-- Sidebar content here -->
				<li>
					<a
						href="/admin/questions">Questions</a
					>
				</li>
				<li><a class="bg-primary hover:bg-blue-600 text-white" href="/admin/leaderboard">Leaderboard</a></li>
				<li><a href="/admin/users">Users</a></li>
			</ul>
		</div>
	</div>
	{#if deleteScores.length >= 1}
		<div class="fixed bottom-0 w-full">
			<button
				onclick="deleteModal.showModal()"
				class="float-right btn btn-primary text-white m-4"
			>
				Delete {deleteScores.length}
				{deleteScores.length === 1 ? "Score" : "Scores"}</button
			>
			<dialog id="deleteModal" class="modal">
				<div class="modal-box">
					<h3 class="font-bold text-lg">
						Delete {deleteScores.length === 1 ? "Score" : "Scores"}?
					</h3>
					<p class="py-4">
						You are about to delete {deleteScores.length}
						{deleteScores.length === 1 ? "score" : "scores"}. Are
						you sure?
					</p>
					<div class="modal-action">
						<form method="dialog">
							<button class="btn">Cancel</button>
						</form>
						<form
							action="?/deleteScores&ids={deleteScores}"
							method="POST"
						>
							<button
								type="submit"
								class="btn btn-primary text-white"
								>Confirm</button
							>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	{/if}
</main>
