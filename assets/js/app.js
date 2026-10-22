/*
 * Enjin paparan laman — membaca window.KANDUNGAN (kandungan/kandungan.js)
 * dan membina kepala, kaki serta isi setiap halaman.
 * Tidak perlu disunting untuk mengubah teks; sunting kandungan.js.
 */
(function () {
  "use strict";

  const K = window.KANDUNGAN;
  const S = K.sumber;
  const halaman = document.body.dataset.halaman;

  /* ---------------- Mod draf / awam ---------------- */
  const KUNCI_PRATONTON = "annur-pratonton";
  function bacaPratonton() {
    const p = new URLSearchParams(location.search).get("pratonton");
    try {
      if (p === "awam") localStorage.setItem(KUNCI_PRATONTON, "awam");
      if (p === "draf") localStorage.removeItem(KUNCI_PRATONTON);
      return localStorage.getItem(KUNCI_PRATONTON) === "awam";
    } catch (e) {
      return p === "awam";
    }
  }
  const modAsal = K.tetapan.mod;
  const pratontonAwam = modAsal === "draf" && bacaPratonton();
  const draf = modAsal === "draf" && !pratontonAwam;
  if (!draf) document.body.classList.add("mod-awam");
  if (modAsal === "draf") document.body.classList.add("ada-bar-draf");

  const STATUS_TERBIT = ["rasmi", "facebook", "media"];
  // Boleh dipaparkan dalam mod semasa?
  function boleh(f) {
    if (!f) return false;
    if (draf || K.tetapan.awamIkutDraf) return true;
    if (f.wajib || f.diluluskan === true) return true;
    if (f.diluluskan === false) return false;
    return STATUS_TERBIT.includes(f.status);
  }

  const LABEL = {
    rasmi: "Rekod rasmi",
    facebook: "Catatan madrasah",
    media: "Laporan media",
    sekunder: "Sumber sekunder",
    "perlu-sahkan": "Perlu disahkan",
    editorial: "Cadangan editorial"
  };

  /* ---------------- Utiliti ---------------- */
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function sumberPertama(f) {
    return (f && f.sumber || []).map((k) => S[k]).filter(Boolean);
  }
  function lencana(f, status) {
    if (!draf || !f) return "";
    const st = status || f.status;
    // Label "Perlu disahkan" hanya dipaparkan dalam senarai semakan, bukan pada mockup
    if (st === "perlu-sahkan" && halaman !== "semakan") return "";
    const s = sumberPertama(f);
    const out = [];
    if (st) {
      const utama = s.find((x) => x.url);
      const tajuk = s.length ? "Sumber: " + s.map((x) => x.nama).join("; ") : "";
      out.push(utama
        ? `<a class="lencana lencana--${st}" href="${esc(utama.url)}" target="_blank" rel="noopener" title="${esc(tajuk)}">${LABEL[st] || st}</a>`
        : `<span class="lencana lencana--${st}" title="${esc(tajuk)}">${LABEL[st] || st}</span>`);
    }
    return out.join("");
  }
  // Status izin foto dijejak dalam senarai semakan sahaja
  function lencanaFoto() {
    return "";
  }
  function nota(t) {
    return draf && t ? `<span class="nota-draf">${esc(t)}</span>` : "";
  }
  function pautanSumber(f, kelas) {
    return sumberPertama(f).filter((s) => s.url).map((s) =>
      `<a class="${kelas || "kad-aktiviti__sumber"}" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.nama)} ${ikon("luar")}<span class="sr-only">(pautan luar)</span></a>`
    ).join(" ");
  }
  function $(sel, akar) { return (akar || document).querySelector(sel); }
  function $$(sel, akar) { return Array.from((akar || document).querySelectorAll(sel)); }

  /* ---------------- Ikon & motif ---------------- */
  const IKON = {
    facebook: '<path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/>',
    lokasi: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>',
    anakPanah: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/>',
    bawah: '<path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M6 13l6 6 6-6"/>',
    atas: '<path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M6 11l6-6 6 6"/>',
    jeda: '<path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/>',
    main: '<path fill="currentColor" d="M8 5v14l11-7z"/>',
    menu: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h10"/>',
    tutup: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>',
    luar: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    quran: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M6.5 9h3M6.5 12h3M14.5 9h3M14.5 12h3"/>',
    kitab: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M5 17a3 3 0 0 1 3-3h11"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M9 8h6"/>',
    pensel: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5zM13.5 7l3 3"/>',
    bintang: '<path fill="currentColor" d="M12 2.5l2.4 3.4 4.1-.6-.6 4.1 3.4 2.4-3.4 2.4.6 4.1-4.1-.6L12 21.5l-2.4-3.4-4.1.6.6-4.1L2.7 12l3.4-2.4-.6-4.1 4.1.6z"/>',
    foto: '<rect x="3.5" y="5" width="17" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="9" cy="10" r="1.8" fill="currentColor"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 17l5-4.5 3.5 3 3-2.5L20 17"/>',
    maklumat: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 11v5.5M12 7.6v.1"/>',
    amaran: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 3.5l9.5 16.5h-19z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 10v4.5M12 17.4v.1"/>',
    pertanyaan: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4z"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M8 9.5h8M8 12.5h5"/>',
    hati: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    whatsapp: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 20l1.2-4A8 8 0 1 1 8 18.8z"/><path fill="currentColor" d="M9.2 8.3c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.4.5c-.1.1-.2.3 0 .5.6 1 1.4 1.7 2.4 2.2.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4 0 .5-.2 1.2-.7 1.5-.6.4-1.3.5-2.1.3-1.6-.4-3.4-1.8-4.4-3.4-.6-1-.9-2-.6-2.9z"/>',
    berita: '<rect x="3.5" y="5" width="14" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M17.5 9h3v8.5a1.5 1.5 0 0 1-3 0z"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M7 9h7M7 12h7M7 15h4"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M16 10.5l5-3v9l-5-3z"/>',
    rumah: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 11l8-6.5 8 6.5V20H4z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M10 20v-5h4v5"/>'
  };
  function ikon(n) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${IKON[n] || ""}</svg>`;
  }

  // Bintang lapan bucu seperti logo (dua segi empat bertindih)
  function laluanBintang(cx, cy, R) {
    const r = R * Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8);
    const t = [];
    for (let i = 0; i < 16; i++) {
      const a = (Math.PI / 8) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? R : r;
      t.push((cx + rad * Math.cos(a)).toFixed(2) + " " + (cy + rad * Math.sin(a)).toFixed(2));
    }
    return "M" + t.join("L") + "Z";
  }
  function bintangHiasan(kelas) {
    return `<svg class="bintang-hiasan ${kelas || ""}" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <path d="${laluanBintang(100, 100, 98)}" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="${laluanBintang(100, 100, 86)}" fill="currentColor" fill-opacity=".55"/>
      <path d="${laluanBintang(100, 100, 52)}" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`;
  }

  const MASJID = `<svg class="masjid" viewBox="0 0 440 120" aria-hidden="true" focusable="false"><g fill="#fff">
    <rect x="40" y="96" width="360" height="26"/>
    <rect x="168" y="84" width="104" height="14"/>
    <path d="M160 98C160 62 192 44 220 30c28 14 60 32 60 68z"/>
    <rect x="218.6" y="12" width="2.8" height="20"/>
    <path d="M220 1.5a6.5 6.5 0 1 0 5.6 9.8 5.2 5.2 0 1 1-5.6-9.8z"/>
    <path d="M102 100c0-20 16-30 30-36 14 6 30 16 30 36z"/>
    <path d="M278 100c0-20 16-30 30-36 14 6 30 16 30 36z"/>
    <rect x="131" y="52" width="2" height="13"/><rect x="307" y="52" width="2" height="13"/>
    <rect x="58" y="42" width="12" height="58"/><path d="M55 44l9-22 9 22z"/><rect x="53" y="60" width="22" height="4"/><rect x="63" y="8" width="2" height="15"/>
    <rect x="370" y="42" width="12" height="58"/><path d="M367 44l9-22 9 22z"/><rect x="365" y="60" width="22" height="4"/><rect x="375" y="8" width="2" height="15"/>
  </g></svg>`;
  const GELOMBANG = `<svg class="gelombang" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path fill="#fff" d="M0 90V58Q720-22 1440 58v32z"/></svg>`;

  /* ---------------- Navigasi ---------------- */
  const NAV = [
    { id: "beranda", href: "index.html", teks: "Beranda" },
    { id: "tentang", href: "tentang.html", teks: "Tentang Kami" },
    { id: "pengajian", href: "pengajian.html", teks: "Pengajian" },
    { id: "aktiviti", href: "aktiviti.html", teks: "Aktiviti & Berita" },
    { id: "galeri", href: "galeri.html", teks: "Galeri" },
    { id: "kemasukan", href: "kemasukan.html", teks: "Kemasukan" },
    { id: "sumbangan", href: "sumbangan.html", teks: "Sumbangan", tunjuk: () => draf || K.sumbangan.aktif },
    { id: "hubungi", href: "hubungi.html", teks: "Hubungi", cta: true }
  ];
  const nama = K.identiti.nama.nilai;
  const fb = K.hubungi.facebook.nilai;
  const lokasi = K.identiti.lokasiUmum.nilai;

  function binaBarDraf() {
    if (modAsal !== "draf") return "";
    if (draf) {
      return `<div class="bar-draf" role="region" aria-label="Mod draf"><div class="bekas">
        <span class="bar-draf__teks"><strong>Draf semakan</strong> <span>Label status, nota dan bahagian belum lengkap dipaparkan.</span></span>
        <span class="bar-draf__aksi"><a href="semakan.html">Senarai semakan</a><button type="button" data-tukar-mod="awam">Pratonton laman awam</button></span>
      </div></div>`;
    }
    return `<div class="bar-draf" role="region" aria-label="Mod pratonton"><div class="bekas">
      <span class="bar-draf__teks"><strong>Pratonton awam</strong> <span>Bahagian yang belum diluluskan disembunyikan.</span></span>
      <span class="bar-draf__aksi"><button type="button" data-tukar-mod="draf">Kembali ke draf</button></span>
    </div></div>`;
  }

  function binaKepala() {
    const pautan = NAV.filter((n) => !n.tunjuk || n.tunjuk()).map((n) =>
      `<a href="${n.href}"${n.cta ? ' class="nav__cta"' : ""}${n.id === halaman ? ' aria-current="page"' : ""}>${n.teks}</a>`
    ).join("");
    return `<a class="lompat" href="#utama">Langkau ke kandungan</a>
      ${binaBarDraf()}
      <header class="kepala">
        <div class="kepala__utiliti"><div class="bekas">
          <span class="arab" lang="ar">${esc(K.identiti.namaArab)}</span>
          <span class="kepala__utiliti-kanan">
            <span class="kepala__lokasi">${ikon("lokasi")} ${esc(lokasi)}</span>
            <a href="${esc(fb)}" target="_blank" rel="noopener">${ikon("facebook")} Facebook<span class="sr-only"> (pautan luar)</span></a>
          </span>
        </div></div>
        <div class="kepala__utama"><div class="bekas">
          <a class="jenama" href="index.html" aria-label="${esc(nama)} — Beranda">
            <img src="${esc(K.tetapan.logo)}" alt="" width="52" height="52">
            <span class="jenama__teks"><span class="jenama__kecil">Madrasah Tahfiz</span><span class="jenama__besar">An Nur Gedong</span></span>
          </a>
          <nav class="nav" id="nav-utama" aria-label="Navigasi utama">
            <button type="button" class="butang-menu nav__tutup" aria-label="Tutup menu">${ikon("tutup")}</button>
            ${pautan}
          </nav>
          <button type="button" class="butang-menu" aria-controls="nav-utama" aria-expanded="false" aria-label="Buka menu">${ikon("menu")}</button>
        </div></div>
      </header>
      <div class="pantas" aria-label="Pautan pantas">
        <a href="${esc(fb)}" target="_blank" rel="noopener">${ikon("facebook")}<span>Facebook</span></a>
        <a href="hubungi.html#lokasi">${ikon("lokasi")}<span>Lokasi</span></a>
        <a href="kemasukan.html">${ikon("pertanyaan")}<span>Pertanyaan</span></a>
      </div>`;
  }

  function binaKaki() {
    const fotoKaki = K.foto["foto-maulid"];
    const pautan = NAV.filter((n) => !n.tunjuk || n.tunjuk());
    const peta = K.hubungi.petaPin && K.hubungi.petaPin.pautan;
    const sosial = [
      `<a href="${esc(fb)}" target="_blank" rel="noopener" aria-label="Facebook (pautan luar)">${ikon("facebook")}</a>`,
      peta ? `<a href="${esc(peta)}" target="_blank" rel="noopener" aria-label="Google Maps (pautan luar)">${ikon("lokasi")}</a>` : "",
      `<a href="kemasukan.html" aria-label="Pertanyaan kemasukan">${ikon("pertanyaan")}</a>`
    ].join("");
    const sebaris = pautan.map((n) => `<li><a href="${n.href}">${n.teks}</a></li>`).join("")
      + (draf ? '<li><a href="semakan.html">Senarai semakan (draf)</a></li>' : "");
    return `<footer class="kaki">
      <div class="kaki__jalur ${boleh(fotoKaki) ? "" : "corak"}">
        ${boleh(fotoKaki) ? `<img src="${esc(fotoKaki.fail)}" alt="" loading="lazy">` : ""}
        <p lang="ar" dir="rtl">${esc(K.identiti.namaArab)}</p>
      </div>
      <div class="kaki__bingkai">
        <div class="kaki__kad">
          <span class="kaki__tera" aria-hidden="true">${ikon("bintang")}</span>
          <div class="kaki__atas-baris">
            <div>
              <a class="kaki__jenama" href="index.html">
                <img src="${esc(K.tetapan.logo)}" alt="Logo ${esc(nama)}" loading="lazy">
                <span class="kaki__nama"><span class="kaki__nama-kecil">Madrasah Tahfiz</span><span class="kaki__nama-besar">An Nur Gedong</span></span>
              </a>
              ${lencana(K.identiti.nama)}
            </div>
            <div class="kaki__hubungi">
              <div class="kaki__sosial">${sosial}</div>
              <p>${esc(lokasi)} · Bahagian Samarahan, Sarawak</p>
              <p class="kaki__baris-hubungi">
                <span>Facebook : <a href="${esc(fb)}" target="_blank" rel="noopener">${esc(K.hubungi.facebook.label)}<span class="sr-only"> (pautan luar)</span></a></span>
                ${peta ? `<span>Peta : <a href="${esc(peta)}" target="_blank" rel="noopener">Google Maps<span class="sr-only"> (pautan luar)</span></a></span>` : ""}
                <span>Pertanyaan : <a href="kemasukan.html">Kemasukan</a></span>
              </p>
            </div>
          </div>
          <nav class="kaki__pautan" aria-label="Pautan kaki"><ul>${sebaris}</ul></nav>
          <div class="kaki__bawah">
            <span>© ${new Date().getFullYear()} ${esc(nama)}</span>
            <span>${draf ? "Draf dalaman · kandungan disemak " + esc(K.tetapan.tarikhSemakanPenyelidikan) : "Maklumat tertakluk kepada kemas kini pengurusan madrasah."}</span>
          </div>
          <a class="kaki__atas" href="#utama" aria-label="Kembali ke atas">${ikon("atas")}<span aria-hidden="true">ATAS</span></a>
        </div>
      </div>
    </footer>`;
  }

  /* ---------------- Komponen ---------------- */
  function heroHalaman(judul, teks, denai, arab) {
    return `<section class="hero-halaman corak">
      ${bintangHiasan()}
      <div class="bekas">
        <p class="hero-halaman__denai"><a href="index.html">Beranda</a> / ${esc(denai)}</p>
        ${arab ? `<p class="arab" lang="ar">${esc(arab)}</p>` : ""}
        <h1>${judul}</h1>
        ${teks ? `<p>${teks}</p>` : ""}
      </div>
    </section>`;
  }

  function notis(jenis, ik, tajuk, isi, atribut) {
    return `<div class="notis ${jenis ? "notis--" + jenis : ""}" ${atribut || ""}>${ikon(ik)}<div>${tajuk ? `<h3>${tajuk}</h3>` : ""}${isi}</div></div>`;
  }

  function tarikhAktiviti(a) {
    const thn = a.tahunDisahkan ? `<small>${esc(a.tahun)}</small>` : "";
    return `<span class="kad-aktiviti__tarikh">${esc(a.tarikh)}${thn}</span>`;
  }

  function kadAktiviti(a) {
    const f = a.foto && K.foto[a.foto];
    const media = f && boleh(f)
      ? `<img src="${esc(f.fail)}" alt="${esc(f.alt)}" loading="lazy">`
      : `<div class="kad-aktiviti__corak corak">${ikon(a.ikon || "bintang")}</div>`;
    return `<article class="kad-aktiviti muncul" id="${esc(a.id || "")}" data-jenis="${esc(a.jenis || "madrasah")}">
      <div class="kad-aktiviti__media">${media}${a.tarikhPenuh ? `<span class="kad-aktiviti__tarikh">${esc(a.tarikhPenuh)}</span>` : tarikhAktiviti(a)}</div>
      <div class="kad-aktiviti__isi">
        <div>${lencana(a)}${f ? lencanaFoto(f) : ""}</div>
        <h3>${esc(a.tajuk)}</h3>
        <p>${esc(a.ringkasan)}</p>
        ${draf && a.had ? `<p class="kad-aktiviti__had">${esc(a.had)}</p>` : ""}
        ${nota(a.catatan)}
        ${pautanSumber(a)}
      </div>
    </article>`;
  }

  function kadPeringkat(p, i) {
    return `<article class="kad-peringkat corak muncul">
      ${bintangHiasan()}
      <div><span class="kad-peringkat__no">0${i + 1}</span><h3>${esc(p.nama)}</h3><p>${esc(p.teks)}</p>${lencana(p)}</div>
      <span class="kad-peringkat__garis"></span>
    </article>`;
  }

  function garisMasa(senarai, menegak) {
    return `<ol class="garis-masa ${menegak ? "garis-masa--menegak" : ""}">${senarai.filter(boleh).map((l) => `
      <li class="muncul">
        <time>${esc(l.tarikh)}</time>
        <p class="penerbit">${esc(l.penerbit)}</p>
        <p>${esc(l.ringkasan)}</p>
        ${nota(l.catatan)}
        ${sumberPertama(l).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">Baca di ${esc(s.nama)} ↗<span class="sr-only"> (pautan luar)</span></a>`).join("<br>")}
      </li>`).join("")}</ol>`;
  }

  function fotoFigura(id, kelas) {
    const f = K.foto[id];
    if (!boleh(f)) return "";
    return `<figure class="foto-galeri ${kelas || ""} muncul">
      <button type="button" data-lampu="${esc(id)}" aria-label="Besarkan foto: ${esc(f.kapsyen)}"><img src="${esc(f.fail)}" alt="${esc(f.alt)}" loading="lazy"></button>
      <figcaption>${esc(f.kapsyen)}</figcaption>
    </figure>`;
  }

  /* ---------------- Halaman: Beranda ---------------- */
  function pecahNama(n) {
    const m = /^Madrasah Tahfiz (.+?)( Gedong)?$/.exec(n);
    return m ? { atas: "Madrasah Tahfiz", besar: m[1], bawah: m[2] ? "Gedong" : "" } : { atas: "", besar: n, bawah: "" };
  }

  function beranda() {
    const fHero = K.foto["foto-maulid"];
    const bahagian = pecahNama(nama);
    const intro = K.identiti.pengenalan;
    const aktiviti = K.aktiviti.filter(boleh);
    const teras = K.pengajian.teras;
    const kemudahan = K.kemudahan;
    const fSurau = K.foto["foto-surau"];

    const panel = [
      { tab: "Hafazan Al-Quran", warna: "var(--hijau-900)", t: teras[0], sisi: "Hafazan", ik: "quran",
        media: `<div class="kad-media__corak"><span class="arab" lang="ar">القرآن</span></div>` },
      { tab: "Pengajian Agama", warna: "var(--biru-900)", t: teras[1], sisi: "Pengajian agama", ik: "kitab",
        media: `<div class="kad-media__corak"><span class="arab" lang="ar">العلم</span></div>` },
      { tab: "Kokurikulum", warna: "var(--hijau-700)", t: teras[3], sisi: "Qasidah & futsal", ik: "bintang", cip: ["Qasidah", "Futsal", "Sautun Nur"],
        media: `<div class="kad-media__corak"><div><span class="arab" lang="ar">صوت النور</span><small>Kumpulan qasidah</small></div></div>` },
      { tab: "Kemudahan", warna: "var(--biru-700)", sisi: "Kemudahan", ik: "rumah",
        t: { tajuk: "Kemudahan", teks: "Profil institusi merekodkan kemudahan pembelajaran, ibadah dan asrama di kawasan madrasah.", status: kemudahan.status, sumber: kemudahan.sumber, catatan: kemudahan.catatan },
        cip: kemudahan.senarai.slice(0, 7),
        media: boleh(fSurau)
          ? `<img src="${esc(fSurau.fail)}" alt="${esc(fSurau.alt)}" loading="lazy"><figcaption>${esc(fSurau.kapsyen)} ${lencanaFoto(fSurau)}</figcaption>`
          : `<div class="kad-media__corak"><span class="arab" lang="ar">مصلى</span></div>` },
      { tab: "Rekod Pendaftaran", warna: "var(--hijau-950)", sisi: "Rekod portal", ik: "maklumat",
        t: { tajuk: "Rekod Pendaftaran", teks: "Disenaraikan dalam senarai IPIP JAIS sebagai tahfiz swasta, dan dalam KISWA dengan nombor rekod MIS-IPIP-49 berstatus Sementara.", status: "rasmi", sumber: ["kiswaSenarai", "jais"],
          catatan: "Jangan tulis sebagai pendaftaran kekal atau diiktiraf sepenuhnya. Semak surat kelulusan semasa." },
        media: `<div class="kad-media__corak"><div><span class="kod">MIS-IPIP-49</span><small>Status KISWA: Sementara</small></div></div>` }
    ];

    const fakta = [
      { nilai: "MIS-IPIP-49", label: "No. rekod KISWA", status: "rasmi", sumber: ["kiswaSenarai"] },
      { nilai: "Sementara", label: "Status pendaftaran dalam KISWA", status: "rasmi", sumber: ["kiswaSenarai"] },
      { nilai: "3", label: "Peringkat dalam rekod", kecil: "Rendah, menengah, lepasan SPM", status: "rasmi", sumber: ["kiswaSenarai"] },
      { nilai: "5", label: "Bidang pengajian agama", kecil: "Tasawuf, feqah, sirah, hadith, tauhid", status: "rasmi", sumber: ["kiswaProfil"] },
      { nilai: "Melayu", label: "Bahasa pengantar", status: "rasmi", sumber: ["kiswaProfil"] },
      { nilai: "Samarahan", label: "Bahagian", kecil: "Daerah Simunjan, mukim Gedong", status: "rasmi", sumber: ["kiswaProfil"] },
      { nilai: "2015", label: "Tahun penubuhan", kecil: "Menurut direktori sekunder", status: "sekunder", sumber: ["eduagama"], catatan: "Rekod asal SIMPENI/JAKIM belum disemak." }
    ].filter(boleh);

    return `
    <section class="hero" aria-labelledby="hero-judul">
      <div class="hero__latar ${boleh(fHero) ? "" : "corak"}">${boleh(fHero) ? `<img src="${esc(fHero.fail)}" alt="" fetchpriority="high">` : ""}</div>
      <div class="hero__bingkai" aria-hidden="true"></div>
      <div class="hero__isi">
        <p class="hero__arab arab" lang="ar">${esc(K.identiti.namaArab)}</p>
        <h1 class="hero__judul" id="hero-judul">
          ${bahagian.atas ? `<span class="hero__judul-kecil">${esc(bahagian.atas)}</span>` : ""}
          <span class="hero__judul-besar">${esc(bahagian.besar)}</span>
          ${bahagian.bawah ? `<span class="hero__judul-lokasi">${esc(bahagian.bawah)}</span>` : ""}
        </h1>
        <div>${lencana(K.identiti.nama)}</div>
        <p class="hero__lokasi">${ikon("lokasi")} ${esc(lokasi)} · Bahagian Samarahan</p>
        <div class="hero__aksi">
          <a class="btn btn--kuning" href="pengajian.html">Lihat pengajian ${ikon("anakPanah")}</a>
          <a class="btn btn--garis-putih" href="${esc(fb)}" target="_blank" rel="noopener">${ikon("facebook")} Facebook madrasah<span class="sr-only"> (pautan luar)</span></a>
        </div>
      </div>
      <a class="hero__tatal" href="#kenali" aria-label="Tatal ke bawah">${ikon("bawah")}</a>
      <div class="hero__siluet" aria-hidden="true">${MASJID}${GELOMBANG}</div>
    </section>

    ${aktiviti.length ? `<section class="ticker" aria-label="Aktiviti terkini">
      <span class="ticker__label">${ikon("bintang").replace("<svg", '<svg style="width:16px;height:16px"')}<span>Terkini</span></span>
      <div class="ticker__jalur"><ul class="ticker__senarai">
        ${[0, 1].map((salinan) => aktiviti.map((a) => `<li${salinan ? ' aria-hidden="true"' : ""}><a href="aktiviti.html#${esc(a.id)}"${salinan ? ' tabindex="-1"' : ""}><time>${esc(a.tarikh)}</time>${esc(a.tajuk)}</a></li>`).join("")).join("")}
      </ul></div>
      <button type="button" class="ticker__jeda" aria-label="Jeda tatalan">${ikon("jeda")}</button>
    </section>` : ""}

    <section class="seksyen" id="kenali">
      <div class="bekas pengenalan">
        <div class="wordmark muncul" aria-hidden="true">
          ${bintangHiasan()}
          <p class="wordmark__teks">An<span>Nur</span></p>
          <p class="wordmark__arab arab" lang="ar">النور</p>
        </div>
        <div class="pengenalan__teks muncul">
          <span class="label-atas">Tentang madrasah</span>
          <p class="besar">Institusi tahfiz swasta di ${esc(lokasi)}, Bahagian Samarahan, yang disenaraikan dalam rekod JAIS dan KISWA bagi peringkat rendah, menengah dan lepasan SPM. ${lencana({ status: "rasmi", sumber: ["jais", "kiswaSenarai"] })}</p>
          ${boleh(intro) ? `<p>${esc(intro.nilai)} ${lencana(intro)}</p>${nota(intro.catatan)}` : ""}
          <p>${esc(K.pengajian.teras[1].teks)}</p>
          <a class="pautan-anak-panah" href="tentang.html">Profil institusi ${ikon("anakPanah")}</a>
        </div>
      </div>
    </section>

    <section class="mengenali corak atas-gelap" aria-labelledby="mengenali-judul" style="--latar:${panel[0].warna}">
      <span class="mengenali__khat arab" lang="ar" aria-hidden="true">النور</span>
      <div class="bekas">
        <h2 class="mengenali__judul" id="mengenali-judul"><span class="mengenali__label">Mengenali</span><span class="mengenali__nama"><span class="garis">An</span> Nur</span></h2>
        ${panel.map((p, i) => `
          <div class="mengenali__panel" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" ${i ? "hidden" : ""} data-warna="${p.warna}">
            <div>
              <h3>${esc(p.t.tajuk)}</h3>
              <p>${esc(p.t.teks)}</p>
              ${(p.cip || p.t.senarai) ? `<ul class="mengenali__cip">${(p.cip || p.t.senarai).map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
              <div>${lencana(p.t)}</div>
              ${nota(p.t.catatan || p.t.tambahan)}
            </div>
            <figure class="kad-media" style="margin:0">
              <div class="kad-media__sisi">${ikon(p.ik)}<span>${esc(p.sisi)}</span></div>
              <div class="kad-media__isi">${p.media}</div>
            </figure>
          </div>`).join("")}
        <div class="tab-bar" role="tablist" aria-label="Mengenali An Nur">
          ${panel.map((p, i) => `<button type="button" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${esc(p.tab)}</button>`).join("")}
        </div>
      </div>
    </section>

    <section class="seksyen">
      <div class="bekas">
        <div class="kepala-seksyen">
          <div><span class="label-atas">Peringkat pengajian</span><h2 class="tajuk-seksyen">Peringkat dalam <span class="tajuk-sorot">rekod</span></h2></div>
          <a class="pautan-anak-panah" href="pengajian.html">Semua tentang pengajian ${ikon("anakPanah")}</a>
        </div>
        <div class="peringkat">${K.pengajian.peringkat.filter(boleh).map(kadPeringkat).join("")}</div>
        ${draf ? `<p style="margin-top:18px;color:var(--teks-lembut);font-size:15px">${esc(K.pengajian.peringkatCatatan)}</p>` : ""}
      </div>
    </section>

    <section class="seksyen seksyen--krim corak--gelap">
      <div class="bekas">
        <div class="sepintas-kepala muncul"><p class="gergasi" aria-hidden="true">An Nur</p><h2 class="jalur">Sepintas Lalu</h2></div>
        <div class="grid-fakta">
          ${fakta.map((f) => `<div class="fakta muncul"><span class="fakta__nilai">${esc(f.nilai)}</span><span class="fakta__label">${esc(f.label)}${f.kecil ? `<small>${esc(f.kecil)}</small>` : ""}<br>${lencana(f)}${nota(f.catatan)}</span></div>`).join("")}
        </div>
        ${draf ? `<p style="margin-top:24px;font-size:14px;color:var(--teks-lembut)">Angka di atas ialah butiran rekod portal, bukan statistik pelajar atau graduan.</p>` : ""}
      </div>
    </section>

    ${aktiviti.length ? `<section class="seksyen" id="terkini">
      <div class="bekas">
        <div class="kepala-seksyen">
          <div><span class="label-atas">Aktiviti & berita</span><h2 class="tajuk-seksyen">Terkini dari <span class="tajuk-sorot">madrasah</span></h2></div>
          <a class="pautan-anak-panah" href="aktiviti.html">Semua aktiviti ${ikon("anakPanah")}</a>
        </div>
        <div class="grid-aktiviti">${aktiviti.slice(0, 3).map(kadAktiviti).join("")}</div>
      </div>
    </section>` : ""}

    <section class="seksyen seksyen--hijau atas-gelap corak">
      <div class="bekas">
        <div class="kepala-seksyen">
          <div><span class="label-atas">Liputan luar</span><h2 class="tajuk-seksyen">Dalam <span class="tajuk-sorot">berita</span></h2></div>
          <a class="pautan-anak-panah" href="aktiviti.html#liputan">Semua liputan ${ikon("anakPanah")}</a>
        </div>
        ${garisMasa(K.liputan)}
        ${draf ? `<p style="margin-top:28px;font-size:14px;color:rgba(255,255,255,.7)">${esc(K.liputanCatatan)}</p>` : ""}
      </div>
    </section>

    <section class="seksyen cta corak--gelap">
      ${bintangHiasan()}
      <div class="bekas cta__grid">
        <div>
          <span class="label-atas" style="color:var(--hijau-900)">Ibu bapa & masyarakat</span>
          <h2>Ingin mengetahui lebih lanjut?</h2>
          <p>Ikuti perkembangan madrasah di Facebook atau hantar pertanyaan. Maklumat kemasukan dan saluran rasmi akan dikemas kini di laman ini selepas disahkan pengurusan.</p>
        </div>
        <div class="cta__pilihan">
          <a href="kemasukan.html"><span><strong>Pertanyaan kemasukan</strong><span>Maklumat yang tersedia setakat ini</span></span>${ikon("anakPanah")}</a>
          <a href="${esc(fb)}" target="_blank" rel="noopener"><span><strong>Facebook madrasah</strong><span>Aktiviti dan pengumuman terkini</span></span>${ikon("luar")}</a>
          ${draf || K.sumbangan.aktif ? `<a href="sumbangan.html"><span><strong>Sumbangan</strong><span>${K.sumbangan.aktif ? "Saluran yang disahkan" : "Draf — menunggu butiran disahkan"}</span></span>${ikon("anakPanah")}</a>` : ""}
        </div>
      </div>
    </section>`;
  }

  /* ---------------- Halaman: Tentang ---------------- */
  function tentang() {
    const profil = K.profil.filter(boleh);
    const pengurusan = K.pengurusan.senarai.filter(boleh);
    const projek = K.sumbangan.projek;
    return heroHalaman("Tentang <em>Kami</em>", "Profil institusi berdasarkan rekod yang tersedia. Bahagian sejarah dan pengurusan akan dipaparkan selepas disahkan.", "Tentang Kami", K.identiti.namaArab) + `
    <div class="seksyen"><div class="bekas dua-lajur">
      <aside class="dua-lajur__sisi">
        <span class="label-atas">Profil</span>
        <h2>${esc(nama)}</h2>
        <p style="color:var(--teks-lembut)">${esc(lokasi)} · Bahagian Samarahan</p>
        ${lencana(K.identiti.nama)}${nota(K.identiti.nama.catatan)}
        <img src="${esc(K.tetapan.logo)}" alt="Logo ${esc(nama)}: bintang lapan kuning dengan bangunan hijau, jaringan geometri biru dan khat nama madrasah." style="width:200px;margin-top:24px">
        ${nota(K.tetapan.logoCatatan)}
      </aside>
      <div>
        <section class="blok">
          <h2>Profil institusi</h2>
          <p>Butiran daripada rekod JAIS dan KISWA.${draf ? " Rekod portal mungkin belum dikemas kini oleh penerbitnya." : ""}</p>
          <table class="jadual-fakta"><tbody>
            ${profil.map((r) => `<tr><th scope="row">${esc(r.label)}</th><td><strong>${esc(r.nilai)}</strong><br>${lencana(r)}${nota(r.catatan)}</td></tr>`).join("")}
          </tbody></table>
        </section>

        ${draf ? `<section class="blok" data-draf-sahaja>
          ${notis("hijau", "maklumat", "Status pendaftaran", `<p>Dalam senarai KISWA, madrasah direkodkan dengan nombor <strong>MIS-IPIP-49</strong> berstatus <strong>Sementara</strong>. Status terkini tertakluk kepada surat kelulusan pihak berkuasa.</p>${lencana({ status: "rasmi", sumber: ["kiswaSenarai"] })}`)}
        </section>` : ""}

        ${draf ? `<section class="blok" data-draf-sahaja>
          <h2>Sejarah</h2>
          ${notis("draf", "amaran", "Belum diisi", `<p>${esc(K.sejarah.catatan)}</p>`)}
        </section>` : ""}

        ${pengurusan.length ? `<section class="blok">
          <h2>Pengurusan</h2>
          <div class="pengurusan">${pengurusan.map((p) => `<figure class="profil-orang">
            ${p.foto ? `<img src="${esc(p.foto)}" alt="Potret ${esc(p.nama)}" width="600" height="987" loading="lazy">` : ""}
            <figcaption><span class="profil-orang__jawatan">${esc(p.jawatan)}</span><strong>${esc(p.nama)}</strong><span class="profil-orang__org">${esc(nama)}</span>${lencana(p)}${nota(p.catatan)}</figcaption>
          </figure>`).join("")}</div>
          ${nota(K.pengurusan.catatan)}
        </section>` : ""}

        ${boleh(projek) ? `<section class="blok">
          <h2>${esc(projek.tajuk)}</h2>
          <p>${esc(projek.teks)}</p>${lencana(projek)}${nota(projek.catatan)}
        </section>` : ""}

        ${draf ? `<section class="blok" data-draf-sahaja>
          ${notis("draf", "amaran", "Jangan tercampur", `<p>Madrasah Darul Uloom Tahfizul Quran Gedong (MIS-IPIP-14, Lot 732, Kampung Lot Baru Gedong) ialah institusi berasingan. Hasil carian An Nur di Gedong Tataan, Lampung (Indonesia) dan An Nur di Puchong juga tidak berkaitan.</p>${lencana({ status: "rasmi", sumber: ["darulUloom"] })}`)}
        </section>` : ""}

        <section class="blok" id="liputan">
          <h2>Liputan media</h2>
          <p>Ringkasan laporan luar yang menyebut madrasah. Baca laporan penuh di laman penerbit.</p>
          <div class="atas-gelap" style="background:var(--hijau-900);border-radius:var(--radius);padding:32px 28px 4px">${garisMasa(K.liputan, true)}</div>
          ${draf ? `<p style="margin-top:14px;font-size:14px;color:var(--teks-lembut)">${esc(K.liputanCatatan)}</p>` : ""}
        </section>
      </div>
    </div></div>`;
  }

  /* ---------------- Halaman: Pengajian ---------------- */
  function pengajian() {
    const p = K.pengajian;
    const fSurau = K.foto["foto-surau"];
    return heroHalaman("Pengajian <em>&</em> Kokurikulum", boleh(p.ringkasan) ? esc(p.ringkasan.nilai) + " " + lencana(p.ringkasan) : "Hafazan al-Quran, pengajian agama dan kokurikulum berdasarkan profil institusi.", "Pengajian", "تحفيظ القرآن") + `
    <div class="seksyen"><div class="bekas">
      <section class="blok">
        <div class="kepala-seksyen" style="margin-bottom:28px"><div><span class="label-atas">Teras pengajian</span><h2 class="tajuk-seksyen">Apa yang <span class="tajuk-sorot">dipelajari</span></h2></div></div>
        <div class="grid-teras">
          ${p.teras.filter(boleh).map((t) => `<article class="kad-teras muncul">
            <h3>${esc(t.tajuk)}</h3>
            <p>${esc(t.teks)}</p>
            ${t.senarai ? `<ul class="mengenali__cip">${t.senarai.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
            ${lencana(t)}${nota(t.catatan)}
            ${draf && t.tambahan ? `<p class="kad-teras__tambahan" data-draf-sahaja>${esc(t.tambahan)}</p>` : ""}
          </article>`).join("")}
        </div>
        <p style="margin-top:18px;color:var(--teks-lembut);font-size:15px">Bahasa pengantar: Melayu. Pentaksiran ialah ujian dalaman al-Quran, fardu ain dan hafazan. ${lencana({ status: "rasmi", sumber: ["kiswaProfil"] })}</p>
      </section>

      <section class="blok">
        <div class="kepala-seksyen" style="margin-bottom:28px"><div><span class="label-atas">Peringkat</span><h2 class="tajuk-seksyen">Peringkat dalam rekod portal</h2></div></div>
        <div class="peringkat">${p.peringkat.filter(boleh).map(kadPeringkat).join("")}</div>
        ${draf ? notis("", "maklumat", "", `<p>${esc(p.peringkatCatatan)} Butiran ini tidak membuktikan penawaran SPM, KSSM atau sijil kebangsaan.</p>`, 'style="margin-top:20px"') : ""}
      </section>

      <section class="blok" id="kemudahan">
        <div class="kepala-seksyen" style="margin-bottom:28px"><div><span class="label-atas">Kemudahan</span><h2 class="tajuk-seksyen">Kemudahan di madrasah</h2></div></div>
        <div class="susun-kemudahan">
          <div>
            <ul class="grid-kemudahan">${K.kemudahan.senarai.map((k) => `<li>${esc(k)}</li>`).join("")}</ul>
            <p style="margin-top:14px">${lencana(K.kemudahan)}</p>${nota(K.kemudahan.catatan)}
          </div>
          ${fotoFigura("foto-surau")}
        </div>
      </section>

      ${draf ? `<section class="blok" data-draf-sahaja>
        <h2>Maklumat yang akan ditambah</h2>
        <p>Bahagian ini dipaparkan dalam draf sahaja.</p>
        <ul class="senarai-semak">${p.belumAda.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </section>` : ""}
    </div></div>`;
  }

  /* ---------------- Halaman: Aktiviti ---------------- */
  function aktiviti() {
    const ak = K.aktiviti.filter(boleh).map((a) => Object.assign({ jenis: "madrasah" }, a));
    const li = K.liputan.filter(boleh).map((l, i) => ({
      id: "liputan-" + i, jenis: "media", ikon: "berita", tarikhPenuh: l.tarikh,
      tajuk: l.penerbit, ringkasan: l.ringkasan, catatan: l.catatan, status: l.status, sumber: l.sumber
    }));
    return heroHalaman("Aktiviti <em>&</em> Berita", "Ringkasan catatan madrasah dan liputan media, dengan pautan ke sumber asal.", "Aktiviti & Berita") + `
    <div class="seksyen"><div class="bekas">
      <div class="penapis" role="group" aria-label="Tapis mengikut jenis">
        <button type="button" aria-pressed="true" data-tapis="semua">Semua</button>
        <button type="button" aria-pressed="false" data-tapis="madrasah">Catatan madrasah</button>
        <button type="button" aria-pressed="false" data-tapis="media">Liputan media</button>
      </div>
      <h2 class="sr-only">Catatan madrasah</h2>
      <div class="grid-aktiviti" id="senarai-aktiviti">${ak.map(kadAktiviti).join("")}</div>
      <h2 class="tajuk-seksyen" id="liputan" style="margin:72px 0 28px" data-kumpulan="media">Liputan media</h2>
      <div class="grid-aktiviti" data-kumpulan="media">${li.map(kadAktiviti).join("")}</div>
      ${draf ? `<p style="margin-top:18px;font-size:14px;color:var(--teks-lembut)" data-kumpulan="media">${esc(K.liputanCatatan)}</p>` : ""}
      <div class="blok" style="margin-top:56px">
        <h2>Ikuti di Facebook</h2><p>Aktiviti terkini dikongsikan di Facebook madrasah.</p><a class="btn btn--hijau" href="${esc(fb)}" target="_blank" rel="noopener">${ikon("facebook")} Buka Facebook<span class="sr-only"> (pautan luar)</span></a>
      </div>
    </div></div>`;
  }

  /* ---------------- Halaman: Galeri ---------------- */
  function galeri() {
    const foto = K.galeri.filter((id) => boleh(K.foto[id]));
    const video = K.video.filter(boleh);
    return heroHalaman("Galeri", "Foto aktiviti dan ruang madrasah beserta kapsyen.", "Galeri") + `
    <div class="seksyen"><div class="bekas">
      ${foto.length ? `<div class="grid-galeri">${foto.map((id) => fotoFigura(id)).join("")}</div>`
        : notis("hijau", "foto", "Galeri akan dikemas kini", `<p>Foto akan dipaparkan selepas diluluskan untuk penerbitan. Lihat foto terkini di Facebook madrasah.</p><a class="btn btn--hijau" href="${esc(fb)}photos" target="_blank" rel="noopener">${ikon("facebook")} Galeri Facebook<span class="sr-only"> (pautan luar)</span></a>`)}

      ${draf ? `<section class="blok" data-draf-sahaja style="margin-top:56px">
        <h2>Ruang foto yang diperlukan</h2>
        <p>Minta fail asal daripada pengurusan. Jangan gantikan dengan foto madrasah lain atau imej janaan.</p>
        <div class="grid-galeri">${K.galeriDiperlukan.map((g) => `<div class="ruang-foto corak--gelap">${ikon("foto")}<strong>${esc(g)}</strong><small>Menunggu foto diluluskan</small></div>`).join("")}</div>
      </section>` : ""}

      ${video.length ? `<section class="blok" style="margin-top:56px">
        <h2>Video</h2>
        <p>Video madrasah dikongsikan di Facebook. ${draf ? "Tiada saluran YouTube rasmi ditemui setakat ini." : ""}</p>
        <div class="grid-hubungi">${video.map((v) => `<article class="kad-hubungi">
          <span class="kad-hubungi__ikon">${ikon("video")}</span>
          <h3>${esc(v.tajuk)}</h3><p>${esc(v.teks)}</p>${lencana(v)}
          ${sumberPertama(v).map((s) => `<a class="btn btn--garis" href="${esc(s.url)}" target="_blank" rel="noopener">Tonton di Facebook ${ikon("luar")}<span class="sr-only"> (pautan luar)</span></a>`).join("")}
        </article>`).join("")}</div>
      </section>` : ""}
    </div></div>
    <div class="kotak-lampu" role="dialog" aria-modal="true" aria-label="Paparan foto">
      <button type="button" aria-label="Tutup paparan foto">${ikon("tutup")}</button>
      <img alt=""><p></p>
    </div>`;
  }

  /* ---------------- Halaman: Kemasukan ---------------- */
  function kemasukan() {
    const km = K.kemasukan;
    return heroHalaman("Kemasukan", "Maklumat kemasukan yang tersedia dan cara membuat pertanyaan.", "Kemasukan") + `
    <div class="seksyen"><div class="bekas">
      <div class="blok">
        ${km.pengambilanDibuka && km.pengumuman
          ? notis("hijau", "maklumat", "Pengumuman pengambilan", `<p>${esc(km.pengumuman)}</p>`)
          : `<h2>Pertanyaan kemasukan</h2><p>Untuk pertanyaan tentang sesi, syarat atau yuran kemasukan, hubungi madrasah melalui Facebook.</p><a class="btn btn--hijau" href="${esc(fb)}" target="_blank" rel="noopener">${ikon("facebook")} Hubungi melalui Facebook<span class="sr-only"> (pautan luar)</span></a>`}
      </div>

      <section class="blok">
        <h2>Peringkat dalam rekod</h2>
        <p>Peringkat yang disenaraikan dalam rekod portal.${draf ? " Penawaran semasa, umur dan tempoh pengajian akan disahkan pengurusan." : ""}</p>
        <div class="peringkat">${K.pengajian.peringkat.filter(boleh).map(kadPeringkat).join("")}</div>
      </section>

      ${draf ? `<section class="blok" data-draf-sahaja>
        <h2>Perlu disahkan sebelum membuka permohonan</h2>
        <ul class="senarai-semak">${km.perluDisahkan.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </section>

      <section class="blok" data-draf-sahaja>
        <h2>Borang pertanyaan</h2>
        ${notis("draf", "amaran", "Borang demonstrasi — tiada data dihantar", "<p>Borang ini belum disambungkan kepada sebarang sistem. Aktifkan hanya selepas saluran penerimaan (e-mel atau sistem) dan pegawai yang menjawab disahkan.</p>", 'style="margin-bottom:20px"')}
        <form class="borang" id="borang-pertanyaan" novalidate>
          <div class="borang__baris">
            <div class="medan"><label for="b-nama">Nama penjaga</label><input id="b-nama" name="nama" autocomplete="name"></div>
            <div class="medan"><label for="b-tel">No. telefon</label><input id="b-tel" name="telefon" type="tel" autocomplete="tel"></div>
          </div>
          <div class="borang__baris">
            <div class="medan"><label for="b-peringkat">Peringkat diminati</label><select id="b-peringkat" name="peringkat"><option value="">Pilih</option>${K.pengajian.peringkat.map((p) => `<option>${esc(p.nama)}</option>`).join("")}</select></div>
            <div class="medan"><label for="b-umur">Umur anak</label><input id="b-umur" name="umur" inputmode="numeric"></div>
          </div>
          <div class="medan"><label for="b-mesej">Pertanyaan</label><textarea id="b-mesej" name="mesej" rows="4"></textarea></div>
          <button class="btn btn--hijau" type="submit">Semak borang (demonstrasi)</button>
          <p class="borang__mesej" role="status" hidden>Tiada data dihantar. Borang ini demonstrasi sahaja sehingga saluran pertanyaan disahkan.</p>
        </form>
      </section>` : ""}
    </div></div>`;
  }

  /* ---------------- Halaman: Sumbangan ---------------- */
  function sumbangan() {
    const sb = K.sumbangan;
    if (!draf && !sb.aktif) {
      return heroHalaman("Sumbangan", "", "Sumbangan") + `<div class="seksyen"><div class="bekas">
        ${notis("", "hati", "Maklumat sumbangan belum diterbitkan", `<p>Saluran sumbangan rasmi akan dipaparkan di sini selepas disahkan pengurusan madrasah. Untuk pertanyaan, hubungi madrasah melalui Facebook.</p><a class="btn btn--hijau" href="${esc(fb)}" target="_blank" rel="noopener">${ikon("facebook")} Hubungi melalui Facebook<span class="sr-only"> (pautan luar)</span></a>`)}
      </div></div>`;
    }
    return heroHalaman("Sumbangan", "Bahagian draf — tiada butang bayaran atau akaun dipaparkan sehingga butiran tabung diluluskan.", "Sumbangan") + `
    <div class="seksyen"><div class="bekas">
      <div class="blok">${notis("draf", "amaran", "Belum aktif", "<p>Halaman ini disembunyikan daripada navigasi laman awam sehingga <code>sumbangan.aktif</code> ditetapkan kepada <code>true</code> dalam fail kandungan.</p>")}</div>
      <section class="blok">
        <h2>Butiran yang perlu diluluskan</h2>
        <ul class="senarai-semak">${sb.perluDisahkan.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </section>
      <section class="blok">
        <h2>Saluran yang ditemui dalam carian</h2>
        <p>Untuk semakan pengurusan sahaja — bukan saluran yang disyorkan.</p>
        ${sb.saluranDitemui.map((s) => `<article class="kad-teras"><h3>${esc(s.nama)}</h3><p>${esc(s.teks)}</p>${lencana(s)}</article>`).join("")}
      </section>
      ${boleh(sb.projek) ? `<section class="blok">
        <h2>${esc(sb.projek.tajuk)}</h2><p>${esc(sb.projek.teks)}</p>${lencana(sb.projek)}${nota(sb.projek.catatan)}
      </section>` : ""}
      <section class="blok">${notis("draf", "maklumat", "Tentang poster lama", `<p>${esc(sb.catatan)}</p>`)}</section>
    </div></div>`;
  }

  /* ---------------- Halaman: Hubungi ---------------- */
  function hubungi() {
    const h = K.hubungi;
    const sah = h.alamatDisahkan;
    const pin = boleh(h.petaPin) && h.petaPin.lat ? h.petaPin : null;
    return heroHalaman("Hubungi <em>Kami</em>", "Facebook madrasah ialah saluran yang boleh digunakan sekarang. Saluran lain akan ditambah selepas disahkan.", "Hubungi") + `
    <div class="seksyen"><div class="bekas">
      <div class="grid-hubungi blok">
        <article class="kad-hubungi kad-hubungi--utama">
          <span class="kad-hubungi__ikon">${ikon("facebook")}</span>
          <h3>Facebook</h3><p>${esc(h.facebook.label)} — aktiviti, pengumuman dan mesej.</p>${lencana(h.facebook)}
          <a class="btn btn--kuning" href="${esc(h.facebook.nilai)}" target="_blank" rel="noopener">Buka Facebook ${ikon("luar")}<span class="sr-only"> (pautan luar)</span></a>
        </article>
        <article class="kad-hubungi" id="lokasi">
          <span class="kad-hubungi__ikon">${ikon("lokasi")}</span>
          <h3>Lokasi</h3>
          <p>${sah ? esc(sah.alamat) : esc(lokasi)}<br>Mukim Gedong, Daerah Simunjan, Bahagian Samarahan</p>${lencana(sah || K.identiti.lokasiUmum, sah ? "sekunder" : null)}
          ${pin && pin.lat ? `<p style="font-size:14px">Kod Plus: ${esc(pin.kodPlus)}</p>
          <a class="btn btn--garis" href="https://www.google.com/maps/dir/?api=1&destination=${pin.lat},${pin.lng}" target="_blank" rel="noopener">Dapatkan arah ${ikon("luar")}<span class="sr-only"> (pautan luar)</span></a>` : ""}
          ${draf ? nota(sah ? pin.catatan : "Alamat penuh ditahan — rekod bercanggah (lihat jadual di bawah).") : ""}
        </article>
        ${h.whatsapp.aktif && h.whatsapp.nilai ? `<article class="kad-hubungi">
          <span class="kad-hubungi__ikon">${ikon("whatsapp")}</span><h3>WhatsApp</h3><p>Pertanyaan urusan.</p>
          <a class="btn btn--hijau" href="https://wa.me/${esc(h.whatsapp.nilai)}" target="_blank" rel="noopener">Hantar mesej</a>
        </article>` : `<article class="kad-hubungi">
          <span class="kad-hubungi__ikon">${ikon("whatsapp")}</span><h3>Telefon & WhatsApp</h3>
          <p>Nombor urusan akan dipaparkan selepas disahkan pengurusan.</p>${nota(h.whatsapp.catatan)}
          ${draf ? `<button class="btn btn--garis" type="button" disabled aria-disabled="true">WhatsApp — menunggu pengesahan</button>` : ""}
        </article>`}
      </div>

      ${pin ? `<section class="blok peta">
        <iframe src="https://maps.google.com/maps?q=${pin.lat},${pin.lng}&z=16&output=embed" title="Peta lokasi ${esc(nama)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <a class="pautan-anak-panah" href="${esc(pin.pautan)}" target="_blank" rel="noopener">Buka di Google Maps ${ikon("luar")}<span class="sr-only"> (pautan luar)</span></a>
      </section>` : draf ? `<section class="blok" data-draf-sahaja>
        <div class="peta-ganti corak--gelap"><div><strong>Ruang peta</strong>${esc(h.petaPin.catatan)}</div></div>
      </section>` : ""}

      ${draf ? `<section class="blok" data-draf-sahaja>
        <h2>Rekod hubungan yang bercanggah</h2>
        ${notis("draf", "amaran", "Jangan pilih satu secara senyap", `<p>${esc(h.rekodCatatan)}</p>`, 'style="margin-bottom:20px"')}
        <div class="jadual-bungkus"><table class="jadual-data">
          <thead><tr><th scope="col">Sumber</th><th scope="col">Alamat</th><th scope="col">Telefon</th><th scope="col">E-mel</th></tr></thead>
          <tbody>${h.rekod.map((r) => `<tr>
            <td><strong>${esc(r.sumberNama)}</strong><br>${lencana({ status: S[r.sumber[0]].jenis, sumber: r.sumber })}</td>
            <td>${esc(r.alamat) || "—"}${nota(r.catatan)}</td><td>${esc(r.telefon) || "—"}</td><td>${esc(r.emel) || "—"}</td>
          </tr>`).join("")}</tbody>
        </table></div>
      </section>` : ""}
    </div></div>`;
  }

  /* ---------------- Halaman: Semakan (draf sahaja) ---------------- */
  function semakan() {
    if (!draf) {
      return heroHalaman("Senarai semakan", "", "Semakan") + `<div class="seksyen"><div class="bekas">${notis("", "maklumat", "Halaman dalaman", "<p>Halaman ini hanya dipaparkan dalam mod draf.</p>")}</div></div>`;
    }
    const baris = [];
    const tambah = (kump, label, f, nilai) => baris.push({ kump, label, nilai: nilai != null ? nilai : f.nilai, f });
    tambah("Identiti", "Nama paparan", K.identiti.nama);
    tambah("Identiti", "Lokasi umum", K.identiti.lokasiUmum);
    tambah("Identiti", "Pengenalan", K.identiti.pengenalan);
    K.profil.forEach((p) => tambah("Profil", p.label, p));
    K.pengurusan.senarai.forEach((p) => tambah("Pengurusan", p.jawatan, p, p.nama));
    K.pengajian.teras.forEach((t) => tambah("Pengajian", t.tajuk, t, t.teks));
    K.pengajian.peringkat.forEach((p) => tambah("Peringkat", p.nama, p, p.teks));
    tambah("Kemudahan", "Senarai kemudahan", K.kemudahan, K.kemudahan.senarai.join(", "));
    K.aktiviti.forEach((a) => tambah("Aktiviti", a.tarikh + " " + a.tahun, a, a.tajuk + (a.had ? " — " + a.had : "")));
    K.liputan.forEach((l) => tambah("Liputan", l.tarikh, l, l.ringkasan));
    Object.keys(K.foto).forEach((id) => tambah("Foto", id, Object.assign({ status: K.foto[id].diluluskan ? "facebook" : "perlu-sahkan" }, K.foto[id]), K.foto[id].kapsyen));
    K.video.forEach((v) => tambah("Video", v.tajuk, v, v.teks));
    K.sumbangan.saluranDitemui.forEach((s) => tambah("Sumbangan", s.nama, s, s.teks));
    tambah("Sumbangan", K.sumbangan.projek.tajuk, K.sumbangan.projek, K.sumbangan.projek.teks);

    const kiraan = {};
    baris.forEach((b) => { kiraan[b.f.status] = (kiraan[b.f.status] || 0) + 1; });
    const terbit = baris.filter((b) => { const f = b.f; return K.tetapan.awamIkutDraf || f.wajib || f.diluluskan === true || (f.diluluskan !== false && STATUS_TERBIT.includes(f.status)); }).length;

    const medan = [
      ["Sebelum laman diterbitkan", ["Ejaan rasmi nama", "Poskod rasmi (Google Maps 94700 / KISWA & JAIS 94800)", "Telefon dan WhatsApp", "E-mel urusan", "Pegawai yang menjawab pertanyaan", "Izin penerbitan foto (terutama imej pelajar)"]],
      ["Sebelum membuka permohonan", K.kemasukan.perluDisahkan],
      ["Sebelum memaparkan sumbangan", K.sumbangan.perluDisahkan],
      ["Untuk Tentang Kami", ["Pengasas", "Sejarah", "Tarikh mula operasi", "Visi/misi yang diluluskan", "Pengurusan terkini", "Nombor dan tempoh kelulusan"]],
      ["Untuk Pengajian", K.pengajian.belumAda],
      ["Untuk statistik", ["Jumlah pelajar dan guru semasa", "Alumni", "Bilangan tamat hafazan", "Tarikh rujukan setiap statistik"]],
      ["Untuk kemudahan & keselamatan", ["Kapasiti asrama", "Penyelia", "Makan minum", "Peraturan lawatan", "Dokumen berkaitan keselamatan", "Foto terkini"]]
    ];

    return heroHalaman("Senarai <em>semakan</em>", "Fakta yang digunakan, sumbernya, andaian reka bentuk dan medan yang masih menunggu pengesahan. Halaman ini tidak dipaparkan di laman awam.", "Semakan") + `
    <div class="seksyen"><div class="bekas">
      <section class="blok">
        <h2>Ringkasan</h2>
        <div class="ringkasan-status">
          <div><strong>${baris.length}</strong>Item kandungan dijejak</div>
          <div><strong>${terbit}</strong>Boleh terbit sekarang</div>
          ${Object.keys(LABEL).map((k) => kiraan[k] ? `<div><strong>${kiraan[k]}</strong><span class="lencana lencana--${k}">${LABEL[k]}</span></div>` : "").join("")}
        </div>
        ${notis("", "maklumat", "Cara mengubah", `<p>Semua teks, berita, foto dan hubungan berada dalam <code>kandungan/kandungan.js</code>. Tetapkan <code>diluluskan: true</code> pada item yang sudah disahkan, dan tukar <code>tetapan.mod</code> kepada <code>"awam"</code> sebelum diterbitkan. Gunakan butang “Pratonton laman awam” untuk melihat hasilnya.</p>`)}
      </section>

      <section class="blok">
        <h2>Fakta yang digunakan</h2>
        <div class="jadual-bungkus"><table class="jadual-data">
          <thead><tr><th scope="col">Kumpulan</th><th scope="col">Medan</th><th scope="col">Nilai</th><th scope="col">Status & sumber</th><th scope="col">Nota</th></tr></thead>
          <tbody>${baris.map((b) => `<tr>
            <td>${esc(b.kump)}</td><td><strong>${esc(b.label)}</strong></td><td>${esc(b.nilai)}</td>
            <td>${lencana(b.f)}<br>${sumberPertama(b.f).map((s) => s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.nama)}</a>` : esc(s.nama)).join("<br>")}</td>
            <td>${esc(b.f.catatan || b.f.had || "")}</td>
          </tr>`).join("")}</tbody>
        </table></div>
      </section>

      <section class="blok">
        <h2>Medan menunggu pengesahan</h2>
        ${medan.map(([t, s]) => `<h3 style="font-size:19px;margin:28px 0 12px">${esc(t)}</h3><ul class="senarai-semak">${s.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`).join("")}
      </section>

      <section class="blok">
        <h2>Rekod hubungan bercanggah</h2>
        <p>Lihat jadual penuh di <a href="hubungi.html">halaman Hubungi</a>. ${esc(K.hubungi.rekodCatatan)}</p>
      </section>

      <section class="blok">
        <h2>Andaian reka bentuk</h2>
        <ul class="senarai-semak senarai-semak--ada">${K.andaian.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
      </section>

      <section class="blok">
        <h2>Bahan yang sengaja tidak digunakan</h2>
        <div class="jadual-bungkus"><table class="jadual-data">
          <thead><tr><th scope="col">Bahan</th><th scope="col">Sebab</th></tr></thead>
          <tbody>${K.tidakDigunakan.map((t) => `<tr><td><strong>${esc(t.bahan)}</strong></td><td>${esc(t.sebab)}</td></tr>`).join("")}</tbody>
        </table></div>
      </section>
    </div></div>`;
  }

  /* ---------------- Pasang ---------------- */
  const PEMBINA = { beranda, tentang, pengajian, aktiviti, galeri, kemasukan, sumbangan, hubungi, semakan };
  $("#kepala").innerHTML = binaKepala();
  $("#utama").innerHTML = (PEMBINA[halaman] || beranda)();
  $("#kaki").innerHTML = binaKaki();

  /* ---------------- Interaksi ---------------- */
  // Tukar mod draf / pratonton awam
  $$("[data-tukar-mod]").forEach((b) => b.addEventListener("click", () => {
    const u = new URL(location.href);
    u.searchParams.set("pratonton", b.dataset.tukarMod);
    location.href = u.toString();
  }));

  // Kepala: pekat apabila ditatal (beranda)
  const kepala = $(".kepala");
  if (document.body.classList.contains("ada-hero")) {
    const kemas = () => kepala.classList.toggle("kepala--pekat", window.scrollY > 40);
    kemas();
    window.addEventListener("scroll", kemas, { passive: true });
  }

  // Menu mudah alih
  const nav = $("#nav-utama");
  const bukaMenu = $('.butang-menu[aria-controls="nav-utama"]');
  const tutupMenu = $(".nav__tutup");
  function setMenu(buka) {
    nav.classList.toggle("terbuka", buka);
    bukaMenu.setAttribute("aria-expanded", String(buka));
    document.body.style.overflow = buka ? "hidden" : "";
    if (buka) tutupMenu.focus(); else bukaMenu.focus();
  }
  bukaMenu.addEventListener("click", () => setMenu(true));
  tutupMenu.addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("terbuka")) setMenu(false); });

  // Ticker: jeda / main
  const ticker = $(".ticker");
  if (ticker) {
    const btn = $(".ticker__jeda", ticker);
    const kurang = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = (jeda) => {
      ticker.classList.toggle("jeda", jeda);
      btn.innerHTML = ikon(jeda ? "main" : "jeda");
      btn.setAttribute("aria-label", jeda ? "Mainkan tatalan" : "Jeda tatalan");
    };
    set(kurang);
    btn.addEventListener("click", () => set(!ticker.classList.contains("jeda")));
  }

  // Tab "Mengenali An Nur"
  const senaraiTab = $$('.tab-bar [role="tab"]');
  if (senaraiTab.length) {
    const seksyen = $(".mengenali");
    const pilih = (i, fokus) => {
      senaraiTab.forEach((t, j) => {
        const aktif = i === j;
        t.setAttribute("aria-selected", String(aktif));
        t.tabIndex = aktif ? 0 : -1;
        $("#panel-" + j).hidden = !aktif;
      });
      seksyen.style.setProperty("--latar", $("#panel-" + i).dataset.warna);
      if (fokus) senaraiTab[i].focus();
    };
    senaraiTab.forEach((t, i) => {
      t.addEventListener("click", () => pilih(i));
      t.addEventListener("keydown", (e) => {
        const n = senaraiTab.length;
        if (e.key === "ArrowRight") { e.preventDefault(); pilih((i + 1) % n, true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); pilih((i - 1 + n) % n, true); }
        if (e.key === "Home") { e.preventDefault(); pilih(0, true); }
        if (e.key === "End") { e.preventDefault(); pilih(n - 1, true); }
      });
    });
  }

  // Penapis aktiviti
  $$(".penapis button").forEach((b) => b.addEventListener("click", () => {
    const j = b.dataset.tapis;
    $$(".penapis button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    $$("#senarai-aktiviti .kad-aktiviti").forEach((k) => { k.hidden = j === "media"; });
    $$('[data-kumpulan="media"]').forEach((k) => { k.hidden = j === "madrasah"; });
  }));

  // Kotak lampu galeri
  const lampu = $(".kotak-lampu");
  if (lampu) {
    let asal = null;
    const tutup = () => { lampu.classList.remove("terbuka"); document.body.style.overflow = ""; if (asal) asal.focus(); };
    $$("[data-lampu]").forEach((b) => b.addEventListener("click", () => {
      const f = K.foto[b.dataset.lampu];
      asal = b;
      $("img", lampu).src = f.fail;
      $("img", lampu).alt = f.alt;
      $("p", lampu).textContent = f.kapsyen;
      lampu.classList.add("terbuka");
      document.body.style.overflow = "hidden";
      $("button", lampu).focus();
    }));
    $("button", lampu).addEventListener("click", tutup);
    lampu.addEventListener("click", (e) => { if (e.target === lampu) tutup(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lampu.classList.contains("terbuka")) tutup(); });
  }

  // Borang demonstrasi — tidak menghantar data
  const borang = $("#borang-pertanyaan");
  if (borang) {
    borang.addEventListener("submit", (e) => {
      e.preventDefault();
      $(".borang__mesej", borang).hidden = false;
    });
  }

  // Animasi muncul semasa ditatal
  const unsur = $$(".muncul");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((ent) => ent.forEach((x) => {
      if (x.isIntersecting) { x.target.classList.add("kelihatan"); io.unobserve(x.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    unsur.forEach((u) => io.observe(u));
  } else {
    unsur.forEach((u) => u.classList.add("kelihatan"));
  }

  // Lompat ke anchor selepas kandungan dibina
  if (location.hash) {
    const sasaran = document.getElementById(location.hash.slice(1));
    if (sasaran) setTimeout(() => sasaran.scrollIntoView(), 50);
  }
})();
