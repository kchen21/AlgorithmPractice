// Write a function to flatten an array.

function flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

const flatten = (arr) => {
  const flattenedArr = [];

  for (let idx = 0; idx < arr.length; idx++) {
    if (Array.isArray(arr[idx])) {
      flattenedArr = flattenedArr.concat(flatten(arr[idx]));
    } else {
      flattenedArr.push(arr[idx]);
    }
  }

  return flattenedArr;
};
