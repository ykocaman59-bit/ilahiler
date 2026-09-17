// GİRİŞ ANİMASYONU KONTROLÜ (Instagram Tarzı Pürüzsüz Açılış)
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');
        
        splash.style.opacity = '0';
        splash.style.visibility = 'hidden';
        mainContent.classList.remove('hidden');
    }, 2500); // 2.5 saniye logo gösterimi
});

// İLAHİ VE ESMAÜL HÜSNA AKIŞI
const ilahiAkisi = [
    {
        title: "Giriş: Esmaül Hüsna'ya Çağrı",
        text: "Dillerde ezan, kalpte iman,\nAnılır ismiyle her an.\nGel ey gönül zikreyle Rahman,\nEsmaül Hüsna'dır ruhun şifası inan."
    },
    {
        title: "1. Bölüm: Başlangıç İsimleri",
        text: "El-Evvel'dir O, her şeyden önce var,\nEl-Ahir'dir O, baki kalacakar.\nYa Allah, Ya Rahman, Ya Rahim,\nSensin bizim sahibimiz kerim."
    },
    {
        title: "2. Bölüm: Kudret ve Azamet",
        text: "El-Kuddüs, El-Selam, nurunla doldu âlem,\nYazmaz bunu gayrı başka bir kalem.\nYa Aziz, Ya Cebbar, yüceler yücesi,\nSensin karanlık gecenin aydınlık incesi."
    },
    {
        title: "3. Bölüm: Zikir ve Vuslat",
        text: "Esmaül Hüsna kalbe huzur saçar,\nKul ellerini âsumana açar.\nYa Mümin, Ya Müheymin koru bizi,\nKabul eyle Allah'ım bu kalbi duamızı..."
    }
];

let currentIndex = 0;
const titleElement = document.getElementById('ilahi-title');
const lyricsElement = document.getElementById('lyrics-content');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');

function updateContent() {
    titleElement.textContent = ilahiAkisi[currentIndex].title;
    lyricsElement.textContent = ilahiAkisi[currentIndex].text;
}

updateContent();

// Sonraki Bölüme Geçiş
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % ilahiAkisi.length;
    updateContent();
    
    // Ses okunuyorsa durdur
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        playBtn.textContent = "▶ İlahiyi Sesli Oku / Dinle";
    }
});

// İLAHİ SESLENDİRME MOTORU (Yavaş ve Duygulu Tonlama)
playBtn.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
        alert("Tarayıcınız seslendirme özelliğini desteklemiyor.");
        return;
    }

    // Eğer halihazırda okunuyorsa durdur
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        playBtn.textContent = "▶ İlahiyi Sesli Oku / Dinle";
        return;
    }

    // Okunacak metni başlık ve sözler olarak birleştir
    const metin = titleElement.textContent + ". " + lyricsElement.textContent;
    const utterance = new SpeechSynthesisUtterance(metin);
    
    utterance.lang = 'tr-TR';
    utterance.rate = 0.82; // İlahi havası vermesi için yavaş ve sakin tempo
    utterance.pitch = 0.85; // Tok ve huzurlu bir ses tonu

    playBtn.textContent = "⏸ Durdur";

    utterance.onend = () => {
        playBtn.textContent = "▶ İlahiyi Sesli Oku / Dinle";
    };

    utterance.onerror = () => {
        playBtn.textContent = "▶ İlahiyi Sesli Oku / Dinle";
    };

    window.speechSynthesis.speak(utterance);
});
