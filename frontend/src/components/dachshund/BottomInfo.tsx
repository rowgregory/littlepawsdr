const BottomInfo = () => {
  return (
    <div className='flex flex-col gap-5 mt-12'>
      <div className='flex flex-col'>
        <p className='font-QBold text-lg text-charcoal mb-3'>Dogs Adopted in New England</p>
        <p className='font-QBook text-sm'>
          Dogs adopted in New England are subject to additional rules and regulations by the state departments of agriculture. Complying with these
          regulations is expensive for our rescue, and some dogs adopted in New England states are charged an additional $175.00 to cover regulatory
          requirements.
        </p>
      </div>

      {/* Transportation section updated with "bio" version */}
      <div className='flex flex-col'>
        <p className='font-QBold text-lg text-charcoal mb-3'>Transportation Help and Distance Restrictions</p>
        <p className='font-QBook text-sm'>
          Volunteer transport can be arranged if you see a dog that is a good match for you and your family, and the distance of the transport is
          reasonable. <br /> <br />
          Dogs in the south may not be available for transport to northern states and vice versa. <br />
          Dogs in southern Florida and southern Georgia have travel restrictions limited to Florida and parts of South Carolina. <br /> <br />
          The cost for volunteer transport includes a health certificate (required by law and issued by a veterinarian) when crossing state lines. The
          cost of health certificates varies and, in some cases, has been higher than the dog’s adoption fee. <br /> <br />
          Adopters are also welcome to travel to their newly adopted dog to bring the dog home with them. A crate to safely transport the dog would be
          the responsibility of the adopter.
        </p>
      </div>

      <div className='flex flex-col'>
        <p className='font-QBold text-lg text-charcoal mb-3'>Adopting across state costs extra</p>
        <p className='font-QBook text-sm'>
          If the dog is adopted over a state line, there will be an additional charge for a health certificate (required by law). The cost of the
          health certificate is the responsibility of the adopter. The amount depends upon what the veterinarian charges LPDR. The cost of a health
          certificate varies and, in some cases, has been higher than the dog’s adoption fee.
        </p>
      </div>
    </div>
  );
};

export default BottomInfo;
