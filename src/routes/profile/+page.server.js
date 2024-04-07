/** @type {import('./$types').PageServerLoad} */
import { profileSchema } from '$lib/schemas/zodschemas.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  if (!locals.user) {
    redirect(302, '/');
  }
  const profileForm = await superValidate(zod(profileSchema));
  const user = await prisma.users.findUnique({
    where: { username: locals.user.username },
  })
  

  return { user, profileForm};
}

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }



    return message(form, 'Form posted successfully!');
  }
};

