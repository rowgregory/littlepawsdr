export const pastelColorRandomizer = () => {
  // Generate random values for the red, green, and blue components
  const r = Math.floor(Math.random() * 55 + 200); // Red: 200-255
  const g = Math.floor(Math.random() * 55 + 200); // Green: 200-255
  const b = Math.floor(Math.random() * 55 + 200); // Blue: 200-255

  // Convert the RGB values to a hexadecimal color code
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

  return color;
};
