<script lang="ts">
	import PlusIcon from '$lib/icons/plus-icon.svg?component';
	import Avatar from '$lib/components/avatar-circle.svelte';
	import UrlAdder from '$lib/components/url-adder.svelte';
</script>

<section class="relative">
	<div class="bg-background">
		<div class="flex justify-between pt-10 pb-2 px-2">
			<div>
				<div class="flex gap-2 pb-2">
					<div class="h-7 w-7 bg-primary text-white rounded-full flex items-center justify-center">
						<div class="h-6 w-6">
							<PlusIcon />
						</div>
					</div>
					<h2 class="font-FrankRhulLibre text-xl font-bold">Add</h2>
				</div>
				<p class="text-sm">Add a story manually</p>
			</div>
			<div><Avatar /></div>
		</div>
	</div>
	<div class="bg-white w-full p-4 flex flex-col gap-4">
		<h2 class="font-FrankRhulLibre font-bold">Paste a url</h2>
		<UrlAdder />
	</div>
</section>
