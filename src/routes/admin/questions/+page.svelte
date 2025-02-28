<script>
    import "$lib/app.css";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { questionSchema } from "$lib/schemas/zodschemas.js";
    export let data;

    const {
        form: addQuestionForm,
        errors: addQuestionErrors,
        enhance: addQuestionEnhance,
    } = superForm(data.addQuestionForm, {
        resetForm: true,
        validators: zodClient(questionSchema),
        validationMethod: "submit",
    });

    $: ({ questions } = data);
    let deleteQuestions = [];
    let searchInput = '';

    $: filteredQuestions = questions.filter(question => 
        question.question.toLowerCase().includes(searchInput.toLowerCase())
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
                <input type="text" class="grow ml-4" placeholder="Search By Question" bind:value={searchInput} />
            </label>
            <table class="table table-zebra border-solid bg-white">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:group={deleteQuestions}
                                    value={questions}
                                />
                            </label>
                        </th>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Answers</th>
                        <th>Correct Answer</th>
                        <th>Category ID</th>
                        <th class="text-center">Edit</th>
                    </tr>
                </thead>
                {#each filteredQuestions as question}
                    <tbody>
                        <tr>
                            <td>
                            <label class="m-0">
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:group={deleteQuestions}
                                    value={question.question_id}
                                />
                            </label>
                        </td>
                            <td>
                                <div class="font-bold">
                                    {question.question_id}
                                </div>
                            </td>
                            <td>
                                {question.question}
                            </td>
                            <td>
                                {question.answer1}, {question.answer2}, {question.answer3},
                                {question.answer4}
                            </td>
                            <td>
                                {question.correctAnswer}
                            </td>
                            <td>
                                {question.category_id}
                            </td>
                            <td>
                                <a href="/admin/questions/{question.question_id}">
                                    <button
                                        class="btn btn-primary text-white m-4"
                                    >
                                        Edit</button
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
                        <th>Question</th>
                        <th>Answers</th>
                        <th>Correct Answer</th>
                        <th>Category ID</th>
                        <th class="text-center">Edit</th>
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
                        class="bg-primary hover:bg-blue-600 text-white"
                        href="/admin/questions">Questions</a
                    >
                </li>
                <li><a href="/admin/leaderboard">Leaderboard</a></li>
                <li><a href="/admin/users">Users</a></li>
            </ul>
        </div>
    </div>
    {#if deleteQuestions.length >= 1}
        <div class="fixed bottom-0 w-full">
            <button
                onclick="deleteModal.showModal()"
                class="float-right btn btn-primary text-white m-4"
            >
                Delete {deleteQuestions.length}
                {deleteQuestions.length === 1
                    ? "Question"
                    : "Questions"}</button
            >
            <dialog id="deleteModal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">
                        Delete {deleteQuestions.length === 1
                            ? "Question"
                            : "Questions"}?
                    </h3>
                    <p class="py-4">
                        You are about to delete {deleteQuestions.length}
                        {deleteQuestions.length === 1
                            ? "question"
                            : "questions"}. Are you sure?
                    </p>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Cancel</button>
                        </form>
                        <form
                            action="?/deleteQuestions&ids={deleteQuestions}"
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
    {:else}
        <div class="fixed bottom-0 w-full">
            <button
                onclick="addModal.showModal()"
                class="float-right btn btn-primary text-white m-4"
                addQues
            >
                Add a Question</button
            >
            <dialog id="addModal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Add a Question</h3>
                    <form action="?/addQuestion" method="POST">
                        <div class="flex flex-col items-center justify-center">
                            <label for="question" class="label font-bold"
                                >Question</label
                            >
                            <input
                                type="text"
                                class="input input-primary"
                                id="question"
                                name="question"
                                placeholder="Enter the Question"
                                bind:value={$addQuestionForm.question}
                            />
                            <label for="question" class="label">
                                {#if $addQuestionErrors.question}
                                    <span class="label-text-alt text-error"
                                        >{$addQuestionErrors.question}</span
                                    >
                                {/if}
                            </label>
                            <label for="answer1" class="label font-bold"
                                >Answer 1</label
                            >
                            <input
                                type="text"
                                class="input input-primary"
                                id="answer1"
                                name="answer1"
                                placeholder="Enter Answer1"
                                bind:value={$addQuestionForm.answer1}
                            />
                            <label for="answer1" class="label">
                                {#if $addQuestionErrors.answer1}
                                    <span class="label-text-alt text-error"
                                        >{$addQuestionErrors.answer1}</span
                                    >
                                {/if}
                            </label>
                            <label for="answer2" class="label font-bold"
                                >Answer 2</label
                            >
                            <input
                                type="text"
                                class="input input-primary"
                                id="answer2"
                                name="answer2"
                                placeholder="Enter Answer2"
                                bind:value={$addQuestionForm.answer2}
                            />
                            <label for="answer2" class="label">
                                {#if $addQuestionErrors.answer2}
                                    <span class="label-text-alt text-error"
                                        >{$addQuestionErrors.answer2}</span
                                    >
                                {/if}
                            </label>
                            <label for="answer3" class="label font-bold"
                                >Answer 3</label
                            >
                            <input
                                type="text"
                                class="input input-primary"
                                id="answer3"
                                name="answer3"
                                placeholder="Enter Answer3"
                                bind:value={$addQuestionForm.answer3}
                            />
                            <label for="answer3" class="label">
                                {#if $addQuestionErrors.answer3}
                                    <span class="label-text-alt text-error"
                                        >{$addQuestionErrors.answer3}</span
                                    >
                                {/if}
                            </label>
                            <label for="answer4" class="label font-bold"
                                >Answer 4</label
                            >
                            <input
                                type="text"
                                class="input input-primary"
                                id="answer4"
                                name="answer4"
                                placeholder="Enter Answer4"
                                bind:value={$addQuestionForm.answer4}
                            />
                            <label for="answer4" class="label">
                                {#if $addQuestionErrors.answer4}
                                    <span class="label-text-alt text-error"
                                        >{$addQuestionErrors.answer4}</span
                                    >
                                {/if}
                            </label>
                            <label for="correctAnswer" class="label font-bold"
                                >Correct Answer</label
                            >
                            <input
                                type="text"
                                class="input input-primary"
                                id="correctAnswer"
                                name="correctAnswer"
                                placeholder="Enter the Correct Answer"
                                bind:value={$addQuestionForm.correctAnswer}
                            />
                            <label for="correctAnswer" class="label">
                                {#if $addQuestionErrors.correctAnswer}
                                    <span class="label-text-alt text-error"
                                        >{$addQuestionErrors.correctAnswer}</span
                                    >
                                {/if}
                            </label>
                            <label for="category_id" class="label font-bold"
                                >Category Id</label
                            >
                            <input
                                type="number"
                                class="input input-primary"
                                id="category_id"
                                name="category_id"
                                placeholder="Enter the Category Id"
                                min="1"
                                max="10"
                                bind:value={$addQuestionForm.category_id}
                            />
                            <label for="category_id" class="label">
                                {#if $addQuestionErrors.category_id}
                                    <span class="label-text-alt text-error"
                                        >{$addQuestionErrors.category_id}</span
                                    >
                                {/if}
                            </label>
                        </div>
                        <div class="modal-action">
                            <form method="dialog">
                                <button class="btn">Cancel</button>
                            </form>
                            <button
                                type="submit"
                                class="btn btn-primary text-white">Add</button
                            >
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    {/if}
</main>
