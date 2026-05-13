/* 
   ANIMACIÓN YETI DEL LOGIN
   El yeti sigue al cursor mientras se escribe el usuario y se
   tapa los ojos cuando el campo de la contraseña recibe el foco.
   Usa GSAP 3 + MorphSVGPlugin (cargados desde /scripts).

   Animación adaptada de:
   https://codepen.io/m3eu/pen/VwYBbwO  (autor original: m3eu)
 */

document.addEventListener("DOMContentLoaded", function () {
    inicializarYeti();
});

function inicializarYeti() {
    if (typeof gsap === "undefined") {
        return;
    }

    if (typeof MorphSVGPlugin !== "undefined") {
        gsap.registerPlugin(MorphSVGPlugin);
    }

    var inputUsuario = document.querySelector("#usuario");
    var inputPassword = document.querySelector("#password");
    var mySVG = document.querySelector(".svgContainer");

    if (inputUsuario === null || inputPassword === null || mySVG === null) {
        return;
    }

    var armL = document.querySelector(".armL");
    var armR = document.querySelector(".armR");
    var eyeL = document.querySelector(".eyeL");
    var eyeR = document.querySelector(".eyeR");
    var nose = document.querySelector(".nose");
    var mouth = document.querySelector(".mouth");
    var mouthBG = document.querySelector(".mouthBG");
    var mouthSmallBG = document.querySelector(".mouthSmallBG");
    var mouthMediumBG = document.querySelector(".mouthMediumBG");
    var mouthLargeBG = document.querySelector(".mouthLargeBG");
    var mouthMaskPath = document.querySelector("#mouthMaskPath");
    var mouthOutline = document.querySelector(".mouthOutline");
    var tooth = document.querySelector(".tooth");
    var tongue = document.querySelector(".tongue");
    var chin = document.querySelector(".chin");
    var face = document.querySelector(".face");
    var eyebrow = document.querySelector(".eyebrow");
    var outerEarL = document.querySelector(".earL .outerEar");
    var outerEarR = document.querySelector(".earR .outerEar");
    var earHairL = document.querySelector(".earL .earHair");
    var earHairR = document.querySelector(".earR .earHair");
    var hair = document.querySelector(".hair");

    var caretPos, screenCenter, svgCoords, dFromC;
    var eyeMaxHorizD = 20, eyeMaxVertD = 10;
    var noseMaxHorizD = 23, noseMaxVertD = 10;
    var mouthStatus = "small";

    var EASE_EXPO = "expo.out";
    var EASE_QUAD = "quad.out";

    function getCoord() {
        var carPos = inputUsuario.selectionEnd || inputUsuario.value.length;
        var div = document.createElement("div");
        var span = document.createElement("span");
        var copyStyle = getComputedStyle(inputUsuario);

        [].forEach.call(copyStyle, function (prop) {
            div.style[prop] = copyStyle[prop];
        });
        div.style.position = "absolute";
        document.body.appendChild(div);
        div.textContent = inputUsuario.value.substr(0, carPos);
        span.textContent = inputUsuario.value.substr(carPos) || ".";
        div.appendChild(span);

        var emailCoords = getPosition(inputUsuario);
        var caretCoords = getPosition(span);
        var centerCoords = getPosition(mySVG);
        svgCoords = getPosition(mySVG);
        screenCenter = centerCoords.x + (mySVG.offsetWidth / 2);
        caretPos = caretCoords.x + emailCoords.x;
        dFromC = screenCenter - caretPos;

        var eyeLCoords = { x: svgCoords.x + 84, y: svgCoords.y + 76 };
        var eyeRCoords = { x: svgCoords.x + 113, y: svgCoords.y + 76 };
        var noseCoords = { x: svgCoords.x + 97, y: svgCoords.y + 81 };
        var mouthCoords = { x: svgCoords.x + 100, y: svgCoords.y + 100 };

        var eyeLAngle = getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var eyeLX = Math.cos(eyeLAngle) * eyeMaxHorizD;
        var eyeLY = Math.sin(eyeLAngle) * eyeMaxVertD;
        var eyeRAngle = getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var eyeRX = Math.cos(eyeRAngle) * eyeMaxHorizD;
        var eyeRY = Math.sin(eyeRAngle) * eyeMaxVertD;
        var noseAngle = getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var noseX = Math.cos(noseAngle) * noseMaxHorizD;
        var noseY = Math.sin(noseAngle) * noseMaxVertD;
        var mouthAngle = getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
        var mouthX = Math.cos(mouthAngle) * noseMaxHorizD;
        var mouthY = Math.sin(mouthAngle) * noseMaxVertD;
        var mouthR = Math.cos(mouthAngle) * 6;
        var chinX = mouthX * 0.8;
        var chinY = mouthY * 0.5;
        var chinS = 1 - ((dFromC * 0.15) / 100);
        if (chinS > 1) { chinS = 1 - (chinS - 1); }
        var faceX = mouthX * 0.3;
        var faceY = mouthY * 0.4;
        var faceSkew = Math.cos(mouthAngle) * 5;
        var eyebrowSkew = Math.cos(mouthAngle) * 25;
        var outerEarX = Math.cos(mouthAngle) * 4;
        var outerEarY = Math.cos(mouthAngle) * 5;
        var hairX = Math.cos(mouthAngle) * 6;
        var hairS = 1.2;

        gsap.to(eyeL, { duration: 1, x: -eyeLX, y: -eyeLY, ease: EASE_EXPO });
        gsap.to(eyeR, { duration: 1, x: -eyeRX, y: -eyeRY, ease: EASE_EXPO });
        gsap.to(nose, { duration: 1, x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: EASE_EXPO });
        gsap.to(mouth, { duration: 1, x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: EASE_EXPO });
        gsap.to(chin, { duration: 1, x: -chinX, y: -chinY, scaleY: chinS, ease: EASE_EXPO });
        gsap.to(face, { duration: 1, x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: EASE_EXPO });
        gsap.to(eyebrow, { duration: 1, x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: EASE_EXPO });
        gsap.to(outerEarL, { duration: 1, x: outerEarX, y: -outerEarY, ease: EASE_EXPO });
        gsap.to(outerEarR, { duration: 1, x: outerEarX, y: outerEarY, ease: EASE_EXPO });
        gsap.to(earHairL, { duration: 1, x: -outerEarX, y: -outerEarY, ease: EASE_EXPO });
        gsap.to(earHairR, { duration: 1, x: -outerEarX, y: outerEarY, ease: EASE_EXPO });
        gsap.to(hair, { duration: 1, x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: EASE_EXPO });

        document.body.removeChild(div);
    }

    function onUsuarioInput(e) {
        getCoord();
        var value = e.target.value;

        if (value.length > 0) {
            if (mouthStatus === "small") {
                mouthStatus = "medium";
                gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: { shape: mouthMediumBG, shapeIndex: 8 }, ease: EASE_EXPO });
                gsap.to(tooth, { duration: 1, x: 0, y: 0, ease: EASE_EXPO });
                gsap.to(tongue, { duration: 1, x: 0, y: 1, ease: EASE_EXPO });
                gsap.to([eyeL, eyeR], { duration: 1, scaleX: 0.85, scaleY: 0.85, ease: EASE_EXPO });
            }
            if (value.indexOf("@") !== -1) {
                mouthStatus = "large";
                gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: mouthLargeBG, ease: EASE_EXPO });
                gsap.to(tooth, { duration: 1, x: 3, y: -2, ease: EASE_EXPO });
                gsap.to(tongue, { duration: 1, y: 2, ease: EASE_EXPO });
                gsap.to([eyeL, eyeR], { duration: 1, scaleX: 0.65, scaleY: 0.65, ease: EASE_EXPO, transformOrigin: "center center" });
            } else {
                mouthStatus = "medium";
                gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: mouthMediumBG, ease: EASE_EXPO });
                gsap.to(tooth, { duration: 1, x: 0, y: 0, ease: EASE_EXPO });
                gsap.to(tongue, { duration: 1, x: 0, y: 1, ease: EASE_EXPO });
                gsap.to([eyeL, eyeR], { duration: 1, scaleX: 0.85, scaleY: 0.85, ease: EASE_EXPO });
            }
        } else {
            mouthStatus = "small";
            gsap.to([mouthBG, mouthOutline, mouthMaskPath], { duration: 1, morphSVG: { shape: mouthSmallBG, shapeIndex: 9 }, ease: EASE_EXPO });
            gsap.to(tooth, { duration: 1, x: 0, y: 0, ease: EASE_EXPO });
            gsap.to(tongue, { duration: 1, y: 0, ease: EASE_EXPO });
            gsap.to([eyeL, eyeR], { duration: 1, scaleX: 1, scaleY: 1, ease: EASE_EXPO });
        }
    }

    function onUsuarioFocus(e) {
        e.target.parentElement.classList.add("focusWithText");
        getCoord();
    }

    function onUsuarioBlur(e) {
        if (e.target.value === "") {
            e.target.parentElement.classList.remove("focusWithText");
        }
        resetFace();
    }

    function onPasswordFocus() {
        coverEyes();
    }

    function onPasswordBlur() {
        uncoverEyes();
    }

    function coverEyes() {
        gsap.to(armL, { duration: 0.45, x: -93, y: 2, rotation: 0, ease: EASE_QUAD });
        gsap.to(armR, { duration: 0.45, x: -93, y: 2, rotation: 0, ease: EASE_QUAD, delay: 0.1 });
    }

    function uncoverEyes() {
        gsap.to(armL, { duration: 1.35, y: 220, ease: EASE_QUAD });
        gsap.to(armL, { duration: 1.35, rotation: 105, ease: EASE_QUAD, delay: 0.1 });
        gsap.to(armR, { duration: 1.35, y: 220, ease: EASE_QUAD });
        gsap.to(armR, { duration: 1.35, rotation: -105, ease: EASE_QUAD, delay: 0.1 });
    }

    function resetFace() {
        gsap.to([eyeL, eyeR], { duration: 1, x: 0, y: 0, ease: EASE_EXPO });
        gsap.to(nose, { duration: 1, x: 0, y: 0, scaleX: 1, scaleY: 1, ease: EASE_EXPO });
        gsap.to(mouth, { duration: 1, x: 0, y: 0, rotation: 0, ease: EASE_EXPO });
        gsap.to(chin, { duration: 1, x: 0, y: 0, scaleY: 1, ease: EASE_EXPO });
        gsap.to([face, eyebrow], { duration: 1, x: 0, y: 0, skewX: 0, ease: EASE_EXPO });
        gsap.to([outerEarL, outerEarR, earHairL, earHairR, hair], { duration: 1, x: 0, y: 0, scaleY: 1, ease: EASE_EXPO });
    }

    function getAngle(x1, y1, x2, y2) {
        return Math.atan2(y1 - y2, x1 - x2);
    }

    function getPosition(el) {
        var xPos = 0;
        var yPos = 0;
        while (el) {
            if (el.tagName === "BODY") {
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);
            }
            el = el.offsetParent;
        }
        return { x: xPos, y: yPos };
    }

    inputUsuario.addEventListener("focus", onUsuarioFocus);
    inputUsuario.addEventListener("blur", onUsuarioBlur);
    inputUsuario.addEventListener("input", onUsuarioInput);
    inputUsuario.addEventListener("keyup", getCoord);
    inputUsuario.addEventListener("click", getCoord);
    inputPassword.addEventListener("focus", onPasswordFocus);
    inputPassword.addEventListener("blur", onPasswordBlur);

    gsap.set(armL, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
    gsap.set(armR, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });
}
