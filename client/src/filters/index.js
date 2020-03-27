import Vue from 'vue';

Vue.filter('formatDate', function (value) {
    let date = new Date(parseInt(value));
    return new Intl.DateTimeFormat('pt-BR').format(date);
});

Vue.filter('formatTime', function (value) {
    const options = {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'America/Sao_Paulo'
    };
    value = parseInt(value);
    let date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
});