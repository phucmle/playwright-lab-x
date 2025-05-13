function getCurrentDate() {
  const today = new Date();
  console.log("🚀 ~ getCurrentDate ~ today:", today);
  let date: string | number = today.getDate();
  //The month in JavaScript's Date object is zero-indexed (0-11 instead of 1-12)
  let month: string | number = today.getMonth() + 1; // Add 1 because months are 0-indexed
  const year = today.getFullYear();

  date = String(date).padStart(2, "0");
  month = String(month).padStart(2, "0");

  console.log(`Current date is: ${date}/${month}/${year}`);
}

getCurrentDate();
