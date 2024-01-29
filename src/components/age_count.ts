export function calculateAge(birthdate: Date) {
  const birthdateObj = new Date(birthdate);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - birthdateObj.getFullYear();
  const monthsDiff = currentDate.getMonth() - birthdateObj.getMonth();

  // Check if the birthday hasn't occurred yet this year
  if (
    monthsDiff < 0 ||
    (monthsDiff === 0 && currentDate.getDate() < birthdateObj.getDate())
  ) {
    return yearsDiff - 1;
  }

  return yearsDiff;
}
