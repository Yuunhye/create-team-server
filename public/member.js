const members = { 
    1: ["dolmu", "platinum", "top", "sup", "가렌", "1"],
    2: ["즈애훈", "platinum", "mid", "adc", "조이", "1"],
    3: ["그랩앞에모두평등", "gold", "adc", "sup", "자야", "1"],
    4: ["key보드모짜르트", "gold", "sup", "sup", "제라스", "1"],
    5: ["플레혁", "gold", "adc", "adc", "트위치", "2"],
    6: ["서 고 낭", "gold", "jg", "sup", "비에고", "2"],
    7: ["앙큼FOX", "gold", "sup", "jg", "제라스", "2"],
    8: ["only one mid", "gold", "mid", "sup", "제드", "2"],
    9: ["프로틴 쉐이크", "silver", "adc", "sup", "징크스", "3"],
    10: ["조민준은 참지않아", "silver", "top", "mid", "잭스", "3"],
    11: ["나죽여봤자에요", "silver", "mid", "top", "르블랑", "3"],
    12: ["선명해", "bronze", "mid", "jg", "갈리오", "3"],
    13: ["냥냥냥코", "bronze", "sup", "adc", "라칸", "4"],
    14: ["재학이요", "bronze", "sup", "sup", "블리츠크랭크", "4"],
    15: ["이수근다섯개", "bronze", "sup", "sup", "쓰레쉬", "4"],
    16: ["이마빔맞은깡패", "bronze", "adc", "mid", "아리", "4"]
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
		// 무작위로 index 값 생성 (0 이상 i 이하)
    let j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const randomKeys = Object.keys(members);
shuffle(randomKeys);

module.exports = {members, randomKeys};