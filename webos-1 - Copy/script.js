document.addEventListener("DOMContentLoaded", () => {
  let highestZ = 100;

  // ===== CORE FUNCTIONS =====
  function bringToFront(element) {
    highestZ++;
    element.style.zIndex = highestZ;
  }

  function updateTime() {
    const timeElement = document.getElementById("timeElement");
    if (timeElement) {
      timeElement.textContent = new Date().toLocaleString();
    }
  }

  function dragElement(element) {
    if (!element) return;

    const header = element.querySelector(".windowheader");
    if (!header) return;

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    header.addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(e) {
      e.preventDefault();
      bringToFront(element);

      pos3 = e.clientX;
      pos4 = e.clientY;

      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;

      pos3 = e.clientX;
      pos4 = e.clientY;

      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
  }

  function createWindowOpenListener(iconId, windowId) {
    const icon = document.getElementById(iconId);
    const win = document.getElementById(windowId);

    if (!icon || !win) return;

    icon.addEventListener("dblclick", () => {
      win.style.display = "flex";
      bringToFront(win);
    });
  }

  function createWindowCloseListener(windowId, buttonId) {
    const win = document.getElementById(windowId);
    const button = document.getElementById(buttonId);

    if (!win || !button) return;

    button.addEventListener("click", () => {
      win.style.display = "none";
    });
  }

  // ===== INITIALIZATION =====
  updateTime();
  setInterval(updateTime, 1000);

  // ===== FILE EXPLORER =====
  function initFileExplorer() {
    const explorerFiles = [
      { name: "welcome.txt", type: "text", app: "welcome" },
      { name: "fishfinder.exe", type: "app", app: "fishfinder" },
      { name: "FishPad.exe", type: "app", app: "notepad" },
      { name: "FishTunes.exe", type: "app", app: "fishtunes" },
      { name: "FishClicker.exe", type: "app", app: "fishclicker" },
      { name: "Wallpaper.exe", type: "app", app: "wallpaper" }
    ];

    const content = document.getElementById("fileExplorerContent");
    if (!content) return;

    content.innerHTML = "";

    explorerFiles.forEach(file => {
      const item = document.createElement("div");
      item.style.padding = "8px";
      item.style.cursor = "pointer";
      item.style.borderBottom = "1px solid #ddd";
      item.textContent = "📄 " + file.name;

      item.addEventListener("dblclick", () => {
        const win = document.getElementById(file.app);
        if (win) {
          win.style.display = "flex";
          bringToFront(win);
        }
      });

      content.appendChild(item);
    });
  }

  // ===== FISH FINDER =====
  function initFishfinder() {
    const fishData = [
      { name: "Pleco", image: "images/placofish.png" },
      { name: "Angelfish", image: "images/angelfish.png" },
      { name: "Clownfish", image: "images/clownfish.png" },
      { name: "Betta", image: "images/bettafish.png" },
      { name: "Goldfish", image: "images/goldfish.png" },
      { name: "Discus", image: "images/discusfish.png" },
      { name: "Neon Tetra", image: "images/tetrafish.png" },
      { name: "Guppy", image: "images/guppyfish.png" },
      { name: "Zebrafish", image: "images/zebrafish.png" }
    ];

    const content = document.getElementById("fishfinderContent");
    if (!content) return;

    content.innerHTML = "";

    fishData.forEach(fish => {
      const card = document.createElement("div");
      card.className = "fish-card";
      card.innerHTML = `
        <h3>${fish.name}</h3>
        <img
          src="${fish.image}"
          alt="${fish.name}"
          style="width:100%;margin-bottom:20px;"
        >
      `;
      content.appendChild(card);
    });
  }

  // ===== NOTEPAD (FISHPAD) =====
  function initNotepad() {
    const notepadText = document.getElementById("notepadText");
    const saveButton = document.getElementById("saveNoteButton");

    if (notepadText) {
      const savedNote = localStorage.getItem("fishos-note");
      if (savedNote) {
        notepadText.value = savedNote;
      }
    }

    if (saveButton) {
      saveButton.addEventListener("click", () => {
        localStorage.setItem("fishos-note", notepadText.value);
        alert("FishPad note saved!");
      });
    }
  }

  // ===== FISH TRANSLATOR =====
function initFishTranslator() {
  const translatorWindow = document.getElementById('fishTranslatorWindow');
  const translatorIcon = document.getElementById('translatorIcon');
  const input = document.getElementById('translatorInput');
  const output = document.getElementById('translatorOutput');
  const modeButtons = document.querySelectorAll('.translator-btn');
  let currentMode = 'bubble';

  if (!translatorWindow) return;

  // Translation modes
  const modes = {
    bubble: (text) => {
      return text
        .split('')
        .map((char) => {
          if (/[aeiouAEIOU]/.test(char)) {
            const bubbles = ['◯', '◉', '○'];
            return bubbles[Math.floor(Math.random() * bubbles.length)];
          }
          return char;
        })
        .join('');
    },
    blub: (text) => {
      return text
        .split(' ')
        .map(() => ['blub', 'glub', 'bloob'][Math.floor(Math.random() * 3)])
        .join(' ');
    },
    reverse: (text) => {
      return text
        .split('')
        .reverse()
        .join('')
        .replace(/[aeiouAEIOU]/g, (match) => {
          const replacements = { a: '@', e: '3', i: '!', o: '0', u: '∪', A: '@', E: '3', I: '!', O: '0', U: '∪' };
          return replacements[match] || match;
        });
    },
    sparkle: (text) => {
      return text
        .split('')
        .map((char) => `✨${char}✨`)
        .join('');
    },
    fancy: (text) => {
      return text
        .toUpperCase()
        .replace(/O/g, '◯')
        .replace(/A/g, '∆')
        .replace(/E/g, '∑')
        .replace(/I/g, '!')
        .split('')
        .join(' ');
    },
  };

  // Translate on input
  input.addEventListener('input', () => {
    output.textContent = modes[currentMode](input.value) || 'Type something!';
  });

  // Mode buttons
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.mode;
      output.textContent = modes[currentMode](input.value) || 'Type something!';
    });
  });

  // Open translator
  translatorIcon.addEventListener('dblclick', () => {
    translatorWindow.classList.add('active');
    bringToFront(translatorWindow);
    input.focus();
  });

  // Close button
  document.getElementById('translatorClose').addEventListener('click', () => {
    translatorWindow.classList.remove('active');
  });

  // Dragging
  const header = document.querySelector('.translator-header');
  makeDraggable(translatorWindow, header);
}


  // ===== WALLPAPER APP =====
  const wallpaperData = [
    {
      name: "Default clownfish wallpaper",
      url: "https://aquaforest.eu/wp-content/uploads/2025/06/blazenek-scaled.jpg"
    },
    {
      name: "Shore",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop"
    },
    {
      name: "Coral Reef",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgwCN1YtCDtWxDP3Hc4ZQ4NhndxZfyb12ta9N3XSM5QA&s=10"
    },
    {
      name: "Deep Blue",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVFbp1Tzo7VaDoAVunyaSQ8EABn6aEJ74GSIZfrQk7-jcVqBvRktyMG2w&s=10"
    },
    {
      name: "I think this is in hawaii",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop"
    },
    {
      name: "Waves:p",
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop"
    }
  ];



  function initWallpaper() {
    const wallpaperGrid = document.getElementById("wallpaperGrid");
    if (!wallpaperGrid) return;

    wallpaperGrid.innerHTML = "";

    const currentWallpaper = localStorage.getItem("fishos-wallpaper") || wallpaperData[0].url;

    wallpaperData.forEach((wallpaper) => {
      const option = document.createElement("div");
      option.className = "wallpaper-option";

      if (wallpaper.url === currentWallpaper) {
        option.classList.add("selected");
      }

      option.innerHTML = `
        <img src="${wallpaper.url}" alt="${wallpaper.name}">
        <div class="wallpaper-option-name">${wallpaper.name}</div>
      `;

      option.addEventListener("click", () => {
        document.querySelector(".background").style.backgroundImage = 
          `url("${wallpaper.url}")`;

        localStorage.setItem("fishos-wallpaper", wallpaper.url);

        document.querySelectorAll(".wallpaper-option").forEach(opt => {
          opt.classList.remove("selected");
        });
        option.classList.add("selected");
      });

      wallpaperGrid.appendChild(option);
    });
  }

  function loadSavedWallpaper() {
    const savedWallpaper = localStorage.getItem("fishos-wallpaper");
    if (savedWallpaper) {
      document.querySelector(".background").style.backgroundImage = 
        `url("${savedWallpaper}")`;
    }
  }

  // ===== FISH CLICKER GAME =====
  function initFishClicker() {
    let fishCoins = Number(localStorage.getItem("fishCoins")) || 0;
    let clickPower = Number(localStorage.getItem("clickPower")) || 1;
    let autoFishers = Number(localStorage.getItem("autoFishers")) || 0;

    const coinCount = document.getElementById("coinCount");
    const clickerFish = document.getElementById("clickerFish");
    const buyNet = document.getElementById("buyNet");
    const buyAuto = document.getElementById("buyAuto");
    const clickPowerText = document.getElementById("clickPower");
    const autoPowerText = document.getElementById("autoPower");

    function updateClicker() {
      if (!coinCount || !clickPowerText || !autoPowerText) return;

      coinCount.textContent = fishCoins;
      clickPowerText.textContent = "Coins Per Click: " + clickPower;
      autoPowerText.textContent = "Auto Fishers: " + autoFishers;

      localStorage.setItem("fishCoins", fishCoins);
      localStorage.setItem("clickPower", clickPower);
      localStorage.setItem("autoFishers", autoFishers);
    }

    if (clickerFish) {
      clickerFish.addEventListener("click", () => {
        fishCoins += clickPower;
        updateClicker();
      });
    }

    if (buyNet) {
      buyNet.addEventListener("click", () => {
        if (fishCoins >= 10) {
          fishCoins -= 10;
          clickPower++;
          updateClicker();
        }
      });
    }

    if (buyAuto) {
      buyAuto.addEventListener("click", () => {
        if (fishCoins >= 50) {
          fishCoins -= 50;
          autoFishers++;
          updateClicker();
        }
      });
    }

    setInterval(() => {
      fishCoins += autoFishers;
      updateClicker();
    }, 1000);

    updateClicker();
  }

  // ===== WINDOW SETUP =====
  // File Explorer
  createWindowOpenListener("fileExplorerIcon", "fileExplorer");
  createWindowCloseListener("fileExplorer", "fileExplorerClose");
  dragElement(document.getElementById("fileExplorer"));

  // Welcome
  createWindowOpenListener("welcomeIcon", "welcome");
  createWindowCloseListener("welcome", "welcomeclose");
  dragElement(document.getElementById("welcome"));

  // Fish Finder
  createWindowOpenListener("fishfinderIcon", "fishfinder");
  createWindowCloseListener("fishfinder", "fishfinderclose");
  dragElement(document.getElementById("fishfinder"));

  // Notepad
  createWindowOpenListener("notepadIcon", "notepad");
  createWindowCloseListener("notepad", "notepadclose");
  dragElement(document.getElementById("notepad"));

  // Fish Tunes
  createWindowOpenListener("fishtunesIcon", "fishtunes");
  createWindowCloseListener("fishtunes", "fishtunesclose");
  dragElement(document.getElementById("fishtunes"));

  // Fish Clicker
  createWindowOpenListener("fishclickerIcon", "fishclicker");
  createWindowCloseListener("fishclicker", "fishclickerclose");
  dragElement(document.getElementById("fishclicker"));

  // Wallpaper
  createWindowOpenListener("wallpaperIcon", "wallpaper");
  createWindowCloseListener("wallpaper", "wallpaperclose");
  dragElement(document.getElementById("wallpaper"));

  // Make all windows draggable by clicking anywhere on them
  document.querySelectorAll(".window").forEach(win => {
    win.addEventListener("mousedown", () => bringToFront(win));
  });

  // ===== INITIALIZE ALL APPS =====
  loadSavedWallpaper();
  initFileExplorer();
  initFishfinder();
  initNotepad();
  initFishClicker();
  initFishTranslator();


  // Initialize wallpaper grid when window opens
  document.getElementById("wallpaperIcon")?.addEventListener("dblclick", () => {
    initWallpaper();
  });

});








