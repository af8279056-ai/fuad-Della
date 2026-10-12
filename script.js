document.addEventListener("DOMContentLoaded", function () {
    
    // ===================================================
    // [KONTROL COVER, HALAMAN 1 & AUDIO MUSIK]
    // Logika membuka undangan dan memutar musik otomatis
    // ===================================================
    const btnOpen = document.getElementById("btn-open");
    const coverScreen = document.getElementById("cover-screen");
    const mainInvitation = document.getElementById("main-invitation");
    const weddingMusic = document.getElementById("wedding-music"); // <--- AMBIL DATA LAGU

    btnOpen.addEventListener("click", function () {
        // Sembunyikan layar depan
        coverScreen.classList.add("hidden");
        coverScreen.classList.remove("active");
        
        // Tampilkan konten utama undangan
        mainInvitation.classList.remove("hidden");
        
        // MAINKAN MUSIK SECARA OTOMATIS SAAT DIKLIK
        if (weddingMusic) {
            weddingMusic.play().catch(error => {
                console.log("Autoplay diblokir browser, butuh interaksi:", error);
            });
        }
        
        // Picu animasi timbul untuk halaman pertama di dalam
        const firstSection = document.getElementById("halaman-1");
        if (firstSection) {
            firstSection.classList.add("active");
        }
    });

    // ===================================================
    // [SISTEM ANIMASI TIMBUL OTOMATIS PER HALAMAN]
    // Memicu animasi fade-in-up saat halaman di-scroll
    // ===================================================
    const sections = document.querySelectorAll(".page-section");
    const observerOptions = {
        root: null,
        threshold: 0.25 
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===================================================
    // [HALAMAN 6: HITUNG MUNDUR / COUNTDOWN TIMER]
    // Target otomatis ke tanggal pernikahan Anda
    // ===================================================
    const targetDate = new Date("Dec 12, 3012 08:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
        }
    }
    setInterval(updateCountdown, 1000);

    // ===================================================
    // [HALAMAN 9: WEDDING GIFT / HADIAH DIGITAL]
    // ===================================================
    const btnGift = document.getElementById("btn-gift");
    const giftDetails = document.getElementById("gift-details");

    btnGift.addEventListener("click", function () {
        giftDetails.classList.toggle("hidden");
    });

    // ===================================================
    // [HALAMAN 10: FORM RSVP / KONFIRMASI KEHADIRAN]
    // ===================================================
    const rsvpForm = document.getElementById("rsvp-form");
    rsvpForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Terima kasih! Konfirmasi kehadiran Anda berhasil disimpan.");
        rsvpForm.reset();
    });

    // ===================================================
    // [HALAMAN 11: WEDDING WISH / KOLOM UCAPAN & DOA]
    // ===================================================
    const wishForm = document.getElementById("wish-form");
    const commentsContainer = document.getElementById("comments-container");
    const commentCountText = document.getElementById("comment-count");
    let count = 0;

    wishForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nameInput = document.getElementById("wish-name").value;
        const textInput = document.getElementById("wish-text").value;

        const commentDiv = document.createElement("div");
        commentDiv.className = "comment-item font-auliare";
        commentDiv.innerHTML = `<strong>${nameInput}</strong><br><span style="font-size:13px; opacity:0.8;">${textInput}</span>`;

        commentsContainer.prepend(commentDiv);
        count++;
        commentCountText.innerText = `(${count} Ucapan)`;
        wishForm.reset();
    });
});
