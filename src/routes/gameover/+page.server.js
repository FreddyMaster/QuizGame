/** @type {import('./$types').PageServerLoad} */
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"
import { score, selectedCategories } from "../../lib/stores.js"

export const load = async () => {
    const leaderboard = await prisma.leaderboard.findMany();
    if (!leaderboard) {
        throw error(404, "user not found")
    }

    return {
        leaderboard
    }
}
export const actions = {
    submitScore: async ({ url, locals, request}) => {
        const categories = url.searchParams.get("categories")
        const scoreStr = url.searchParams.get("score")
        const score = Number(scoreStr)
        let date = new Date().toJSON()
        try {
			await prisma.leaderboard.create({

				data: {
                    user_id: 1,
                    username: locals.user.username,
                    score: score,
                    time: date,
                    categories: categories,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Could not add the question." })
		}

		return {
			status: 201,
		}
    },
}
