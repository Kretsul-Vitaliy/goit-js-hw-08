import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';
// console.log(localStorageKey);
// отслеживаем событие timeupdate
function onTimeUpdate(evt) {
    localStorage.setItem(localStorageKey, evt.seconds);
    console.log(`'Просмотрел видео' ${evt.seconds}`); 
}
// сохраняем локальный кэш
const saveTime = localStorage.getItem(localStorageKey);
console.log(saveTime);
if (saveTime) {
    player.setCurrentTime(saveTime);
}
player.on('timeupdate', throttle(onTimeUpdate, 1000));

// Получаем title название видео
player.getVideoTitle().then(function(title) {
        console.log('title:', title);
});