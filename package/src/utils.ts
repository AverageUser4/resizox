module.exports.clamp = function clamp(min: number, actual: number, max: number): number {
  return Math.max(Math.min(actual, max), min);
};