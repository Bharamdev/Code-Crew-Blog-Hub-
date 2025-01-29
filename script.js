// ===================== LOCOMOTIVE + GSAP SETUP =====================
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
      tablet: { smooth: true },
      smartphone: { smooth: true },
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
          height: window.innerHeight,
        };
      },
    });
  
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  
    // ✅ Fix anchor navigation issue for internal links
    document.querySelectorAll("nav a").forEach((anchor) => {
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
  
  // ===================== PAGE 2 IMAGE HOVER ANIMATION =====================
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
          duration: 0.2,
        });
      });
    });
  }
  page2Animation();
  
  // ===================== PAGE 3 VIDEO PLAY ANIMATION =====================
  function page3VideoAnimation() {
    var page3Center = document.querySelector(".page3-center");
    var video = document.querySelector("#page3 video");
    if (!page3Center || !video) return; // in case #page3 isn't on the page
  
    page3Center.addEventListener("click", function () {
      video.play();
      gsap.to(video, {
        transform: "scaleX(1) scaleY(1)",
        opacity: 1,
        borderRadius: "0px",
        duration: 0.5,
      });
    });
  
    video.addEventListener("click", function () {
      video.pause();
      gsap.to(video, {
        transform: "scaleX(0.7) scaleY(0)",
        opacity: 0,
        borderRadius: "30px",
        duration: 0.5,
      });
    });
  }
  page3VideoAnimation();
  
  // ===================== PAGE 6 SCROLL ANIMATIONS =====================
  function page6Animations() {
    if (!document.querySelector("#btm6-part2")) return;
  
    gsap.from("#btm6-part2 h4", {
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#btm6-part2",
        scroller: "#main",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    });
  }
  page6Animations();
  
  // ===================== SMOOTH PAGE LOADING ANIMATION =====================
  function loadingAnimation() {
    var tl = gsap.timeline();
    tl.from("#page1", {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
    });
    tl.from("#page1", {
      transform: "scaleX(0.7) scaleY(0.2)",
      borderRadius: "150px",
      duration: 2,
      ease: "expo.out",
    });
    tl.from("nav", {
      opacity: 0,
      delay: -0.2,
    });
    tl.from("#page1 h1, #page1 p, #page1 div", {
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
  }
  loadingAnimation();
  
  // =======================================================
  //   NEW CODE FOR MODAL, POST CREATION, LOCALSTORAGE
  // =======================================================
  
  // Grab elements
  const writePostBtn = document.getElementById("writePostBtn");
  const becomeBloggerBtn = document.getElementById("becomeBloggerBtn");
  const postModal = document.getElementById("postModal");
  const postModalOverlay = document.getElementById("postModalOverlay");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const postForm = document.getElementById("postForm");
  const newPostsContainer = document.getElementById("newPostsContainer");
  
  // OPEN MODAL
  function openModal() {
    postModal.style.display = "block";
    postModalOverlay.style.display = "block";
  }
  
  // CLOSE MODAL
  function closeModal() {
    postModal.style.display = "none";
    postModalOverlay.style.display = "none";
  }
  
  // EVENT LISTENERS FOR BUTTONS
  writePostBtn.addEventListener("click", openModal);
  becomeBloggerBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  postModalOverlay.addEventListener("click", closeModal);
  
  // LOAD SAVED POSTS FROM LOCALSTORAGE
  document.addEventListener("DOMContentLoaded", () => {
    loadSavedPosts();
  });
  
  // FORM SUBMISSION
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("postTitle").value.trim();
    const imageUrl = document.getElementById("postImage").value.trim();
    const content = document.getElementById("postContent").value.trim();
  
    if (title && content) {
      // Create Post Object
      const newPost = {
        title,
        imageUrl: imageUrl || "", // optional
        content,
      };
  
      // Save to localStorage
      savePostToLocalStorage(newPost);
  
      // Create a new card in DOM
      createPostCard(newPost);
  
      // Clear form + close modal
      postForm.reset();
      closeModal();
    }
  });
  
  // SAVE POST TO LOCALSTORAGE
  function savePostToLocalStorage(post) {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts.push(post);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }
  
  // LOAD POSTS FROM LOCALSTORAGE
  function loadSavedPosts() {
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    posts.forEach((post) => {
      createPostCard(post);
    });
  }
  
  // CREATE CARD IN DOM
  function createPostCard(post) {
    // Card Container
    const card = document.createElement("div");
    card.classList.add("new-post-card");
  
    // Image
    if (post.imageUrl) {
      const imgEl = document.createElement("img");
      imgEl.src = post.imageUrl;
      card.appendChild(imgEl);
    }
  
    // Content Wrapper
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("new-post-content");
  
    // Title
    const titleEl = document.createElement("h3");
    titleEl.classList.add("new-post-title");
    titleEl.textContent = post.title;
    contentDiv.appendChild(titleEl);
  
    // Text
    const textEl = document.createElement("p");
    textEl.classList.add("new-post-text");
    textEl.textContent = post.content;
    contentDiv.appendChild(textEl);
  
    card.appendChild(contentDiv);
    newPostsContainer.prepend(card); // newest on top
  }
  
