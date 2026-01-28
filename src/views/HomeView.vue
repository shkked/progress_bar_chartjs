<template>
	<div class="container">
		<div class="container__bars">
			<ProgressBar :type="ProgressBarType" :value="25" />
			<ProgressBar :type="ProgressBarType" :value="68" />
			<ProgressBar :type="ProgressBarType" :value="42" />
		</div>
		<div class="container__buttons">
			<button @click="setTypeProgressBar('in_progress')">In progress</button>
			<button @click="setTypeProgressBar('error')">Error</button>
			<button @click="setTypeProgressBar('warning')">Warning</button>
			<button @click="setTypeProgressBar('success')">Success</button>
		</div>
	</div>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar.vue"
import { ref } from "vue"

const ProgressBarType = ref("in_progress")

const setTypeProgressBar = type => {
	ProgressBarType.value = type
}
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
	}
	.container__buttons {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		button {
			margin: 0 10px;
			padding: 10px 20px;
			font-size: 16px;
			cursor: pointer;
		}
	}
}
</style>
