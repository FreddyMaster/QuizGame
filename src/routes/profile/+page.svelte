<script>
    import "$lib/app.css";
    import { superForm } from "sveltekit-superforms";
    import Icon from "@iconify/svelte";
    export let data;

    const { form, errors, enhance } = superForm(data.profileForm);
    $form.username = data.user.username;
    $form.email = data.user.email;
    $form.password = data.user.password;
</script>

<main>
    <div class="m-8">
        <h1 class="text-3xl font-bold">My Profile</h1>
        <form method="POST" use:enhance>
            <div class="form-control w-full max-w-sm">
                <label for="username" class="label">
                    <span class="label-text font-bold">Username</span>
                </label>
                <div class="flex">
                    <input
                        type="text"
                        name="username"
                        class="input input-primary w-screen max-w-sm {$form.username
                            ? 'input-error'
                            : 'input-bordered'}"
                        placeholder="Enter your username"
                        bind:value={$form.username}
                    />
                    <button class="btn btn-square ml-4">
                        <Icon icon="mdi:edit" width="1.5em" height="1.5em" />
                    </button>
                </div>
                <label for="username" class="label">
                    {#if $errors.username}
                        <span class="label-text-alt text-error"
                            >{$errors.username}</span
                        >
                    {/if}
                </label>
            </div>
            <div class="form-control w-full max-w-sm">
                <label for="email" class="label">
                    <span class="label-text font-bold">Email</span>
                </label>
                <div class="flex">
                    <input
                        type="text"
                        name="email"
                        class="input input-primary w-full max-w-sm {$form.email
                            ? 'input-error'
                            : 'input-bordered'}"
                        placeholder="Enter your email"
                        bind:value={$form.email}
                    />
                    <button class="btn btn-square ml-4">
                        <Icon icon="mdi:edit" width="1.5em" height="1.5em" />
                    </button>
                </div>
                <label for="email" class="label">
                    {#if $errors.email}
                        <span class="label-text-alt text-error"
                            >{$errors.email}</span
                        >
                    {/if}
                </label>
            </div>
            <button type="submit" class="btn btn-primary text-white">Save</button>
        </form>
    </div>
</main>
