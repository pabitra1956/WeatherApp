const API_KEY = "e3e3bc6382004fbeebce520ec644a60e"; // replace with your key

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;
  await getWeather(city);
});

async function getWeather(city) {
  const errorEl = document.getElementById("error");
  const cityEl = document.getElementById("city");
  const tempEl = document.getElementById("temp");
  const descEl = document.getElementById("desc");
  const iconEl = document.getElementById("icon");

  errorEl.textContent = "";
  cityEl.textContent = tempEl.textContent = descEl.textContent = "";
  iconEl.src = "";
  iconEl.style.display = "none";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log("Request URL:", url.replace(API_KEY, "e3e3bc6382004fbeebce520ec644a60e"));
    const res = await fetch(url);
    const text = await res.text(); // read raw for helpful errors
    if (!res.ok) {
      console.error("API returned non-OK:", res.status, text);
      errorEl.textContent = `API error: ${res.status} ${res.statusText} — ${text}`;
      return;
    }
    const data = JSON.parse(text);
    console.log("weather data:", data);

    cityEl.textContent = `${data.name}, ${data.sys?.country || ""}`;
    tempEl.textContent = `Temperature: ${data.main?.temp} °C`;
    descEl.textContent = data.weather?.[0]?.description || "";
    const icon = data.weather?.[0]?.icon;
    if (icon) {
      iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      iconEl.style.display = "inline";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    errorEl.textContent = "Network or parsing error. Check console for details.";
  }
}
