<script lang="ts">
	import { base } from "$app/paths";
	import Gravatar from "$lib/contexts/users/components/Gravatar.svelte";
	import type { IPublicUser } from "$lib/contexts/users/types";
  import { clickoutside } from '@svelte-put/clickoutside';

  export let user: IPublicUser;

  let showDropdownMenu = false;

  const toggleDropdownMenu = () => {
    showDropdownMenu = !showDropdownMenu;
  }
  const closeDropdownMenu = () => {
    if (showDropdownMenu) {
      showDropdownMenu = false;
    }
  }
</script>

<nav class="w-full">
  <!-- Main Menu -->
  <div class="bg-slate-900 px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <!-- Mobile Menu Toggle Button -->
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <!-- Logo -->
        <div class="flex flex-shrink-0 items-center text-white">
          <a href={`${base}/`} class="w-auto hidden lg:block">QuantU</a>
          <a href={`${base}/`} class="w-auto block lg:hidden">QU</a>
        </div>

        <!-- Main Navigation -->
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <a href={`${base}/challenges`} class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Challenges</a>
          </div>
        </div>
      </div>

      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

        <!-- Profile dropdown -->
        <div class="relative ml-3" use:clickoutside on:clickoutside|stopPropagation={closeDropdownMenu}>
          <div on:click|preventDefault={toggleDropdownMenu} on:keypress={toggleDropdownMenu} >
            <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <div class="h-10 items-center">
                <Gravatar hash={user.emailHash} />
              </div>
            </button>
          </div>

          {#if showDropdownMenu}
          <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <!-- Active: "bg-gray-100", Not Active: "" -->
            <a href={`${base}/desk`} tabindex="-1" class="block px-4 py-2 text-sm hover:bg-gray-100">Desk</a>
            <a href={`${base}/account/settings`} tabindex="-1" class="block px-4 py-2 text-sm hover:bg-gray-100">Account settings</a>
            {#if user.creator}
              <a href={`${base}/studio`} tabindex="-1" class="block px-4 py-2 text-sm hover:bg-gray-100">Studio</a>
            {/if}
            <a href={`${base}/auth/logout`} tabindex="-1" class="block px-4 py-2 text-sm hover:bg-gray-100">Logout</a>
          </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Menu Dropdown -->
  <div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <a href={`${base}/challenges`} class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Challenges</a>
    </div>
  </div>

</nav>