/// <reference types="@sveltejs/kit" />
/// <reference types="@types/vite" />

import type { IPublicUser } from "$lib/contexts/users/presenters";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: IPublicUser | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
