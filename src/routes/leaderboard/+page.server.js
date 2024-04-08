/** @type {import('./$types').PageServerLoad} */
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"
import { score, selectedCategories } from "../../lib/stores.js"

export const load = async () => {
    const leaderboard = await prisma.leaderboard.findMany();
    if (!leaderboard) {
        throw error(404, "leaderboard ERR: No leaderboard could load :(")
    }

    return {
        leaderboard
    }
}
