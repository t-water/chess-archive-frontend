import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Home from "../HomeComponent";

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

		let games = [
			{
				Id: 1,
				Event: "1972 World Championship",
				Site: "Reykjavik ISL",
				Date: "1972.07.11",
				Round: "1",
				Result: "1-0",
				Moves: "1. d4 Nf6 2. c4 e6 3. Nf3 d5 4. Nc3 Bb4 5. e3 O-O 6. Bd3 c5 7. O-O Nc6 8. a3 Ba5 9. Ne2 dxc4 10. Bxc4 Bb6 11. dxc5 Qxd1 12. Rxd1 Bxc5 13. b4 Be7 14. Bb2 Bd7 15. Rac1 Rfd8 16. Ned4 Nxd4 17. Nxd4 Ba4 18. Bb3 Bxb3 19. Nxb3 Rxd1+ 20. Rxd1 Rc8 21. Kf1 Kf8 22. Ke2 Ne4 23. Rc1 Rxc1 24. Bxc1 f6 25. Na5 Nd6 26. Kd3 Bd8 27. Nc4 Bc7 28. Nxd6 Bxd6 29. b5 Bxh2 30. g3 h5 31. Ke2 h4 32. Kf3 Ke7 33. Kg2 hxg3 34. fxg3 Bxg3 35. Kxg3 Kd6 36. a4 Kd5 37. Ba3 Ke4 38. Bc5 a6 39. b6 f5 40. Kh4 f4 41. exf4 Kxf4 42. Kh5 Kf5 43. Be3 Ke4 44. Bf2 Kf5 45. Bh4 e5 46. Bg5 e4 47. Be3 Kf6 48. Kg4 Ke5 49. Kg5 Kd5 50. Kf5 a5 51. Bf2 g5 52. Kxg5 Kc4 53. Kf5 Kb4 54. Kxe4 Kxa4 55. Kd5 Kb5 56. Kd6 1-0",
				Featured: false,
				WhitePlayerId: 2,
				WhitePlayer: {
					PlayerId: 2,
					FirstName: "Boris",
					LastName: "Spassky",
					BirthDate: "1937-01-30T00:00:00",
					DeathDate: null,
					Country: "Russia",
					ImageSrc: null,
					Featured: false,
					FullName: "Boris Spassky"
				},
				BlackPlayerId: 1,
				BlackPlayer: {
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
			}
		]

		let props = {
			players: players,
			games: games,
			playersLoading: false,
			gamesLoading: false,
			playersErrMess: null,
			gamesErrMess: null
		}
		render(<Home {...props}/>, container);
	});
})
