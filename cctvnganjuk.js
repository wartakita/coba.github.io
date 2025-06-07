const apiUrl = 'https://cctv.nganjukkab.go.id/api/get-list';
const cctvListElem = document.getElementById('cctv-list');
const streamFrame = document.getElementById('stream-frame');
const searchInput = document.getElementById('search-input');
const searchMessage = document.getElementById('search-message');
const loadingMessage = document.getElementById('loading-message');
const iframeError = document.getElementById('iframe-error');
let currentActiveId = null;
let cameras = [];

async function fetchCCTVs() {
    try {
        let response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch API');
        let data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching CCTV list:', err);
        cctvListElem.innerHTML += '<p style="padding:1rem;color:#f00;">Gagal memuat daftar kamera.</p>';
    } finally {
        loadingMessage.style.display = 'none';
    }
}

function clearCCTVs() {
    const cameraItems = cctvListElem.querySelectorAll('.camera-item');
    cameraItems.forEach(item => item.remove());
}

function renderCCTVs(camerasToRender) {
    clearCCTVs();

    if (camerasToRender.length === 0) {
        searchMessage.textContent = "\u26a0\ufe0f Kamera tidak ditemukan.";
        return;
    } else {
        searchMessage.textContent = "";
    }

    camerasToRender.forEach(camera => {
        const item = document.createElement('div');
        item.classList.add('camera-item');
        item.dataset.streamUrl = camera.url;
        item.dataset.id = camera.id;

        item.innerHTML = `
          <div class="camera-name">${camera.name || 'Unnamed Camera'}</div>
          <div class="camera-position">${camera.posisi || ''}</div>
        `;

        item.addEventListener('click', () => {
            if (currentActiveId) {
                const prevActive = document.querySelector(`.camera-item[data-id="${currentActiveId}"]`);
                if (prevActive) prevActive.classList.remove('active');
            }
            currentActiveId = camera.id;
            item.classList.add('active');
            loadVideoStream(camera.url);
        });

        cctvListElem.appendChild(item);
    });

    if (!currentActiveId && camerasToRender.length > 0) {
        const firstCamera = camerasToRender[0];
        const firstElem = cctvListElem.querySelector('.camera-item');
        firstElem.classList.add('active');
        currentActiveId = firstCamera.id;
        loadVideoStream(firstCamera.url);
    }
}

function loadVideoStream(url) {
    streamFrame.src = url;
    iframeError.style.display = 'none';
}

streamFrame.addEventListener('error', () => {
    iframeError.style.display = 'block';
});

function filterCCTVs(query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === "") {
        renderCCTVs(cameras);
    } else {
        const filtered = cameras.filter(cam =>
            (cam.name && cam.name.toLowerCase().includes(normalizedQuery)) ||
            (cam.posisi && cam.posisi.toLowerCase().includes(normalizedQuery))
        );
        renderCCTVs(filtered);
    }
}

async function init() {
    cameras = await fetchCCTVs() || [];
    renderCCTVs(cameras);
    searchInput.addEventListener('input', (e) => {
        filterCCTVs(e.target.value);
    });
}

init();
