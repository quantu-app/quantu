import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/signin');
	}
	
	const user = event.locals.user;

	if(!user.confirmed) {
		// TODO: Implement sign-up completion
		//throw redirect(302, '/sign_up_wizard')
	}

	return {
		user: event.locals.user
	};
};
