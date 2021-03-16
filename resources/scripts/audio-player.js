// Audio Fader
var defaultvolume = .2,
    currentvolume = 0,
    audiofader_intervalid = 0;

function audiofader_OnFocus() {
    clearInterval(audiofader_intervalid),
        audiofader_intervalid = setInterval(function() {
            (currentvolume += .01) >= defaultvolume && (currentvolume = defaultvolume,
                    clearInterval(audiofader_intervalid)),
                document.querySelector("audio").volume = currentvolume
        }, 15)
}

function audiofader_OnBlur() {
    clearInterval(audiofader_intervalid),
        audiofader_intervalid = setInterval(function() {
            (currentvolume -= .01) <= .02 && (currentvolume = .02,
                    clearInterval(audiofader_intervalid)),
                document.querySelector("audio").volume = currentvolume
        }, 15)
}

window.SetVolume = function(e) {
        defaultvolume = e / 100,
            document.querySelector("audio").volume = defaultvolume
    },
    window.onfocus = function() {
        audiofader_OnFocus()
    },
    window.onblur = function() {
        audiofader_OnBlur()
    },

    audiofader_intervalid = setInterval(function() {
        (currentvolume += .01) >= defaultvolume && (currentvolume = defaultvolume,
                clearInterval(audiofader_intervalid)),
            document.querySelector("audio").volume = currentvolume
    }, 15);

// Audio randomizer
var audioArray =
["resources/tracks/track-1.mp3",
"resources/tracks/track-2.mp3",
"resources/tracks/track-3.mp3",
"resources/tracks/track-4.mp3",
"resources/tracks/track-5.mp3",
"resources/tracks/track-6.mp3"];
document.getElementById("audio").src = audioArray[Math.floor(Math.random() * audioArray.length)];
var audio = document.getElementById("audio"),
    audioisPlaying = !1;

function togglePlay() {
    audioisPlaying ? audio.pause() : audio.play()
}

function refresh() {
    var a = Math.floor(Math.random() * audioArray.length);
    document.getElementsByTagName("audio")[0].src = "" + audioArray[a],
        audio.load(),
        audio.play()
}
audio.onplaying = function() {
        audioisPlaying = !0
    },
    audio.onpause = function() {
        audioisPlaying = !1
    };

// Button changer
jQuery(function(o) {
    $(".play-button").click(function() {
            $(".play-button").toggleClass("fa-play").toggleClass("fa-pause")
        }),

        $(".volume-button").click(function() {
            $(".volume-button").toggleClass("fa-volume-off").toggleClass("fa-volume-up"),
                $("audio").prop("muted", !o("audio").prop("muted"))
        })
});
