/// <reference types="@sveltejs/kit" />
/// <reference types="@types/vite" />

import type { IPublicChannel } from "$lib/contexts/channels/types";
import type { IPublicUser } from "$lib/contexts/users/presenters";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: IPublicUser | null
			channel: IPublicChannel | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}
