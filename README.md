<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>متجر التطبيقات - النسخة السهلة</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 30px;
        }

        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 36px;
        }

        /* تبويبات */
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid #eee;
        }

        .tab {
            padding: 15px 30px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #666;
            transition: all 0.3s;
        }

        .tab.active {
            color: #667eea;
            border-bottom: 3px solid #667eea;
        }

        .tab:hover {
            color: #667eea;
        }

        /* الأقسام */
        .section {
            display: none;
        }

        .section.active {
            display: block;
        }

        /* نموذج إضافة تطبيق */
        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: bold;
        }

        input, textarea, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
        }

        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #667eea;
        }

        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 10px;
            font-size: 18px;
            cursor: pointer;
            transition: transform 0.3s;
        }

        button:hover {
            transform: scale(1.05);
        }

        /* بطاقات التطبيقات */
        .apps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .app-card {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }

        .app-card:hover {
            transform: translateY(-5px);
        }

        .app-card h3 {
            color: #333;
            margin-bottom: 10px;
        }

        .app-card p {
            color: #666;
            margin-bottom: 8px;
        }

        .app-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        .btn-small {
            padding: 8px 15px;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
            border: none;
            color: white;
        }

        .btn-download {
            background: #28a745;
            flex: 1;
        }

        .btn-delete {
            background: #dc3545;
        }

        .btn-edit {
            background: #ffc107;
        }

        /* تنبيه */
        .alert {
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: none;
        }

        .alert.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            display: block;
        }

        .alert.info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
            display: block;
        }

        /* صندوق المساعدة */
        .help-box {
            background: #e7f3ff;
            border-right: 4px solid #2196F3;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }

        .help-box h3 {
            color: #2196F3;
            margin-bottom: 10px;
        }

        .help-box ol {
            margin-right: 20px;
            color: #555;
        }

        .help-box li {
            margin-bottom: 10px;
        }

        /* شاشة تسجيل الدخول */
        .login-screen {
            text-align: center;
            max-width: 400px;
            margin: 0 auto;
        }

        .password-box {
            margin: 30px 0;
        }

        /* إحصائيات */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
        }

        .stat-number {
            font-size: 36px;
            font-weight: bold;
        }

        .stat-label {
            font-size: 14px;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 متجر التطبيقات</h1>
        
        <!-- شاشة تسجيل الدخول -->
        <div id="loginScreen" class="login-screen">
            <h2>🔐 دخول لوحة التحكم</h2>
            <div class="password-box">
                <input type="password" id="passwordInput" placeholder="أدخل كلمة المرور">
                <p style="color: #999; margin-top: 10px;">كلمة المرور الافتراضية: 1234</p>
            </div>
            <button onclick="login()">دخول كأدمن</button>
            <button onclick="enterAsVisitor()" style="background: #28a745; margin-top: 10px;">دخول كزائر</button>
        </div>

        <!-- لوحة التحكم -->
        <div id="adminPanel" style="display: none;">
            <!-- التبويبات -->
            <div class="tabs">
                <button class="tab active" onclick="showTab('add')">➕ إضافة تطبيق</button>
                <button class="tab" onclick="showTab('manage')">📱 إدارة التطبيقات</button>
                <button class="tab" onclick="showTab('help')">❓ المساعدة</button>
                <button class="tab" onclick="logout()" style="margin-right: auto; background: #dc3545; color: white; border-radius: 10px;">خروج</button>
            </div>

            <!-- قسم إضافة تطبيق -->
            <div id="addSection" class="section active">
                <h2>إضافة تطبيق جديد</h2>
                
                <div class="help-box">
                    <h3>📌 كيفية إضافة تطبيق:</h3>
                    <ol>
                        <li>ارفع الملف على <strong>Google Drive</strong> أو <strong>Dropbox</strong> أو <strong>MediaFire</strong></li>
                        <li>احصل على رابط التحميل المباشر</li>
                        <li>الصق الرابط في الحقل أدناه</li>
                        <li>املأ باقي البيانات واضغط حفظ</li>
                    </ol>
                </div>

                <div id="addAlert" class="alert"></div>

                <form onsubmit="addApp(event)">
                    <div class="form-group">
                        <label>اسم التطبيق *</label>
                        <input type="text" id="appName" placeholder="مثال: واتساب" required>
                    </div>

                    <div class="form-group">
                        <label>وصف التطبيق</label>
                        <textarea id="appDescription" rows="3" placeholder="اكتب وصف مختصر للتطبيق"></textarea>
                    </div>

                    <div class="form-group">
                        <label>رابط التحميل *</label>
                        <input type="url" id="appLink" placeholder="https://drive.google.com/..." required>
                    </div>

                    <div class="form-group">
                        <label>حجم الملف</label>
                        <input type="text" id="appSize" placeholder="مثال: 50 MB">
                    </div>

                    <div class="form-group">
                        <label>الفئة</label>
                        <select id="appCategory">
                            <option value="تطبيقات">تطبيقات</option>
                            <option value="ألعاب">ألعاب</option>
                            <option value="أدوات">أدوات</option>
                            <option value="تعليم">تعليم</option>
                            <option value="ترفيه">ترفيه</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>الإصدار</label>
                        <input type="text" id="appVersion" placeholder="مثال: 2.0.1">
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="appPublic" checked>
                            نشر التطبيق للزوار
                        </label>
                    </div>

                    <button type="submit">💾 حفظ التطبيق</button>
                </form>
            </div>

            <!-- قسم إدارة التطبيقات -->
            <div id="manageSection" class="section">
                <h2>إدارة التطبيقات</h2>
                
                <div class="stats">
                    <div class="stat-card">
                        <div class="stat-number" id="totalApps">0</div>
                        <div class="stat-label">إجمالي التطبيقات</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="publicApps">0</div>
                        <div class="stat-label">التطبيقات المنشورة</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="privateApps">0</div>
                        <div class="stat-label">التطبيقات الخاصة</div>
                    </div>
                </div>

                <div class="apps-grid" id="adminAppsGrid">
                    <!-- التطبيقات ستظهر هنا -->
                </div>
            </div>

            <!-- قسم المساعدة -->
            <div id="helpSection" class="section">
                <h2>المساعدة</h2>
                
                <div class="help-box">
                    <h3>🌐 كيفية رفع الملفات:</h3>
                    <ol>
                        <li>
                            <strong>Google Drive:</strong>
                            <ul>
                                <li>ارفع الملف على Drive</li>
                                <li>اضغط كليك يمين → Get link</li>
                                <li>غيّر الإعداد إلى "Anyone with the link"</li>
                                <li>انسخ الرابط</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Dropbox:</strong>
                            <ul>
                                <li>ارفع الملف</li>
                                <li>اضغط Share → Create link</li>
                                <li>انسخ الرابط</li>
                            </ul>
                        </li>
                        <li>
                            <strong>MediaFire:</strong>
                            <ul>
                                <li>ارفع الملف مجاناً</li>
                                <li>احصل على رابط التحميل</li>
                            </ul>
                        </li>
                    </ol>
                </div>

                <div class="help-box">
                    <h3>💡 نصائح مهمة:</h3>
                    <ul>
                        <li>استخدم روابط مباشرة للتحميل</li>
                        <li>تأكد من أن الملفات آمنة</li>
                        <li>احتفظ بنسخة احتياطية من البيانات</li>
                        <li>يمكنك تصدير البيانات كـ JSON</li>
                    </ul>
                </div>

                <div style="margin-top: 30px;">
                    <button onclick="exportData()" style="background: #28a745;">📥 تصدير البيانات</button>
                    <button onclick="importData()" style="background: #17a2b8;">📤 استيراد البيانات</button>
                    <button onclick="clearAllData()" style="background: #dc3545;">🗑️ مسح كل البيانات</button>
                </div>
            </div>
        </div>

        <!-- واجهة الزوار -->
        <div id="visitorPanel" style="display: none;">
            <p style="text-align: center; color: #666; margin-bottom: 30px;">
                مرحباً بك في متجر التطبيقات! تصفح واختر ما يناسبك
            </p>
            
            <button onclick="backToLogin()" style="background: #6c757d; margin-bottom: 20px;">
                🔙 العودة لتسجيل الدخول
            </button>

            <div class="apps-grid" id="visitorAppsGrid">
                <!-- التطبيقات العامة ستظهر هنا -->
            </div>
        </div>
    </div>

    <script>
        // ====================================
        // 🔐 كلمة المرور (يمكنك تغييرها)
        // ====================================
        const ADMIN_PASSWORD = '1234';
        
        // ====================================
        // 📦 تخزين البيانات
        // ====================================
        
        // جلب التطبيقات من التخزين المحلي
        function getApps() {
            const apps = localStorage.getItem('myApps');
            return apps ? JSON.parse(apps) : [];
        }
        
        // حفظ التطبيقات في التخزين المحلي
        function saveApps(apps) {
            localStorage.setItem('myApps', JSON.stringify(apps));
        }
        
        // ====================================
        // 🔑 تسجيل الدخول
        // ====================================
        
        function login() {
            const password = document.getElementById('passwordInput').value;
            
            if (password === ADMIN_PASSWORD) {
                document.getElementById('loginScreen').style.display = 'none';
                document.getElementById('adminPanel').style.display = 'block';
                document.getElementById('visitorPanel').style.display = 'none';
                loadAdminApps();
                updateStats();
            } else {
                alert('❌ كلمة المرور غير صحيحة!');
            }
        }
        
        function enterAsVisitor() {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'none';
            document.getElementById('visitorPanel').style.display = 'block';
            loadVisitorApps();
        }
        
        function logout() {
            document.getElementById('loginScreen').style.display = 'block';
            document.getElementById('adminPanel').style.display = 'none';
            document.getElementById('visitorPanel').style.display = 'none';
            document.getElementById('passwordInput').value = '';
        }
        
        function backToLogin() {
            logout();
        }
        
        // ====================================
        // 📑 التبويبات
        // ====================================
        
        function showTab(tabName) {
            // إخفاء كل الأقسام
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // إظهار القسم المطلوب
            document.getElementById(tabName + 'Section').classList.add('active');
            
            // تحديث التبويبات
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // تحديث البيانات
            if (tabName === 'manage') {
                loadAdminApps();
                updateStats();
            }
        }
        
        // ====================================
        // ➕ إضافة تطبيق
        // ====================================
        
        function addApp(event) {
            event.preventDefault();
            
            // جمع البيانات من النموذج
            const newApp = {
                id: Date.now(), // معرف فريد
                name: document.getElementById('appName').value,
                description: document.getElementById('appDescription').value,
                link: document.getElementById('appLink').value,
                size: document.getElementById('appSize').value,
                category: document.getElementById('appCategory').value,
                version: document.getElementById('appVersion').value,
                isPublic: document.getElementById('appPublic').checked,
                addedDate: new Date().toLocaleDateString('ar-EG'),
                downloads: 0
            };
            
            // جلب التطبيقات الحالية
            const apps = getApps();
            
            // إضافة التطبيق الجديد
            apps.push(newApp);
            
            // حفظ التطبيقات
            saveApps(apps);
            
            // إظهار رسالة نجاح
            const alert = document.getElementById('addAlert');
            alert.className = 'alert success';
            alert.textContent = '✅ تم إضافة التطبيق بنجاح!';
            alert.style.display = 'block';
            
            // مسح النموذج
            event.target.reset();
            
            // إخفاء الرسالة بعد 3 ثواني
            setTimeout(() => {
                alert.style.display = 'none';
            }, 3000);
        }
        
        // ====================================
        // 📱 عرض التطبيقات
        // ====================================
        
        function loadAdminApps() {
            const apps = getApps();
            const grid = document.getElementById('adminAppsGrid');
            
            if (apps.length === 0) {
                grid.innerHTML = '<p style="text-align: center; color: #999;">لا توجد تطبيقات بعد. أضف تطبيقك الأول!</p>';
                return;
            }
            
            grid.innerHTML = apps.map(app => `
                <div class="app-card">
                    <h3>📱 ${app.name}</h3>
                    <p>📝 ${app.description || 'بدون وصف'}</p>
                    <p>📊 الحجم: ${app.size || 'غير محدد'}</p>
                    <p>📂 الفئة: ${app.category}</p>
                    <p>🔢 الإصدار: ${app.version || 'غير محدد'}</p>
                    <p>📅 تاريخ الإضافة: ${app.addedDate}</p>
                    <p>⬇️ التحميلات: ${app.downloads}</p>
                    <p>👁️ الحالة: ${app.isPublic ? '🌍 عام' : '🔒 خاص'}</p>
                    <div class="app-actions">
                        <button class="btn-small btn-download" onclick="window.open('${app.link}', '_blank'); incrementDownloads(${app.id})">
                            ⬇️ تحميل
                        </button>
                        <button class="btn-small btn-edit" onclick="togglePublic(${app.id})">
                            ${app.isPublic ? '🔒 إخفاء' : '🌍 نشر'}
                        </button>
                        <button class="btn-small btn-delete" onclick="deleteApp(${app.id})">
                            🗑️ حذف
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        function loadVisitorApps() {
            const apps = getApps().filter(app => app.isPublic);
            const grid = document.getElementById('visitorAppsGrid');
            
            if (apps.length === 0) {
                grid.innerHTML = '<p style="text-align: center; color: #999;">لا توجد تطبيقات متاحة حالياً. تحقق لاحقاً!</p>';
                return;
            }
            
            grid.innerHTML = apps.map(app => `
                <div class="app-card">
                    <h3>📱 ${app.name}</h3>
                    <p>📝 ${app.description || 'تطبيق رائع'}</p>
                    <p>📊 الحجم: ${app.size || 'غير محدد'}</p>
                    <p>📂 الفئة: ${app.category}</p>
                    <p>🔢 الإصدار: ${app.version || 'غير محدد'}</p>
                    <p>⬇️ التحميلات: ${app.downloads}</p>
                    <div class="app-actions">
                        <button class="btn-small btn-download" onclick="window.open('${app.link}', '_blank'); incrementDownloads(${app.id})" style="width: 100%;">
                            ⬇️ تحميل التطبيق
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        // ====================================
        // 🔧 وظائف التحكم
        // ====================================
        
        function deleteApp(appId) {
            if (confirm('هل أنت متأكد من حذف هذا التطبيق؟')) {
                let apps = getApps();
                apps = apps.filter(app => app.id !== appId);
                saveApps(apps);
                loadAdminApps();
                updateStats();
                alert('✅ تم حذف التطبيق!');
            }
        }
        
        function togglePublic(appId) {
            const apps = getApps();
            const app = apps.find(a => a.id === appId);
            if (app) {
                app.isPublic = !app.isPublic;
                saveApps(apps);
                loadAdminApps();
                updateStats();
                alert(app.isPublic ? '✅ تم نشر التطبيق!' : '✅ تم إخفاء التطبيق!');
            }
        }
        
        function incrementDownloads(appId) {
            const apps = getApps();
            const app = apps.find(a => a.id === appId);
            if (app) {
                app.downloads++;
                saveApps(apps);
            }
        }
        
        // ====================================
        // 📊 الإحصائيات
        // ====================================
        
        function updateStats() {
            const apps = getApps();
            const publicApps = apps.filter(app => app.isPublic);
            const privateApps = apps.filter(app => !app.isPublic);
            
            document.getElementById('totalApps').textContent = apps.length;
            document.getElementById('publicApps').textContent = publicApps.length;
            document.getElementById('privateApps').textContent = privateApps.length;
        }
        
        // ====================================
        // 💾 استيراد وتصدير البيانات
        // ====================================
        
        function exportData() {
            const apps = getApps();
            const dataStr = JSON.stringify(apps, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'my-apps-backup.json';
            link.click();
            
            alert('✅ تم تصدير البيانات!');
        }
        
        function importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    try {
                        const apps = JSON.parse(event.target.result);
                        saveApps(apps);
                        loadAdminApps();
                        updateStats();
                        alert('✅ تم استيراد البيانات بنجاح!');
                    } catch (error) {
                        alert('❌ خطأ في قراءة الملف!');
                    }
                };
                
                reader.readAsText(file);
            };
            
            input.click();
        }
        
        function clearAllData() {
            if (confirm('⚠️ هل أنت متأكد؟ سيتم حذف جميع التطبيقات نهائياً!')) {
                if (confirm('⚠️ تأكيد نهائي: سيتم حذف كل شيء!')) {
                    localStorage.removeItem('myApps');
                    loadAdminApps();
                    updateStats();
                    alert('✅ تم مسح جميع البيانات!');
                }
            }
        }
        
        // ====================================
        // 🚀 بدء التطبيق
        // ====================================
        
        // اختصار: اضغط Enter للدخول
        document.getElementById('passwordInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    </script>
</body>
</html>
