
/* =========================================================
   MUTINTA JEWELLERY — INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile navigation ---------- */
  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuButton.setAttribute(
        "aria-label",
        navLinks.classList.contains("open") ? "Close menu" : "Open menu"
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  /* ---------- Gallery description expanders ---------- */
  document.querySelectorAll(".gallery-caption p").forEach((description, index) => {
    description.classList.add("is-collapsed");
    if (description.scrollHeight <= description.clientHeight + 1) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-read-more";
    button.textContent = "Read more";
    button.setAttribute("aria-expanded", "false");
    description.id = `gallery-description-${index + 1}`;
    button.setAttribute("aria-controls", description.id);
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "Read more" : "Read less";
      description.classList.toggle("is-collapsed", expanded);
    });
    description.after(button);
  });

  /* ---------- Counter animation ---------- */
  document.querySelectorAll("[data-count]").forEach(counter => {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    let started = false;

    const countObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || started) return;
      started = true;

      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.disconnect();
    }, { threshold: .5 });

    countObserver.observe(counter);
  });

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Home gallery slideshow ---------- */
  const carousel = document.querySelector(".home-carousel");
  if (carousel) {
    const slides = [
      {
        image: "assets/tech_1.jpg",
        alt: "Industry partners gathered outside a facility",
        category: "Equipped for Excellence",
        title: "Where Technology Meets Craft",
        description: "Modern equipment supporting precision, testing, and innovation across Zambia’s jewellery and gemstone industry."
      },
      {
        image: "assets/furrer_partnership_2.jpg",
        alt: "Workshop participants working together at a bench",
        category: "Strategic Partnerships",
        title: "Building Partnerships for Transformation",
        description: "The Ministry of Technology and Science formalized partnerships with Furrer Foundation and Mutinta Jewellery Company to advance skills development, technology transfer, entrepreneurship and value addition in Zambia."
      },
      {
        image: "assets/inspection_visit_3.jpg",
        alt: "Gemstone testing equipment installed in a laboratory",
        category: "Investment & Value Addition",
        title: "Investing in Zambia’s Mineral Wealth",
        description: "Mutinta Jewellery invested over US$3.2 million in a gemstone processing plant, creating opportunities for local employment and advancing value addition in Zambia’s mineral sector."
      },
      {
        image: "assets/inspection_visit_4.jpg",
        alt: "Gemstone testing equipment inside a laboratory",
        category: "Government Engagement",
        title: "A Closer Look at Our Operations",
        description: "Ministry of Mines and Minerals Development Permanent Secretary Barnaby Mulenga visited Mutinta Jewellery and Gemstone Processing Plant, engaging with company leadership and inspecting its operations in Lusaka."
      },
      {
        image: "assets/furrer_partnership_5.jpg",
        alt: "Two trainees learning to use workshop equipment",
        category: "PARTNERSHIP & COMMITMENT",
        title: "Putting Partnership Into Action",
        description: "Formal discussions and document signing mark another step in building strategic partnerships that support skills development, technology transfer and value addition in Zambia’s gemstone industry."
      },
      {
        image: "assets/furrer_partnership_6.jpg",
        alt: "A workshop participant operating gemstone equipment",
        category: "TEAM & EXPERTISE",
        title: "People. Expertise. Purpose.",
        description: "Our people and partners are at the heart of our commitment to innovation, technical excellence and the growth of Zambia’s gemstone industry."
      },
      {
        image: "assets/tech_7.jpg",
        alt: "Visitors standing together inside an industry facility",
        category: "Processing Infrastructure",
        title: "Built for Precision and Scale",
        description: "Specialized processing infrastructure forms the foundation of Mutinta Jewellery’s gemstone operations, supporting efficient handling, processing and value addition."
      },
      {
        image: "assets/furrer_partnership_8.jpg",
        alt: "Visitors inspecting workshop vehicles and equipment",
        category: "Government & Industry Collaboration",
        title: "Advancing Zambia’s Gemstone Industry",
        description: "Minister of Technology and Science Hon. Felix C. Mutati tours Mutinta Jewellery, highlighting the role of modern processing technology, knowledge exchange and private-sector collaboration in driving value addition and industrial growth."
      },
      {
        image: "assets/precious_stones_9.jpg",
        alt: "A craftswoman cutting gemstones at a workbench",
        category: "Zambia's Mineral Wealth",
        title: "From Gemstones to Possibility",
        description: "Zambia’s mineral wealth holds immense potential for value addition, innovation and industrial growth through local processing and jewellery manufacturing."
      },
      {
        image: "assets/inspection_visit_10.jpg",
        alt: "Industry visitors discussing a facility during a site visit",
        category: "Facility & operations",
        title: "Beyond Processing",
        description: "The Mutinta Jewellery facility brings together specialized workspaces, equipment and operational infrastructure supporting gemstone processing and the wider development of Zambia’s jewellery industry."
      },
      {
        image: "assets/furrer_partnership_11.jpg",
        alt: "Two partners meeting beside workshop equipment",
        category: "Industry Leadership",
        title: "Building Partnerships That Last",
        description: "Mutinta Jewellery’s leadership continues to engage with key industry stakeholders, building relationships that support knowledge exchange, collaboration and the growth of Zambia’s gemstone industry."
      },
      {
        image: "assets/precious_stones_12.jpg",
        alt: "Workshop trainees and instructors gathered around their work",
        category: "FROM RESOURCE TO VALUE",
        title: "Nature, Refined",
        description: "Zambia’s mineral wealth provides the foundation for a value chain built on expertise, technology, craftsmanship and local enterprise."
      },
      {
        image: "assets/tech_13.jpg",
        alt: "Rows of specialist equipment in an industry workshop",
        category: "Industry Facility",
        title: "Building Local Industry Capability",
        description: "Specialist workstations help build local capacity across the gemstone sector."
      }
    ];
    const image = carousel.querySelector(".home-carousel-image");
    const incomingImage = document.createElement("img");
    incomingImage.className = "home-carousel-image home-carousel-image-incoming";
    incomingImage.alt = "";
    incomingImage.setAttribute("aria-hidden", "true");
    incomingImage.decoding = "async";
    image.parentElement.append(incomingImage);
    const number = carousel.querySelector(".home-carousel-number");
    const title = carousel.querySelector(".home-carousel-caption h3");
    const description = carousel.querySelector(".home-carousel-caption p");
    const count = carousel.querySelector(".home-carousel-count");
    const dotsContainer = carousel.querySelector(".home-carousel-dots");
    const pauseButton = carousel.querySelector(".home-carousel-toggle");
    let currentIndex = 0;
    let userPaused = false;
    let timer;
    let transitionId = 0;
    let imageTransitionTimer;
    let captionTransitionTimer;

    const dots = slides.map((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "home-carousel-dot";
      dot.setAttribute("aria-label", `Show slide ${index + 1}: ${slide.category}`);
      dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
      dot.addEventListener("click", () => showSlide(index));
      dotsContainer.append(dot);
      return dot;
    });

    function isPaused() {
      return userPaused;
    }

    function updatePauseButton() {
      const paused = isPaused();
      pauseButton.textContent = paused ? "Play" : "Pause";
      pauseButton.setAttribute("aria-label", `${paused ? "Play" : "Pause"} slideshow`);
    }

    function scheduleNextSlide() {
      window.clearTimeout(timer);
      updatePauseButton();
      if (!isPaused()) {
        timer = window.setTimeout(() => showSlide(currentIndex + 1), 5000);
      }
    }

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      const slide = slides[currentIndex];
      const currentTransitionId = ++transitionId;

      window.clearTimeout(imageTransitionTimer);
      window.clearTimeout(captionTransitionTimer);
      incomingImage.classList.remove("is-visible");
      incomingImage.src = slide.image;
      void incomingImage.offsetWidth;
      window.requestAnimationFrame(() => {
        if (currentTransitionId === transitionId) {
          incomingImage.classList.add("is-visible");
        }
      });

      carousel.classList.add("is-changing");
      captionTransitionTimer = window.setTimeout(() => {
        if (currentTransitionId !== transitionId) return;
        number.textContent = `${String(currentIndex + 1).padStart(2, "0")} — ${slide.category}`;
        title.textContent = slide.title;
        description.textContent = slide.description;
        carousel.classList.remove("is-changing");
      }, 220);

      imageTransitionTimer = window.setTimeout(() => {
        if (currentTransitionId !== transitionId) return;
        image.src = slide.image;
        image.alt = slide.alt;
        incomingImage.classList.remove("is-visible");
        incomingImage.removeAttribute("src");
      }, 1400);

      count.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      dots.forEach((dot, dotIndex) => {
        dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
      });
      scheduleNextSlide();
    }

    carousel.querySelector(".home-carousel-previous").addEventListener("click", () => {
      showSlide(currentIndex - 1);
    });
    carousel.querySelector(".home-carousel-next").addEventListener("click", () => {
      showSlide(currentIndex + 1);
    });
    pauseButton.addEventListener("click", () => {
      userPaused = pauseButton.getAttribute("aria-label") === "Pause slideshow";
      scheduleNextSlide();
    });
    carousel.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(currentIndex + 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        showSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        showSlide(slides.length - 1);
      }
    });
    scheduleNextSlide();
  }

  /* ---------- Contact form ---------- */
  const form = document.querySelector("#enquiryForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const name = form.querySelector("[name='name']").value.trim();
      const email = form.querySelector("[name='email']").value.trim();
      const message = form.querySelector("[name='message']").value.trim();
      const status = form.querySelector(".form-status");

      if (!name || !email || !message) {
        status.textContent = "Please complete the required fields.";
        status.style.color = "#a34a35";
        return;
      }

      const subject = encodeURIComponent("Corporate Enquiry — Mutinta Jewellery");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${form.querySelector("[name='phone']").value}\nEnquiry: ${form.querySelector("[name='enquiry']").value}\n\n${message}`
      );

      window.location.href = `mailto:info@mutintajewellery.com?subject=${subject}&body=${body}`;
      status.textContent = "Preparing your email application…";
      status.style.color = "#6d5629";
    });
  }
});
