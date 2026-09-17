// Giriş animasyonundan sonra ana içeriği göster
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
    }, 2800); // 2.8 saniye sonra açılır
});

// İlahi Verileri ve Esmaül Hüsna Geçişleri
const ilahiAkisi = [
    {
        title: "Giriş İlahisi: Esmaül Hüsna'ya Çağrı",
        text: "Dillerde ezan, kalpte iman,\nAnılır ismiyle her an.\nGel ey gönül zikreyle Rahman,\nEsmaül Hüsna'dır ruhun şifası inan."
    },
    {
        title: "1. Bölüm: İsimlerin Başlangıcı",
        text: "El-Evvel'dir O, her şeyden önce var,\nEl-Ahir'dir O, baki kalacakar.\nYa Allah, Ya Rahman, Ya Rahim,\nSensin bizim sahibimiz kerim."
    },
    {
        title: "2. Bölüm: Kudret ve Azamet",
        text: "El-Kuddüs, El-Selam, nurunla doldu âlem,\nYazmaz bunu gayrı başka bir kalem.\nYa Aziz, Ya Cebbar, yüceler yücesi,\nSensin karanlık gecenin aydınlık incesi."
    },
    {
        title: "Devam Ediyor...",
        text: "Esmaül Hüsna kalbe huzur saçar,\nKul ellerini âsumana açar.\nYa Mümin, Ya Müheymin koru bizi,\nKabul eyle Allah'ım bu kalbi duamızı..."
    }
];

let currentIndex = 0;
const titleElement = document.getElementById('ilahi-title');
const lyricsElement = document.getElementById('lyrics-content');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');

// İlk yüklemede ilk kısmı yazdır
function updateContent() {
    titleElement.textContent = ilahiAkisi[currentIndex].title;
    lyricsElement.innerText = ilahiAkisi[currentIndex].text;
}

updateContent();

// Sonraki bölüme geçiş butonu
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % ilahiAkisi.length;
    updateContent();
});

// Seslendirme / Okuma Efekti (Tarayıcının Sesi - Text to Speech)
playBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        // Önceki konuşmayı durdur
        window.speechSynthesis.cancel();
        
        const textToSpeak = titleElement.textContent + ". " + lyricsElement.innerText;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'tr-TR';
        utterance.rate = 0.9; // Biraz daha sakin ve yavaş okuma hızı (ilahi tonu için)
        
        window.speechSynthesis.speak(utterance);
        playBtn.textContent = "Okunuyor...";
        
        utterance.onend = () => {
            playBtn.textContent = "İlahiyi Dinle / Oku";
        };
    } else {
        alert("Tarayıcınız seslendirme özelliğini desteklemiyor.");
    }
});

