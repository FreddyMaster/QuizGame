<script>
	export let data;
	$: ({ question } = data);
</script>

<main>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center justify-center">
			<form action="?/updateQuestion" method="POST">
				<div class="flex flex-col items-center justify-center">
					<h3 class="text-xl font-bold">
						Editing: {question.question}
					</h3>
					<label for="question" class="label"> Question </label>
					<input
						type="text"
						id="question"
						name="question"
						class="input input-bordered input-primary w-full max-w-sm"
						value={question.question}
					/>
					<label for="answer1" class="label"> Answer 1 </label>
					<input
						type="text"
						id="answer1"
						name="answer1"
						class="input input-bordered input-primary w-full max-w-sm"
						value={question.answer1}
					/>
					<label for="answer2" class="label"> Answer 2 </label>
					<input
						type="text"
						id="answer2"
						name="answer2"
						class="input input-bordered input-primary w-full max-w-sm"
						value={question.answer2}
					/>
					<label for="answer3" class="label"> Answer 3 </label>
					<input
						type="text"
						id="answer3"
						name="answer3"
						class="input input-bordered input-primary w-full max-w-sm"
						value={question.answer3}
					/>
					<label for="answer4" class="label"> Answer 4 </label>
					<input
						type="text"
						id="answer4"
						name="answer4"
						class="input input-bordered input-primary w-full max-w-sm"
						value={question.answer4}
					/>
					<label for="correctAnswer" class="label">
						Correct Answer
					</label>
					<input
						type="text"
						id="correctAnswer"
						name="correctAnswer"
						class="input input-bordered input-primary w-full max-w-sm"
						value={question.correctAnswer}
					/>
					<label for="category_id" class="label"> Category ID </label>
					<input
						type="number"
						id="category_id"
						name="category_id"
						class="input input-bordered input-primary w-full max-w-sm"
						value={question.category_id}
					/>
					<button
						class="btn btn-primary btn-block max-w-sm text-white m-4"
						type="submit">Update Question</button
					>
				</div>
			</form>
		</div>
		<div class="drawer-side">
			<label
				for="my-drawer-2"
				aria-label="close sidebar"
				class="drawer-overlay"
			></label>
			<ul
				class="menu p-4 w-48 h-full bg-gray-100 text-base-content mr-8"
			>
				<!-- Sidebar content here -->
				<li>
					<a
						class="bg-primary hover:bg-blue-600 text-white"
						href="/admin/questions">Questions</a
					>
				</li>
				<li><a href="/admin/leaderboard">Leaderboard</a></li>
				<li><a href="/admin/users">Users</a></li>
			</ul>
		</div>
	</div>
</main>
