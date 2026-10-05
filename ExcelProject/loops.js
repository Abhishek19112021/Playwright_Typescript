try {
  let num = 10 / 0;
  if (!isFinite(num)) throw new Error("Division by zero!");
  console.log(num);
} catch (error) {
  console.error("Error occurred:", error.message);
}