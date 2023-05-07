<script lang="ts">
	import { base } from "$app/paths";
  import Link from "$lib/components/theme/Link.svelte";
	import type { IPublicUser } from "$lib/contexts/users/types";

  export let user: IPublicUser | null = null;
</script>

<header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-1 border-b py-4">

  <nav class="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
  
    <!-- WRAPPER_START -->
    <div class="flex flex-row items-center justify-between w-full">
  
      <!-- PUBLIC ROOT -->
      <div class="flex flex-row items-center">
        <div class="flex">
          <Link href={`${base}/`} class="flex-none text-xl font-semibold hidden md:block">QuantU</Link>
          <Link href={`${base}/`} class="block md:hidden text-2xl font-bold">QU</Link>
        </div>
  
        <!-- MAIN NAVIGATION LINKS -->
        <div class="flex">
          <ul class="ml-5 items-center flex sm:space-x-4">
            <li>
              <a
                href={`${base}/channels`}
                class="p-2 hover:bg-slate-200">
                Channels
              </a>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- USER MENU -->
      <div class="action-menu">
        {#if user}
          <button class="btn btn-primary">Hello World</button>
        {:else}
        <ul class="ml-auto flex space-x-4">
          <li>
            <Link href={`${base}/signup`} class="text-gray-600 hover:text-sky-600 font-medium">Sign Up</Link>
          </li>
          <li>
            <Link href={`${base}/signin`} class="text-gray-600 hover:text-sky-600 font-medium">Log in</Link>
          </li>
        </ul>
        {/if}
      </div>
  
    </div><!-- WRAPPER_END -->
  </nav>
  </header>