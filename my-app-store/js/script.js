document.addEventListener('DOMContentLoaded', () => {
    // تحديد الصفحة الحالية لتشغيل الوظائف المناسبة
    if (document.body.contains(document.getElementById('publicAppsGrid'))) {
        initPublicPage();
    } else if (document.body.contains(document.getElementById('adminPanel'))) {
        initAdminPage();
    }
});

// ====================================
// ⚙️ وظائف مشتركة
// ====================================
const ADMIN_PASSWORD = '1234';

function getApps() {
    // إضافة بيانات تجريبية إذا كان التخزين فارغًا
    if (!localStorage.getItem('myApps')) {
        const sampleApps = [
            { id: 1, name: "تطبيق تجريبي 1", description: "وصف للتطبيق التجريبي الأول.", link: "#", icon: "https://via.placeholder.com/60", category: "ألعاب", size: "50MB", version: "1.0", isPublic: true },
            { id: 2, name: "تطبيق تجريبي 2", description: "وصف للتطبيق التجريبي الثاني.", link: "#", icon: "https://via.placeholder.com/60", category: "أدوات", size: "25MB", version: "2.1", isPublic: false },
        ];
        localStorage.setItem('myApps', JSON.stringify(sampleApps));
    }
    return JSON.parse(localStorage.getItem('myApps')) || [];
}

function saveApps(apps) {
    localStorage.setItem('myApps', JSON.stringify(apps));
}

// ====================================
// 🔑 وظائف صفحة الأدمن (admin.html)
// ====================================
function initAdminPage() {
    // التحقق إذا كان الأدمن مسجل دخوله
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        showAdminPanel();
    }

    // إضافة event listener لنموذج الإضافة
    const appForm = document.getElementById('appForm');
    if (appForm) {
        appForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleLogin() {
    const password = document.getElementById('passwordInput').value;
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        showAdminPanel();
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}

function handleLogout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadAdminApps();
    updateStats();
}

function handleFormSubmit(event) {
    event.preventDefault();
    const appId = document.getElementById('appId').value;

    const appData = {
        name: document.getElementById('appName').value,
        link: document.getElementById('appLink').value,
        icon: document.getElementById('appIcon').value,
        category: document.getElementById('appCategory').value,
        size: document.getElementById('appSize').value,
        version: document.getElementById('appVersion').value,
        description: document.getElementById('appDescription').value,
        isPublic: true // التطبيقات الجديدة تكون عامة افتراضياً
    };

    let apps = getApps();
    if (appId) { // تعديل تطبيق موجود
        const appIndex = apps.findIndex(app => app.id == appId);
        apps[appIndex] = { ...apps[appIndex], ...appData };
    } else { // إضافة تطبيق جديد
        appData.id = Date.now();
        apps.push(appData);
    }

    saveApps(apps);
    loadAdminApps();
    updateStats();
    resetForm();
}

function loadAdminApps() {
    const apps = getApps();
    const grid = document.getElementById('adminAppsGrid');
    grid.innerHTML = apps.map(app => `
        <div class="app-card">
            <div class="app-card-header">
                <img src="${app.icon || 'https://via.placeholder.com/60'}" alt="${app.name}" class="app-icon">
                <div>
                    <h3>${app.name}</h3>
                    <span class="app-category">${app.category}</span>
                </div>
            </div>
            <p class="app-description">${app.description || 'لا يوجد وصف'}</p>
            <div class="app-meta">
                <span><i class="fas fa-database"></i> ${app.size || 'N/A'}</span>
                <span><i class="fas fa-code-branch"></i> ${app.version || 'N/A'}</span>
                <span>${app.isPublic ? '<i class="fas fa-eye"></i> عام' : '<i class="fas fa-eye-slash"></i> خاص'}</span>
            </div>
            <div class="admin-app-actions">
                <button class="btn-edit" onclick="editApp(${app.id})"><i class="fas fa-edit"></i> تعديل</button>
                <button class="btn-delete" onclick="deleteApp(${app.id})"><i class="fas fa-trash"></i> حذف</button>
                <button class="${app.isPublic ? 'btn-toggle-private' : 'btn-toggle-public'}" onclick="togglePublic(${app.id})">
                    ${app.isPublic ? '<i class="fas fa-lock"></i> جعله خاص' : '<i class="fas fa-globe"></i> نشره'}
                </button>
            </div>
        </div>
    `).join('');
}

