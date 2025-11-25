// --- AYARLAR ---
const SERVER_IP = "7-F-SURVIVAL.aternos.me";
const PIN_CODE = "1234"; // Admin PIN kodu

// --- HTML ELEMENTLERİ ---
const statusBadge = document.getElementById('statusBadge');
const playerCount = document.getElementById('playerCount');

// Admin Elementleri
const adminBtn = document.getElementById('adminBtn');
const loginModal = document.getElementById('loginModal');
const adminPanel = document.getElementById('adminPanel');
const pinInput = document.getElementById('pinInput');
const loginSubmit = document.getElementById('loginSubmit');
const closeModalBtns = document.querySelectorAll('#closeModal, #closeAdmin');

// --- BAŞLANGIÇ ---
document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
    // Her 30 saniyede bir durumu güncelle
    setInterval(checkServerStatus, 30000);
});

// --- SUNUCU DURUM KONTROLÜ ---
async function checkServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/bedrock/2/${SERVER_IP}`);
        const data = await response.json();

        if (data.online) {
            statusBadge.textContent = "ÇEVRİMİÇİ";
            statusBadge.className = "status-badge online";
            playerCount.textContent = `${data.players.online} / ${data.players.max}`;
        } else {
            statusBadge.textContent = "KAPALI";
            statusBadge.className = "status-badge offline";
            playerCount.textContent = "-/-";
        }
    } catch (error) {
        statusBadge.textContent = "HATA";
        console.error("API Hatası:", error);
    }
}

// --- ADMIN İŞLEMLERİ ---
adminBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
    pinInput.value = "";
    pinInput.focus();
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        adminPanel.classList.add('hidden');
    });
});

loginSubmit.addEventListener('click', () => {
    if (pinInput.value === PIN_CODE) {
        loginModal.classList.add('hidden');
        adminPanel.classList.remove('hidden');
    } else {
        alert("Hatalı PIN!");
        pinInput.value = "";
    }
});
