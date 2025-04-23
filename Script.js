// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Разворачиваем приложение на весь экран
tg.expand();

// Элементы интерфейса
const btn = document.getElementById('btn');
const userInfo = document.getElementById('user-info');

// Получаем данные пользователя
const user = tg.initDataUnsafe.user;
if (user) {
    userInfo.innerHTML = `
        <p>👤 Ваш ID: ${user.id}</p>
        <p>🪪 Имя: ${user.first_name || 'Не указано'}</p>
        ${user.last_name ? `<p>Фамилия: ${user.last_name}</p>` : ''}
        ${user.username ? `<p>@${user.username}</p>` : ''}
    `;
}

// Обработчик кнопки
btn.addEventListener('click', () => {
    // Отправляем данные в Telegram
    tg.sendData(JSON.stringify({
        action: 'button_click',
        time: new Date().toLocaleTimeString()
    }));
    
    // Показываем всплывающее окно
    tg.showAlert('Данные отправлены!');
    
    // Закрываем приложение (опционально)
    // tg.close();
});

// Инициализация темы (светлая/тёмная)
document.body.className = tg.colorScheme;
tg.onEvent('themeChanged', () => {
    document.body.className = tg.colorScheme;
});
