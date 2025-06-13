const capitalizeName = (fullName: string) => {
  // Split the full name into an array of names
  const names = fullName?.split(' ');

  // Capitalize the first letter of each name and concatenate
  const capitalizedNames = names.map((name) => {
    if (name.length === 0) return ''; // Handle empty names
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Capitalize first letter and lower the rest
  });

  // Join the capitalized names back into a single string
  return capitalizedNames.join(' ');
};

export default capitalizeName;
