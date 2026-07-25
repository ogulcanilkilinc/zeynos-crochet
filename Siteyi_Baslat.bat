@echo off
title Zeyno's Crochet Yerel Sunucu Yoneticisi
chcp 65001 > nul
echo ==================================================
echo         Zeyno's Crochet - Yerel Sunucu
echo ==================================================
echo.
echo [1/3] Next.js sunucusu arka planda başlatılıyor...
echo.

cd /d "C:\Users\user\.gemini\antigravity\scratch\zeynos-crochet"

:: Siyah komut satırını arka planda Next.js sunucusu olarak çalıştırır
start "Zeynos Crochet Dev Server" cmd /k "npm run dev"

echo [2/3] Sunucunun hazır olması bekleniyor (4 saniye)...
timeout /t 4 /nobreak >nul

echo.
echo [3/3] Site tarayıcıda açılıyor...
echo.

:: Sitenin varsayılan adresi (Port 3000)
start http://localhost:3000/tr

:: Eğer port çakışması varsa alternatif adres (Port 3001)
start http://localhost:3001/tr

echo.
echo ==================================================
echo BAŞARILI!
echo.
echo * Tarayıcınızda açılan pencerelerden çalışan adresi kullanabilirsiniz.
echo * Arka planda açılan siyah komut satırını (Next.js sunucusu) kapatmadığınız
echo   sürece site çalışmaya devam edecektir. Siteden çıkmak istediğinizde
echo   o siyah ekranı kapatabilirsiniz.
echo ==================================================
echo.
timeout /t 6
exit
