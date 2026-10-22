/*
 * KANDUNGAN LAMAN — Madrasah Tahfiz An Nur Gedong
 * ------------------------------------------------
 * Ini satu-satunya fail yang perlu disunting untuk mengubah teks, berita, foto dan hubungan.
 *
 * Setiap fakta menyimpan:
 *   nilai      : teks yang dipaparkan
 *   status     : "rasmi" | "facebook" | "media" | "sekunder" | "perlu-sahkan" | "editorial"
 *   sumber     : senarai kunci daripada SUMBER di bawah
 *   catatan    : nota semakan (dipaparkan dalam mod draf sahaja)
 *   diluluskan : true apabila pengurusan sudah mengesahkan — fakta "perlu-sahkan",
 *                "sekunder" dan "editorial" hanya muncul di laman awam jika diluluskan: true
 *
 * Mod laman (tetapan.mod):
 *   "draf" — label status, bahagian belum lengkap dan halaman Semakan dipaparkan
 *   "awam" — hanya kandungan yang boleh diterbitkan; tiada label atau suis draf
 */

window.KANDUNGAN = {
  tetapan: {
    mod: "awam",
    // true  → laman awam memaparkan kandungan yang sama seperti draf (termasuk foto dan item
    //         belum disahkan), cuma tanpa label, nota dan bahagian semakan dalaman.
    // false → laman awam hanya memaparkan item berstatus rasmi/facebook/media atau diluluskan: true.
    awamIkutDraf: true,
    tarikhSemakanPenyelidikan: "22 Oktober 2026",
    logo: "assets/img/logo/logo-asal-lutsinar.png",
    // Logo asal pengguna (latar putih dibuang). Versi kemas AI ada di assets/img/logo/ tetapi
    // khat dan ejaannya belum disemak — jangan tukar ke versi itu sebelum diluluskan.
    logoCatatan: "Logo asal pengguna. Versi kemas AI belum diluluskan sebagai aset rasmi."
  },

  /* ------------------------------------------------------------------ */
  /* SUMBER — setiap fakta merujuk kunci di sini                         */
  /* ------------------------------------------------------------------ */
  sumber: {
    facebook: { nama: "Facebook Madrasah Tahfiz An-Nur", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/" },
    jais: { nama: "Senarai IPIP JAIS Sarawak", jenis: "rasmi", url: "https://jais.sarawak.gov.my/web/subpage/webpage_view/169" },
    jaisLampiran: { nama: "Lampiran senarai JAIS", jenis: "rasmi", url: "https://jais.sarawak.gov.my/web/attachment/show/?docid=aGliOVpGTGRHeVp2QjFyL1hJQnQ2Zz09OjqDup9KBWVZ0xNP7_xyZJC8" },
    kiswaSenarai: { nama: "Senarai IPIP KISWA", jenis: "rasmi", url: "https://kiswa.sarawak.gov.my/kiswa/pddk/ipip/list_ajax/?order_by=&page=3&search_district=&search_division=&search_mukim=&search_txt=&sort=" },
    kiswaProfil: { nama: "Profil institusi KISWA", jenis: "rasmi", url: "https://kiswa.sarawak.gov.my/kiswa/pddk/ipip/p_view/V2VJSzVRUnFvdWhRWDJ3M1R3Slpmdz09Ojr08e2NEEillXm0Q0sz37EV" },
    eduagama: { nama: "Direktori EduAgama", jenis: "sekunder", url: "https://eduagama.my/sekolah/madrasah-tahfiz-an-nur-gedong-samarahan/" },
    fbBomba: { nama: "Catatan Facebook — pemeriksaan bomba", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/posts/pfbid02XtnyqF7J1gPsVQbNsmsfBXHg1KYzMWya4tBWa6knWAn5RRfaayxxn1LwH6KL9WLzl" },
    fbHafazan: { nama: "Catatan Facebook — hafazan 10 juzuk", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/posts/pfbid0bvqBDYmP6nvGebMpmffA6U6ChFR9i1QF9h3nst7qJ7DofjYck9iPikn5dAL9QBc7l" },
    fbBacaan: { nama: "Catatan Facebook — bacaan Al-Kahfi", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/posts/pfbid0KvSFzfmH2f7xdK3Frg7pEhsbG5qKVFQkHnx9yvnoUZ1Uuv3qWbvE8i8gSWNk5gAdl" },
    fbMaulid: { nama: "Catatan Facebook — majlis maulid", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/posts/pfbid0CgXLYeSwHmP2UtSKTWuZ7gPL5hMktBfgwP2AYXdhfhDWv23Q1PxPboL5nrt7rtKml" },
    fbZiarah: { nama: "Catatan Facebook — ziarah mahabbah", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/posts/pfbid0fJ6hfvER2G7mpuFR4kVdFHhbN8kbU5zaKyvY3PPJCquuVFNCZJwTivRdLregwQiEl" },
    fbAdab: { nama: "Catatan Facebook — adab memasuki kawasan", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/posts/pfbid02Rt5u6tbotXZz8xpXSkodJcnopnnA4FJQiibVkhd75y145W6Vk9eW2veaDJyxbgKHl" },
    tbs: { nama: "Tabung Baitulmal Sarawak", jenis: "media", url: "https://www.tbs.org.my/www/?news=4178" },
    dayakdaily: { nama: "DayakDaily", jenis: "media", url: "https://dayakdaily.com/premier-sungkei-with-gedong-constituents-on-day-3-of-ramadan/" },
    utusan2023: { nama: "Utusan Borneo", jenis: "media", url: "https://www.utusanborneo.com.my/2023/03/26/abang-johari-luang-masa-berbuka-puasa-bersama-penduduk-dun-gedong" },
    tribune: { nama: "Sarawak Tribune", jenis: "media", url: "https://www.sarawaktribune.com/abang-johari-distributes-sacrificial-cows-in-gedong/" },
    utusan2024: { nama: "Utusan Borneo", jenis: "media", url: "https://www.utusanborneo.com.my/2024/11/24/anak-anak-sarawak-termasuk-di-gedong-perlu-menilai-kepimpinan-premier" },
    ukas: { nama: "UKAS Sarawak", jenis: "media", url: "https://ukas.sarawak.gov.my/web/subpage/news_view/18005" },
    jiwabakti: { nama: "Jiwa Bakti", jenis: "media", url: "https://jiwabakti.com.my/sedia-hadapi-perubahan-pembangunan/" },
    darulUloom: { nama: "Profil KISWA — Darul Uloom Tahfizul Quran Gedong", jenis: "rasmi", url: "https://kiswa.sarawak.gov.my/kiswa/pddk/ipip/p_view/YS9vTlVyUWFDVEZrL3B1NFRnM1hXdz09OjpJnHAvS35x-n9pisKt7eJa" },
    fotoMaulid: { nama: "Foto Facebook — majlis maulid", jenis: "facebook", url: "https://www.facebook.com/photo/?fbid=1662965372007934&set=pcb.1662965748674563" },
    fotoBomba: { nama: "Foto Facebook — lawatan bomba", jenis: "facebook", url: "https://www.facebook.com/photo/?fbid=1668458931458578&set=pcb.1668459351458536" },
    fotoRuang: { nama: "Foto Facebook — pemeriksaan ruang", jenis: "facebook", url: "https://www.facebook.com/photo/?fbid=1668459081458563&set=pcb.1668459351458536" },
    fotoBangunan: { nama: "Foto Facebook — bangunan madrasah", jenis: "facebook", url: "https://www.facebook.com/photo/?fbid=1246462213658254" },
    posterWakaf: { nama: "Poster projek wakaf (Facebook, 30 Nov 2023)", jenis: "facebook", url: "https://www.facebook.com/photo/?fbid=902934651344347&set=a.104212634549890" },
    infaqpay: { nama: "Halaman InfaqPay (Direct Debit)", jenis: "sekunder", url: "https://infaqpay.my/go/madrasahtahfizannurgedong" },
    googleMaps: { nama: "Penyenaraian Google Maps", jenis: "sekunder", url: "https://www.google.com/maps/place/MADRASAH+TAHFIZ+ANNUR+GEDONG/data=!4m2!3m1!1s0x0:0x63a4f3310ab89875" },
    fbReels: { nama: "Galeri Reels Facebook madrasah", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/reels_tab" },
    fbVideoJemput: { nama: "Video Facebook — Jemput Hadir Semua", jenis: "facebook", url: "https://www.facebook.com/asia.zalnirah/videos/jemput-hadir-semua/1303089271949572/" },
    fbReelZiarah: { nama: "Reel — Ziarah ke Ma’ahad Darul Falah", jenis: "facebook", url: "https://www.facebook.com/reel/4100472510095613/" },
    posterMaulid2026: { nama: "Poster Maulidur Rasul 2026 madrasah (diberikan pengguna)", jenis: "facebook", url: "" },
    laporan: { nama: "Laporan penyelidikan dalaman (22 Okt 2026)", jenis: "editorial", url: "" }
  },

  /* ------------------------------------------------------------------ */
  /* IDENTITI                                                            */
  /* ------------------------------------------------------------------ */
  identiti: {
    nama: {
      nilai: "Madrasah Tahfiz An Nur Gedong",
      status: "perlu-sahkan",
      sumber: ["kiswaProfil", "jais"],
      wajib: true,
      catatan: "Ejaan berbeza antara logo (Annur), Facebook (An-Nur) dan rekod institusi (An Nur). Pengurusan perlu memilih ejaan jenama akhir."
    },
    namaPendek: "An Nur",
    namaArab: "مدرسة تحفيظ النور",
    lokasiUmum: { nilai: "Gedong, Sarawak", status: "rasmi", sumber: ["jais", "kiswaProfil"] },
    pengenalan: {
      nilai: "Madrasah Tahfiz An Nur Gedong ialah sebuah institusi pengajian tahfiz di Gedong, Sarawak. Laman ini menghimpunkan maklumat pengajian, aktiviti dan perkembangan madrasah untuk rujukan ibu bapa serta masyarakat.",
      status: "editorial",
      sumber: ["laporan"],
      catatan: "Ringkasan editorial berdasarkan rekod JAIS dan aktiviti Facebook — bukan petikan rasmi. Perlu kelulusan pengurusan."
    }
  },

  /* ------------------------------------------------------------------ */
  /* PROFIL INSTITUSI (Tentang Kami)                                     */
  /* ------------------------------------------------------------------ */
  profil: [
    { label: "Jenis institusi", nilai: "Tahfiz swasta", status: "rasmi", sumber: ["jais"] },
    { label: "Peringkat dalam rekod", nilai: "Rendah, menengah dan lepasan SPM", status: "rasmi", sumber: ["kiswaSenarai"],
      catatan: "JAIS menyenaraikan rendah dan menengah; KISWA menambah lepasan SPM. “Lepasan SPM” ialah peringkat pelajar, bukan penawaran peperiksaan SPM." },
    { label: "No. rekod KISWA", nilai: "MIS-IPIP-49", status: "rasmi", sumber: ["kiswaSenarai"] },
    { label: "Status dalam KISWA", nilai: "Sementara", status: "rasmi", sumber: ["kiswaSenarai"],
      catatan: "Jangan tulis sebagai pendaftaran kekal atau diiktiraf sepenuhnya. Semak surat kelulusan semasa." },
    { label: "Bahagian", nilai: "Samarahan", status: "rasmi", sumber: ["jais", "kiswaProfil"] },
    { label: "Daerah / mukim", nilai: "Simunjan / Gedong", status: "rasmi", sumber: ["kiswaProfil"] },
    { label: "Bahasa pengantar", nilai: "Bahasa Melayu", status: "rasmi", sumber: ["kiswaProfil"] },
    { label: "Tarikh penubuhan", nilai: "1 Januari 2015", status: "sekunder", sumber: ["eduagama"],
      catatan: "Daripada direktori sekunder yang mendakwa data SIMPENI/JAKIM; rekod asal belum disemak." },
    { label: "Kemasukan", nilai: "Lelaki dan perempuan", status: "sekunder", sumber: ["eduagama"],
      catatan: "Profil fasiliti KISWA hanya merekodkan asrama lelaki. Pengurusan perlu menjelaskan." },
    { label: "Sesi", nilai: "Pagi hingga petang", status: "sekunder", sumber: ["eduagama"] }
  ],

  sejarah: {
    nilai: "",
    status: "perlu-sahkan",
    catatan: "Pengasas, sejarah, tarikh mula operasi dan visi/misi yang diluluskan belum diperoleh. Bahagian ini disembunyikan di laman awam sehingga diisi."
  },

  pengurusan: {
    senarai: [
      { nama: "Dato’ Hj Ismaili Bin Hj Bujang Pit", jawatan: "Pengerusi", foto: "assets/img/foto/pengerusi-dato-ismaili.webp", status: "facebook", sumber: ["posterMaulid2026", "jiwabakti"], diluluskan: true,
        catatan: "Nama penuh dan jawatan disahkan melalui poster Maulidur Rasul 2026 madrasah yang diberikan pengguna (22 Okt 2026). Potret dipotong daripada poster itu dan dikemas dengan alat AI (Astra) atas permintaan pengguna — gantikan dengan foto asal jika ada." }
    ],
    catatan: "Nama dalam rekod tauliah KISWA (Asaad Arifin Taufikuridwan, Mohammad Sazali) dan nama dalam ruangan mudir JAIS tidak dimasukkan — tiada bukti jawatan semasa. Jangan bina carta organisasi berdasarkan nama sahaja."
  },

  /* ------------------------------------------------------------------ */
  /* PENGAJIAN                                                           */
  /* ------------------------------------------------------------------ */
  pengajian: {
    ringkasan: {
      nilai: "Pengajian berteraskan hafazan al-Quran, disokong pengajian agama dan asas membaca, menulis serta mengira.",
      status: "editorial", sumber: ["kiswaProfil"],
      catatan: "Ayat ringkasan editorial yang dirumus daripada profil KISWA."
    },
    teras: [
      { id: "hafazan", tajuk: "Hafazan Al-Quran", ikon: "quran",
        teks: "Pentaksiran dalaman merangkumi ujian al-Quran dan hafazan.",
        status: "rasmi", sumber: ["kiswaProfil"],
        tambahan: "Jadual harian, sasaran hafazan dan kaedah tasmi’/murajaah belum diperoleh." },
      { id: "agama", tajuk: "Pengajian Agama", ikon: "kitab",
        teks: "Tasawuf, feqah, sirah, hadith dan tauhid, serta pentaksiran dalaman fardu ain.",
        senarai: ["Tasawuf", "Feqah", "Sirah", "Hadith", "Tauhid"],
        status: "rasmi", sumber: ["kiswaProfil"] },
      { id: "asas", tajuk: "Asas 3M", ikon: "pensel",
        teks: "Asas membaca, menulis dan mengira dalam bahasa pengantar Melayu.",
        status: "rasmi", sumber: ["kiswaProfil"],
        catatan: "Bukan bukti penawaran SPM, KSSM atau sijil kebangsaan." },
      { id: "kokurikulum", tajuk: "Kokurikulum", ikon: "bintang",
        teks: "Qasidah dan futsal. Kumpulan qasidah madrasah, Sautun Nur, pernah membuat persembahan dalam majlis tilawah peringkat Bahagian Samarahan.",
        status: "rasmi", sumber: ["kiswaProfil", "ukas"] }
    ],
    peringkat: [
      { nama: "Rendah", teks: "Disenaraikan dalam rekod JAIS dan KISWA.", status: "rasmi", sumber: ["jais", "kiswaSenarai"] },
      { nama: "Menengah", teks: "Disenaraikan dalam rekod JAIS dan KISWA.", status: "rasmi", sumber: ["jais", "kiswaSenarai"] },
      { nama: "Lepasan SPM", teks: "Disenaraikan dalam rekod KISWA. Ini peringkat pelajar, bukan penawaran peperiksaan SPM.", status: "rasmi", sumber: ["kiswaSenarai"] }
    ],
    peringkatCatatan: "Peringkat di atas ialah rekod portal. Penawaran semasa, umur, tempoh dan pilihan pengajian perlu disahkan pengurusan.",
    belumAda: ["Jadual harian", "Sasaran hafazan", "Kaedah tasmi’ dan murajaah", "Silibus", "Peperiksaan luar (jika ada)", "Pilihan pengajian dan tempoh"]
  },

  kemudahan: {
    senarai: ["Bilik kelas (2)", "Surau", "Tempat wuduk", "Perpustakaan", "Dewan makan / kantin", "Bilik mesyuarat", "Pejabat", "Stor", "Asrama lelaki", "Tandas lelaki & perempuan"],
    status: "rasmi", sumber: ["kiswaProfil"],
    catatan: "Ruangan asrama perempuan dalam profil KISWA kosong — kekosongan bukan bukti kemudahan itu tiada. Kapasiti asrama, penyelia dan makan minum belum diperoleh."
  },

  /* ------------------------------------------------------------------ */
  /* AKTIVITI (Facebook) — tahun 2026 disahkan pengurusan */
  /* ------------------------------------------------------------------ */
  aktiviti: [
    { id: "pemeriksaan-bomba", tarikh: "14 Okt", tahun: "2026", tahunDisahkan: true,
      tajuk: "Pemeriksaan keselamatan oleh Bomba",
      ringkasan: "Madrasah mengumumkan selesainya pemeriksaan keselamatan dan bangunan oleh Balai Bomba Siburan / Bomba Zon 2 Samarahan.",
      had: "Tidak membuktikan kelulusan atau sijil keselamatan dikeluarkan.",
      foto: "foto-bomba", status: "facebook", sumber: ["fbBomba"] },
    { id: "hafazan-10-juzuk", tarikh: "11 Okt", tahun: "2026", tahunDisahkan: true,
      tajuk: "Tahniah: tamat hafazan 10 juzuk",
      ringkasan: "Seorang pelajar kelas sepenuh masa menamatkan hafazan 10 juzuk.",
      had: "Pencapaian individu; bukan statistik keseluruhan. Nama pelajar sengaja tidak dipaparkan.",
      foto: null, status: "facebook", sumber: ["fbHafazan"] },
    { id: "bacaan-al-kahfi", tarikh: "9 Okt", tahun: "2026", tahunDisahkan: true,
      tajuk: "Bacaan Al-Kahfi & Dalailul Khairat",
      ringkasan: "Bacaan Surah Al-Kahfi dan Selawat Dalailul Khairat di surau madrasah.",
      had: "Bukan jadual tetap yang disahkan.",
      foto: null, status: "facebook", sumber: ["fbBacaan"] },
    { id: "majlis-maulid", tarikh: "8 Okt", tahun: "2026", tahunDisahkan: true,
      tajuk: "Suasana majlis maulid",
      ringkasan: "Perkongsian suasana majlis maulid bersama pelajar di surau madrasah.",
      foto: "foto-maulid", status: "facebook", sumber: ["fbMaulid"] },
    { id: "ziarah-mahabbah", tarikh: "5 Okt", tahun: "2026", tahunDisahkan: true,
      tajuk: "Ziarah mahabbah ke Ma’ahad Darul Falah",
      ringkasan: "Perkongsian semula ziarah mahabbah selepas Ijtima’ Sarawak.",
      had: "Kandungan asal daripada institusi tuan rumah; bukan pengumuman kerjasama rasmi.",
      foto: null, status: "facebook", sumber: ["fbZiarah"] },
    { id: "adab-kawasan", tarikh: "5 Okt", tahun: "2026", tahunDisahkan: true,
      tajuk: "Panduan adab memasuki kawasan madrasah",
      ringkasan: "Madrasah berkongsi panduan adab memasuki kawasan madrasah. Rujuk catatan asal untuk isi penuh.",
      had: "Isi penuh belum dibaca — peraturan tidak disalin ke laman ini.",
      foto: null, status: "facebook", sumber: ["fbAdab"] }
  ],

  /* ------------------------------------------------------------------ */
  /* LIPUTAN MEDIA — ringkasan sahaja; pautan asal dikekalkan            */
  /* ------------------------------------------------------------------ */
  liputan: [
    { tarikh: "25 Apr 2022", penerbit: "Tabung Baitulmal Sarawak", sumber: ["tbs"], status: "media",
      ringkasan: "Penyerahan bantuan kewangan kepada pelajar Tahfiz & Madrasah An-Nur di Masjid Al-Khawthar, Gedong, dalam Program Kasih Ramadan." },
    { tarikh: "25 Mac 2023", penerbit: "DayakDaily · Utusan Borneo", sumber: ["dayakdaily", "utusan2023"], status: "media",
      ringkasan: "Pelajar Tahfiz An-Nur Gedong hadir dalam majlis berbuka puasa di Masjid Al-Kawthar.",
      catatan: "20 pelajar ialah kehadiran acara, bukan jumlah enrolmen." },
    { tarikh: "18 Jun 2024", penerbit: "Sarawak Tribune", sumber: ["tribune"], status: "media",
      ringkasan: "Madrasah disenaraikan menerima seekor lembu dalam agihan korban di Gedong." },
    { tarikh: "24 Nov 2024", penerbit: "Utusan Borneo", sumber: ["utusan2024"], status: "media",
      ringkasan: "Madrasah disenaraikan antara lima institusi/NGO penerima sumbangan dalam Majlis Tautan Kasih GPK di Bintulu. Foto berita memaparkan cek RM2,000 bertarikh 23 November 2024.",
      catatan: "Rekod acara lalu — bukan bukti dana semasa atau tajaan berterusan. Foto milik Utusan Borneo; perlu izin sebelum disalin." },
    { tarikh: "16 Mei 2025", penerbit: "UKAS", sumber: ["ukas"], status: "media",
      ringkasan: "Kumpulan qasidah Sautun Nur membuat persembahan dalam majlis tilawah peringkat Bahagian Samarahan.",
      catatan: "Persembahan, bukan kemenangan pertandingan." }
  ],
  liputanCatatan: "Bantuan pada masa lalu tidak membuktikan penajaan tetap, hubungan rasmi semasa atau pengendorsan politik.",

  /* ------------------------------------------------------------------ */
  /* FOTO                                                                */
  /* ------------------------------------------------------------------ */
  foto: {
    // Latar hero beranda — dari album Facebook madrasah, belum disahkan pengurusan secara khusus.
    "foto-bangunan": {
      fail: "assets/img/foto/foto-bangunan-madrasah.jpg",
      alt: "Bangunan dua tingkat madrasah berwarna putih dengan balkoni berpanel kerawang bintang lapan, dilihat dari bawah dengan langit biru.",
      kapsyen: "Bangunan Madrasah Tahfiz An-Nur Gedong.",
      status: "facebook", sumber: ["fotoBangunan"],
      catatan: "Dimuat turun daripada album Facebook madrasah; minta kebenaran pengurusan sebelum laman diterbitkan."
    },
    // Foto disahkan pengurusan untuk penerbitan.
    "foto-maulid": {
      fail: "assets/img/foto/foto-majlis-maulid.jpg",
      alt: "Peserta berkopiah dan berserban putih duduk mengikuti majlis di ruang surau madrasah, dengan rak buku dan ruang hadapan berwarna hijau kuning.",
      kapsyen: "Suasana majlis maulid yang dikongsikan oleh Madrasah Tahfiz An-Nur Gedong, 8 Oktober 2026.",
      sumber: ["fotoMaulid"], diluluskan: true,
      catatan: "Jangan namakan individu."
    },
    "foto-bomba": {
      fail: "assets/img/foto/foto-lawatan-bomba.jpg",
      alt: "Lima orang bergambar bersama di pintu masuk bangunan madrasah, termasuk pegawai bomba beruniform.",
      kapsyen: "Lawatan pemeriksaan keselamatan dan bangunan oleh pihak bomba, 14 Oktober 2026.",
      sumber: ["fotoBomba"], diluluskan: true,
      catatan: "Bukan bukti sijil atau kelulusan keselamatan."
    },
    "foto-surau": {
      fail: "assets/img/foto/foto-pemeriksaan-ruang-surau.jpg",
      alt: "Pegawai bomba memeriksa peralatan di siling sebuah ruang berkarpet dengan tiang hijau muda.",
      kapsyen: "Pemeriksaan ruang berkarpet di madrasah oleh pihak bomba, 14 Oktober 2026.",
      sumber: ["fotoRuang"], diluluskan: true,
      catatan: "Jangan dakwa kapasiti atau status pensijilan berdasarkan foto."
    }
  },
  galeri: ["foto-maulid", "foto-bomba", "foto-surau"],
  // Ruang foto yang perlu diminta daripada pengurusan — dipaparkan dalam mod draf sahaja
  galeriDiperlukan: ["Hadapan kampus (landskap)", "Kelas hafazan", "Asrama (tanpa barang peribadi)", "Dewan makan", "Guru / pengurusan", "Qasidah Sautun Nur", "Kegiatan pelajar"],

  // Tiada saluran YouTube rasmi ditemui — jangan semat video institusi lain yang berkongsi nama An Nur.
  video: [
    { tajuk: "Galeri Reels madrasah", sumber: ["fbReels"], status: "facebook", diluluskan: true,
      teks: "Video aktiviti yang dikongsikan di Facebook madrasah." },
    { tajuk: "Jemput Hadir Semua (16 saat, 25 Mei 2026)", sumber: ["fbVideoJemput"], status: "perlu-sahkan",
      teks: "Tajuk dan akaun disahkan; kandungan penuh belum ditonton (halangan log masuk)." },
    { tajuk: "Ziarah ke Ma’ahad Darul Falah", sumber: ["fbReelZiarah"], status: "perlu-sahkan",
      teks: "Asal daripada akaun Ma’ahad Darul Falah; semak video penuh dan izin tuan punya sebelum menyemat." }
  ],

  /* ------------------------------------------------------------------ */
  /* HUBUNGI — rekod bercanggah; jangan pilih satu secara senyap        */
  /* ------------------------------------------------------------------ */
  hubungi: {
    facebook: { nilai: "https://www.facebook.com/asia.zalnirah/", label: "Madrasah Tahfiz An-Nur", status: "facebook", sumber: ["facebook"], diluluskan: true },
    whatsapp: { nilai: "", aktif: false, catatan: "Aktifkan selepas nombor diluluskan dan penggunaan WhatsApp disahkan." },
    // Pin daripada penyenaraian Google Maps (disemak 22 Okt 2026; foto penyenaraian menunjukkan papan tanda madrasah)
    petaPin: {
      lat: 1.2400449, lng: 110.6916969, kodPlus: "6MRR+2M Simunjan, Sarawak",
      pautan: "https://www.google.com/maps/place/MADRASAH+TAHFIZ+ANNUR+GEDONG/@1.2400449,110.6916969,17z/data=!4m6!3m5!1s0x31fb8d0025c92c63:0x63a4f3310ab89875!8m2!3d1.2400449!4d110.6916969",
      sumber: ["googleMaps"], diluluskan: true,
      catatan: "Pin dipilih pengguna daripada Google Maps. Poskod Google Maps (94700) berbeza daripada KISWA/JAIS (94800)."
    },
    rekod: [
      { sumberNama: "Profil KISWA", sumber: ["kiswaProfil"],
        alamat: "Lot 844, Blok 20, Kampung Tengah Gedong, Jalan Gedong, 94800, Sarawak",
        telefon: "019-818 0210", emel: "komplektahfizannur@gmail.com" },
      { sumberNama: "Senarai JAIS", sumber: ["jais", "jaisLampiran"],
        alamat: "Lot 391 Blok 20 Sedilu Gedong Simunjan, 94800 Simunjan",
        telefon: "013-806 6879", emel: "" },
      { sumberNama: "Halaman InfaqPay", sumber: ["infaqpay"],
        alamat: "Lot 391, Blok 20, Sedilu Gedong, 94800 Simunjan",
        telefon: "013-808 1148", emel: "komplektahfizannur@gmail.com" },
      { sumberNama: "Google Maps", sumber: ["googleMaps"],
        alamat: "94700 Simunjan, Sarawak (poskod berbeza)", telefon: "013-950 2025", emel: "",
        catatan: "Belum pasti diselenggara pengurusan. “Open 24 hours” bukan waktu pejabat; pin bukan lokasi lawatan yang disahkan." },
      { sumberNama: "Poster wakaf 2023 (rujukan dalaman)", sumber: ["posterWakaf"],
        alamat: "Lot 844 Blok 20 Sedilu Gedong Land District (tapak projek)", telefon: "Tiga nombor individu — lihat poster", emel: "",
        catatan: "Nombor 013-808 1148 dan 019-818 0210 pada poster sepadan dengan InfaqPay dan KISWA." },
      { sumberNama: "Direktori EduAgama (sekunder)", sumber: ["eduagama"],
        alamat: "", telefon: "", emel: "madrasahtahfizannurgedong@gmail.com" }
    ],
    rekodCatatan: "Rekod rasmi dan sumber lain memaparkan alamat (Lot 844 / Lot 391), poskod (94800 / 94700) dan telefon berbeza. Belum ada bukti yang menentukan alamat lawatan dan nombor urusan terkini — semua medan ini ditahan daripada laman awam sehingga disahkan.",
    // Lokasi mengikut Google Maps. Telefon dan e-mel masih ditahan (rekod bercanggah).
    alamatDisahkan: { alamat: "Gedong, 94700 Simunjan, Sarawak", sumber: ["googleMaps"] },
  },

  /* ------------------------------------------------------------------ */
  /* KEMASUKAN & SUMBANGAN — draf sehingga butiran diluluskan            */
  /* ------------------------------------------------------------------ */
  kemasukan: {
    pengambilanDibuka: false,
    pengumuman: "",
    perluDisahkan: ["Pengambilan yang benar-benar dibuka", "Umur dan jantina", "Pelajar harian atau asrama", "Syarat dan temu duga", "Dokumen diperlukan", "Tarikh dan kapasiti", "Yuran dan kaedah bayaran"],
    borangAktif: false
  },
  sumbangan: {
    aktif: false,
    perluDisahkan: ["Nama pemegang akaun", "Bank dan nombor akaun / QR yang disahkan", "Tujuan tabung", "Pegawai rujukan", "Kaedah resit", "Status sebarang dakwaan pelepasan cukai"],
    catatan: "Poster wakaf 2023 dalam folder rujukan memaparkan akaun bank, nombor telefon dan dakwaan pelepasan cukai. Butiran itu tidak dimasukkan ke laman ini.",
    saluranDitemui: [
      { nama: "InfaqPay — pendaftaran Direct Debit", sumber: ["infaqpay"], status: "perlu-sahkan",
        teks: "Halaman atas nama Madrasah Tahfiz An-Nur Gedong dengan pilihan tujuan sumbangan. Ini borang Direct Debit (potongan berkala), bukan derma sekali bayar. Status aktif dan kebenaran menggunakannya di laman ini perlu diluluskan pengurusan." }
    ],
    projek: {
      tajuk: "Projek wakaf kompleks madrasah (poster 2023)",
      teks: "Poster bertarikh 30 November 2023 menyebut projek wakaf kompleks di Lot 844 Blok 20 Sedilu Gedong dengan anggaran kos RM2.7 juta. Gambar bangunan pada poster ialah render cadangan, bukan bangunan siap.",
      status: "perlu-sahkan", sumber: ["posterWakaf"],
      catatan: "Rujukan sejarah sahaja. Sahkan status projek dan kos semasa; dapatkan render asal tanpa nombor akaun lama jika mahu dipaparkan."
    }
  },

  /* ------------------------------------------------------------------ */
  /* SEMAKAN — andaian reka bentuk dan bahan yang sengaja tidak digunakan */
  /* ------------------------------------------------------------------ */
  andaian: [
    "Inspirasi susun atur daripada ISKL: hero penuh dengan bingkai kuning, jalur ticker, panel bertab berwarna, kad peringkat, grid “sepintas lalu” dan footer berkad.",
    "Hero turut mengambil siluet masjid dan lengkung bawah daripada rujukan herosection.png.",
    "Foto majlis maulid menjadi latar hero dalam draf (calon terbaik menurut carian kedua). Gantikan dengan foto hadapan kampus format landskap apabila ada. Dalam mod awam, hero beralih ke latar corak sehingga izin foto disahkan.",
    "Warna diambil daripada logo: hijau (bangunan), kuning (bintang lapan) dan biru (jaringan geometri).",
    "Corak bintang lapan bucu daripada logo digunakan sebagai motif hiasan — bukan imej janaan yang menyerupai bangunan atau pelajar sebenar.",
    "Nama paparan menggunakan ejaan rekod institusi “An Nur” sementara menunggu keputusan pengurusan.",
    "Lokasi dan pin peta mengikut penyenaraian Google Maps (dipilih pengguna, 22 Okt 2026). Telefon, e-mel dan WhatsApp masih ditahan.",
    "Tahun 2026 bagi catatan Facebook telah disahkan pengurusan.",
    "Laman statik (HTML, CSS, JavaScript) tanpa langkah binaan — boleh dibuka terus dari folder atau dihos di mana-mana pelayan statik."
  ],
  tidakDigunakan: [
    { bahan: "aktiviti-bacaan-surau-status-ai-perlu-semak.jpg", sebab: "Ditanda mungkin kandungan AI dalam Facebook; tidak digunakan sebagai dokumentasi fotografi." },
    { bahan: "poster-wakaf-kompleks-facebook-2023.jpg", sebab: "Mengandungi akaun bank, telefon dan dakwaan pelepasan cukai daripada kempen 2023. Render bangunan bukan bukti kampus siap." },
    { bahan: "Video YouTube bernama “An-Nur” / “Sautun Nur”", sebab: "Hasil carian merujuk institusi di Puchong dan Indonesia — tiada saluran rasmi Gedong ditemui." },
    { bahan: "Pautan InfaqPay sebagai butang derma", sebab: "Borang Direct Debit; status dan kebenaran penggunaan belum diluluskan." },
    { bahan: "sumbangan-gpk-utusan-borneo-2024.jpg", sebab: "Foto milik Utusan Borneo — perlu izin untuk disalin. Laporan dipautkan sebagai liputan luar." },
    { bahan: "logo-kemas-ai-untuk-semak.png", sebab: "Hasil janaan AI; khat dan ejaan belum disemak terhadap logo asal." },
    { bahan: "Data Madrasah Darul Uloom Tahfizul Quran Gedong (MIS-IPIP-14)", sebab: "Institusi berasingan — tidak dicampur." },
    { bahan: "Telefon 107784554 (blog senarai 2021)", sebab: "Format tidak lengkap." }
  ]
};
