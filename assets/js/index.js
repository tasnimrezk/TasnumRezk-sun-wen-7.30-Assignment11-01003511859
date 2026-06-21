// Navigation
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const sectionId = link.dataset.section;

    sections.forEach((section) => {
      section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");
  });
});


// Mobile Sidebar
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");

if (window.innerWidth < 1024) {
  sidebar.classList.add("-translate-x-full");
}

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});

// ===================== Launches =====================

const featuredLaunch = document.getElementById("featured-launch");
const launchesGrid = document.getElementById("launches-grid");

async function getLaunches() {
  try {
    const response = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=9"
    );

    const data = await response.json();

    if (data.results.length > 0) {
      displayFeaturedLaunch(data.results[0]);
      displayLaunches(data.results);
    }
  } catch (error) {
    console.log("Launch API Error:", error);

    launchesGrid.innerHTML = `
      <p class="text-center text-red-500 col-span-full">
        Failed to load launches.
      </p>
    `;
  }
}

function displayFeaturedLaunch(launch) {
  featuredLaunch.innerHTML = `
    <div class="bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden">

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-8">

        <div class="order-2 lg:order-1">

          <span class="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            Featured Launch
          </span>

          <h3 class="text-2xl md:text-3xl font-bold my-4">
            ${launch.name}
          </h3>

          <div class="space-y-3 text-sm md:text-base">

            <p>🚀 ${launch.rocket?.configuration?.full_name || "Unknown Rocket"}</p>

            <p>📅 ${new Date(launch.net).toLocaleString()}</p>

            <p>📍 ${launch.pad?.location?.name || "Unknown Location"}</p>

            <p>🔴 ${launch.status?.name || "Unknown"}</p>

          </div>

          <p class="text-slate-300 mt-6 text-sm md:text-base leading-relaxed">
            ${
              launch.mission?.description
                ? launch.mission.description.slice(0, 200) + "..."
                : "No description available."
            }
          </p>

        </div>

        <div class="order-1 lg:order-2 rounded-2xl overflow-hidden">
          <img
            src="${
              launch.image ||
              "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06"
            }"
            class="w-full h-[250px] md:h-[450px] object-cover"
            alt="${launch.name}"
          />
        </div>

      </div>

    </div>
  `;
}

function displayLaunches(launches) {
  let cartona = "";

  launches.forEach((launch) => {
    cartona += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500 transition-all">

        <img
          src="${
            launch.image ||
            "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06"
          }"
          class="h-48 w-full object-cover"
          alt="${launch.name}"
        >

        <div class="p-4">

          <h4 class="font-bold text-base md:text-lg mb-4">
            ${launch.name}
          </h4>

          <div class="space-y-3 text-xs md:text-sm">

            <p>🚀 ${launch.rocket?.configuration?.name || "Unknown Rocket"}</p>

            <p>📅 ${new Date(launch.net).toLocaleDateString()}</p>

            <p>📍 ${launch.pad?.name || "Unknown Pad"}</p>

            <p>🌍 ${launch.pad?.location?.name || "Unknown Location"}</p>

            <p>🔴 ${launch.status?.name || "Unknown"}</p>

          </div>

        </div>

      </div>
    `;
  });

  launchesGrid.innerHTML = cartona;
}

getLaunches();


// plant
// ////////////////////////////////////////////////////////////////////
let planetsData = [];

async function getPlanets() {
  let response = await fetch(
    "https://api.le-systeme-solaire.net/rest/bodies/"
  );

  let data = await response.json();

  planetsData = data.bodies.filter(
    (body) => body.isPlanet === true
  );

  displayPlanet("earth");
}

getPlanets();



function displayPlanet(planetId) {
  let planet = planetsData.find(
    (p) => p.englishName.toLowerCase() === planetId
  );

  if (!planet) return;

  document.getElementById("planet-detail-name").textContent =
    planet.englishName;

  document.getElementById("planet-distance").textContent =
    `${(planet.semimajorAxis / 1000000).toFixed(1)}M km`;

  document.getElementById("planet-radius").textContent =
    `${planet.meanRadius.toLocaleString()} km`;

  document.getElementById("planet-density").textContent =
    `${planet.density} g/cm³`;

  document.getElementById("planet-gravity").textContent =
    `${planet.gravity} m/s²`;

  document.getElementById("planet-moons").textContent =
    planet.moons ? planet.moons.length : 0;

  document.getElementById("planet-body-type").textContent =
    planet.bodyType;

  document.getElementById("planet-discoverer").textContent =
    planet.discoveredBy || "Unknown";

  document.getElementById("planet-discovery-date").textContent =
    planet.discoveryDate || "Unknown";

  document.getElementById("planet-perihelion").textContent =
    `${(planet.perihelion / 1000000).toFixed(1)}M km`;

  document.getElementById("planet-aphelion").textContent =
    `${(planet.aphelion / 1000000).toFixed(1)}M km`;

  document.getElementById("planet-eccentricity").textContent =
    planet.eccentricity;

  document.getElementById("planet-inclination").textContent =
    `${planet.inclination}°`;
}


document.querySelectorAll(".planet-card").forEach((card) => {
  card.addEventListener("click", () => {
    let planetId = card.dataset.planetId;
    displayPlanet(planetId);
  });
});