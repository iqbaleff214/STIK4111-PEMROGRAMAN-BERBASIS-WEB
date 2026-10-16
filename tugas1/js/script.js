document.addEventListener("DOMContentLoaded", function () {
    const users = window.dataPengguna ?? [];
    const materials = window.dataBahanAjar ?? [];
    const trackingList = window.dataTracking ?? [];

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    function logout() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal(event.target.id);
        }

        const closeButton = event.target.closest('[data-close-modal]');
        if (closeButton) {
            const modal = closeButton.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        }
    });

    /** index.html */
    if (document.getElementById("indexPage")) {
        if (loggedInUser) {
            window.location.href = "dashboard.html";
        }

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const loginButton = document.getElementById("loginButton");
        const togglePasswordButton = document.getElementById("togglePasswordButton");
        const signUpTrigger = document.getElementById("signUpTrigger");
        const forgotPasswordTrigger = document.getElementById("forgotPasswordTrigger");
    
        function validateInputs() {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
    
            loginButton.disabled = !(email !== "" && password !== "");
        }
    
        emailInput.addEventListener("input", validateInputs);
        passwordInput.addEventListener("input", validateInputs);

        togglePasswordButton.addEventListener("click", function () {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);
            
            const eyeIcon = togglePasswordButton.querySelector(".icon-tabler-eye");
            const eyeOffIcon = togglePasswordButton.querySelector(".icon-tabler-eye-off");
            eyeIcon.classList.toggle("hidden");
            eyeOffIcon.classList.toggle("hidden");
        });

        loginButton.addEventListener("click", function (event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const user = users.find((user) => user.email === email && user.password === password);
    
            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "dashboard.html";
            } else {
                alert("Email atau password salah!");
            }
        });

        forgotPasswordTrigger.addEventListener("click", function () {
            openModal("forgotPasswordModal");
        });

        signUpTrigger.addEventListener("click", function () {
            openModal("signUpModal");
        });
    } else {
        const navItems = document.querySelectorAll('.nav-item');
        const logoutButton = document.getElementById('logoutButton');
        const sidebarToggleButton = document.getElementById('sidebarToggleButton');
        if (sidebarToggleButton) {
            sidebarToggleButton.addEventListener('click', function () {
                document.body.classList.toggle('sidebar-collapsed');
                try {
                    const isCollapsed = document.body.classList.contains('sidebar-collapsed');
                    localStorage.setItem('sittaSidebarCollapsed', isCollapsed);
                } catch (e) {
                    console.error("Error saving sidebar state to localStorage:", e);
                }
            });
        }

        try {
            if (localStorage.getItem('sittaSidebarCollapsed') === 'true') {
                document.body.classList.add('sidebar-collapsed');
            }
        } catch (e) {
            console.error("Error loading sidebar state from localStorage:", e);
        }

        if (loggedInUser) {
            console.log("Logged in user:", loggedInUser);
            const userNameElement = document.getElementById("userName");
            const userEmailElement = document.getElementById("userEmail");
            const userAvatar = document.getElementById("userAvatar");

            if (userNameElement) userNameElement.textContent = loggedInUser.nama;
            if (userEmailElement) userEmailElement.textContent = loggedInUser.email;
            if (userAvatar) {
                userAvatar.textContent = loggedInUser.nama.charAt(0);
            }
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', logout);
        }

        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        const activeNavItem = document.querySelector(`.nav-item[data-file="${fileName}"]`);
        if (activeNavItem) {
            navItems.forEach(nav => nav.classList.remove('active'));
            activeNavItem.classList.add('active');
        }
    }

    /** dashboard.html */
    if (document.getElementById("dashboardPage")) {
        if (!loggedInUser) {
            window.location.href = "index.html";
        }

        const greetingText = document.getElementById("greetingText");
        if (greetingText && loggedInUser) {
            const currentHour = new Date().getHours();
            let greeting = "Selamat datang kembali!";
            if (currentHour < 12) {
                greeting = "Selamat pagi, " + loggedInUser.nama + "!";
            } else if (currentHour < 18) {
                greeting = "Selamat siang, " + loggedInUser.nama + "!";
            } else {
                greeting = "Selamat malam, " + loggedInUser.nama + "!";
            }
            greetingText.textContent = greeting;
        }

        const trackForm = document.getElementById('quickTrackForm');
        if (trackForm) {
            trackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const doNumber = document.getElementById('quickDoInput').value;
                
                if (doNumber.trim() !== "") {
                    window.location.href = `tracking.html?do=${encodeURIComponent(doNumber)}`;
                }
            });
        }
    }

    /** tracking.html */
    if (document.getElementById("trackingPage")) {
        if (!loggedInUser) {
            window.location.href = "index.html";
        }

        const searchTrackingInput = document.getElementById('searchInput');
        const resultCard = document.getElementById('resultCard');
        const searchButton = document.getElementById('searchButton');

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('do')) {
            const deliveryOrderNumber = urlParams.get('do');
            searchTrackingInput.value = deliveryOrderNumber;
            handleSearch(deliveryOrderNumber);
        }

        searchTrackingInput.addEventListener('input', function() {
            if (searchTrackingInput.value.trim() === '') {
                resultCard.classList.remove('active');
            }

            searchButton.disabled = searchTrackingInput.value.trim() === '';
        });

        searchButton.addEventListener('click', () => handleSearch());

        searchTrackingInput.addEventListener('keypress', function(e) {
            if (e.key !== 'Enter') {
                return;
            }

            handleSearch();
        });

        function handleSearch(deliveryOrderNumber) {
            const query = deliveryOrderNumber || searchTrackingInput.value.trim();

            resultCard.classList.remove('active');
            if (!query) return;

            const trackingData = trackingList[query];
            if (trackingData) {
                document.getElementById('resNama').textContent = trackingData.nama;
                document.getElementById('resDO').textContent = trackingData.nomorDO;

                const statusEl = document.getElementById('resStatus');
                statusEl.textContent = trackingData.status;
                if (trackingData.status.toLowerCase().includes('dikirim') || trackingData.status.toLowerCase().includes('selesai')) {
                    statusEl.className = 'badge success';
                } else {
                    statusEl.className = 'badge warning';
                }

                document.getElementById('resEkspedisi').textContent = trackingData.ekspedisi;
                document.getElementById('resTanggal').textContent = trackingData.tanggalKirim;
                document.getElementById('resPaket').textContent = trackingData.paket;
                document.getElementById('resTotal').textContent = trackingData.total;

                const timelineContainer = document.getElementById('resTimeline');
                timelineContainer.innerHTML = '';

                trackingData.perjalanan.forEach(item => {
                    const timelineItem = `
                        <div class="timeline-item">
                            <span class="time">${item.waktu}</span>
                            <div class="desc">${item.keterangan}</div>
                        </div>
                    `;
                    timelineContainer.insertAdjacentHTML('beforeend', timelineItem);
                });

                // Tampilkan Card dengan animasi
                setTimeout(() => resultCard.classList.add('active'), 50);
            } else {
                alert("Nomor Delivery Order tidak ditemukan.");
            }
        }
    }

    /** stock.html */
    if (document.getElementById("stockPage")) {
        if (!loggedInUser) {
            window.location.href = "index.html";
        }

        const catalogGrid = document.getElementById('catalogGrid');
        const searchInput = document.getElementById('searchInput');
        const countDisplay = document.getElementById('countDisplay');
        
        const addStockButton = document.getElementById('addStockButton');
        const itemNameInput = document.getElementById('itemName');
        const itemCodeInput = document.getElementById('itemCode');
        const quantityInput = document.getElementById('quantity');
        const locationInput = document.getElementById('location');
        const typeInput = document.getElementById('type');
        const editionInput = document.getElementById('edition');

        const newStockButton = document.getElementById('newStockButton');
        if (newStockButton) {
            newStockButton.addEventListener('click', function () {
                openModal('newStockModal');
            });
        }

        function renderCards(data) {
            catalogGrid.innerHTML = '';
            countDisplay.textContent = data.length;

            if (data.length === 0) {
                catalogGrid.innerHTML = `
                    <div class="no-results">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        <h3>Tidak ada bahan ajar yang ditemukan</h3>
                        <p style="margin-top: 0.5rem;">Coba gunakan kata kunci lain untuk pencarian.</p>
                    </div>
                `;
                return;
            }

            data.forEach(item => {
                const fallbackImg = `https://placehold.co/400x550/0056a6/ffcc00?text=${item.kodeBarang}`;
                
                const cardHTML = `
                    <article class="card">
                        <!-- Gunakan onerror agar jika local img/ tidak ada, otomatis pakai fallback placeholder -->
                        <img src="assets/${item.cover}" 
                             alt="Cover ${item.namaBarang}" 
                             class="card-cover"
                             onerror="this.onerror=null; this.src='${fallbackImg}';">
                        
                        <div class="card-body">
                            <div class="card-tags">
                                <span class="tag tag-type">${item.jenisBarang}</span>
                                <span class="tag tag-edition">Edisi ${item.edisi}</span>
                            </div>
                            
                            <h2 class="card-title">${item.namaBarang}</h2>
                            <div class="card-code">${item.kodeBarang}</div>
                            
                            <div class="card-details">
                                <div class="detail-row">
                                    <span class="detail-label">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        Lokasi
                                    </span>
                                    <span class="detail-value">${item.kodeLokasi}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                        </svg>
                                        Sisa Stok
                                    </span>
                                    <span class="detail-value stock-indicator">
                                        ${item.stok} Eks
                                        <button class="icon-btn text-muted" style="width: 24px; height: 24px; display: inline; margin-left: 0.5rem;" data-open-modal="adjustStockModal" data-item-code="${item.kodeBarang}" aria-label="Ubah Stok ${item.namaBarang}">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
                catalogGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            const filteredData = materials.filter(item => {
                return item.namaBarang.toLowerCase().includes(query) || 
                       item.kodeBarang.toLowerCase().includes(query);
            });
            
            renderCards(filteredData);
        });

        if (addStockButton) {
            addStockButton.addEventListener('click', function (event) {
                event.preventDefault();

                const itemName = itemNameInput.value.trim();
                const itemCode = itemCodeInput.value.trim();
                const quantity = parseInt(quantityInput.value.trim(), 10);
                const location = locationInput.value.trim();
                const type = typeInput.value.trim();
                const edition = editionInput.value.trim();

                if (!itemName || !itemCode || isNaN(quantity) || quantity <= 0) {
                    alert("Mohon isi semua field dengan benar.");
                    return;
                }

                const existingItemIndex = materials.findIndex(item => item.kodeBarang === itemCode);
                if (existingItemIndex >= 0) {
                    alert("Kode barang sudah ada. Silakan gunakan kode barang yang berbeda.");
                    return;
                } else {
                    const newItem = {
                        namaBarang: itemName,
                        kodeBarang: itemCode,
                        jenisBarang: type,
                        edisi: edition,
                        kodeLokasi: location,
                        stok: quantity,
                    };
                    materials.push(newItem);
                }

                itemNameInput.value = '';
                itemCodeInput.value = '';
                quantityInput.value = '';
                locationInput.value = '';
                typeInput.value = '';
                editionInput.value = '';

                closeModal('newStockModal');
                renderCards(materials);
            });
        }

        if (materials.length > 0) {
            catalogGrid.addEventListener('click', function(event) {
                const adjustButton = event.target.closest('[data-open-modal="adjustStockModal"]');
                if (adjustButton) {
                    const itemCode = adjustButton.getAttribute('data-item-code');
                    const item = materials.find(item => item.kodeBarang === itemCode);
                    if (item) {
                        document.getElementById('adjustStockItemCode').textContent = item.kodeBarang;
                        document.getElementById('adjustQuantity').value = item.stok;
                        openModal('adjustStockModal');
                    }
                }
            });

            const adjustStockButton = document.getElementById('adjustStockButton');
            if (adjustStockButton) {
                adjustStockButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    const itemCode = document.getElementById('adjustStockItemCode').textContent;
                    const newQuantity = parseInt(document.getElementById('adjustQuantity').value.trim(), 10);

                    if (isNaN(newQuantity) || newQuantity < 0) {
                        alert("Mohon masukkan jumlah stok yang valid.");
                        return;
                    }

                    const itemIndex = materials.findIndex(item => item.kodeBarang === itemCode);
                    if (itemIndex >= 0) {
                        materials[itemIndex].stok = newQuantity;
                        closeModal('adjustStockModal');
                        renderCards(materials);
                    } else {
                        alert("Item tidak ditemukan.");
                    }
                });
            }
        }

        renderCards(materials);
    }
});