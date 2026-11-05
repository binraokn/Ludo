// BINRAO LUDO - ADMIN PANEL

const ADMIN_USERNAME = "Binrao873";

let adminPanelOpen = false;

function openAdminPanel() {
    const panel = document.getElementById("adminPanel");

    if (!panel) {
        alert("Admin Panel HTML mein nahi mila.");
        return;
    }

    panel.style.display = "block";
    adminPanelOpen = true;
    loadAdminPlayers();
}

function closeAdminPanel() {
    const panel = document.getElementById("adminPanel");

    if (panel) {
        panel.style.display = "none";
    }

    adminPanelOpen = false;
}

function loadAdminPlayers() {
    const list = document.getElementById("adminPlayerList");

    if (!list) return;

    list.innerHTML = `
        <p>Firebase player connection pending.</p>
        <p>Players database connect hone ke baad show honge.</p>
    `;
}

function searchAdminPlayer() {
    const input = document.getElementById("adminSearch");

    if (!input) return;

    const username = input.value.trim();

    if (!username) {
        alert("Player username enter karo.");
        return;
    }

    alert("Player search: " + username);
}

function adminLogout() {
    closeAdminPanel();
}

window.openAdminPanel = openAdminPanel;
window.closeAdminPanel = closeAdminPanel;
window.searchAdminPlayer = searchAdminPlayer;
window.adminLogout = adminLogout;
