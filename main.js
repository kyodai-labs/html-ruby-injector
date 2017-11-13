/* 甘いミーム　*/
var pattern = /\{([^\}]*)\}\(([^\)]*)\)/g,
    replacement = '<ruby>$1<rt>$2</rt></ruby>',
    input = document.querySelector('#input'),
    output = document.querySelector('#output'),
    preview = document.querySelector('#preview');

input.onkeyup = (e) => {
    var processed = input.value.replace(pattern, replacement);
    output.value = processed;
    preview.innerHTML = processed.replace(/\n/g, '<br>');
};

input.onkeypress = (e) => {
    var sStart = input.selectionStart, sEnd = input.selectionEnd;
    var left, middle, right;
    var justice, speedLimit; // good and cool.

    if (e.key === '{' && sStart != sEnd) {
        e.preventDefault(); // don't actually insert '{' key

        left = input.value.substring(0, sStart);
        middle = input.value.substring(sStart, sEnd); // target!
        right = input.value.substring(sEnd);

        justice = left + '{' + middle + '}()';
        speedLimit = justice.length - 1;
        justice += right;

        input.value = justice;
        input.selectionEnd = speedLimit;
    }
    else if (e.key === '{') {
        e.preventDefault(); // don't actually insert '{' key

        left = input.value.substring(0, sStart);
        right = input.value.substring(sEnd);

        justice = left + '{}()';
        speedLimit = justice.length - 3;
        justice += right;

        input.value = justice;
        input.selectionEnd = speedLimit;
    }
}

window.onload = () => {
    var content = localStorage.getItem('content');
    if (content !== null) {
        input.value = content;
        input.onkeyup(); // TRiGGER
    }
}

window.onunload = (e) => {
    var content = input.value;
    localStorage.setItem('content', content);
}
