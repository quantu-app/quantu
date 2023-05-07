<script lang="ts">
	import { base } from "$app/paths";
  import Link from "$lib/components/theme/Link.svelte";
	import type { IPublicUser } from "$lib/contexts/users/types";

  export let user: IPublicUser | null = null;
</script>

<header class="">

  <nav class="w-screen">
      <!-- PUBLIC ROOT -->
      <div class="navbar">
        <div class="navbar-start">
          <a href={`${base}/`} class="navbar-item hidden md:block font-bold">QuantU</a>
          <a href={`${base}/`} class="navbar-item block md:hidden text-2xl font-bold">QU</a>
        </div>
  
        <!-- MAIN NAVIGATION LINKS -->
        <div class="navbar-center">
          <ul class="navbar-item">
            <li>
              <a href={`${base}/channels`}>Channel Browser</a>
            </li>
          </ul>
        </div>

        <!-- USER MENU -->
        {#if user}
          <div class="navbar-end">
            <div class="avatar avatar-ring avatar-md">
              <div class="dropdown-container">
                <div class="dropdown">
                  <label class="btn btn-ghost flex cursor-pointer px-0" tabindex="0">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
                  </label>
                  <div class="dropdown-menu dropdown-menu-bottom-left">
                    <a href={`${base}/account/settings`} tabindex="-1" class="dropdown-item text-sm">Account settings</a>
                    {#if user.creator}
                      <a href={`${base}/studio`} tabindex="-1" class="dropdown-item text-sm">Studio</a>
                    {/if}
                    <a href={`${base}/logout`} tabindex="-1" class="dropdown-item text-sm">Logout</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
  </nav>
  </header>