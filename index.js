var fs = require("file-system");

// DAY 1
fs.readFile("inputs/day1.txt", "utf8", (err, file) => {
  console.log("-----------DAY 1-------------")
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


// DAY 2
fs.readFile("inputs/day2.txt", "utf8", (err, file) => {
  console.log("-----------DAY 2-------------")
  var input = file.replace(/\r/g, "").split("\n");
  var x = 0;
  var y = 0;
  input.forEach((item, i) => {
    let type = item.split(" ")[0];
    switch (type) {
      case "forward":
        x = parseInt(item.split(" ")[1]) + parseInt(x);
        break;
      case "down":
        y = parseInt(item.split(" ")[1]) + parseInt(y);
        break;
      case "up":
        y -= item.split(" ")[1];
        break;
      default:
        break;
    }
  });
  console.log("part1: x, y: " + x + ", " + y + "; " + (x*y));
  x = 0;
  y = 0;
  var aim = 0;
  input.forEach((item, i) => {
    let type = item.split(" ")[0];
    switch (type) {
      case "forward":
        x = parseInt(item.split(" ")[1]) + parseInt(x);
        y = parseInt(y) + (aim * item.split(" ")[1]);
        break;
      case "down":
        aim = parseInt(item.split(" ")[1]) + parseInt(aim);
        break;
      case "up":
        aim -= item.split(" ")[1];
        break;
      default:
        break;
    }
  });
  console.log("part2: x, y, aim: ", x, y, aim + "; " + (x*y));
});

// DAY 3
fs.readFile("inputs/day3.txt", "utf8", (err, file) => {
  console.log("-----------DAY 3-------------")
  var input = file.replace(/\r/g, "").split("\n");
  var bits = [];
  input.forEach((item, i) => {
    item.split("").forEach((bit, i1) => {
      if (!bits[i1]) {
        bits[i1] = "" + bit;
      } else {
        bits[i1] += "" + bit;
      }
    });
  });
  var gamma = "";
  var epsilon = "";
  bits.forEach((bitItem, i) => {
    var count = [(bitItem.match(/0/g) || []).length,(bitItem.match(/1/g) || []).length];
    gamma += (count[1] < count[0]) ? "0" : "1";
    epsilon += (count[1] > count[0]) ? "0" : "1";
  });
  console.log("part1: gamma, epsilon, power: " + parseInt(gamma, 2) + ", " + parseInt(epsilon, 2) + ", " + (parseInt(gamma, 2) * parseInt(epsilon, 2)));

  function oxygenMatchItems(items, i) {
    if (i >= input[0].split("").length || items.length == 1) {return items;}
    var column = items.map((bitItem) => bitItem[i]).join("");
    var count = [(column.match(/0/g) || []).length,(column.match(/1/g) || []).length];
    var filterFunc = (count[1] > count[0]) ? (item) => {return item[i] == "1"} : (item) => {return item[i] == "0"};
    filterFunc = (count[1] == count[0]) ? (item) => {return item[i] == "1"} : filterFunc;
    return oxygenMatchItems(items.filter(filterFunc), i + 1);
  }
  function scrubberMatchItems(items, i) {
    if (i >= input[0].split("").length || items.length == 1) {return items;}
    var column = items.map((bitItem) => bitItem[i]).join("");
    var count = [(column.match(/0/g) || []).length,(column.match(/1/g) || []).length];
    var filterFunc = (count[1] > count[0]) ? (item) => {return item[i] == "0"} : (item) => {return item[i] == "1"};
    filterFunc = (count[1] == count[0]) ? (item) => {return item[i] == "0"} : filterFunc;
    return scrubberMatchItems(items.filter(filterFunc), i + 1);
  }
  var oxygen = oxygenMatchItems(input, 0).join("");
  var scrubber = scrubberMatchItems(input, 0).join("");
  console.log("part2: oxygen, scrubber, life support: " + parseInt(oxygen, 2) + ", " + parseInt(scrubber, 2) + "," + (parseInt(oxygen,2) * parseInt(scrubber,2)));
});
