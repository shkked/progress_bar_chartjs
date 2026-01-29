<template>
	<div class="container">
		<div class="container__bars">
			<ProgressBar :type="'in_progress'" :value="25" />
			<!-- <ProgressBar :type="'in_progress'" :value="68" />
			<ProgressBar :type="'success'" />
			<ProgressBar :type="'warning'" />
			<ProgressBar :type="'error'" /> -->
		</div>
	</div>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar.vue"
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	.container__bars {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
}
</style>
