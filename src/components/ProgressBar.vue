<template>
	<div>
		<div class="wrapper">
			<!-- {{ [typeProgressBar, strokeSettings, counter] }} -->
			<div class="outer">
				<div class="inner">
					<div
						v-if="typeProgressBar == 'in_progress'"
						ref="number"
						class="number"
					>
						{{ strokeSettings[0] + "%" }}
					</div>
					<div v-else ref="number" class="number">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							:fill="strokeSettings[1]"
							viewBox="0 0 20 20"
							preserveAspectRatio="xMidYMid meet"
						>
							<path :d="strokeSettings[2]" />
						</svg>
					</div>
				</div>
			</div>
			<svg
				width="400px"
				height="400px"
				:style="{ '--progress-value': counter }"
			>
				<defs>
					<linearGradient id="linearGradient">
						<stop offset="100%" :stop-color="strokeSettings[1]" />
					</linearGradient>
				</defs>
				<circle cx="200" cy="200" r="190" transform="rotate(-90 200 200)" />
			</svg>
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

const typeProgressBar = ref(props.type)
const number = ref(null)

const strokeSettings = computed(() => mapTypeProgressBar(typeProgressBar.value))

const counter = ref(strokeSettings.value[0])
let intervalId = null

const setTypeProgressBar = type => {
	typeProgressBar.value = type
}

const getColorFilter = hexColor => {
	// Используем drop-shadow для правильной окраски иконки
	return `drop-shadow(0 0 0 ${hexColor})`
}

const startAnimation = () => {
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
watch(
	() => typeProgressBar.value,
	() => {
		counter.value = strokeSettings.value[0]
	},
)

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
				display: flex;
				align-items: center;
				justify-content: center;
				svg {
					display: block;
					width: 40px;
					height: 40px;
				}
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
.container__buttons {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	button {
		border-radius: 16px;
		margin: 0 10px;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
	}
}

@keyframes progress_bar {
	100% {
		stroke-dasharray: calc(1194 * var(--progress-value) / 100) 1194;
	}
}
</style>
