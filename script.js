const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealOnScroll.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((element) => revealOnScroll.observe(element));

console.log("Portfolio carregado com sucesso.");
