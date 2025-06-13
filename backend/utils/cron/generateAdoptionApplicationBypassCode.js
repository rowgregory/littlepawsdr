function generateAdoptionApplicationFeeBypassCode() {
  // Function to generate a random string of specified length
  function generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  // Function to generate a random 2-character code
  function generateRandomCode() {
    return generateRandomString(2).toUpperCase();
  }

  // Function to generate a random 3-digit number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  // Generate the final code
  const prefix = 'DOXIE-';
  const middlePart = `${generateRandomCode()}${generateRandomNumber()}`;
  const randomChars = generateRandomString(5);

  return `${prefix}${middlePart}${randomChars}`;
}

export default generateAdoptionApplicationFeeBypassCode;
