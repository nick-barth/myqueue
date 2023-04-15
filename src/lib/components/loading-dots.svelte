<div class="flex gap-1 flex-row-reverse">
	<div class="dot bg-white" />
	<div class="dot bg-white" />
	<div class="dot bg-white" />
</div>

<style>
	.dot {
		display: inline-block;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		animation: bounce 600ms infinite alternate;
	}

	.dot:nth-last-child(2) {
		animation-delay: 250ms;
	}
	.dot:nth-last-child(3) {
		animation-delay: 350ms;
	}

	@keyframes bounce {
		to {
			transform: translateY(4px);
		}
	}
</style>
