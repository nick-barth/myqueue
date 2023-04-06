<script lang="ts">
	import Sparkle from '$lib/icons/sparkle.svg?component';
	import Page from '../../routes/+page.svelte';
	import db from '$lib/db';

	let url: string;
	let isLoading: boolean;
	$: isLoading;

	const handleSubmit = async () => {
		if (isLoading) {
			return;
		}
		isLoading = true;
		await db.bookmarks.post(url);
		isLoading = false;
		url = '';
	};

	const handlePaste = () => {
		// Onpaste fires before onchange, 4ms is the difference
		setTimeout(() => {
			handleSubmit();
		}, 4);
	};
</script>

<div class="w-full max-w-4xl m-auto mr-[385px] px-8 mb-6">
	<form on:submit={handleSubmit} class="flex flex-row w-full">
		<input
			on:paste={handlePaste}
			bind:value={url}
			placeholder="Paste a URL"
			class="w-full h-10 pl-6 border-2 rounded-l-primary border-background"
		/><button
			type="submit"
			class="bg-background h-10 rounded-r-primary flex-shrink-0 px-3 text-sm font-semibold flex items-center gap-1"
			>Create audio story <div class="h-6 w-6"><Sparkle /></div>
		</button>
	</form>
</div>
