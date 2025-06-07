const Close = ({ additionalInfo }) => {
  const daysKor = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date();
  const todayStr = daysKor[today.getDay()];  
  const isWeekend = todayStr === '토' || todayStr === '일';

  if (!additionalInfo) return <span> </span>;

  const infoStr = additionalInfo.replace(/\[.*?\]/g, ''); // [영업시간] 제거
  const segments = infoStr.split(';').map(s => s.trim()).filter(Boolean);

  let openStr, closeStr;

  for (const segment of segments) {
    const match = segment.match(/(매일|주말|[일월화수목금토])\s(\d{2}:\d{2})~(\d{2}:\d{2})/);
    if (!match) continue;

    const [_, day, open, close] = match;

    if (
      day === todayStr || 
      day === '매일' || 
      (day === '주말' && isWeekend)
    ) {
      openStr = open;
      closeStr = close;
      if (day === todayStr) break; // 요일 우선
    }
  }

  console.log(segments);

  if (!openStr || !closeStr) return <span> </span>;  

  // 24시간 영업 처리: open == close == 00:00
  if (openStr === '00:00' && closeStr === '00:00') {
    return <span style={{ color: 'green', fontWeight: 'bold' }}>24시간 영업</span>;
  }

  const [openH, openM] = openStr.split(':').map(Number);
  const [closeH, closeM] = closeStr.split(':').map(Number);
  const now = today.getHours() * 60 + today.getMinutes();
  const open = openH * 60 + openM;
  let close = closeH * 60 + closeM;

  // 자정 넘김 보정 (예: 17:00~02:00)
  if (close < open) close += 24 * 60;

  const isOpen = now >= open && now <= close;

  return (
    <span style={{ color: isOpen ? 'green' : '#df563f', fontWeight: 'bold' }}>
      {isOpen ? 'Open' : 'Closed'}
    </span>
  );
};

export default Close;
