/** @type {import('./$types').PageServerLoad} */
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"
import { score, selectedCategories } from "../../lib/stores.js"

export const load = async () => {
      try {
        const scores = await prisma.leaderboard.findMany({
          orderBy: [
            {
              score: 'desc',
            },
          ]
      });
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
