$(document).ready(function () {

//var count = 0;
var board = {};

	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    for (i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

	function Column(name) {
		var self = this; // useful for nested functions

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $fakeCard = $('<li>').addClass('fake'); // Moja wrzutka, umożliwia przenoszenie kart między kolumnami
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('new card');
			self.checkList = $('li').length;	
		
			$columnDelete.click(function() {
	        	self.removeColumn();
				});
		    $columnAddCard.click(function() {
		        self.addCard(new Card(prompt("Enter the name of the card")));
				});

	    	$column.append($columnTitle);
	        $column.append($columnDelete);
	        $column.append($columnAddCard);
	        $column.append($columnCardList);
	        $fakeCard.text('Put card here'); // Tekst do dodatkowej karty
	        $columnCardList.append($fakeCard);

			return $column;
	    }
	}

	Column.prototype.addCard = function(card) {
 		this.$element.children('ul').prepend(card.$element); //Małe udoskonalenie - zamiana z 'append' na 'prepand';)
    };

    Column.prototype.removeColumn = function() {
  		this.$element.remove();
    };


	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard(); 

		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');
	
			$cardDelete.click(function(){
		        self.removeCard();
			});

		    $card.append($cardDelete);
			$card.append($cardDescription);
		
			return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	function kurwa(name) {
		var name = prompt('Enter a column name');
		var column = new Column(name);
		column.$element.appendTo($(this).siblings('.column-container'));
		column.$element.hide();
		column.$element.fadeIn('slow');
	    initSortable();
	}

	$('.create-column').click(function() {
		console.log(this);
		/*var $addElement = $('.column-container');
		var name = prompt('Enter a column name');
		var column = new Column(name);
		this.before(column);
	    //this.$addElement.addColumn(column);
	    initSortable();
	    console.log('Obiekt.number to: ' + newBoard.number);*/
	});

	function initSortable() {
	    $('.column-card-list').sortable({
		    connectWith: '.column-card-list',
		    placeholder: 'card-placeholder'
	    }).disableSelection();
	    //if ($('.column-card-list').length > 1) $(this).find('.fake').hide();
	}

	function setFakeToLast() {
	    $('.column-card-list').find('.fake').appendTo($('.column-card-list'));		
	}

	//Tworzenie tablicy
	setNewBoard('Kanban');

	// TWORZENIE KOLUMN
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);

	console.log(doingColumn.checkList);
	/*$('li').mouseup(function() {
		console.log($('.column-card-list').length)
		setFakeToLast();
	})*/

	function Board(name, num) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createBoard();
		this.number = num;
	    this.addColumn = function (column) {
			this.$element.find('.column-container').append(column.$element);
			column.$element.hide();
			column.$element.fadeIn(1500);
			initSortable();
	    };

		function createBoard() {
			var $board = $('<div>').addClass('board');
			var $container = $('<div>').addClass('column-container');
			var $boardTitle = $('<h1>').text(self.name);
			var $setColumn = $('<button>').addClass('create-column').text('new column');
			/*$setColumn.attr('id', self.number);*/

			$setColumn.click(kurwa);

			$board.append($boardTitle);
			$board.append($setColumn);
			$board.append($container);
			
			return $board;
		}
	}
/*
	Board.prototype.addColumn = function(column) {
		this.$element.find('.column-container').append(column.$element);
		//column.$element.appendTo($(this).('.column-container'));
		//$(this).find('.column-container').append(column.$element);
	};
*/
	function setNewBoard(name) {
		board = new Board(name);
	    $('.operate').after(board.$element);
		board.$element.hide();
		board.$element.slideDown('slow');

	    //count++;
	    //var newBoard = null;
	    //console.log(newBoard);
	    return board;		
	}

	$('.create-board').click(function() {
		var boardName = prompt('Enter a board name');
		setNewBoard(boardName);
	});

	function checkList () {
		$('.column-card-list').each(function () {
			console.log($(this).find('li').length);
			if ($(this).find('li').length > 1) $(this).find('.fake').hide();
		});
	}

	checkList();
});