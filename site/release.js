async function loadRelease() {
  const status = document.getElementById("release-status");
  try {
    const response = await fetch("https://raw.githubusercontent.com/ghostlover2008-afk/rapidready-downloads/main/android-release.json", {cache:"no-store",credentials:"omit",referrerPolicy:"no-referrer",signal:AbortSignal.timeout(10000)});
    if (!response.ok) throw new Error("Release unavailable");
    const release = await response.json();
    if (release.status === "pending-first-release") {
      document.getElementById("release-title").textContent = "First beta coming soon";
      status.textContent = "The signed Android download will appear here when it is ready.";
      return;
    }
    const url = new URL(release.apkUrl);
    if (release.appId !== "com.OJCmed.Rapidresponsebuddy" || !Number.isSafeInteger(release.versionCode) || release.versionCode < 1 || typeof release.versionName !== "string" || release.versionName.length > 40 || typeof release.notes !== "string" || release.notes.length > 2000 || !/^[a-f0-9]{64}$/.test(release.sha256) || url.origin !== "https://github.com" || url.username || url.password || url.search || url.hash || !/^\/ghostlover2008-afk\/rapidready-downloads\/releases\/download\/[^/]+\/RapidReady\.apk$/.test(url.pathname)) throw new Error("Invalid release");
    document.getElementById("release-title").textContent = `RapidReady ${release.versionName}`;
    status.textContent = "Latest Android beta · Updates preserve your installed app data.";
    const download = document.getElementById("download");
    download.href = url.href;
    download.hidden = false;
    document.getElementById("notes").textContent = release.notes;
    document.getElementById("sha").textContent = release.sha256;
    document.getElementById("integrity").hidden = false;
  } catch {
    document.getElementById("release-title").textContent = "Check the latest release";
    status.textContent = "We couldn’t check for a release. Try again online or open All releases below.";
  }
}
void loadRelease();
