import getTimeValues from './handleTime';

export default function getTimeStringUnits(currentTime) {
  const MIN_VALUE = 10;
  const timeValues = getTimeValues(currentTime);

  const timeStrings = timeValues.reduce((acc, cur) => {
    acc.push(cur < MIN_VALUE ? `0${cur}` : `${cur}`);
    return acc;
  }, []);

  return { hour: timeStrings[0], minute: timeStrings[1] };
}
