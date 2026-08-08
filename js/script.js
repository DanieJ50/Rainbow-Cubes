(() => {
  "use strict";

  const loreData = {
    ruby: {
      kicker: "Stop 01 · Crimson Highlands",
      symbol: "❤️",
      name: "Razzle Ridge",
      character: "Home of Ruby Razzleberry",
      description: "A fizzy red ridge where berry vines curl around warm crystal cliffs. Ruby keeps the region's Heart Spark burning bright, turning courage and passion into bursts of energy that power the trail ahead.",
      vibe: "Bold + electric",
      landmark: "The Heartberry Beacon",
      quote: "“If the trail looks impossible, that's usually where the fun starts.”"
    },
    blue: {
      kicker: "Stop 02 · Sapphire Coast",
      symbol: "💙",
      name: "Bluebelle Bay",
      character: "Home of Bubbly Bluebelle",
      description: "A calm blue shoreline lined with floating bookboats and puzzle-shell libraries. Bluebelle studies the realm's patterns here, keeping maps, clues, and old stories safe inside the Tideglass Archive.",
      vibe: "Calm + clever",
      landmark: "The Tideglass Archive",
      quote: "“Every puzzle tells you something. You just have to notice what it's whispering.”"
    },
    plum: {
      kicker: "Stop 03 · Twilight Orchards",
      symbol: "💜",
      name: "Moonplum Hollow",
      character: "Home of Plumbleberry",
      description: "A quiet purple valley where moonlit fruit glows after sunset and hidden paths appear only when the sky turns violet. Plumbleberry protects the Dream Spark and knows more about the Great Scatter than she says.",
      vibe: "Soft + mysterious",
      landmark: "The Whispering Orchard",
      quote: "“Some paths don't need to be loud to be important.”"
    },
    green: {
      kicker: "Stop 04 · Springy Woodlands",
      symbol: "💚",
      name: "Giggle Grove",
      character: "Home of Gooseberry Giggles",
      description: "A spring-loaded green forest filled with bouncy roots, crooked signs, berry trampolines, and shortcuts that make absolutely no sense until Gooseberry tries them. The whole grove seems to laugh with him.",
      vibe: "Goofy + energetic",
      landmark: "The Bounceberry Bridge",
      quote: "“Was that the right way? Nope! Was it fun? ABSOLUTELY.”"
    },
    sunny: {
      kicker: "Stop 05 · Sunlit Meadows",
      symbol: "💛",
      name: "Golden Glow Gardens",
      character: "Home of Sunny Goldenberry",
      description: "A warm yellow garden where flowers open to the sound of cheering and tiny light-orbs drift through the air. Sunny tends the Joy Spark here, helping tired travelers recharge before the final stretch.",
      vibe: "Bright + joyful",
      landmark: "The Sunbell Pavilion",
      quote: "“There's always something good waiting around the next bend!”"
    },
    orange: {
      kicker: "Stop 06 · Citrus Frontier",
      symbol: "🧡",
      name: "Tangerine Trail",
      character: "Home of Tangerberry",
      description: "An adventurous orange canyon dotted with paint-splashed signposts, sketchbook stations, half-built inventions, and roads that change whenever Tangerberry gets a new idea. Creativity is practically the local weather.",
      vibe: "Creative + adventurous",
      landmark: "The Idea Spring",
      quote: "“I have a plan! ...Okay, I have six plans. Pick the sparkliest one.”"
    }
  };

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = [...document.querySelectorAll(".main-nav a[href^='#']")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const revealItems = [...document.querySelectorAll(".reveal")];
  const mapNodes = [...document.querySelectorAll(".map-node")];
  const scrollProgress = document.getElementById("scrollProgress");

  function setMenu(open) {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    mainNav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open && window.innerWidth <= 820);
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) setMenu(false);
    });
  }

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 0;
    scrollProgress.style.width = `${percentage}%`;
  }

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: "0px 0px -40px" });

    revealItems.forEach(item => revealObserver.observe(item));

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const matches = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", matches);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach(section => navObserver.observe(section));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  function updateLore(characterKey) {
    const item = loreData[characterKey];
    if (!item) return;

    const bindings = {
      loreKicker: item.kicker,
      loreSymbol: item.symbol,
      loreName: item.name,
      loreCharacter: item.character,
      loreDescription: item.description,
      loreVibe: item.vibe,
      loreLandmark: item.landmark,
      loreQuote: item.quote
    };

    Object.entries(bindings).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });

    mapNodes.forEach(node => {
      const active = node.dataset.character === characterKey;
      node.classList.toggle("active", active);
      node.setAttribute("aria-pressed", String(active));
    });

    const panel = document.getElementById("lorePanel");
    if (panel) {
      panel.animate(
        [
          { opacity: 0.45, transform: "translateY(8px) scale(0.99)" },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ],
        { duration: 260, easing: "ease-out" }
      );
    }
  }

  mapNodes.forEach(node => {
    node.addEventListener("click", () => updateLore(node.dataset.character));
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (!reducedMotion && finePointer) {
    const sparkleColors = ["#ff3f57", "#ff8a32", "#ffd447", "#83bf3f", "#4a8cff", "#7f3cff"];
    let lastSparkle = 0;

    document.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - lastSparkle < 70) return;
      lastSparkle = now;

      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.style.left = `${event.clientX}px`;
      sparkle.style.top = `${event.clientY}px`;
      sparkle.style.background = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      sparkle.style.boxShadow = `0 0 12px ${sparkle.style.background}`;
      document.body.appendChild(sparkle);
      window.setTimeout(() => sparkle.remove(), 750);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
