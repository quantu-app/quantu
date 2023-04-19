/// <reference types="@sveltejs/kit" />
/// <reference types="@types/vite" />

import type { User } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
