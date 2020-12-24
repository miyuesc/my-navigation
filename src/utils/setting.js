export function getSetting() {
  return JSON.parse(localStorage.getItem("setting"));
}

export function setSetting(setting) {
  localStorage.setItem("setting", JSON.stringify(setting));
}
