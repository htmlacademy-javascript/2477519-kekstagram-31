// 1-ое задание (Проверка на количество символов)
function result(string, maxSymbols) {
  //Добавляем условие через тернарный оператор
  return string.length <= maxSymbols ? 'true' : 'false';
}

result('проверяемая строка', 20);
result('проверяемая строка', 18);
result('проверяемая строка', 10);

// Делу - время
function checkMeetingTime(startWork, endWork, startMeeting, meetingDuration) {
  const start = startWork.split(':');
  const end = endWork.split(':');
  const meeting = startMeeting.split(':');

  // Преобразуем принятое время в объект Date
  const workStart = new Date();
  workStart.setHours(Number(start[0]));
  workStart.setMinutes(Number(start[1]));

  const workEnd = new Date();
  workEnd.setHours(Number(end[0]));
  workEnd.setMinutes(Number(end[1]));

  const meetingStart = new Date();
  meetingStart.setHours(Number(meeting[0]));
  meetingStart.setMinutes(Number(meeting[1]));

  // Если встреча начинается до начала рабочего дня - false
  if (meetingStart < workStart) {
    return false;
  } else {
    // Прибавим продолжительность встречи к времени начала встречи
    meetingStart.setMinutes(meetingStart.getMinutes() + meetingDuration);

    // Проверяем попадает ли время встречи в рабочее время
    return meetingStart >= workStart && meetingStart <= workEnd;
  }
}

checkMeetingTime('08:00', '17:30', '14:00', 90);
checkMeetingTime('8:0', '10:0', '8:0', 120);
checkMeetingTime('08:00', '14:30', '14:00', 90);
checkMeetingTime('14:00', '17:30', '08:0', 90);
checkMeetingTime('8:00', '17:30', '08:00', 900);
checkMeetingTime('7:00', '19:00', '08:00', 180); //Встреча начинается раньше начала рабочего дня

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  const num1 = num % 10;
  const num2 = num % 100;

  if(num2 === 11 || num2 === 12 || num2 === 13 || num2 === 14) {
    return (genitivePlural);
  } else if(num1 >= 2 && num1 <= 4) {
    return (genitiveSingular);
  } else if(num1 === 1) {
    return (nominative);
  } else {
    return (genitivePlural);
  }
};


numDecline(38, 'рубль', 'рубля', 'рублей');
numDecline(220, 'рубль', 'рубля', 'рублей');
numDecline(12, 'гость', 'гостя', 'гостей');
numDecline(121, 'рубль', 'рубля', 'рублей');
