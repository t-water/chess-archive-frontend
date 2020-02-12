import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import BrowsePlayers from "../BrowsePlayersComponent";

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
		let players = [
			{
				PlayerId: 1,
				FirstName: "Bobby",
				LastName: "Fischer",
				BirthDate: "1943-03-09T00:00:00",
				DeathDate: "2008-01-17T00:00:00",
				Country: "USA",
				ImageSrc: null,
				Featured: true,
				FullName: "Bobby Fischer"
			}
		]

		let props = {
			players: players,
			isLoading: false,
			errMess: null
		}
		render(<BrowsePlayers {...props}/>, container);
	});
})
