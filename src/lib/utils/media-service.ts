import { pausedStore } from '$lib/store';
import { get } from 'svelte/store';
import { MediaSession } from '@jofr/capacitor-media-session';
import mixpanel from 'mixpanel-browser';

export function handleTogglePlay() {
	if (get(pausedStore)) {
		pausedStore.update((v) => false);
		MediaSession.setPlaybackState({ playbackState: 'paused' });
	} else {
		mixpanel.track('play audio');
		pausedStore.update((v) => true);
		MediaSession.setPlaybackState({ playbackState: 'playing' });
	}
}
