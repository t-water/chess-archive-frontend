import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Board from '../BoardComponent';

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

it("Renders when given props", () => {
	act(() => {

		let props = {
			squares: [],
			isWhitesTurn: true,
			boardFlipped: false
		}

		render(<Board {...props}/>, container);
	});
})
