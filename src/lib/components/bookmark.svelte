<script>
	export let bookmark;
	import db from '../../routes/db';

	const handlePlay = () => {
		db.tts.createTts(bookmark);
		// db.parse.parseUrl(bookmark.url, bookmark.id);
	};
</script>

<div>
	<div>
		{bookmark.url}
		<button on:click={handlePlay}>Play button</button>
	</div>
</div>
