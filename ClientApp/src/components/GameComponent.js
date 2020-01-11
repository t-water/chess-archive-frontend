import React, {Component} from 'react';
import Board from './BoardComponent';
import Piece from './PieceComponent';
// import {ReadPGN, ProcessPGNArray} from '../shared/ReadPGN';


class Game extends Component{
	constructor(props){
		super(props)

		this.whiteProps = {
			isWhite: true,
		}
		this.blackProps = {
			isWhite: false,
		}
		this.commonProps = {
			handleMouseDown: this.props.handleMouseDown,
			handleDragStart: this.props.handleDragStart
		}
		// console.log(ProcessPGNArray(ReadPGN('1. c4 Nf6 2. d4 e6 3. Nc3 Bb4 4. e3 c5 5. Nge2 d5 6. a3 Bxc3+ 7. Nxc3 cxd4 8. exd4 dxc4 9. Bxc4 Nc6 10. Be3 O-O 11. O-O b6 12. Qd3 Bb7 13. Rad1 h6 14. f3 Ne7 15. Bf2 Nfd5 16. Ba2 Nf4 17. Qd2 Nfg6 18. Bb1 Qd7 19. h4 Rfd8 20. h5 Nf8 21. Bh4 f6 22. Ne4 Nd5 23. g4 Rac8 24. Bg3 Ba6 25. Rfe1 Rc6 26. Rc1 Ne7 27. Rxc6 Qxc6 28. Ba2 Qd7 29. Nd6 Bb7 30. Nxb7 Qxb7 31. Qe3 Kh8 32. Rc1 Nd5 33. Qe4 Qd7 34. Bb1 Qb5 35. b4 Qd7 36. Qd3 Qe7 37. Kf2 f5 38. gxf5 exf5 39. Re1 Qf6 40. Be5 Qh4+ 41. Bg3 Qf6 42. Rh1 Nh7 43. Be5 Qg5 44. Qxf5 Qd2+ 45. Kg3 Nhf6 46. Rg1 Re8 47. Be4 Ne7 48. Qh3 Rc8 49. Kh4 Rc1 50. Qg3 Rxg1 51. Qxg1 Kg8 52. Qg3 Kf7 53. Bg6+ Ke6 54. Qh3+ Kd5 55. Be4+ Nxe4 56. fxe4+ Kxe4 57. Qg4+ Kd3 58. Qf3+ Qe3 59. Kg4 Qxf3+ 60. Kxf3 g6 61. Bd6 Nf5 62. Kf4 Nh4 63. Kg4 gxh5+ 64. Kxh4 Kxd4 65. Bb8 a5 66. Bd6 Kc4 67. Kxh5 a4 68. Kxh6 Kb3 69. b5 Kc4 70. Kg5 Kxb5 71. Kf5 Ka6 72. Ke6 Ka7 73. Kd7 Kb7 74. Be7 Ka7 75. Kc7 Ka8 76. Bd6 Ka7 77. Kc8 Ka6 78. Kb8 b5 79. Bb4 Kb6 80. Kc8 Kc6 81. Kd8 Kd5 82. Ke7 Ke5 83. Kf7 Kd5 84. Kf6 Kd4 85. Ke6 Ke4 86. Bf8 Kd4 87. Kd6 Ke4 88. Bg7 Kf4 89. Ke6 Kf3 90. Ke5 Kg4 91. Bf6 Kh5 92. Kf5 Kh6 93. Bd4 Kh7 94. Kf6 Kh6 95. Be3+ Kh5 96. Kf5 Kh4 97. Bd2 Kg3 98. Bg5 Kf3 99. Bf4 Kg2 100. Bd6 Kf3 101. Bh2 Kg2 102. Bc7 Kf3 103. Bd6 Ke3 104. Ke5 Kf3 105. Kd5 Kg4 106. Kc5 Kf5 107. Kxb5 Ke6 108. Kc6 Kf6 109. Kd7 Kf7 110. Be7 Kg8 111. Ke6 Kg7 112. Bc5 Kg8 113. Kf6 Kh7 114. Kf7 Kh8 115. Bd4+ Kh7 116. Bb2 Kh6 117. Kg8 Kg6 118. Bg7 Kf5 119. Kf7 Kg5 120. Bb2 Kh6 121. Bc1+ Kh7 122. Bd2 Kh8 123. Bc3+ Kh7 124. Bg7')))

		
		this.convertSquaresToBeReadByBoard = this.convertSquaresToBeReadByBoard.bind(this)
	}

	convertSquaresToBeReadByBoard(squares){
		let boardSquares = []

		squares.forEach(x => {
			if(x === "r"){
				boardSquares.push(<Piece name="rook" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "n"){
				boardSquares.push(<Piece name="knight" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "b"){
				boardSquares.push(<Piece name="bishop" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "q"){
				boardSquares.push(<Piece name="queen" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "k"){
				boardSquares.push(<Piece name="king" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "p"){
				boardSquares.push(<Piece name="pawn" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "R"){
				boardSquares.push(<Piece name="rook" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "N"){
				boardSquares.push(<Piece name="knight" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "B"){
				boardSquares.push(<Piece name="bishop" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "Q"){
				boardSquares.push(<Piece name="queen" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "K"){
				boardSquares.push(<Piece name="king" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "P"){
				boardSquares.push(<Piece name="pawn" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === null){
				boardSquares.push(null)
			}
		})

		return boardSquares
	}

	render(){
		let squaresProp = this.convertSquaresToBeReadByBoard(this.props.squares)
		return(
			<Board squares={squaresProp} 
				   isWhitesTurn={this.props.isWhitesTurn}
				   boardFlipped={this.props.boardFlipped}/>
		)
	}
}

export default Game