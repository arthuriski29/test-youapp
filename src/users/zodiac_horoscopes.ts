export const getZodiacHoroscopes = (birthdate: Date): any => {
  const month = birthdate.getMonth() + 1;
  const day = birthdate.getDate();
  let zodiacTemp = '';
  let horoscopeTemp = '';

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    zodiacTemp = 'Aries';
    horoscopeTemp = 'Rum';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    zodiacTemp = 'Taurus';
    horoscopeTemp = 'Bull';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    zodiacTemp = 'Gemini';
    horoscopeTemp = 'Twins';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    zodiacTemp = 'Cancer';
    horoscopeTemp = 'Crab';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    zodiacTemp = 'Leo';
    horoscopeTemp = 'Lion';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    zodiacTemp = 'Virgo';
    horoscopeTemp = 'Virgin';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    zodiacTemp = 'Libra';
    horoscopeTemp = 'Balance';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    zodiacTemp = 'Scorpius';
    horoscopeTemp = 'Scorpion';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    zodiacTemp = 'Sagittarius';
    horoscopeTemp = 'Archer';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    zodiacTemp = 'Capricornus';
    horoscopeTemp = 'Goat';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    zodiacTemp = 'Aquarius';
    horoscopeTemp = 'Water Bearer';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    zodiacTemp = 'Pisces';
    horoscopeTemp = 'Fish';
    return {
      zodiacTemp,
      horoscopeTemp,
    };
  }
};
