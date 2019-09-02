
//游戏数据
var board = new Array();
var score = 0;

var hasCon = new Array();

$( document ).ready( function()
	{
		newgame();
	} );

function newgame()
{
	//初始化棋盘格
	init();
	//随机俩个格子生成数字
	generateOneNumber();
	generateOneNumber();

}

function init()
{
	for( var i = 0; i < 4; i ++ )
	{
		for( var j = 0; j < 4; j ++ )
		{
			var gridCeil = $( "#grid-ceil-" + i + "-" + j );
			gridCeil.css( "top", getPosTop( i , j ) );
			gridCeil.css( "left", getPosLeft( i , j ) );
		}
	}

	for( var i = 0; i < 4; i ++ )
	{
		board[i] = new Array();
		hasCon[i] = new Array();
		for( var j = 0; j < 4; j ++ )
		{
			board[i][j] = 0;
			hasCon[i][j] = false;
		}
	}

	updateNumberView();

	score = 0;
}

function updateNumberView()
{

	$( ".number-ceil" ).remove();
	for( var i = 0; i < 4; i ++ )
	{
		for( var j = 0; j < 4; j ++ )
		{
			$( "#grid-container" ).append( '<div class="number-ceil" id="number-ceil-'+i+'-'+j+'"></div>' );
			var theNumberCeil = $( '#number-ceil-' +i +'-' +j );

			if( board[i][j] == 0 )
			{
				theNumberCeil.css( "width", "0px" );
				theNumberCeil.css( "height", "0px" );
				theNumberCeil.css( "top", getPosTop( i,j ) + 50 );
				theNumberCeil.css( "left", getPosLeft( i,j) + 50 );
			}
			else
			{
				theNumberCeil.css( "width", "100px" );
				theNumberCeil.css( "height", "100px" );
				theNumberCeil.css( "top", getPosTop( i,j ) );
				theNumberCeil.css( "left", getPosLeft( i,j ) );
				theNumberCeil.css( "background-color", getNumberBackgroundColor( board[i][j] ) );
				theNumberCeil.css( "color", getNumberColor( board[i][j] ) );
				theNumberCeil.text( board[i][j] );
			} 

			hasCon[i][j] = false; 
		}
	}
}

function generateOneNumber()
{
	if( nospace( board ) )
	{
		return false;
	}
	else
	{
				//随机一个位置
		var randx = parseInt( Math.floor( Math.random() * 4 ) );
		var randy = parseInt( Math.floor( Math.random() * 4 ) );

		while( true )
		{
			if( board[randx][randy] == 0 )
			{
				break;
			}
			else
			{
				var randx = parseInt( Math.floor( Math.random() * 4 ) );
				var randy = parseInt( Math.floor( Math.random() * 4 ) );
			}
			
			
		}

		//随机一个数字
		var randNumber = Math.random() < 0.5 ? 2 : 4;

		//在随机位置上显示随机数字
		board[randx][randy] = randNumber;
		showWithNumberAnimation( randx, randy, randNumber );

		return true;
	}

}

$( document ).keydown( function( event )
	{
		switch( event.keyCode )
		{
			case 37: //left
				if( moveLeft() )
				{
					setTimeout("generateOneNumber()" ,210);
					setTimeout("isgameOver()" ,300);
				}
				break;

			case 38: //up
				if( moveUp() )
				{
					setTimeout("generateOneNumber()" ,210);
					setTimeout("isgameOver()" ,300);
				}
				break;

			case 39: //right
				if( moveRight() )
				{
					setTimeout("generateOneNumber()" ,210);
					setTimeout("isgameOver()" ,300);
				}
				break;

			case 40: //bottom
				if( moveDown() )
				{
					setTimeout("generateOneNumber()" ,210);
					setTimeout("isgameOver()" ,300);
				}
				break;

			default:
				break;
		}
} )

function isgameOver()
{
	if( nospace( board ) && nomove( board ) )
	{
		gameOver();
	}
}

function gameOver()
{
	alert( "GameOver!" )
}

function moveLeft()
{
	if( !canMoveLeft(board) )//用于判断是否可以左移操作；
	{
		return false;
	}
	//如果返回true，开始执行向左移动；
	for( var i = 0; i < 4; i ++ )
	{
		for( var j = 1; j < 4; j ++ )
		{
			if( board[i][j] != 0 )
			{

				for( var k = 0; k < j; k ++ )
				{
					if( board[i][k] == 0 && noBlockHorizontal( i, k, j, board ) )
					{
						//移动
						//从ij的位置移动到ik的位置
						showMoveAnimation( i, j, i, k );
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[i][k] == board[i][j] && noBlockHorizontal( i, k, j, board ) && !hasCon[i][k] )
					{
						//移动；
						//累加；
						showMoveAnimation( i, j, i, k );
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						showScore( score );

						hasCon[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	

	setTimeout( "updateNumberView()",200 );

	return true;
}

function moveRight()
{
	if( !canMoveRight( board ) )
	{
		return false;
	}
	//右移动
	for( var i = 0; i < 4; i ++ )
	{
		for( var j = 2; j >= 0; j -- )
		{
			if( board[i][j] != 0 )
			{

				for( var k = 3; k > j; k -- )
				{
					if( board[i][k] == 0 && noBlockHorizontal( i, j, k, board ) )
					{
						//向右移动
						showMoveAnimation( i, j, i, k );
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[i][k] == board[i][j] && noBlockHorizontal( i, j, k, board ) && !hasCon[i][k] )
					{
						//累加
						showMoveAnimation( i, j, i, k );
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score += board[i][k];
						showScore( score );

						hasCon[i][k] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout( "updateNumberView()", 200 );
	return true;
}


function moveUp()
{
	if( !canMoveUp( board ) )
	{
		return false;
	}
	for( var j = 0; j < 4; j ++ )
	{
		for( var i = 1; i < 4; i ++ )
		{
			if( board[i][j] != 0 )
			{
				for( var k = 0; k < i; k ++ )
				{

					if( board[k][j] == 0 && noBlockVertical( j, k, i, board ) )
					{
						showMoveAnimation( i, j, k, j );
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[k][j] == board[i][j] && noBlockVertical( j, k, i, board ) && !hasCon[k][j] )
					{
						showMoveAnimation( i, j, k, j );
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						showScore( score );
						hasCon[k][j] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout( "updateNumberView()",200 );
	return true;
}

function moveDown()
{
	if( !canMoveDown( board ) )
	{
		return false;
	}
	for( var j = 0; j < 4; j ++ )
	{
		for( var i = 2; i >= 0; i -- )
		{
			if( board[i][j] != 0 )
			{
				for( var k = 3; k > i; k -- )
				{

					if( board[k][j] == 0 && noBlockVertical( j, i, k, board ) )
					{
						showMoveAnimation( i, j, k, j );
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[k][j] == board[i][j] && noBlockVertical( j, i, k, board ) && !hasCon[k][j] )
					{
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						showScore( score );

						hasCon[k][j] = true;
						continue;
					}
				}
			}
		}
	}

	setTimeout( "updateNumberView()", 200 )
	return true;
}