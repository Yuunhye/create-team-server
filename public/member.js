const members = {
    0: ["이마빔맞은깡패", "bronze", "adc", "mid", "아리", "5"],
    1: ["dolmu", "platinum", "top", "sup", "가렌", "2"],
    2: ["앙큼FOX", "gold", "sup", "jg", "갈리오", "4"],
    3: ["냥냥냥코", "bronze", "sup", "adc", "라칸", "5"],
    4: ["돈절래", "platinum", "top", "adc", "잭스", "2"],
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