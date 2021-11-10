let arr = [
{key: 'ABC' , val:[15, 10, 2, 15]},
{key: 'DEF' , val:[15, 12, 5]},
{key: 'GHI' , val:[18, 30]}
];

const countocc=(arr,value)=>{arr.reduce((a,v)=>(v==value ? a+1:a),0)};
var newarr=[];
arr.forEach((key,value)=>{
var narray = value.val;
var nkey = value.val;
var count = countocc(narray,15);

 newarr[nkey] = count;
})
console.log(newarr);