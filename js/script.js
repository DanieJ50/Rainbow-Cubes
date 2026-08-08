const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];
const revealItems = document.querySelectorAll(".reveal");
const sectionItems = document.querySelectorAll("[data-section]");
const modal = document.getElementById("character-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalSpark = document.getElementById("modal-spark");
const modalLocation = document.getElementById("modal-location");
const modalDescription = document.getElementById("modal-description");
const modalTraits = document.getElementById("modal-traits");
const cursorGlow = document.querySelector(".cursor-glow");
const colorMessage = document.getElementById("color-message");

const characterData = {
  ruby: {
    name: "Ruby Razzleberry",
    spark: "❤️ PASSION SPARK",
    location: "📍 Razzleberry Ridge",
    image: "assets/ruby-razzleberry.jpg",
    alt: "Ruby Razzleberry",
    description:
      "Ruby is the Bunch's fearless emotional engine. She loves big reactions, bigger challenges, and turning a difficult moment into a rallying cry for everyone around her.",
    traits: ["Bold", "Excitable", "Passionate", "Heartfire Guardian"]
  },
  bluebelle: {
    name: "Bubbly Bluebelle",
    spark: "💙 WISDOM SPARK",
    location: "📍 Bluebelle Bookbrook",
    image: "assets/bubbly-bluebelle.jpg",
    alt: "Bubbly Bluebelle",
    description:
      "Bluebelle is a gentle thinker who prefers observation before action. She keeps the group grounded, collects stories from across the realm, and usually has the clever solution nobody else noticed.",
    traits: ["Calm", "Intelligent", "Sweet", "Story Keeper"]
  },
  plumbleberry: {
    name: "Plumbleberry",
    spark: "💜 DREAM SPARK",
    location: "📍 Moonplum Hollow",
    image: "assets/plumbleberry.jpg",
    alt: "Plumbleberry",
    description:
      "Plumbleberry is quiet, deeply sensitive, and connected to the realm's hidden side. She can sense changes in the Dream Spark long before anyone else and knows the secret paths of Moonplum Hollow.",
    traits: ["Shy", "Sensitive", "Mysterious", "Dream Listener"]
  },
  giggles: {
    name: "Gooseberry Giggles",
    spark: "💚 PLAY SPARK",
    location: "📍 Gigglegreen Grove",
    image: "assets/gooseberry-giggles.jpg",
    alt: "Gooseberry Giggles",
    description:
      "Giggles has never met a straight path he couldn't turn into a detour. His unstoppable energy keeps the Bunch laughing and reminds everyone that play can be its own kind of problem-solving.",
    traits: ["Goofy", "Energetic", "Playful", "Grove Trickster"]
  },
  sunny: {
    name: "Sunny Goldenberry",
    spark: "💛 JOY SPARK",
    location: "📍 Goldenberry Gardens",
    image: "assets/sunny-goldenberry.jpg",
    alt: "Sunny Goldenberry",
    description:
      "Sunny is the warm center of the group. Her optimism is contagious, her excitement is sincere, and she has a gift for making even the gloomiest corner of Berry Belle feel welcoming.",
    traits: ["Optimistic", "Bubbly", "Joyful", "Garden Lightkeeper"]
  },
  tangerberry: {
    name: "Tangerberry",
    spark: "🧡 IMAGINATION SPARK",
    location: "📍 Tangerine Terrace",
    image: "assets/tangerberry.jpg",
    alt: "Tangerberry",
    description:
      "Tangerberry sees possibility everywhere. With a brush, sketchbook, and a head full of ideas, she turns ordinary routes into adventures and helps the Bunch imagine solutions that do not exist yet.",
    traits: ["Creative", "Friendly", "Adventurous", "Terrace Maker"]
  }
};

function setMenu(open) {
  menuToggle?.setAttribute("aria-expanded", String(open));
  siteNav?.classList.toggle("is-open", open);
}

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenu(open);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("click", (event) => {
  if (
    siteNav?.classList.contains("is-open") &&
    !siteNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    setMenu(false);
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13, rootMargin: "0px 0px -40px 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.34 }
);

sectionItems.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".character-card").forEach((card) => {
  const openButton = card.querySelector(".mini-button");

  openButton?.addEventListener("click", () => {
    const data = characterData[card.dataset.character];
    if (!data) return;

    modalImage.src = data.image;
    modalImage.alt = data.alt;
    modalName.textContent = data.name;
    modalSpark.textContent = data.spark;
    modalLocation.textContent = data.location;
    modalDescription.textContent = data.description;
    modalTraits.innerHTML = "";

    data.traits.forEach((trait) => {
      const chip = document.createElement("span");
      chip.textContent = trait;
      modalTraits.appendChild(chip);
    });

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close")?.focus();
  });

  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-5px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-close-modal]").forEach((control) => {
  control.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

document.querySelectorAll(".color-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    colorMessage.textContent = chip.dataset.colorMessage;
  });
});

if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";

    document.querySelectorAll("[data-parallax]").forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      const moveX = (event.clientX - window.innerWidth / 2) * speed;
      const moveY = (event.clientY - window.innerHeight / 2) * speed;

      let rotation = "0deg";
      if (item.classList.contains("hero-card-ruby")) rotation = "-8deg";
      if (item.classList.contains("hero-card-blue")) rotation = "8deg";
      if (item.classList.contains("hero-card-sunny")) rotation = "2deg";

      item.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation})`;
    });
  });

  document.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    setMenu(false);
  }
});
