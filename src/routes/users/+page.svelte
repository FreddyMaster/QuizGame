<script>
	import "$lib/app.css";
	export let data;

	$: ({ users } = data);
	let deleteUsers = [];
</script>

<main>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<!-- Page content here -->
			<label
				for="my-drawer-2"
				class="btn btn-primary drawer-button lg:hidden"
				>Open drawer</label
			>
			<table class="table table-zebra border-solid bg-white">
				<thead>
					<tr>
						<th>
							<label>
								<input
									type="checkbox"
									class="checkbox"
									bind:group={deleteUsers}
									value={users}
								/>
							</label>
						</th>
						<th>ID</th>
						<th>Username</th>
						<th>Email</th>
						<th>Password</th>
						<th>High Score</th>
						<th>User Type</th>
					</tr>
				</thead>
				{#each users as user}
					<tbody>
						<tr>
							<td>
								<label class="m-0">
									<input
										type="checkbox"
										class="checkbox"
										bind:group={deleteUsers}
										value={user.user_id}
									/>
								</label>
							</td>
							<td>
								<div class="font-bold">
									{user.user_id}
								</div>
							</td>
							<td>
								{user.username}
							</td>
							<td>
								{user.email}
							</td>
							<td>
								{user.password}
							</td>
							<td>
								{user.highscore}
							</td>
							<td>
								{user.user_type}
							</td>
							<td>
								<a href="/admin/{user.user_id}">
									<button
										class="float-right btn btn-primary text-white m-4"
									>
										Give Admin</button
									>
								</a>
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
						<th>ID</th>
						<th>Username</th>
						<th>Email</th>
						<th>Password</th>
						<th>High Score</th>
						<th>User Type</th>
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
				class="menu p-4 w-48 h-full bg-gray-100 text-base-content mr-8 rounded-lg"
			>
				<!-- Sidebar content here -->
				<li>
					<a
						href="/admin">Questions</a
					>
				</li>
				<li><a href="/leaderboard">Leaderboard</a></li>
				<li><a class="bg-primary hover:bg-blue-600 text-white" href="/users">Users</a></li>
			</ul>
		</div>
	</div>
	{#if deleteUsers.length >= 1}
		<div class="fixed bottom-0 w-full">
			<button
				onclick="deleteModal.showModal()"
				class="float-right btn btn-primary text-white m-4"
			>
				Delete {deleteUsers.length}
				{deleteUsers.length === 1 ? "User" : "Users"}</button
			>
			<dialog id="deleteModal" class="modal">
				<div class="modal-box">
					<h3 class="font-bold text-lg">
						Delete {deleteUsers.length === 1 ? "User" : "Users"}?
					</h3>
					<p class="py-4">
						You are about to delete {deleteUsers.length}
						{deleteUsers.length === 1 ? "User" : "Users"}. Are you
						sure?
					</p>
					<div class="modal-action">
						<form method="dialog">
							<button class="btn">Cancel</button>
						</form>
						<form
							action="?/deleteUsers&ids={deleteUsers}"
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
