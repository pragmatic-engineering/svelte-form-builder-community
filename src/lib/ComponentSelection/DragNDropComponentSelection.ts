export function dragElement(
	el: HTMLDivElement,
	dragHandle: HTMLElement,
	componentSelectionStyle: CSSStyleDeclaration
) {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (dragHandle) {
		// if present, the header is where you move the DIV from:
		dragHandle.onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		el.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e: MouseEvent) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e: any) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		const nextTop = el.offsetTop - pos2;
		const nextLeft = el.offsetLeft - pos1;

		//Prevent from dragging outside top and left
		if (nextTop < 0 || nextLeft < 0) {
			return;
		}

		const elShape = el.getBoundingClientRect();
		const elComputedStyle = getComputedStyle(el);

		//Prevent dragging past the right
		if (parseInt(elComputedStyle.right) < 0) {
			el.style.left = parseInt(el.style.left, 10) - 1 + 'px';
			return;
		}

		//Prevent dragging past bottom
		if (elShape.top + elShape.height >= window.innerHeight - 10) {
			el.style.top = parseInt(el.style.top, 10) - 1 + 'px';
			return;
		}

		// set the element's new position:
		el.style.top = nextTop + 'px';
		el.style.left = nextLeft + 'px';
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
