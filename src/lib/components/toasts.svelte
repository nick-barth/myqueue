<script lang="ts">
	import { dismissToast, toastsStore } from '$lib/store';
	import { quartInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
</script>

{#if $toastsStore}
	<section class="fixed bottom-8 left-8">
		{#each $toastsStore as toast (toast.id)}
			<article
				animate:flip={{ duration: 300, easing: quartInOut }}
				in:fly={{ x: -100, easing: quartInOut, duration: 150 }}
				out:fly={{ x: -100, easing: quartInOut, duration: 150 }}
				class="bg-accent2 py-2 pr-8 pl-4 mb-2 z-50 rounded-md"
				role="alert"
			>
				{toast.content}
			</article>
		{/each}
	</section>
{/if}
