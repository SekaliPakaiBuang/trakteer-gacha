
# Trakteer Gacha by SekaliPakaiBuang

Intinya spin wheel, tapi terintegrasi dengan Trakteer.

## Fitur

- Spin wheel pada umumnya
- Autospin ketika ada traktiran masuk
- Data disimpan di browser, saya nggak ngambil datanya

## Yang Kamu Butuhkan

- OBS Studio, yang versi terbaru biar gampang
- Channel ID dari akun kreator Trakteer kamu

## Yang Kamu Harus Lakukan

- [Siapkan channel ID Trakteer](https://trakteer.id/manage/webhook/websocket)
- Buka OBS Studio, tambah browser source baru (kalo gatau caranya cari di internet)
- Copy link github pagenya (dibawahnya about section repo ini) masukin di URL Browser Source
- Ganti width & height sesuai kebutuhan (saranku sih width 320)
- Pencet OK

## Yang Bisa Kamu Lakukan

Kalo kalian merasa overlay nya kok jelek tampilannya apa gimana, kalian bisa modifikasi dengan 2 cara:
1. Pake Custom CSS (biar gampang)
2. Edit file nya langsung (kalo kalian merasa custom css nanggung karena udah punya filenya)

### Cara 1: Pake Custom CSS

- Klik kanan browser source, pilih Properties
- Cari tulisan Custom CSS, kalo gak kelihatan scroll kebawah
- Edit dari situ

> [!NOTE]
> Pastikan kalian mudeng CSS ya adik-adik, kalo gak mudeng mending minta tolong temenmu

### Cara 2: Edit filenya langsung

Kalo kalian mau lebih dari sekedar ganti warna, misal mau ganti layout,  
ganti codingannya sekalian biar gak kayak timer donathon lagi mungkin /chuaksssss  
kalian bisa edit filenya.

Kan open source, mending di edit sekalian gak sih, syukur-syukur hosting sendiri ygy.

> [!NOTE]
> Pastikan kalian mudeng HTML, JS, dan CSS ya adik-adik, kalo gak mudeng mending minta tolong temenmu

## Yang Harus Kamu Perhatikan

Ada beberapa menu dalam app ini, dan penjelasannya ada di bawah.

-  **Channel ID**  
Belum tahu cara carinya? Scroll lagi ke atas.  
Ini biar Trakteer Websocket bisa tahu kalau ada yang traktir.

-  **Unit Requirement** (Default: 5 "Memory Chips")  
Sebelah kiri itu unit minimum untuk spin, sebelah kanan itu nama unitnya (tergantung kalian).  
Ini biar bisa nampilin tulisan "berapa unit = 1 spin".
  

-  **Collection Mode**  
Collection mode adalah mode untuk menentukan bagaimana mengubah jumlah traktiran agar jadi spin.
    1. **Normal Mode** (Default)  
    Unit Requirement itu jumlah traktiran minimum. Jika sekali traktir lebih dari atau sama dengan jumlah unit requirement, dapat 1 kali spin, begitu pula sebaliknya.
    2. **Stack Mode**  
    Unit Requirement itu jumlah traktiran minimum **dan berlaku kelipatan**. Misal minimal 10 dan traktiran 30, bakal dapat 3 kali spin. Sisa tidak diakumulasikan.
    3. **Accumulative Mode**  
    Sama kaya Stack tapi sisa diakumulasikan, biar spin berikutnya lebih murah karena sudah patungan sama yang traktir sebelumnya.

- **Autospin on Donation** (Default: off)  
Spin bakal langsung dilakukan saat ada traktiran masuk.
> [!IMPORTANT]
> Jika collection mode yang pakai adalah Stack atau Accumulative dan dapat spinnya lebih dari 1, maka spin otomatisnya cuma 1 kali, sisanya harus spin manual.

> [!IMPORTANT]
> Jika ada traktiran masuk saat lagi spin, maka traktiran itu nggak dispin otomatis.
- **Items to Pick**  
Daftar nama/batsu/apapun yang mau dispin.  
Untuk mengacak tekan tombol Randomize.

> [!IMPORTANT]
> JANGAN LUPA DISAVE. Randomize juga melakukan save, tapi tahapnya itu simpan, acak, simpan lagi.