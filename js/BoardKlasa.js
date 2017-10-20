function Board(name) {
	var self = this;
	this.name = name;
	this.$element = createBoard();

	function createBoard() {
		var $board = $('div').addClass('.board');
		var $container = $('div').addClass('.column-container');
		var $boardTitle = $('h1').text(self.name);
		var $setColumn = $('button').addClass('.create-column').text('Add a column');
	}

	$board.append($boardTitle);
	$board.append($setColumn);
	$board.append($container);

	return $board
}

function setNewBoard(n) {
	var board = new Board(n);
	$('body').append(board);
}