export function setGigs(gigs) {
  localStorage.setItem("gigs", JSON.stringify(gigs));
}

export function getGigs() {
  return JSON.parse(localStorage.getItem("gigs"));
}

export function setSongs(songs) {
  localStorage.setItem("songs", JSON.stringify(songs));
}

export function getSongs() {
  return JSON.parse(localStorage.getItem("songs"));
}

export function setEvents(songs) {
  localStorage.setItem("events", JSON.stringify(songs));
}

export function getEvents() {
  return JSON.parse(localStorage.getItem("events"));
}

export function getIdxForId(arr,id){
  let tmp = arr.map(el => el.eId);
  return tmp.indexOf(id);
}