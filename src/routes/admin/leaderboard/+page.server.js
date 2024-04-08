import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export async function load( {locals}) {
    if (locals.user.user_type != 'admin') {
        redirect(302, '/');
      }

  try {
    const scores = await prisma.leaderboard.findMany();
    
    return {
      scores
    };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return {
      status: 500,
      error: "Failed to load leaderboard"
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  deleteScores: async ({ url }) => {
    const idStr = url.searchParams.get("ids")
    const ids = idStr.split(',').map(Number);
    if(!ids){
      return fail(405, {message: 'Invalid request'})
    }

    try {
      await prisma.leaderboard.deleteMany({
        where: {
          rank: { in: ids },
        },
      })
    }
    catch (error) {
      console.error("Error fetching Ids:", error);
    }
  },
};