const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");

// Verificar tema en localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
    icon.classList.replace("fa-moon", "fa-sun");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    icon.classList.replace(isLight ? "fa-moon" : "fa-sun", isLight ? "fa-sun" : "fa-moon");
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

