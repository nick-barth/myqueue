<script>
	import { goto } from '$app/navigation';
	import { PUBLIC_STRIPE_CUSTOMER_PORTAL } from '$env/static/public';

	import Avatar from '$lib/components/avatar-circle.svelte';
	import LogoIcon from '$lib/icons/logo-icon.svg?component';

	import db, { supabase } from '$lib/db';

	import ArrowDiag from '$lib/icons/arrow-diag.svg?component';
	import { planStore, userStore } from '$lib/store';

	const handleLogout = async () => {
		await db.signOut();
		goto('/signin');
	};

	const handleDeleteRequest = async () => {
		if (confirm('Are you sure you want to delete your account?')) {
			await db.deleteAccount();
			const { error } = await supabase.auth.signOut();
			goto('/signup');
		}
	};
</script>

<div>
	<div class="flex justify-between px-6 mb-4">
		<div class="flex items-center">
			<div class="w-11 h-14 mr-2">
				<LogoIcon />
			</div>
			<div>
				<h2 class="font-frank font-bold text-2xl">My Queue</h2>
				{#if $userStore}
					<p class="text-xs">{$userStore.email}</p>
				{/if}
			</div>
		</div>
		<div class="relative">
			<Avatar />
		</div>
	</div>
	<div class="py-2 justify-items-start text-left">
		<a
			href="https://www.myqueue.so/support"
			target="_blank"
			class="px-4 py-2 bg-white mb-4 flex align-center flex-col"
		>
			<div class="flex align-center font-semibold">
				Support
				<div class=" h-4 w-4">
					<ArrowDiag />
				</div>
			</div>
			<div class="font-light">Have a question or feedback about My Queue? Contact us.</div>
		</a>
		{#if $planStore}
			<a href={PUBLIC_STRIPE_CUSTOMER_PORTAL} class="px-4 py-2 bg-white mb-4 flex font-semibold">
				Manage my subscription
			</a>
		{/if}
		<button on:click={handleLogout} class="w-full ml-0 px-4 py-2 bg-white mb-4 flex font-semibold"
			>Logout</button
		>

		<div class="mt-8">
			<div class=" text-xs pl-2 mb-2">Danger zone</div>
			<button
				on:click={handleDeleteRequest}
				class="w-full ml-0 px-4 py-2 bg-white mb-4 flex font-semibold">Delete my account</button
			>
		</div>
	</div>
</div>
