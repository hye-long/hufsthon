//버스시간 계산하기
import { DateTime } from 'luxon';
import fs from 'fs/promises';

/**
 * 버스 시간 계산
 * @param {string} busName - 선택한 버스 이름
 * @returns {Object[]} 버스 시간과 남은 시간을 배열로 반환
 */
export async function calculateBusTimes(busName) {
  const data = await fs.readFile('./busData.json', 'utf-8');
  const busData = JSON.parse(data)[busName];

  if (!busData) {
    throw new Error(`"${busName}" 에 대한 정보가 없습니다.`);
  }

  const { lastTime, interval } = busData;
  const now = DateTime.local();
  const [lastHour, lastMinute] = lastTime.split(':').map(Number);
  const lastBusTime = now.set({ hour: lastHour, minute: lastMinute, second: 0 });

  const results = [];
  let nextBusTime = lastBusTime;

  
  // 막차부터 배차간격으로 이전 버스들 계산
while (nextBusTime >= now) {
  const diff = nextBusTime.diff(now, ['hours', 'minutes']);

  // 결과에 막차 여부를 추가
  if (results.length === 0) {
    results.push({
      time: nextBusTime.toFormat('HH:mm'),
      remaining: `막차에요! (${Math.floor(diff.hours)}시간 ${Math.round(diff.minutes)}분 남음)`
    });
  } else {
    results.push({
      time: nextBusTime.toFormat('HH:mm'),
      remaining: `${Math.floor(diff.hours)}시간 ${Math.round(diff.minutes)}분 남음`
    });
  }

  nextBusTime = nextBusTime.minus({ minutes: parseInt(interval, 10) });
}

return results;

}
