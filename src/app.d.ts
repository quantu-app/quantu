/// <reference types="@sveltejs/kit" />
/// <reference types="@types/vite" />

import type { User } from '@prisma/client';
import type { Locale } from 

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			locale: Locale
		}
		// interface PageData {}
		// interface Platform {}
	}
}
