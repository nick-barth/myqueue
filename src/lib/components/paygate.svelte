<script lang="ts">
	import { clickOutside } from '$lib/directives/clickAway';
	import { paygateStore } from '$lib/store';
	import WarningIcon from '$lib/icons/icon-warning.svg?component';
	import db from '$lib/db';

	let isPaygateShown: 'article-limit' | null;
	paygateStore.subscribe((v) => {
		isPaygateShown = v;
	});
	function handleClickOutside() {
		if (!isPaygateShown) {
			return;
		}
		paygateStore.set(null);
		document.body.classList.remove('overflow-hidden');
	}
	document.body.classList.add('overflow-hidden');
</script>

<div class="w-full fixed top-0 bottom-0 z-50 backdrop-blur-sm">
	<div
		use:clickOutside={handleClickOutside}
		class="bg-warning max-w-2xl fixed w-full left-1/2 -translate-x-1/2 rounded-md bottom-12 p-12 flex gap-4 px-4"
	>
		<div>
			<div class="h-8 w-8">
				<WarningIcon />
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<div class="px-2">
				<span class=" font-bold"
					>You have reached the maximum of 5 articles you can add with your free account.</span
				>Delete articles before you can add new ones.
			</div>
			<div class="px-2">
				Or upgrade to
				<span class="font-bold">My Queue Plus</span> and add an unlimited number of articles in your
				queue.
			</div>
			<button
				class="bg-primary text-center rounded-primary text-warning p-4"
				on:click={db.billing.createCustomerId}
			>
				Subscribe for €8,99 / month
			</button>
		</div>
	</div>
</div>
