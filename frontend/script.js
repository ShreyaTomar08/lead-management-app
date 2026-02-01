const form = document.getElementById("leadForm");
const tableBody = document.getElementById("leadTable");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const source = document.getElementById("source").value;

  if (!name || !email || !phone || !source) {
    alert("All fields are required");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Phone number must be 10 digits");
    return;
  }

  fetch("http://localhost:3000/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, source })
  })
    .then(() => {
      form.reset();
      loadLeads();
    })
    .catch(err => console.error(err));
});

function loadLeads() {
  fetch("http://localhost:3000/leads")
    .then(res => res.json())
    .then(data => {
      tableBody.innerHTML = "";

      data.forEach(lead => {
        tableBody.innerHTML += `
          <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
            <td>${lead.source}</td>
            <td>${lead.date}</td>
          </tr>
        `;
      });
    })
    .catch(err => console.error(err));
}

loadLeads();
