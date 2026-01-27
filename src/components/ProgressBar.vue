<template>
	<div class="wrapper">
		<div class="outer">
			<div class="inner">
				<div ref="number" class="number">0%</div>
			</div>
		</div>

		<svg width="400px" height="400px">
			<defs>
				<linearGradient id="linearGradient">
					<stop offset="0%" stop-color="darkorange" />
					<stop offset="100%" stop-color="yellow" />
				</linearGradient>
			</defs>
			<circle cx="200" cy="200" r="190" transform="rotate(-90 200 200)" />
		</svg>
	</div>
</template>

<script setup>
import { ref } from "vue"

const number = ref(null)
const counter = ref(0)
setInterval(() => {
	if (counter.value === 100) {
		clearInterval()
		return
	}

	counter.value++
	number.value.innerText = counter.value + "%"
}, 1000 / 100)
</script>

<style lang="scss" scoped>
.wrapper {
	width: 400px;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	.outer {
		width: 400px;
		height: 400px;
		border-radius: 50%;
		//border: 1px solid #000;
		background: rgb(213, 213, 213);
		padding: 20px;
		box-sizing: border-box;
		//box-shadow: -1px -1px 5px 0 #7f7f7f, 3px 3px 5px #7f7f7f;
		.inner {
			width: 360px;
			height: 360px;
			border-radius: 50%;
			//box-shadow: inset -1px -1px 5px 0 #7f7f7f, inset 3px 3px 5px #7f7f7f;
			//border: #808080 1px solid;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 21;
			.number {
				font-family: "Poppins", sans-serif;
				color: #808080;
				font-size: 2.5rem;
				font-weight: 400;
			}
		}
	}
	svg {
		position: absolute;
		z-index: 20;
	}
	circle {
		fill: none;
		stroke: url(#linearGradient);
		stroke-width: 20px;
		stroke-dasharray: 750;
		stroke-dashoffset: 1165;
		stroke-linecap: round;
		animation: progress_bar 1s ease forwards;
	}
}

@keyframes progress_bar {
	100% {
		stroke-dashoffset: 407.75;
	}
}
</style>
