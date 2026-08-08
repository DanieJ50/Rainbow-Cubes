"use strict";

(() => {
  const characters = [
    {
      id: "ruby",
      name: "Ruby Razzleberry",
      personality: "Bold · Excitable · Passionate",
      district: "RED RIDGE / HEART DISTRICT",
      image: "assets/characters/ruby-razzleberry.png",
      color: "#ef4058",
      soft: "#ffd9de",
      icon: "❤️",
      role: "The spark-starter who charges into trouble before the rest of the team has finished the sentence.",
      lore: "Ruby grew up along Red Ridge, where the Prism Orchard's warmest color current runs beneath the berry fields. When the Sour Static fractured Berryvale, she was the first to discover that strong matching patterns could restart a broken color line. Her courage gets the Bunch moving; her impatience occasionally gets them moving in the completely wrong direction first.",
      power: "Heartbeat Burst — supercharges a red match into a high-energy Chain Bloom.",
      quote: "If the path is blocked, we make a brighter one."
    },
    {
      id: "bluebelle",
      name: "Bubbly Bluebelle",
      personality: "Calm · Intelligent · Sweet",
      district: "BLUEBELL LIBRARY / TIDELIGHT DISTRICT",
      image: "assets/characters/bubbly-bluebelle.png",
      color: "#4f8ed8",
      soft: "#dbeeff",
      icon: "💙",
      role: "The pattern-reader who notices the move everyone else almost missed.",
      lore: "Bluebelle keeps the old pattern books inside Bluebell Library, a quiet archive where every successful Berry Spark leaves behind a tiny glowing diagram. She studies the Sour Static instead of fearing it and often predicts which color route will reconnect next. She is gentle about being the smartest one in the room, which is fortunate because Gooseberry absolutely is not.",
      power: "Pattern Sight — reveals the strongest chain hidden inside a crowded board.",
      quote: "There is always a pattern. Sometimes it just needs patience."
    },
    {
      id: "plumbleberry",
      name: "Plumbleberry",
      personality: "Shy · Sensitive · Mysterious",
      district: "MOONPLUM HOLLOW / TWILIGHT DISTRICT",
      image: "assets/characters/plumbleberry.png",
      color: "#8e5bc4",
      soft: "#eadcff",
      icon: "💜",
      role: "The quiet empath who can feel color fractures before anyone can see them.",
      lore: "Plumbleberry lives near Moonplum Hollow, where the orchard glows brightest after sunset. She rarely speaks first, but she senses subtle shifts in Berryvale's color current and can hear the faint hum left behind by the Sour Static. The Bunch learns quickly that when Plumbleberry says something feels wrong, they should probably listen before Ruby presses anything.",
      power: "Veil Pulse — uncovers hidden fractures and softens unstable purple tiles.",
      quote: "Quiet does not mean empty. Quiet is where I hear the world."
    },
    {
      id: "gooseberry",
      name: "Gooseberry Giggles",
      personality: "Goofy · Energetic · Playful",
      district: "GIGGLE GROVE / GREEN DISTRICT",
      image: "assets/characters/gooseberry-giggles.png",
      color: "#83b83e",
      soft: "#e8f5ce",
      icon: "💚",
      role: "The chaos engine who turns mistakes into surprisingly useful momentum.",
      lore: "Gooseberry comes from Giggle Grove, a district full of springy vines, crooked paths, and fruit that refuses to grow in straight lines. He treats every mission like a playground. His jokes can derail a serious meeting in three seconds, but his unpredictable movement also breaks the rigid patterns the Sour Static tries to impose on Berryvale.",
      power: "Giggle Bounce — ricochets green energy into nearby matches for surprise combos.",
      quote: "Was that the plan? No? Cool. It worked anyway!"
    },
    {
      id: "sunny",
      name: "Sunny Goldenberry",
      personality: "Optimistic · Bubbly · Joyful",
      district: "GOLDEN GROVE / SUNLIGHT DISTRICT",
      image: "assets/characters/sunny-goldenberry.png",
      color: "#f5bd31",
      soft: "#fff0b6",
      icon: "💛",
      role: "The emotional battery who keeps the team from giving up when a level looks impossible.",
      lore: "Sunny was raised in Golden Grove, where morning light hits the Prism Orchard first. She believes every broken path can be repaired and every terrible mood can be improved with enough encouragement, snacks, or both. Her optimism is not naïve; it is stubborn. The Sour Static has never managed to dim her for long.",
      power: "Sunbeam Chain — links separated yellow sparks into one bright combo path.",
      quote: "We are not stuck. We are just one good match away."
    },
    {
      id: "tangerberry",
      name: "Tangerberry",
      personality: "Creative · Friendly · Adventurous",
      district: "TANGERINE TERRACE / MAKER DISTRICT",
      image: "assets/characters/tangerberry.png",
      color: "#f48a31",
      soft: "#ffe1c2",
      icon: "🧡",
      role: "The maker who sketches ridiculous ideas and then somehow builds half of them.",
      lore: "Tangerberry runs a tiny open-air workshop on Tangerine Terrace, surrounded by paintbrushes, maps, prototypes, and inventions that definitely need labels. She joined the Bunch after realizing the Sour Static was not only breaking color routes — it was flattening imagination into repetitive patterns. She experiments with boosters and redesigns old tools into new Berry Burst gadgets.",
      power: "Sketch Spark — transforms a creative idea into a temporary booster effect.",
      quote: "What if we tried the weird idea first?"
    }
  ];

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[char]));

  const menuButton = $("#menuButton");
  const mobileNav = $("#mobileNav");
  const siteHeader = $(".site-header");
  const progress = $("#scrollProgress");
  const toast = $("#berryToast");

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(() => toast.classList.remove("show"), 2200);
  };

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const nextState = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(nextState));
      mobileNav.classList.toggle("open", nextState);
    });

    $$("a", mobileNav).forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("open");
      });
    });
  }

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (progress) progress.style.width = `${ratio * 100}%`;
    siteHeader?.classList.toggle("scrolled", window.scrollY > 20);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const navLinks = $$(".desktop-nav a");
  const navTargets = navLinks
    .map((link) => ({ link, section: $(link.getAttribute("href")) }))
    .filter((item) => item.section);

  if ("IntersectionObserver" in window && navTargets.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.remove("active"));
      const match = navTargets.find((item) => item.section === visible.target);
      match?.link.classList.add("active");
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-18% 0px -65%" });
    navTargets.forEach((item) => navObserver.observe(item.section));
  }

  const characterGrid = $("#characterGrid");
  const atlasStrip = $("#atlasStrip");
  const characterDialog = $("#characterDialog");
  const closeCharacterDialog = $("#closeCharacterDialog");

  const renderCharacters = () => {
    if (!characterGrid) return;
    characterGrid.innerHTML = characters.map((character, index) => `
      <article class="character-card reveal" tabindex="0" role="button" aria-label="Open lore for ${escapeHtml(character.name)}" data-character="${escapeHtml(character.id)}" style="--card-soft:${character.soft};--card-tilt:${index % 2 === 0 ? "-0.8deg" : "0.8deg"}">
        <span class="character-art"><img src="${escapeHtml(character.image)}" alt="${escapeHtml(character.name)}" loading="lazy"></span>
        <span class="character-copy">
          <small>${escapeHtml(character.icon)} ${escapeHtml(character.district.split(" /")[0])}</small>
          <h3>${escapeHtml(character.name)}</h3>
          <p>${escapeHtml(character.personality)}</p>
        </span>
      </article>
    `).join("");

    $$(".character-card", characterGrid).forEach((card) => {
      card.addEventListener("click", () => openCharacter(card.dataset.character));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCharacter(card.dataset.character);
        }
      });
    });

    const newRevealItems = $$(".reveal", characterGrid);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      newRevealItems.forEach((item) => observer.observe(item));
    } else {
      newRevealItems.forEach((item) => item.classList.add("is-visible"));
    }
  };

  const renderAtlas = () => {
    if (!atlasStrip) return;
    atlasStrip.innerHTML = characters.map((character) => {
      const district = character.district.split(" /")[0];
      const snippets = {
        ruby: "Warm cliffs, raspberry lanes, and the fastest color current in Berryvale.",
        bluebelle: "Quiet archives, tidal pools, and walls covered in glowing match diagrams.",
        plumbleberry: "Moonlit vines, hidden paths, and the faint hum of unseen color fractures.",
        gooseberry: "Springy gardens, crooked bridges, and absolutely no respect for straight lines.",
        sunny: "Sun-drenched fields where Berry Sparks recharge at the start of every day.",
        tangerberry: "Open-air workshops, sketch walls, and prototypes scattered basically everywhere."
      };
      return `
        <article class="atlas-card" style="--atlas-color:${character.soft}">
          <span>${character.icon}</span>
          <div><h3>${escapeHtml(district)}</h3><p>${escapeHtml(snippets[character.id])}</p></div>
        </article>
      `;
    }).join("");
  };

  const openCharacter = (id) => {
    const character = characters.find((item) => item.id === id);
    if (!character || !characterDialog) return;
    const image = $("#dialogCharacterImage");
    image.src = character.image;
    image.alt = character.name;
    $("#dialogCharacterDistrict").textContent = character.district;
    $("#dialogCharacterName").textContent = character.name;
    $("#dialogCharacterPersonality").textContent = character.personality;
    $("#dialogCharacterLore").textContent = character.lore;
    $("#dialogCharacterPower").textContent = character.power;
    $("#dialogCharacterQuote").textContent = `“${character.quote}”`;
    characterDialog.style.setProperty("--dialog-color", character.color);
    characterDialog.style.setProperty("--dialog-soft", character.soft);
    characterDialog.showModal();
  };

  closeCharacterDialog?.addEventListener("click", () => characterDialog?.close());
  characterDialog?.addEventListener("click", (event) => {
    if (event.target === characterDialog) characterDialog.close();
  });

  renderCharacters();
  renderAtlas();

  const recipes = Array.isArray(window.REEL_RECIPES) ? window.REEL_RECIPES : [];
  const groupOrder = Array.isArray(window.REEL_GROUP_ORDER) ? window.REEL_GROUP_ORDER : [];
  const groupMeta = window.REEL_GROUP_META || {};
  const recipeGrid = $("#recipeGrid");
  const recipeSearch = $("#recipeSearch");
  const recipeCategory = $("#recipeCategory");
  const recipeStatus = $("#recipeStatus");
  const recipeTotal = $("#recipeTotal");
  const chapterPills = $("#chapterPills");
  const randomRecipeButton = $("#randomRecipe");
  const recipeDialog = $("#recipeDialog");
  const closeRecipeDialog = $("#closeRecipeDialog");

  if (recipeTotal) recipeTotal.textContent = String(recipes.length);

  const getMeta = (category) => groupMeta[category] || { color: "#f04f79", soft: "#fff0f5", short: category };

  const populateCategories = () => {
    if (!recipeCategory) return;
    groupOrder.forEach((group) => {
      const option = document.createElement("option");
      option.value = group;
      option.textContent = group;
      recipeCategory.appendChild(option);
    });
  };

  const renderChapterPills = () => {
    if (!chapterPills) return;
    chapterPills.innerHTML = [
      `<button type="button" class="chapter-pill active" data-category="all">ALL 66</button>`,
      ...groupOrder.map((group) => `<button type="button" class="chapter-pill" data-category="${escapeHtml(group)}">${escapeHtml(getMeta(group).short)}</button>`)
    ].join("");

    $$(".chapter-pill", chapterPills).forEach((pill) => {
      pill.addEventListener("click", () => {
        if (recipeCategory) recipeCategory.value = pill.dataset.category || "all";
        updateRecipeList();
        recipeGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const recipeHaystack = (recipe) => [
    recipe.name,
    recipe.category,
    recipe.flavor,
    recipe.vibe,
    ...(recipe.ingredients || []),
    recipe.variations
  ].join(" ").toLowerCase();

  const getFilteredRecipes = () => {
    const query = (recipeSearch?.value || "").trim().toLowerCase();
    const category = recipeCategory?.value || "all";
    return recipes.filter((recipe) => {
      const matchesCategory = category === "all" || recipe.category === category;
      const matchesQuery = !query || recipeHaystack(recipe).includes(query);
      return matchesCategory && matchesQuery;
    });
  };

  const renderRecipes = (items) => {
    if (!recipeGrid) return;
    if (!items.length) {
      recipeGrid.innerHTML = `<article class="recipe-card" style="grid-column:1/-1"><div><span class="recipe-card-emoji">🍓</span><h3>No berry matches yet.</h3><p>Try a broader search or switch back to all chapters.</p></div></article>`;
      return;
    }

    recipeGrid.innerHTML = items.map((recipe) => {
      const meta = getMeta(recipe.category);
      return `
        <article class="recipe-card" tabindex="0" role="button" aria-label="Open recipe ${escapeHtml(recipe.name)}" data-recipe-id="${escapeHtml(recipe.id)}" style="--recipe-soft:${escapeHtml(meta.soft)};--recipe-color:${escapeHtml(meta.color)}">
          <span class="recipe-card-top">
            <span class="recipe-card-emoji">${escapeHtml(recipe.emoji || "🍓")}</span>
            <span class="recipe-card-number">REEL ${String(recipe.number).padStart(2, "0")}</span>
          </span>
          <span>
            <h3>${escapeHtml(recipe.name)}</h3>
            <p>${escapeHtml(recipe.flavor)}</p>
          </span>
          <span class="recipe-card-bottom"><b>${escapeHtml(meta.short)}</b><span>OPEN RECIPE ↗</span></span>
        </article>
      `;
    }).join("");

    $$(".recipe-card[data-recipe-id]", recipeGrid).forEach((card) => {
      card.addEventListener("click", () => openRecipe(card.dataset.recipeId));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRecipe(card.dataset.recipeId);
        }
      });
    });
  };

  const updateRecipeList = () => {
    const items = getFilteredRecipes();
    renderRecipes(items);
    if (recipeStatus) recipeStatus.textContent = `SHOWING ${items.length} OF ${recipes.length} RECIPES`;
    const currentCategory = recipeCategory?.value || "all";
    $$(".chapter-pill", chapterPills || document).forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.category === currentCategory);
    });
  };

  const fillList = (element, values, ordered = false) => {
    if (!element) return;
    element.innerHTML = "";
    (values || []).forEach((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      element.appendChild(item);
    });
    if (ordered) element.setAttribute("role", "list");
  };

  const openRecipe = (id) => {
    const recipe = recipes.find((item) => item.id === id);
    if (!recipe || !recipeDialog) return;
    $("#dialogRecipeEmoji").textContent = recipe.emoji || "🍓";
    $("#dialogRecipeCategory").textContent = recipe.category;
    $("#dialogRecipeName").textContent = recipe.name;
    $("#dialogRecipeFlavor").textContent = recipe.flavor || "";
    $("#dialogRecipeYield").textContent = recipe.yield_text || "—";
    $("#dialogRecipeCalories").textContent = recipe.calories || "—";
    $("#dialogRecipeVibe").textContent = recipe.vibe || "";
    fillList($("#dialogRecipeIngredients"), recipe.ingredients);
    fillList($("#dialogRecipeMethod"), recipe.method, true);
    $("#dialogRecipeWhy").textContent = recipe.why || "";
    $("#dialogRecipeVariations").textContent = recipe.variations || "";
    const meta = getMeta(recipe.category);
    recipeDialog.style.setProperty("--dialog-color", meta.color);
    recipeDialog.style.setProperty("--dialog-soft", meta.soft);
    recipeDialog.showModal();
  };

  recipeSearch?.addEventListener("input", updateRecipeList);
  recipeCategory?.addEventListener("change", updateRecipeList);

  randomRecipeButton?.addEventListener("click", () => {
    if (!recipes.length) return;
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    openRecipe(randomRecipe.id);
    showToast(`🍓 Random reel pick: ${randomRecipe.name}`);
  });

  closeRecipeDialog?.addEventListener("click", () => recipeDialog?.close());
  recipeDialog?.addEventListener("click", (event) => {
    if (event.target === recipeDialog) recipeDialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (characterDialog?.open) characterDialog.close();
    if (recipeDialog?.open) recipeDialog.close();
  });

  populateCategories();
  renderChapterPills();
  updateRecipeList();

  if (!recipes.length) {
    showToast("Recipe data did not load. Check js/recipes.js.");
  }
})();
