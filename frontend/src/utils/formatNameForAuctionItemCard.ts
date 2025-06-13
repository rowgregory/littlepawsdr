const formatNameForAuctionItemCard = (fullName: string) => {
  if (!fullName || typeof fullName !== 'string') {
    // Return an empty string or handle the error case however you prefer
    return '';
  }

  const nameParts = fullName.trim()?.split(/\s+/);

  // Get the first name
  const firstName = nameParts[0];

  // Get the last name initial, checking if there's a last name
  const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';

  // If there's no last name, just return the first name
  return lastNameInitial ? `${firstName} ${lastNameInitial}` : firstName;
};

export default formatNameForAuctionItemCard;
