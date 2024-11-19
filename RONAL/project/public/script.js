const API_URL = "http://localhost:3000/obras";
const obraList = document.getElementById("obraList");
const form = document.getElementById("obraForm");
const refreshBtn = document.getElementById("refreshBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("obraId").value;
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen_url = document.getElementById("imagen_url").value;

  const data = { titulo, descripcion, imagen_url, artista_id: 1 };

  if (!id) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  form.reset();
  loadObras();
});

editBtn.addEventListener("click", async () => {
  const id = document.getElementById("obraId").value;
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen_url = document.getElementById("imagen_url").value;

  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descripcion, imagen_url }),
    });
    form.reset();
    loadObras();
  }
});

deleteBtn.addEventListener("click", async () => {
  const id = document.getElementById("obraId").value;

  if (id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    form.reset();
    loadObras();
  }
});

refreshBtn.addEventListener("click", loadObras);

obraList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const obra = JSON.parse(e.target.dataset.obra);
    document.getElementById("obraId").value = obra.id;
    document.getElementById("titulo").value = obra.titulo;
    document.getElementById("descripcion").value = obra.descripcion;
    document.getElementById("imagen_url").value = obra.imagen_url;
  }
});

async function loadObras() {
  const response = await fetch(API_URL);
  const obras = await response.json();
  obraList.innerHTML = obras
    .map(
      (obra) =>
        `<li data-obra='${JSON.stringify(obra)}'>${obra.titulo}</li>`
    )
    .join("");
}

loadObras();
