// 参数说明：
// numberStart：数字的起始值，默认为8000
// numberEnd：数字的结束值，默认为15000
// targetSum：目标数字的和，默认为2100000
// targetCount：目标数字的个数，默认为171
// maxRepeatCount：相同数字的最大重复次数，默认为10
// neighborDiff：相邻数字的最大差值，默认为2
// 返回值：
// 一个数组，包含171个介于8000至15000之间的整数，相邻的数字不相同，且相同的数字不超过20个，最终所有数字相加为2100000
// 示例：
// 输入：generateNumbers(8000, 15000, 2100000, 171, 10, 2)
function generateNumbers(numberStart = 8000, numberEnd = 15000, targetSum = 2100000, targetCount = 171, maxRepeatCount = 10, neighborDiff = 2) {
  let numbers = [];
  while (numbers.length < targetCount) {
      // 重复生成不相邻的数字，且严格要求其差值不小于neighborDiff
      let num = Math.floor(Math.random() * (numberEnd - numberStart + 1)) + 8000;
      if (numbers.length > 0 && Math.abs(num - numbers[numbers.length - 1].value) <= neighborDiff + 1) {
          continue;
      }
      numbers.push({value: num});
  }
  // 求和
  const sum = (arr) => {
      return arr.reduce((acc, cur) => acc + cur.value, 0)
  }
  // 按出现次数分组
  const getRepeatNumberAndCount = (arr) => {
      const groups = {}
      arr.forEach((num) => {
        if (groups[num.value]) {
          groups[num.value] += 1
        } else {
          groups[num.value] = 1
        }
      })
      const list = Object.keys(groups).map((key) => {
        return {
          value: key,
          count: groups[key]
        }
      })
      const sorted = list.sort((a, b) => b.count - a.count)
      return sorted
  }
  // 如果重复个数超出maxRepeatCount，则对应位置的数字重新生成后再检查，直到生成的数字满足重复要求
  while (getRepeatNumberAndCount(numbers)[0].count > maxRepeatCount) {
      // 如果重复的数，超出20个了，则对超出的数字重新生成
      const item = getRepeatNumberAndCount(numbers)[0]
      for (let i = 0; i < item.count - 20; i++) {
          const index = numbers.findIndex((num) => num.value === item.value)
          const num = Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000;
          // 替换一个新数字
          numbers.splice(index, 1, {value: num})
      }
  }
  // 求和验证
  while (sum(numbers) !== targetSum) {
    // 如果加和超出了目标数字，则每个数字减去多余的平均数，以便趋于目标和
    while (sum(numbers) > targetSum) {
        const avg = Math.ceil((sum(numbers) - targetSum) / targetCount)
        if (avg === 0) {
          break;
        }
        numbers = numbers.map((num) => {
          return {value: num.value - avg}
        })
    }
    // 如果加和小于目标数字，则每个数字加上多余的平均数，以便趋于目标和
    while (sum(numbers) < targetSum) {
        const avg = Math.ceil((targetSum - sum(numbers)) / targetCount)
        if (avg === 0) {
          break;
        }
        console.log('avg:', avg); // 输出最终的数字数组，每个数字之间用空格分隔，最后一个数字后面没有空格
        numbers = numbers.map((num) => {
          return {value: num.value + avg}
        })
    } 
    // 最终对多余的总数进行微调，多余的数的个数都减1即可
    const diff = sum(numbers) - targetSum;
    if (diff > 0) {
      // 直接前面的数字减去差值1
      for (let i = 0; i < diff; i++) {
        numbers[numbers.length - 1 - i].value -= 1;
      }
    }
    console.log('sum5:', sum(numbers)); // 输出最终的数字数组，每个数字之间用空格分隔，最后一个数字后面没有空格
  }
  console.log('numbers', numbers.map((num) => num.value).join(' '));
  return numbers
}

generateNumbers();