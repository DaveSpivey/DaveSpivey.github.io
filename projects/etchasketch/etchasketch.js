$(document).ready(function() {
    var gridWidth = 960;
    var boxWidth = 59;
    var boxAxis = gridWidth/(boxWidth+1);

    $('#container').css({'width': +gridWidth+ 'px', 'margin': 'auto'});

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function setGrid() {

        boxAxis = gridWidth/(boxWidth+1);

        for(var i = 0; i < (boxAxis * boxAxis); i++) {
            $('#container').append('<div class="box">');
        };

        $('.box').css({'border': '1px solid black', 'width': +boxWidth+ 'px', 'height': +boxWidth+ 'px', 'display': 'inline-block', 'margin-bottom': '-5px', 'margin-left': '-1px', 'background-color': '#fff'});

        $('.box').on('mouseenter', function() {
            $(this).css('background-color', getRandomColor);
        });
    };

    setGrid();

    $('.button').on('mouseenter', function() {
        $(this).addClass('hover');
    });

    $('.button').on('mouseleave', function() {
        $(this).removeClass('hover');
    });

    $('.button').on('click', function() {
        $('.box').remove();

        var boxNumber = prompt("How many boxes in each row?");

        if (boxNumber != null && boxNumber < 140) {
            boxWidth = (gridWidth/boxNumber) - 1;
        };

        setGrid();
    });
});