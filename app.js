const API_BASE = "http://localhost:4000";

let token = localStorage.getItem("token") || "";
let editingContactId = null;

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const authMessage = document.getElementById("authMessage");

const contactsSection = document.getElementById("contactsSection");
const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactPhone = document.getElementById("contactPhone");
const saveBtn = document.getElementById("saveBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const contactsList = document.getElementById("contactsList");
const contactsMessage = document.getElementById("contactsMessage");

function setAuthUI(isLoggedIn) {
  contactsSection.classList.toggle("hidden", !isLoggedIn);
  logoutBtn.classList.toggle("hidden", !isLoggedIn);
  registerBtn.classList.toggle("hidden", isLoggedIn);
  loginBtn.classList.toggle("hidden", isLoggedIn);
}

async function api(path, options = {}) {
  const headers = options.headers || {};
  if (token) headers.Authorization = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

registerBtn.addEventListener("click", async () => {
  authMessage.textContent = "";
  try {
    await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
      })
    });
    authMessage.textContent = "Registered! Now login.";
  } catch (e) {
    authMessage.textContent = e.message;
  }
});

loginBtn.addEventListener("click", async () => {
  authMessage.textContent = "";
  try {
    const result = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        password: passwordInput.value.trim()
      })
    });
    token = result.token;
    localStorage.setItem("token", token);
    setAuthUI(true);
    await loadContacts();
  } catch (e) {
    authMessage.textContent = e.message;
  }
});

logoutBtn.addEventListener("click", () => {
  token = "";
  localStorage.removeItem("token");
  setAuthUI(false);
  contactsList.innerHTML = "";
  authMessage.textContent = "Logged out.";
  resetForm();
});

async function loadContacts() {
  contactsMessage.textContent = "";
  try {
    const contacts = await api("/contacts");
    renderContacts(contacts);
  } catch (e) {
    contactsMessage.textContent = e.message;
  }
}

function renderContacts(contacts) {
  contactsList.innerHTML = "";
  contacts.forEach((c) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.innerHTML = `<strong>${c.name}</strong><br/>
      <small>${c.email || ""}${c.phone ? " • " + c.phone : ""}</small>`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "secondary";
    editBtn.onclick = () => startEdit(c);

    actions.appendChild(editBtn);

    li.appendChild(info);
    li.appendChild(actions);
    contactsList.appendChild(li);
  });
}

function startEdit(contact) {
  editingContactId = contact.id;
  contactName.value = contact.name || "";
  contactEmail.value = contact.email || "";
  contactPhone.value = contact.phone || "";
  saveBtn.textContent = "Save Changes";
  cancelEditBtn.classList.remove("hidden");
}

function resetForm() {
  editingContactId = null;
  contactName.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
  saveBtn.textContent = "Add Contact";
  cancelEditBtn.classList.add("hidden");
}

cancelEditBtn.addEventListener("click", () => resetForm());

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  contactsMessage.textContent = "";

  const payload = {
    name: contactName.value.trim(),
    email: contactEmail.value.trim(),
    phone: contactPhone.value.trim()
  };

  try {
    if (!payload.name) throw new Error("Name is required");

    if (editingContactId) {
      await api(`/contacts/${editingContactId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });
      contactsMessage.textContent = "Contact updated.";
    } else {
      await api("/contacts", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      contactsMessage.textContent = "Contact created.";
    }

    resetForm();
    await loadContacts();
  } catch (e2) {
    contactsMessage.textContent = e2.message;
  }
});

// Initial load
setAuthUI(!!token);
if (token) loadContacts();
