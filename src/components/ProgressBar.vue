<template>
	<div class="wrapper">
		<div class="outer">
			<div class="inner">
				<div ref="number" class="number">0%</div>
			</div>
		</div>
		<!-- {{ [type, value] }} -->
		<svg width="400px" height="400px" :style="{ '--progress-value': counter }">
			<defs>
				<linearGradient id="linearGradient">
					<stop offset="100%" :stop-color="strokeColor" />
				</linearGradient>
			</defs>
			<circle cx="200" cy="200" r="190" transform="rotate(-90 200 200)" />
		</svg>
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"
import { mapTypeProgressBar } from "../helpers/mapTypeProgressBar"

const props = defineProps({
	type: {
		type: String,
		default: "in_progress",
	},
	value: {
		type: Number,
		default: 0,
	},
})

const [strokeCounter, strokeColor] = computed(() =>
	mapTypeProgressBar(props.type),
).value
const number = ref(null)
const counter = ref(strokeCounter)
let intervalId = null

const startAnimation = () => {
	// counter.value = 0
	if (intervalId) clearInterval(intervalId)

	if (props.value <= 0) return

	intervalId = setInterval(() => {
		if (counter.value >= props.value) {
			clearInterval(intervalId)
			return
		}
		counter.value++
		number.value.innerText = counter.value + "%"
	}, 1000 / props.value)
}

watch(() => props.value, startAnimation)

onMounted(() => {
	startAnimation()
})
</script>

<style lang="scss" scoped>
.wrapper {
	width: 400px;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px;
	.outer {
		width: 400px;
		height: 400px;
		border-radius: 50%;
		background: rgb(213, 213, 213);
		padding: 20px;
		box-sizing: border-box;
		.inner {
			width: 360px;
			height: 360px;
			border-radius: 50%;
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
		stroke-dasharray: calc(1194 * var(--progress-value) / 100) 1194;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		transition: stroke-dasharray 0.1s linear;
	}
}

@keyframes progress_bar {
	100% {
		stroke-dasharray: calc(1194 * var(--progress-value) / 100) 1194;
	}
}
</style>
