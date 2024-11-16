import fs from 'fs/promises';

/**
 * 알람 설정 및 실행
 * @param {string} alarmName - 선택한 알람 이름 (예: "10분")
 */
export async function setAlarm(alarmName) {
  try {
    // JSON 파일 읽기
    const data = await fs.readFile('./alarm/alarm.json', 'utf-8');
    const alarmData = JSON.parse(data)[alarmName];

    if (!alarmData) {
      throw new Error(`"${alarmName}"에 대한 알람 설정을 찾을 수 없습니다.`);
    }

    const { interval, message } = alarmData;


    // 알람 간격 및 메시지 출력
    console.log(`🔔 ${interval} 분 전으로 알람이 설정되었습니다.`);
  

    // 알람 실행 (주석 처리된 코드)
    /*
    setInterval(() => {
      console.log(`🔔 ${message}`);
    }, interval * 60 * 1000); 
    */

  } catch (error) {
    console.error('알람 설정 중 오류 발생:', error.message);
  }
}
