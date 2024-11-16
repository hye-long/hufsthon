// 사용자의 컴퓨터나 객체에서 현재 시간을 받아오는 알고리즘

import { DateTime } from 'luxon';

export function getCurrentTime() {
    
  // 사용자의 현재 시간을 Luxon DateTime 객체로 반환
  // Date 객체는 위험해성 ..
  return DateTime.local();
}
