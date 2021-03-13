// Fader
var $ = jQuery.noConflict();
	$(window).load(function() {
	setTimeout(function() {
		$('#preloader').fadeOut('slow', function() {});
	}, 1000);
	});

// Text
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("nullbrainexception");
    }
}

var TextScramblePreloader = function () {
    function TextScramblePreloader(el) {
        _classCallCheck(this, TextScramblePreloader);
        this.el = el;
        //Тут можно добавить свои символы для анимации
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    _createClass(TextScramblePreloader, [{
        key: 'setText', value: function setText(
            newText) {
            var _this = this;
            var oldText = this.el.innerText;
            var length = Math.max(oldText.length, newText.length);
            var promise = new Promise(function (resolve) {
                return _this.resolve = resolve;
            });
            this.queue = [];
            for (var i = 0; i < length; i++) {
                var from = oldText[i] || '';
                var to = newText[i] || '';
                var start = Math.floor(Math.random() * 40);
                var end = start + Math.floor(Math.random() * 40);
                this.queue.push({from: from, to: to, start: start, end: end});
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
    }, {
        key: 'update', value: function update() {
            var output = '';
            var complete = 0;
            for (var i = 0, n = this.queue.length; i < n; i++) {
                var _queue$i =
                        this.queue[i], from = _queue$i.from, to = _queue$i.to, start = _queue$i.start,
                    end = _queue$i.end, char = _queue$i.char;
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += '<span class="glitch">' + char + '</span>';
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }, {
        key: 'randomChar', value: function randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }]);
    return TextScramblePreloader;
}();


var phrase = [
	'Loading...'
];

var el = document.querySelector('#preload-text');
var fx = new TextScramblePreloader(el);

var counter = 0;
var next = function next() {
		fx.setText(phrase[counter]).then(function () {
				setTimeout(next, 50);
		});
		counter = (counter + 1) % phrase.length;
};

next();
