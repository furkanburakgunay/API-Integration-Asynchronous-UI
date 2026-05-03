// 1. ADIM: CSS Kodlarını JS İçinde Tanımlama
const cssKodlari = `
    body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f0f2f5;
        margin: 0; padding: 20px;
    }
    #main-container {
        max-width: 700px;
        margin: auto;
        background: white;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    #baslik { text-align: center; color: #1a73e8; }
    
    #buton-alani {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 25px;
        justify-content: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
    
    .user-btn {
        padding: 10px 18px;
        border: none;
        border-radius: 8px;
        background-color: #e8f0fe;
        color: #1967d2;
        cursor: pointer;
        font-weight: 600;
        transition: 0.3s;
    }
    .user-btn:hover { background-color: #d2e3fc; }
    .user-btn.active { background-color: #1a73e8; color: white; }

    .todo-card {
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 10px;
        background: #fafafa;
        border-left: 6px solid #ff4d4d;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .todo-card.completed {
        border-left-color: #00c851;
        background: #f0fff4;
    }
    .todo-card.completed span {
        text-decoration: line-through;
        color: #888;
    }
    .badge {
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 5px;
        text-transform: uppercase;
        font-weight: bold;
    }
`;

// 2. ADIM: CSS'i HTML'e Gönderme (Enjekte Etme)
const styleTag = document.createElement('style');
styleTag.innerHTML = cssKodlari;
document.head.appendChild(styleTag);

// --- API VE MANTIK KODLARI ---

const butonAlani = document.getElementById('buton-alani');
const todoAlani = document.getElementById('todo-alani');
let tumVeriler = [];

window.onload = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(data => {
            tumVeriler = data;
            butonlariHazirla();
            listele(tumVeriler);
        });
};

function butonlariHazirla() {
    // Benzersiz User ID'leri al
    const ids = [...new Set(tumVeriler.map(item => item.userId))];
    
    // "Hepsi" Butonu
    const hepsiBtn = document.createElement('button');
    hepsiBtn.innerText = "Tümü";
    hepsiBtn.className = "user-btn active";
    hepsiBtn.onclick = () => filtrele("Tümü", hepsiBtn);
    butonAlani.appendChild(hepsiBtn);

    // Kullanıcı Butonları
    ids.forEach(id => {
        const btn = document.createElement('button');
        btn.innerText = `Kullanıcı ${id}`;
        btn.className = "user-btn";
        btn.onclick = () => filtrele(id, btn);
        butonAlani.appendChild(btn);
    });
}

function filtrele(id, secilenBtn) {
    // Butonların aktiflik durumunu değiştir
    document.querySelectorAll('.user-btn').forEach(b => b.classList.remove('active'));
    secilenBtn.classList.add('active');

    const sonuc = id === "Tümü" ? tumVeriler : tumVeriler.filter(x => x.userId === id);
    listele(sonuc);
}

function listele(liste) {
    todoAlani.innerHTML = "";
    liste.forEach(item => {
        const div = document.createElement('div');
        div.className = `todo-card ${item.completed ? 'completed' : ''}`;
        
        div.innerHTML = `
            <span>${item.title}</span>
            <div class="badge" style="color: ${item.completed ? '#00c851' : '#ff4d4d'}">
                ${item.completed ? 'Tamamlandı' : 'Bekliyor'}
            </div>
        `;
        todoAlani.appendChild(div);
    });
}