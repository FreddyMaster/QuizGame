import { fail, redirect } from '@sveltejs/kit';

export async function load( {locals}) {
    if (locals.user.user_type != 'admin') {
        redirect(302, '/');
    }
};