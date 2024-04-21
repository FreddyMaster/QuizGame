/** @type {import('./$types').PageServerLoad} */
import { prisma } from "$lib/server/prisma"
import { error, fail} from "@sveltejs/kit"

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
    submitScore: async ({ url, locals}) => {
        const categories = await prisma.categories.findMany();
        let categoriesSelected = url.searchParams.get("categories").split(',')
        const selectedIds = categoriesSelected;
        const score = url.searchParams.get("score")
        let date = new Date().toJSON()
        try {
			await prisma.leaderboard.create({

				data: {
                    user_id: 1,
                    username: locals.user.username,
                    score: +score,
                    time: date,
                    categories: categoriesSelected,
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