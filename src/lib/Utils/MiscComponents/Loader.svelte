<div class="center">
	<div />
	<div class="loader" />
	<div />
</div>

<style>
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loader {
		display: inline-block;
		width: 80px;
		height: 80px;
		margin-top: 10%;
	}
	.loader:after {
		content: ' ';
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid #fff;
		border-color: #dee2e6 transparent #dee2e6 transparent;
		animation: loader 1.2s linear infinite;
	}
	@keyframes loader {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
