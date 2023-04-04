<script lang="ts">
	import type { BookmarkType } from '$types/types';
	import { combineMeta } from '$lib/utils/bookmark';

	export let bookmark: BookmarkType;
	export let setSelectedBookmark: (arg1: BookmarkType | null) => void;

	const meta = combineMeta(bookmark);
</script>

<aside>
	<div>
		<img class="min-w-full max-h-56" src={bookmark.image} alt="Related to the article" />
		<button class="absolute top-6 right-6" on:click={() => setSelectedBookmark(null)}
			><svg
				width="34"
				height="34"
				viewBox="0 0 34 34"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					opacity="0.24"
					d="M1 16.9974C1.08668 17.9661 1.12863 18.9407 1.26285 19.8974C1.87243 24.1919 3.76829 27.6947 7.23005 29.9889C12.7554 33.6567 18.6192 33.8276 24.5556 31.2935C27.5616 30.0099 29.8741 27.7487 31.3589 24.6088C32.95 21.2409 33.3191 17.6812 32.7459 13.9834C31.8762 8.39035 28.9346 4.57266 24.0831 2.43139C20.7443 0.958896 17.2602 0.700985 13.7285 1.30078C10.6387 1.8256 7.81726 3.05818 5.48798 5.37638C2.3422 8.51031 1.05872 12.4779 1 16.9974Z"
					stroke="white"
					stroke-width="2"
				/>
				<path
					d="M13.2354 13.0006L20.7648 21.001"
					stroke="white"
					stroke-width="2"
					stroke-linecap="square"
					stroke-linejoin="round"
				/>
				<path
					d="M20.7648 13.0006L13.2354 21.001"
					stroke="white"
					stroke-width="2"
					stroke-linecap="square"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
	<div class="p-6">
		<h2 class="flex font-bold text-xl">
			{bookmark.title}
		</h2>
		<p class="line-clamp-4 my-2 leading-7 overflow-hidden">
			{bookmark.content}
		</p>
		<div class="text-sm leading-6 mb-2">
			{meta.join(' • ')}
		</div>
	</div>
	<figure>
		<audio
			src="https://paddechpmdutxepollwl.supabase.co/storage/v1/object/public/audio/{bookmark.audio}"
		/>
	</figure>
</aside>
