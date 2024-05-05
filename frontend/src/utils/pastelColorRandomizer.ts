export const pastelColorRandomizer = () => {
  const r = Math.floor(Math.random() * 55 + 200);
  const g = Math.floor(Math.random() * 55 + 200);
  const b = Math.floor(Math.random() * 55 + 200);

  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

  return color;
};
