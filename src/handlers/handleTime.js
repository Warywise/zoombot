const MAX_SECOND = 51;
const MAX_SECOND_HIDDEN = 29;
const MAX_MINUTE = 59;
const MAX_HOUR = 23;

const isSecondMax = (currentSecond) => {
  if (document.hidden) {
    return +(currentSecond) >= MAX_SECOND_HIDDEN;
  }
  return +(currentSecond) >= MAX_SECOND;
};

const isMinuteMax = (currentMinute) => currentMinute >= MAX_MINUTE;

const isHourMax = (currentHour) => currentHour >= MAX_HOUR;

export default function handleTime(currentTime) {
  const timeContent = (currentTime).match(/\d+/g) || [0, 0, 0];
  const time = {
    hour: { check: isHourMax(timeContent[0]), unit: +(timeContent[0]) },
    min: { check: isMinuteMax(timeContent[1]), unit: +(timeContent[1]) },
    sec: { check: isSecondMax(timeContent[2]), unit: +(timeContent[2]) },
  };

  if (time.hour.check && time.min.check && time.sec.check) {
    return [0, 0];
  }

  if (!time.hour.check && time.min.check && time.sec.check) {
    time.hour.unit += 1;
    time.min.unit = 0;
  }

  if (!time.hour.check && !time.min.check && time.sec.check) {
    time.min.unit += 1;
  }

  return [time.hour.unit, time.min.unit];
}
