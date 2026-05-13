3.15-var SLIDER_STEP = 280;

function sliderPrev() {
    document.getElementById('slider-container').scrollLeft -= SLIDER_STEP;
}

function sliderNext() {
    document.getElementById('slider-container').scrollLeft += SLIDER_STEP;
}

document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementById('sliderOverlay');

    document.querySelectorAll('.slider-track .slide img').forEach(function (img) {
        img.addEventListener('click', function () {
            var isZoomed = img.classList.contains('zoomed');
            document.querySelectorAll('.slider-track .slide img.zoomed').forEach(function (z) {
                z.classList.remove('zoomed');
            });
            if (!isZoomed) {
                img.classList.add('zoomed');
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        });
    });

    overlay.addEventListener('click', function () {
        document.querySelectorAll('.slider-track .slide img.zoomed').forEach(function (z) {
            z.classList.remove('zoomed');
        });
        overlay.classList.remove('active');
    });
});
*