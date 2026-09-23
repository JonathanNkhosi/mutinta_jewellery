
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

      window.location.href = `mailto:mutintajewellery@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = "Preparing your email application…";
      status.style.color = "#6d5629";
    });
  }
});
