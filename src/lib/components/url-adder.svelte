<script lang="ts">
	import Sparkle from '$lib/icons/sparkle.svg?component';
</script>

<div class="w-full max-w-4xl m-auto mr-[385px] px-8 mb-6">
	<div class="flex flex-row w-full">
		<input
			placeholder="Paste a URL"
			class="w-full h-10 pl-6 border-2 rounded-l-primary border-background"
		/><button
			class="bg-background h-10 rounded-r-primary flex-shrink-0 px-3 text-sm font-semibold flex items-center gap-1"
			>Create audio story <div class="h-6 w-6"><Sparkle /></div>
		</button>
	</div>
</div>
