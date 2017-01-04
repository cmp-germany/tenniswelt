const minSm = 768;
const minMd = 992;
const minLg = 1200;


const xs = "(max-width: " + (minSm - 1)  + "px)";
const sm = "(min-width: " + (minSm) + "px) and (max-width: " + (minMd - 1) + "px)";
const md = "(min-width: " + (minMd) + "px) and (max-width: " + (minLg - 1) + "px)";
const lg = "(min-width: " + (minLg) + "px)";

export {xs, sm, md, lg}
