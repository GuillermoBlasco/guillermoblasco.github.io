(function() {
    'use strict';
    var execFor = function(command, context, alias) {
        return (function() {
            if (window[alias] != undefined) {
                window["oa8fod938fuvoc0"] = window[alias];
            }
            window[alias] = context;
            var out =  eval(command);
            if (window["oa8fod938fuvoc0"] != undefined) {
                window[alias] = window["oa8fod938fuvoc0"];
            } else {
                window[alias] = undefined;
            }
            return out;
        })();
    };

    var autocompleteFor = function(context) {
        var f = function(text) {

        };
        return f;
    };
    var dispatchCommandFor = function(context, outputbox) {
        var dispatchCommand = function (command) {
            var pIn = document.createElement("p");
            var textIn = document.createTextNode(command);
            pIn.appendChild(textIn);
            pIn.className = "consoleInput";
            outputbox.appendChild(pIn);
            var output = "";
            try {
                output = execFor(command, context, 'me');
            } catch (e) {
                output = "Looks like an error: " + e.toString();
            }
            var pOut = document.createElement("p");
            var textOut = document.createTextNode((output) ? output.toString() : "");
            pOut.appendChild(textOut);
            pOut.className = "consoleOutput";
            outputbox.appendChild(pOut);
            outputbox.parentNode.scrollTop = outputbox.parentNode.scrollHeight;
        };
        return dispatchCommand;
    };
    var dispatchInputWith = function(autocomplete, dispatchCommand) {
        var dispatchInput = function (e) {
            var command = e.target.value;
            if (e.which == 13) {
                dispatchCommand(command);
                e.target.value = "";
            } else {
                autocomplete(command);
            }
        };
        return dispatchInput;
    };

    window.onload = function() {
        var context = {
            name : function() { return "Guillermo"; },
            city : function() { return "Barcelona"; },
            education: function() { return ["Mathematics degree", "Software Engineering degree"]; }
        };
        var consoleBox = document.getElementById('consoleBox');
        var inputbox = document.getElementById('consoleInputBox');
        var outputbox = document.getElementById('consoleOutputBox');
        var autocomplete = autocompleteFor(context);
        var dispatchCommand = dispatchCommandFor(context, outputbox);
        var dispatchInput = dispatchInputWith(autocomplete, dispatchCommand);
        inputbox.addEventListener('keypress', dispatchInput);
    };
})();
(function() {
    'use strict';
    var banner = "Web developed by theblackbox.io \n find us in theblackbox.io";
    window.console && console.log(banner);
})();

        Polymer('tbb-landscape',{
            blur : false,
            gray : false,
            imgSrc : "",
            height: 150,
            get onlyBlur() { return this.blur && ! this.gray; },
            get onlyGray() { return this.gray && ! this.blur; },
            get blurAndGray() { return this.gray && this.blur; }

        });
    ;

        Polymer("tbb-cardbox", {
            riseonhover : false
        });
    