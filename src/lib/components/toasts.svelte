<script lang="ts">
	import { dismissToast, toastsStore } from '$lib/store';
	import Checkmark from '$lib/icons/checkmark.svg?component';
	import { quartInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
</script>

{#if $toastsStore}
	<section class="fixed bottom-12 left-1/2 -translate-x-1/2 max-w-4xl z-50 w-full px-4">
		{#each $toastsStore as toast (toast.id)}
			<article
				animate:flip={{ duration: 300, easing: quartInOut }}
				in:fly={{ x: 100, easing: quartInOut, duration: 150 }}
				out:fly={{ x: 100, easing: quartInOut, duration: 150 }}
				class="bg-accent2 py-2 pr-8 pl-4 mb-2 z-50 rounded-md flex flex-row {toast.type ===
					'error' && 'bg-error'} {toast.type === 'success' && 'bg-success'}"
				role="alert"
			>
				{#if toast.type == 'success'}
					<div class="h-6 w-6 align-top mr-2">
						<Checkmark />
					</div>
				{/if}
				{toast.content}
			</article>
		{/each}
	</section>
{/if}
