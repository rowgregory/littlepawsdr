const BottomInfo = () => {
  return (
    <div className='flex flex-col gap-5 mt-12'>
      <div className='flex flex-col'>
        <p className='font-QBold text-lg text-charcoal mb-3'>Dogs Adopted in New England</p>
        <p className='font-QBook text-sm'>
          Dogs adopted in New England are subject to additional rules and regulations by the state
          departments of agriculture. Complying with these regulations is expensive for our rescue,
          and some dogs adopted in New England states are charged an additional $175.00 to cover
          regulatory requirements.
        </p>
      </div>
      <div className='flex flex-col'>
        <p className='font-QBold text-lg text-charcoal mb-3'>
          Transportation Help and Distance Restrictions
        </p>
        <p className='font-QBook text-sm'>
          Volunteer transport can be arranged if you see a dog that is a good match for your family.
          The cost for volunteer transport includes a health certificate (required by law and issued
          by a veterinarian), a crate (which all dogs must travel in for safety), and a collar,
          leash, and harness. The total for this service will be provided to you in the adoption
          approval email. The cost of health certificates varies and, in some cases, has been higher
          than the dog’s adoption fee. <br /> <br />
          Adopters are also welcome to travel to their newly adopted dog to bring the dog home with
          them. A crate to safely transport the dog would be the responsibility of the adopter.
        </p>
      </div>
      <div className='flex flex-col'>
        <p className='font-QBold text-lg text-charcoal mb-3'>Adopting across state costs extra</p>
        <p className='font-QBook text-sm'>
          If the dog is adopted over a state line, there will be an additional charge for a health
          certificate (required by law). The cost of the health certificate is the responsibility of
          the adopter. The amount depends upon what the veterinarian charges LPDR. The cost of a
          health certificate varies and, in some cases, has been higher than the dog’s adoption fee.
        </p>
      </div>
    </div>
  );
};

export default BottomInfo;
