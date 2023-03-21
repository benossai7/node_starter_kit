"use strict";

const v8 = require("v8");
const stat = v8.getHeapStatistics();
console.log(stat);
