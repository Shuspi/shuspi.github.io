var emojiarray = ["🏫","🏦","🏨","🏠","🌋","🕋","🌇","🌆","🚇","🎇"]
var emojicount = 0;

setInterval(function()
{
    emojicount++;
    if(emojicount > emojiarray.length - 1) emojicount = 0;
    document.title = "Shuspi " + emojiarray[emojicount];
}, 1000);
