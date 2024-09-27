const VerifiedBadge = ({ theme }: { theme: { light: string; darker: string } }) => {
  return (
    <p className={`font-Matter-Light text-xs flex items-center ${theme?.light} rounded-lg p-2`}>
      <span>
        <i
          className={`mr-1.5 flex items-center justify-center fa-solid fa-check ${theme?.darker} h-4 w-4 text-white rounded-full text-xs`}
        ></i>
      </span>
      Verified
    </p>
  );
};

export default VerifiedBadge;
