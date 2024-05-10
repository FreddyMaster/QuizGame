/** @type {import('./$types').PageServerLoad} */
import { profileSchema } from '$lib/schemas/zodschemas.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from "@sveltejs/kit"
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  if (!locals.user) {
    redirect(302, '/');
  }
  const profileForm = await superValidate(zod(profileSchema));
  const user = await prisma.users.findUnique({
    where: { username: locals.user.username },
  })


  return { user, profileForm };
}

export const actions = {
  default: async ({ request, locals }) => {
    const updateProfile = await superValidate(request, zod(profileSchema));
    console.log(updateProfile);

    if (!updateProfile.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    try {
      await prisma.users.update({
        where: {
          username: locals.user.username,
        },
        data: {
          username: updateProfile.data.username,
          email: updateProfile.data.email,
        },
      })
      redirect(302, '/profile')
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not update the profile." })
    }
  }
};

