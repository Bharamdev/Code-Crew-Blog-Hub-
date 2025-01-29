function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        tablet: { smooth: true },
        smartphone: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    // ✅ Fix anchor navigation issue for internal links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = this.getAttribute("href");

            // If the link is external (another HTML file), navigate normally
            if (target.includes(".html")) {
                window.location.href = target; // Redirect to new page
            } else if (target.startsWith("#")) {
                // If it's an internal link (like #contact), prevent default and scroll
                e.preventDefault();
                const section = document.querySelector(target);
                if (section) {
                    locoScroll.scrollTo(section);
                }
            }
        });
    });
}

locomotiveAnimation();

// ✅ Page 2 Hover Animation (Image Appear)
function page2Animation() {
    var rightElems = document.querySelectorAll(".right-elem");

    rightElems.forEach(function (elem) {
        var img = elem.querySelector("img");

        elem.addEventListener("mouseenter", function () {
            gsap.to(img, { opacity: 1, scale: 1, duration: 0.3 });
        });

        elem.addEventListener("mouseleave", function () {
            gsap.to(img, { opacity: 0, scale: 0, duration: 0.3 });
        });

        elem.addEventListener("mousemove", function (dets) {
            gsap.to(img, {
                x: dets.clientX - elem.getBoundingClientRect().x - 50,
                y: dets.clientY - elem.getBoundingClientRect().y - 130,
                duration: 0.2
            });
        });
    });
}

page2Animation();

// ✅ Page 3 Video Play Animation
function page3VideoAnimation() {
    var page3Center = document.querySelector(".page3-center");
    var video = document.querySelector("#page3 video");

    page3Center.addEventListener("click", function () {
        video.play();
        gsap.to(video, {
            transform: "scaleX(1) scaleY(1)",
            opacity: 1,
            borderRadius: "0px",
            duration: 0.5
        });
    });

    video.addEventListener("click", function () {
        video.pause();
        gsap.to(video, {
            transform: "scaleX(0.7) scaleY(0)",
            opacity: 0,
            borderRadius: "30px",
            duration: 0.5
        });
    });
}

page3VideoAnimation();

// ✅ Page 6 Scroll Animations
function page6Animations() {
    gsap.from("#btm6-part2 h4", {
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#btm6-part2",
            scroller: "#main",
            start: "top 80%",
            end: "top 10%",
            scrub: true
        }
    });
}

page6Animations();

// ✅ Smooth Page Loading Animation
function loadingAnimation() {
    var tl = gsap.timeline();
    tl.from("#page1", {
        opacity: 0,
        duration: 0.3,
        delay: 0.2
    });
    tl.from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    });
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    });
    tl.from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    });
}

loadingAnimation();
