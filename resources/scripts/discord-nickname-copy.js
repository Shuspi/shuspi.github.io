function select(elem) {
    var rng, sel;
    if (document.createRange) {
        rng = document.createRange();
        rng.selectNode(elem);
        sel = window.getSelection();
        var strSel = '' + sel;
        if (!strSel.length) {
            sel.removeAllRanges();
            sel.addRange(rng);
        }
    } else {
        var rng = document.body.createTextRange();
        rng.moveToElementText(elem);
        rng.select();
    }
}

var $ = jQuery.noConflict();
  $('#discord-widget span#copy').click(function() {
    select($(this)[0]);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    var copied = $('<div id="copied">Скопировано</div>');
    $(this).parent().append(copied);
    $(copied).animate({
        opacity: "1",
        bottom: "-45px"
    }, 500, function() {
        $(this).fadeOut(1000, function() {
            $(this).remove();
        });
    });
});
