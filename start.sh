#!/bin/bash
echo "========================================================"
echo "  Запуск учебного портала: Академия МВД РК"
echo "  Современные информационные угрозы и методы защиты"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null
then
    echo "[ОШИБКА] Node.js не найден. Установите Node.js с https://nodejs.org/"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[ИНФО] Первичная установка зависимостей..."
    npm install
fi

echo "[УСПЕХ] Запуск локального сервера http://localhost:3000..."
npm run dev
