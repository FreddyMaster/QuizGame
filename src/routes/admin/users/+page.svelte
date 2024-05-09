<script>
	import "$lib/app.css";
	export let data;

	$: ({ users } = data);
	let deleteUsers = [];
	let searchInput = '';

$: filteredUsers = users.filter(user => 
	user.username.toLowerCase().includes(searchInput.toLowerCase())
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
				<input type="text" class="grow ml-4" placeholder="Search By Username" bind:value={searchInput} />
			</label>
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
						<th>High Score</th>
						<th>User Type</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				{#each filteredUsers as user}
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
								{user.highscore}
							</td>
							<td>
								{user.user_type}
							</td>
							<td>
								{#if user.user_type == "user"}
									<button
										onclick="grantAdminModal.showModal()"
										class="float-right btn btn-primary text-white m-4 w-1/2"
									>
										Grant Admin</button
									>
									<dialog id="grantAdminModal" class="modal">
										<div class="modal-box">
											<h3 class="font-bold text-lg">
												Grant {user.username} Admin Permissions?
											</h3>
											<p class="py-4">
												Are you sure you want to give {user.username}
												admin permssions?
											</p>
											<div class="modal-action">
												<form method="dialog">
													<button class="btn"
														>Cancel</button
													>
												</form>
												<form
													action="?/giveAdmin&id={user.user_id}"
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
								{:else}
									<button
										onclick="revokeAdminModal.showModal()"
										class="float-right btn btn-primary text-white m-4 w-1/2"
									>
										Revoke Admin</button
									>
									<dialog id="revokeAdminModal" class="modal">
										<div class="modal-box">
											<h3 class="font-bold text-lg">
												Revoke {user.username} Admin Permissions?
											</h3>
											<p class="py-4">
												Are you sure you want to revoke {user.username}
												admin permssions?
											</p>
											<div class="modal-action">
												<form method="dialog">
													<button class="btn"
														>Cancel</button
													>
												</form>
												<form
													action="?/revokeAdmin&id={user.user_id}"
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
								{/if}
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
						<th>High Score</th>
						<th>User Type</th>
						<th class="text-center">Action</th>
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
			<ul class="menu p-4 w-48 h-full bg-gray-100 text-base-content">
				<!-- Sidebar content here -->
				<li>
					<a href="/admin/questions">Questions</a>
				</li>
				<li><a href="/admin/leaderboard">Leaderboard</a></li>
				<li>
					<a
						class="bg-primary hover:bg-blue-600 text-white"
						href="/admin/users">Users</a
					>
				</li>
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
