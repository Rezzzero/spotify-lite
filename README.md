# 🎧 Spotify Lite

Небольшой, но мощный клон Spotify. Здесь уже есть поиск, страницы артистов, треков, альбомов и дискографий. Работает быстро, выглядит аккуратно и с каждым коммитом всё больше похож на настоящий музыкальный сервис.

## 🚀 Технологии

- ⚛️ React + Vite + TypeScript
- 🎨 TailwindCSS + Material UI
- 🌐 React Router DOM
- 🎧 Swiper JS (для слайдеров)
- 🎨 react-extract-colors (генерация палитры из обложек)
- 📡 Axios
- ⚡ Redis
- 🔀 concurrently (одновременный запуск клиента и сервера)

## 🔗 Используемые API
- [Spotify API](https://developer.spotify.com/documentation/web-api/) — данные о треках, артистах, плейлистах, альбомах, поиск и т.д.
- [Upstash Redis](https://upstash.com/) — кеширование данных (популярные артисты, треки и новые релизы)
- [SoundCloud (в планах)](https://developers.soundcloud.com/) — получение mp3 треков для плеера
- [Supabase (в планах)](https://supabase.com/) — авторизация, ведение плейлистов и тд.

## 🛠️ Скрипты

```bash
# Запуск клиента
npm run client

# Запуск сервера
npm run server

# Одновременный запуск клиента и сервера
npm run dev

# Сборка проекта
npm run build

# Предпросмотр production-сборки
npm run preview

# Линтинг
npm run lint

```

## 📦 Установка

```bash 
git clone https://github.com/Rezzzero/spotify-lite.git
cd spotify-lite
npm install
npm run dev
```

## 💡 Возможности
- 🔎 Поиск треков, артистов и альбомов
- 👤 Страницы артистов с дискографией
- 🎵 Просмотр треков и альбомов

## 📌 Планы
- 🎧 Аудиоплеер
- ❤️ Ведение плейлистов и добавление треков в избранные

