import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Square from "../SquareComponent";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders With or Without Props", () => {
	act(() => {
		let props = {
			squareColor: 'bg-dark',
			piece: null, 
			key: 'A8',
			squareName: 'A8',
			row: 8,
			rowParam: 1,
			columnParam: 1,
			column: 1,
			index: 0,
			isWhitesTurn: true,
			boardFlipped: false
		}
		render(<Square {...props}/>, container);
	});

	act(() => {
		render(<Square/>, container);
	});
})
