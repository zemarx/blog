let monthLocalization = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

export default function localizeDate(monthNum) {
    return monthLocalization[monthNum];
}
