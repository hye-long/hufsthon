//  총 실행파일

import readline from 'readline';
import { calculateBusTimes } from './calculateBusTime.js';
import { setAlarm } from './alarm/alarm.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  try {
    // 버스 선택
    console.log('사용 가능한 버스: 8800번 버스, 7000번 버스, 3002번 버스, 3007번 버스');
    rl.question('원하는 버스를 선택하세요: ', async (busName) => {
      const busTimes = await calculateBusTimes(busName.trim());

      console.log(`\n=== ${busName} ===`);
      busTimes.forEach((bus, index) => {
        console.log(`${index + 1}. ${bus.time} (${bus.remaining})`);
      });

      // 알람 시간대 선택
      console.log('\n사용 가능한 알람: 1시간, 1시간 30, 2시간, 2시간 30');
      rl.question('알람 시간을 선택하세요: ', (alarmName) => {
        setAlarm(alarmName.trim());
        rl.close();
      });
    });
  } catch (error) {
    console.error('오류 발생:', error.message);
    rl.close();
  }
}

main();
