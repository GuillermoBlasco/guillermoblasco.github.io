(function(Raphael, Vivus, SVG_PATH_FONT){
    'use strict';

    var title = "Standard Poetry";
    window.onload = function () {
        calligraph(title, "title");
    };

    var calligraph = function(text, id) {

        var width = window.innerWidth;
        document.getElementById(id).style.width = width + "px";
        var r = Raphael(id, window.innerWidth, 600);
        var leftOffset = 0;
        var letterSpacing = 5;
        var whitespaceSize = 20;
        for (var i = 0; i < text.length; i++) {
            var titleLetter = text[i];
            if (SVG_PATH_FONT.helvetica[titleLetter] == undefined) {
                leftOffset += whitespaceSize;
            } else {
                var translate = "T" + leftOffset + ",0";
                var letter = r.path(SVG_PATH_FONT.helvetica[titleLetter])
                    .attr({stroke: "#ddd", "fill-opacity": .3, "stroke-width": 1, "stroke-linecap": "round",fill:"#191919"});
                var t = letter.transform(translate);
                console.log(t);
                leftOffset += t[0].getBoundingClientRect().width;
                if (i + 1 < title.length) {
                    leftOffset += letterSpacing;
                }
            }
        }
        var extraLeftOffset = (width - leftOffset) / 2;
        r.forEach(function(t) {
            t.transform("...T" + extraLeftOffset + ",0");
        });

        var vivus = new Vivus(r.canvas, {type: 'async', duration: 100, start: 'autostart', dashGap: 10, forceRender: false});

    };
})(Raphael.ninja(), Vivus, SVG_PATH_FONT);