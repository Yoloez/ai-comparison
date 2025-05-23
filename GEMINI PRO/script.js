document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-links a");
  const currentYearSpan = document.getElementById("currentYear");
  const header = document.querySelector("header");
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 70; // Default jika navbar tidak ditemukan

  // Mobile menu toggle
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active"); // Untuk animasi ikon burger
    });

    // Tutup menu saat link di klik (untuk navigasi satu halaman)
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuToggle.classList.remove("active");
        }
      });
    });
  }

  // Set tahun sekarang di footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Ubah background navbar saat scroll
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.97)";
        navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
      } else {
        navbar.style.backgroundColor = "#ffffff";
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
      }
    });
  }

  // Fungsi untuk menandai link navigasi yang aktif saat scroll
  function setActiveLinkOnScroll() {
    let currentSectionId = "";
    const sections = document.querySelectorAll("main section"); // Ambil semua section di main

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // Cek apakah section saat ini ada dalam viewport
      if (pageYOffset >= sectionTop - navbarHeight - 20) {
        // Tambahkan sedikit offset
        currentSectionId = section.getAttribute("id");
      }
    });

    // Hapus kelas 'active' dari semua link navigasi
    navLinkItems.forEach((link) => {
      link.classList.remove("active");
      // Tambahkan kelas 'active' ke link yang href-nya cocok dengan ID section saat ini
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    // Kasus khusus untuk bagian hero, jika tidak ada section lain yang aktif dan berada di paling atas
    if (!currentSectionId && window.pageYOffset < sections[0].offsetTop - navbarHeight - 20) {
      const homeLink = document.querySelector('.nav-links a[href="#hero"]');
      if (homeLink) homeLink.classList.add("active");
    } else if (currentSectionId === "hero") {
      // Pastikan "Beranda" aktif saat di hero section
      const homeLink = document.querySelector('.nav-links a[href="#hero"]');
      if (homeLink) homeLink.classList.add("active");
    }
  }

  // Panggil fungsi saat scroll dan saat halaman dimuat
  window.addEventListener("scroll", setActiveLinkOnScroll);
  window.addEventListener("load", setActiveLinkOnScroll);

  console.log("Landing page Kafetaria Modern siap!");
});
