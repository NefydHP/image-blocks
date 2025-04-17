document.addEventListener("contextmenu", function (e) {
	e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
	const imagePaths = [
		"images/ferns.jpg",
		"images/island.jpg",
		"images/leaves1.jpg",
		"images/leaves2.jpg",
		"images/leaves3.jpg",
		"images/leaves4.jpg",
		"images/palms.jpg",
		"images/palmsa.jpg",
	];

	const frag = document.createDocumentFragment();
	const vw = document.body.offsetWidth - document.body.offsetWidth * 0.3;
	const vh = document.body.offsetHeight - document.body.offsetHeight * 0.1;

	imagePaths.forEach((path) => {
		const figure = document.createElement("figure");
		figure.classList.add("draggable");

		const img = document.createElement("img");
		img.src = path;
		img.draggable = false;
		img.onerror = function () {
			this.style.display = "none";
		};
		figure.appendChild(img);
		const figWidth = vw * 0.3;
		const figHeight = figWidth * (3 / 4);
		const maxLeft = vw - figWidth;
		const maxTop = vh - figHeight;
		figure.style.position = "absolute";
		figure.style.left = Math.random() * maxLeft + "px";
		figure.style.top = Math.random() * maxTop + "px";
		frag.appendChild(figure);
	});
	document.body.appendChild(frag);

	const draggableElements = document.querySelectorAll(".draggable");
	let offsetX,
		offsetY,
		isDragging = false,
		currentDraggedElement = null,
		highestZ = 1000;
	let latestMouseEvent = null;

	draggableElements.forEach((el) => {
		el.addEventListener("mousedown", (e) => {
			if (e.button !== 0) return;
			e.stopPropagation();
			isDragging = true;
			currentDraggedElement = el;
			highestZ++;
			el.style.position = "absolute";
			el.style.zIndex = highestZ;
			offsetX = e.clientX - el.getBoundingClientRect().left;
			offsetY = e.clientY - el.getBoundingClientRect().top;
			el.style.cursor = "grabbing";
		});
	});

	document.addEventListener("mousemove", (e) => {
		if (!isDragging || !currentDraggedElement) return;
		latestMouseEvent = e;
		requestAnimationFrame(() => {
			if (!latestMouseEvent) return;
			currentDraggedElement.style.left =
				latestMouseEvent.clientX - offsetX + "px";
			currentDraggedElement.style.top =
				latestMouseEvent.clientY - offsetY + "px";
		});
	});

	document.addEventListener("mouseup", () => {
		if (!isDragging || !currentDraggedElement) return;
		currentDraggedElement.style.cursor = "grab";
		isDragging = false;
		currentDraggedElement = null;
	});

	draggableElements.forEach((el) => {
		el.addEventListener("touchstart", (e) => {
			e.preventDefault();
			e.stopPropagation();
			isDragging = true;
			currentDraggedElement = el;
			highestZ++;
			el.style.position = "absolute";
			el.style.zIndex = highestZ;
			const touch = e.touches[0];
			offsetX = touch.clientX - el.getBoundingClientRect().left;
			offsetY = touch.clientY - el.getBoundingClientRect().top;
		});

		el.addEventListener("touchmove", (e) => {
			if (!isDragging || !currentDraggedElement) return;
			const touch = e.touches[0];
			requestAnimationFrame(() => {
				currentDraggedElement.style.left =
					touch.clientX - offsetX + "px";
				currentDraggedElement.style.top =
					touch.clientY - offsetY + "px";
			});
		});

		el.addEventListener("touchend", () => {
			if (!isDragging || !currentDraggedElement) return;
			isDragging = false;
			currentDraggedElement = null;
		});
	});
});
