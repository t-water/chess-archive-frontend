import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Piece from "../PieceComponent";

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
			isWhite: true,
			isWhitesTurn: true,
			name: 'pawn'
		}
		render(<Piece {...props}/>, container);
	});
})