function editApp(id) {
    const apps = getApps();
    const app = apps.find(a => a.id === id);
    if (!app) return;

    document.getElementById('appId').value = app.id;
    document.getElementById('appName').value = app.name;
    document.getElementById('appLink').value = app.link;
    document.getElementById('appIcon').value = app.icon;
    document.getElementById('appCategory').value = app.category;
    document.getElementById('appSize').value = app.size;
    document.getElementById('appVersion').value = app.version;
    document.getElementById('appDescription').value = app.description;
    
    document.getElementById('formTitle').textContent = '✏️ تعديل التطبيق';
    document.getElementById('saveBtn').textContent = '💾 حفظ التعديلات';
    document.getElementById('cancelBtn').style.display = 'inline-block';
    window.scrollTo(0, 0); // الصعود لأعلى الصفحة للنموذج
}

function deleteApp(id) {
    if (confirm('هل أنت متأكد من حذف هذا التطبيق؟')) {
        let apps = getApps();
        apps = apps.filter(app => app.id !== id);
        saveApps(apps);
        loadAdminApps();
        updateStats();
    }
}

function togglePublic(id) {
    let apps = getApps();
    const app = apps.find(a => a.id === id);
    if (app) {
        app.isPublic = !app.isPublic;
        saveApps(apps);
        loadAdminApps();
        updateStats();
    }
}

function resetForm() {
    document.getElementById('appForm').reset();
    document.getElementById('appId').value = '';
    document.getElementById('formTitle').textContent = '➕ إضافة تطبيق جديد';
    document.getElementById('saveBtn').textContent = '💾 حفظ التطبيق';
    document.getElementById('cancelBtn').style.display = 'none';
}

function updateStats() {
    const apps = getApps();
    const publicApps = apps.filter(app => app.isPublic).length;
    
    const statsGrid = document.querySelector('.stats-grid');
    if(statsGrid) {
        statsGrid.innerHTML = `
            <div class="stat-card">
                <div class="stat-card-number">${apps.length}</div>
                <div class="stat-card-label">إجمالي التطبيقات</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-number">${publicApps}</div>
                <div class="stat-card-label">التطبيقات المنشورة</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-number">${apps.length - publicApps}</div>
                <div class="stat-card-label">التطبيقات الخاصة</div>
            </div>
        `;
    }
}

// ====================================
// 📢 وظائف صفحة الزوار (index.html)
// ====================================
function initPublicPage() {
    renderPublicApps();
    renderCategories();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', renderPublicApps);
    }
}

function renderCategories() {
    const apps = getApps();
    const categories = ['الكل', ...new Set(apps.map(app => app.category))];
    const tabsContainer = document.getElementById('categoryTabs');
    
    if (tabsContainer) {
        tabsContainer.innerHTML = categories.map(cat => 
            `<button class="category-tab ${cat === 'الكل' ? 'active' : ''}" onclick="filterByCategory('${cat}')">${cat}</button>`
        ).join('');
    }
}

function renderPublicApps() {
    let apps = getApps().filter(app => app.isPublic);
    const grid = document.getElementById('publicAppsGrid');
    
    // فلترة البحث
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        apps = apps.filter(app => app.name.toLowerCase().includes(searchTerm) || app.description.toLowerCase().includes(searchTerm));
    }

    // فلترة الفئات
    const activeCategory = document.querySelector('.category-tab.active')?.textContent || 'الكل';
    if (activeCategory !== 'الكل') {
        apps = apps.filter(app => app.category === activeCategory);
    }
    
    if (apps.length === 0) {
        grid.innerHTML = `<p style="text-align: center; grid-column: 1 / -1; color: #6B7280;">لا توجد تطبيقات تطابق بحثك.</p>`;
        return;
    }

    grid.innerHTML = apps.map(app => `
        <div class="app-card">
            <div class="app-card-header">
                <img src="${app.icon || 'https://via.placeholder.com/60'}" alt="${app.name}" class="app-icon">
                <div>
                    <h3>${app.name}</h3>
                    <span class="app-category">${app.category}</span>
                </div>
            </div>
            <p class="app-description">${app.description || 'لا يوجد وصف متاح لهذا التطبيق.'}</p>
            <div class="app-meta">
                <span><i class="fas fa-database"></i> ${app.size || 'N/A'}</span>
                <span><i class="fas fa-code-branch"></i> ${app.version || 'N/A'}</span>
            </div>
            <a href="${app.link}" target="_blank" class="download-btn">
                <i class="fas fa-download"></i> تحميل
            </a>
        </div>
    `).join('');
}

function filterByCategory(category) {
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    renderPublicApps();
}