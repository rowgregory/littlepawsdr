export const isCapsLock = (e: any) => {
  const charCode = e.charCode;
  const shiftKey = e.shiftKey;
  let capsLock: any = false;

  if (charCode >= 97 && charCode <= 122) {
    capsLock = shiftKey;
  } else if (charCode >= 65 && charCode <= 90 && !shiftKey) {
    capsLock = !shiftKey;
  }

  return capsLock;
};
