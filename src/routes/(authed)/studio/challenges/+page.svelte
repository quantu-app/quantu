<script lang="ts">
  import { base } from "$app/paths";
  import { writable } from "svelte/store";
	import type { Challenge } from "@prisma/client";
	import type { PageData } from "./$types";
  import TableLink from "./TableLink.svelte";
  import { SvelteComponent } from "svelte";
  import {
	RowSelection,
    createSvelteTable,
    flexRender,
    getCoreRowModel,
	  getSortedRowModel,
  } from '@tanstack/svelte-table'
  import type { ColumnDef, TableOptions } from "@tanstack/table-core/src/types";

  export let data: PageData;

  let sorting = [];
  
  const columns: ColumnDef<Challenge> = [
    {
      accessorKey: "id",
      cell: (props) => props.getValue(),
      enableSorting: true
    },
    {
      accessorKey: "name",
      header: (_props) => "Name"
    },
    {
      accessorKey: "url",
      header: (_props) => "URL"
    },
    {
      accessorKey: "visible",
      header: (_props) => "Visible"
    },
    {
      accessorKey: "released_at",
      header: (_props) => "Released at"
    },
    {
      header: 'Manage',
      id: "manage"
    }
  ]

  const options = writable<TableOptions<Challenge>>({
    data: data.challenges,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel()
  })

  const rerender = () => {
    options.update(options => ({
      ...options,
      data: data.challenges,
    }))
  }

  const table = createSvelteTable(options)
</script>

<div class="container mx-auto my-4">
  <a class="btn btn-primary" href={`${base}/studio/challenges/new`}>new challenge</a>
  
  <div class="list">
    <table>
      <thead>
        {#each $table.getHeaderGroups() as headerGroup}
          <tr>
            {#each headerGroup.headers as header}
              <th colspan={header.colSpan}>
                {#if !header.isPlaceholder}
                  <div
                    class:cursor-pointer={header.column.getCanSort()}
                    class:select-none={header.column.getCanSort()}
                    on:click={header.column.getToggleSortingHandler()}
                  >
                    <svelte:component
                      this={flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    />
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted().toString()] ?? ''}
                  </div>
                {/if}
              </th>
            {/each}
          </tr>
        {/each}
      </thead>
      <tbody>
        {#each $table.getRowModel().rows as row}
          <tr>
            {#each row.getVisibleCells() as cell}
              {#if /manage/.test(cell.id)}
                <TableLink challengeId={row.original.id} />
              {:else}
                <td>
                  <svelte:component
                    this={flexRender(cell.column.columnDef.cell, cell.getContext())}
                  />
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

</div>