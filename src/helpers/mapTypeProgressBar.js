export function mapTypeProgressBar(type) {
	switch (type) {
		case "in_progress":
			return [0, "#1B8AF8"]
		case "error":
			return [50, "#FF4949"]
		case "warning":
			return [65, "#E7A23D"]
		case "success":
			return [100, "#10CE66"]
	}
}
