import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  if (locals.user.user_type != 'admin') {
    redirect(302, '/');
  }

  try {
    const users = await prisma.users.findMany();

    return {
      users
    };
  } catch (error) {
    console.error("Error fetching users", error);
    return {
      status: 500,
      error: "Failed to load users"
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  deleteUsers: async ({ url }) => {
    const idStr = url.searchParams.get("ids")
    const ids = idStr.split(',').map(Number);
    if (!ids) {
      return fail(405, { message: 'Invalid request' })
    }

    try {
      await prisma.users.deleteMany({
        where: {
          user_id: { in: ids },
        },
      })
    }
    catch (error) {
      console.error("Error fetching Ids:", error);
    }
  },
  giveAdmin: async ({ url }) => {
    const id = Number(url.searchParams.get("id"))
    if (!id) {
      return fail(405, { message: 'Invalid request' })
    }
    try {
      await prisma.users.update({
        where: {
          user_id: id,
        },
        data: {
          user_type: 'admin',
        },
      })
    }
    catch (error) {
      console.error("Error fetching Id:", error);
    }
  },
  revokeAdmin: async ({ url }) => {
    const id = Number(url.searchParams.get("id"))
    if (!id) {
      return fail(405, { message: 'Invalid request' })
    }
    try {
      await prisma.users.update({
        where: {
          user_id: id,
        },
        data: {
          user_type: 'user',
        },
      })
    }
    catch (error) {
      console.error("Error fetching Id:", error);
    }
  },
}
