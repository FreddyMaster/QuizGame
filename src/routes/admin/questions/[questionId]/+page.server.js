/** @type {import('./$types').PageServerLoad} */
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"

export const load = async ({ params }) => {
    const question = await prisma.questions.findUnique({
        where: {
            question_id: Number(params.questionId),
        },
    })
    if (!question) {
        throw error(404, "Question not found")
    }

    return {
        question,
    }
}


export const actions = {
    updateQuestion: async ({ request, params }) => {
        let { question, answer1, answer2, answer3, answer4, correctAnswer, category_id } = Object.fromEntries(await request.formData())
        category_id = Number(category_id);

        try {
            await prisma.questions.update({
                where: {
                    question_id: Number(params.questionId),
                },
                data: {
                    question,
                    answer1,
                    answer2,
                    answer3,
                    answer4, 
                    correctAnswer,
                    category_id
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not update question" })
        }
        throw redirect(303, '/admin');
    },
}
