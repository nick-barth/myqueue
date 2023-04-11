<script lang="ts">
	import { formatToMmss } from '$lib/utils/date-time';

	export let duration: number;
	export let currentTime: number;
	export let setNewTime: (arg1: number) => void = () => {};
	let bar: HTMLDivElement;
	let lastMouseDown: number;

	function handleClick(e: MouseEvent) {
		const clientX = e.clientX;
		const { left, right } = bar.getBoundingClientRect();
		const newTime = (duration * (clientX - left)) / (right - left);
		setNewTime(newTime);
	}

	function handleMove(e: MouseEvent) {
		if (!duration) return;
		if (e.type !== 'touchmove' && !(e.buttons & 1)) return;

		const clientX = e.clientX;
		const { left, right } = bar.getBoundingClientRect();
		const newTime = (duration * (clientX - left)) / (right - left);
		setNewTime(newTime);
	}

	function handleMousedown(e: MouseEvent) {
		lastMouseDown = new Date() as unknown as number;
	}

	$: percentLeft = `${(100 * currentTime) / duration}%`;
	$: displayTime = formatToMmss(currentTime);
	$: displayDuration = formatToMmss(duration);
</script>

<div class="w-full">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		bind:this={bar}
		on:click={handleClick}
		on:mousemove={handleMove}
		on:mousedown={handleMousedown}
		class="w-full relative py-2 flex cursor-grab"
	>
		<div class="bg-gray-400 w-full h-1" />
		<div
			style="left: {percentLeft}"
			class="absolute h-3 w-3 top-2 rounded-full bg-primary -translate-y-1/3 transition-all ease-out duration-75"
		/>
	</div>
	<div class="w-full justify-between flex text-sm">
		<div>{displayTime}</div>
		<div>{displayDuration}</div>
	</div>
</div>
