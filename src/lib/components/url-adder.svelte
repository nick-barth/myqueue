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
	<form on:submit={handleSubmit} class="flex flex-row w-full relative">
		<input
			on:paste={handlePaste}
			bind:value={url}
			placeholder="Paste a URL"
			class="w-full h-12 pl-6 border-2 rounded-primary border-gray800 pr-24"
		/><button
			type="submit"
			class="bg-accent2 top-1 absolute right-1 h-10 rounded-primary flex-shrink-0 px-3 text-sm font-semibold flex items-center gap-1"
			>Save & listen <div class="h-6 w-6"><Sparkle /></div>
		</button>
	</form>
</div>
