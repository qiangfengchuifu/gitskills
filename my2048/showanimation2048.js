
function showWithNumberAnimation( i, j, randNumber )
{
	var numberCeil = $( "#number-ceil-" +i + "-" + j );

	numberCeil.css( "background-color", getNumberBackgroundColor( randNumber ) );
	numberCeil.css( "color", getNumberColor( randNumber ) );
	numberCeil.text( randNumber );

	numberCeil.animate({
		width: "100px",
		height: "100px",
		top: getPosTop( i ,j ),
		left: getPosLeft( i ,j )

	},50)
}

function showMoveAnimation( fromx , fromy , tox, toy ){

    var numberCeil = $('#number-ceil-' + fromx + '-' + fromy );
    numberCeil.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },200);
}

function showScore( score )
{
	$( "#score" ).text( score );
}