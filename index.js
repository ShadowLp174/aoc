var fs = require("file-system");

// DAY 1
fs.readFile("inputs/day1.txt", "utf8", (err, file) => {
  var input = file.replace(/\r/g, "").split("\n");
  var count = 0;
  input.forEach((data, i) => {
    if (i != 0) {
      if (parseInt(data) > parseInt(input[i - 1])) {
        count++;
      }
    }
  });
  console.log("part1: " + count)
});

fs.readFile("inputs/day1.txt", "utf8", (err, file) => {
  var input = file.replace(/\r/g, "").split("\n");
  var count = 0;
  var sums = [];
  for (let i = 0; i < input.length; i++) {
    let sum = parseInt(input[i]) + parseInt(input[i + 1]) + parseInt(input[i + 2]);
    sums.push(sum);
  }
  sums.forEach((sum, i) => {
    if (i!=0) {
      if (sum > sums[i - 1]) {
        count++;
      }
    }
  });
  console.log("part2: " + count);
});
