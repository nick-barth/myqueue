<script lang="ts">
	import PlusIcon from '$lib/icons/plus-icon.svg?component';
	import db from '$lib/db';
	import mixpanel from 'mixpanel-browser';

	let error: string | null;
	let url: string;
	let isLoading: boolean;

	$: error;
	$: isLoading = false;

	const handleSubmit = async () => {
		if (isLoading) {
			return;
		}

		let urlToAdd;

		try {
			urlToAdd = new URL(url);
		} catch (_) {
			error = 'Please use a valid URL';
			return false;
		}
		error = null;

		mixpanel.track('url submitted', { url });
		isLoading = true;

		try {
			const res = await db.bookmarks.post(url);
		} finally {
			isLoading = false;
			url = '';
		}
	};

	const handlePaste = () => {
		// Onpaste fires before onchange, 4ms is the difference
		setTimeout(() => {
			handleSubmit();
		}, 4);
	};
</script>

<div class="w-full">
	<form on:submit={handleSubmit} class="flex flex-row w-full relative">
		<input
			on:paste={handlePaste}
			bind:value={url}
			placeholder="Paste a URL"
			class="w-full h-12 pl-6 border rounded-primary border-gray800 pr-24 outline-none"
		/>
		<div
			class="absolute top-1 right-1 transition-all duration-300 {isLoading
				? 'min-w-[calc(100%-8px)]'
				: 'min-w-0'}"
		>
			<button
				type="submit"
				disabled={isLoading}
				class="{!isLoading
					? 'w-10'
					: 'w-full'} bg-accent transition-all duration-150 rounded-primary h-10 w-10 flex gap-2 items-center justify-center"
				>{#if !isLoading}
					<div class="h-6 w-6 text-primary">
						<PlusIcon />
					</div>
				{:else}
					<div class="absolute">Generating audio story</div>
				{/if}
			</button>
		</div>
	</form>
	{#if error}
		<div class="flex justify-center w-full items-center">
			<p class=" text-red-500 font-bold">
				{error}
			</p>
		</div>
	{/if}
</div>

<style>
	@-webkit-keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@-moz-keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	.gradient-animation {
		background: linear-gradient(90deg, #c1ebff, #d8bbfe);
		background-size: 400% 400%;

		-webkit-animation: gradient 1.5s ease infinite;
		-moz-animation: gradient 1.5s ease infinite;
		animation: gradient 1.5s ease infinite;
	}
</style>
