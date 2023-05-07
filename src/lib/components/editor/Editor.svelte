<svelte:options immutable={true} />

<script lang="ts" context="module">
	const HOTKEYS = {
		'mod+b': 'bold',
		'mod+i': 'italic',
		'mod+u': 'underline',
		'mod+`': 'code'
	};
</script>

<script lang="ts">
	import { isHotkey, isReadOnly, withSvelte, Slate, Editable } from 'svelte-slate';
	import { createEditor, Editor, type Descendant, type Selection } from 'slate';
	import { withHistory } from 'slate-history';
	import { longpress } from '$lib/utils/longpress';

	export let value: any[] = [
		{
			type: 'paragraph',
			children: [{ text: '' }]
		}
	];
	export let selection: Selection | null = null;
	export let readOnly = false;
	export let placeholder = 'Type...';
	export let editor = withHistory(withSvelte(createEditor()));
	export let onChange: (value: any) => void = () => undefined;

	let open = false;
	let ref: HTMLDivElement;

	function onValue(e: CustomEvent<Descendant[]>) {
		onChange(e.detail);
	}

	function onKeyDown(event: KeyboardEvent) {
		Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
			if (isHotkey(hotkey, event)) {
				event.preventDefault();
				// toggleMark(editor, mark);
			}
		});
	}

	function onLongPress() {
		if (!isReadOnly(editor)) {
			// const [match] = Array.from(
			// 	Editor.nodes(editor, {
			// 		at: Editor.unhangRange(editor, editor.selection),
			// 		match: isCodeElement
			// 	})
			// );
			// if (!match) {
			// 	open = true;
			// }
		}
	}
</script>

<Slate bind:editor bind:selection bind:value on:value={onValue}>
	<div use:longpress on:longpress={onLongPress}>
		<Editable bind:ref {readOnly} {placeholder} {onKeyDown} />
	</div>
</Slate>