const STORAGE_KEY = "daily-reminders-notes";

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const list = document.querySelector("#notes-list");
const emptyState = document.querySelector("#empty-state");

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function renderNotes() {
  const notes = loadNotes();
  list.replaceChildren();
  emptyState.classList.toggle("hidden", notes.length > 0);

  notes.forEach((note) => {
    const item = document.createElement("li");
    item.className = "note-item";
    item.dataset.id = note.id;

    const body = document.createElement("div");
    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.className = "note-meta";
    meta.textContent = formatTime(note.createdAt);

    body.append(text, meta);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-button";
    remove.setAttribute("aria-label", `Delete note: ${note.text}`);
    remove.textContent = "Delete";

    item.append(body, remove);
    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    return;
  }

  const notes = loadNotes();
  notes.unshift({
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  });
  saveNotes(notes);
  input.value = "";
  input.focus();
  renderNotes();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-button");
  if (!button) {
    return;
  }

  const item = button.closest(".note-item");
  const notes = loadNotes().filter((note) => note.id !== item.dataset.id);
  saveNotes(notes);
  renderNotes();
});

renderNotes();
