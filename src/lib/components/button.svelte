<script lang="ts">
	import LoadingDots from '$lib/components/loading-dots.svelte';

	export let isLoading: boolean = false;
	export let isPartyMode: boolean = false;
	export let size: 'sm' | 'md' = 'md';
	export let classes: string = '';
	export let handleClick: () => void = () => {};
	export let type: 'button' | 'submit' = 'button';
	export let variant: 'primary' | 'secondary' | 'accent' | 'success' = 'primary';
	export let isDisabled: boolean = false;

	const colours = {
		primary: 'bg-primary  text-white',
		accent: 'bg-accent text-primary',
		secondary: 'bg-background  text-primary',
		success: 'bg-success text-text'
	};

	const sizes = {
		md: 'h-12',
		sm: 'h-10'
	};
</script>

<button
	{type}
	disabled={isDisabled}
	on:click={handleClick}
	class=" 
        {colours[variant]} 
        {sizes[size]}
		text-sm
        transition-all duration-150
        rounded-primary flex gap-2 items-center justify-center px-4
        {classes}
        {isPartyMode && 'gradient-animation '}
        "
>
	<slot />
	{#if isLoading}
		<LoadingDots white={true} />
	{/if}
</button>

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
