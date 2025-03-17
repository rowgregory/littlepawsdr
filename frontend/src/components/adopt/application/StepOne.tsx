const StepOne = ({ setStep }: { setStep: (step: any) => void }) => {
  return (
    <section>
      <div className='h-[500px] overflow-y-scroll px-3 py-2.5 border-[1px] border-gray-100 rounded-md'>
        <h5 className='font-QBold text-charcoal mb-1'>Our Mission</h5>
        <p className='font-QBook mb-3.5'>
          Little Paws Dachshund Rescue is an east coast based 501(c)3 exempt nonprofit dedicated to
          the rescue and re-homing of our favorite short legged breed. We specialize in finding
          permanent homes for dachshund and dachshund mixes. We strive to make the lives of all dogs
          better through action, advocacy, awareness, and education.
        </p>
        <h5 className='font-QBold text-charcoal mb-1'>Our Goal</h5>
        <p className='font-QBook mb-3.5'>
          It is LPDR’s goal to identify abandoned, mistreated, or homeless dogs and oversee their
          treatment and wellbeing while working to find loving owners for those in our care. If you
          are looking for a new family member, take a look at our available dachshund and dachshund
          mixes.
        </p>
        <p className='font-QBook mb-3.5'>
          Thank you for considering adopting a rescued dachshund or dachshund mix.
        </p>
        <h5 className='font-QBold text-charcoal mb-1'>Application Fee</h5>
        <p className='font-QBook mb-3.5'>
          To ensure that our Applications Team is working with families that are committed to
          adopting and welcoming a rescued dachshund into their family LPDR’s asks for a
          non-refundable application fee of $15.00. We take the application fee as an additional
          measure to ensure that a family is ready to move forward as well as to support our current
          and future rescue dogs.
        </p>
        <h5 className='font-QBold text-charcoal mb-1'>Adoption Qualification Requirements</h5>
        <p className='font-QBook mb-3.5'>
          The following are the standards that our rescue adheres to. Please note, each dog is
          different and may have additional requirements, however, the list below applies to every
          adoption.
        </p>
        <p className='font-QBook mb-3.5'>
          We require all individuals to read the dog’s bio/requirements completely to ensure the dog
          of interest is the best match for your family and that the needs of the dog can be
          met. This will help us to ensure that you as the adopter are fully prepared to welcome a
          new dog into your home.
        </p>
        <ul className='mb-3.5'>
          <li className='mb-2.5 pl-3 font-QBook'>
            Current and previous pets must be spayed or neutered, with some exceptions for health
            reasons. To be considered for a medical exception for spay/neuter, vet documentation is
            required.
          </li>
          <li className='mb-2.5 pl-3 font-QBook'>
            Your pets must be current on vaccines, heartworm testing, and heartworm and flea/tick
            prevention.
          </li>
          <li className='mb-2.5 pl-3 font-QBook'>
            Veterinary records will be checked, and we utilize the AVMA guidelines for preventative
            care to confirm annual checkups (2x annually for seniors), dentals, bloodwork, and
            treatment provided when necessary.
          </li>
          <li className='mb-3.5 pl-3 font-QBook'>
            You must be at least 21 years old to be considered to adopt one of our dogs.
          </li>
          <li className='mb-3.5 pl-3 font-QBook'>
          You must be able to take possession of the dog within 2 weeks of being approved.
          </li>
        </ul>
        <h5 className='font-QBold text-charcoal mb-1'>The Adoption Application Process</h5>
        <p className='font-QBook'>
          Once your application is received it will be reviewed by our application coordinator to
          determine if you meet the dog’s requirements.  If your application shows you would a good
          match, the following will take place:
        </p>
        <ul className='list-disc mb-3.5'>
          <li className='mb-2.5 pl-3 font-QBook'>
            Your past and current veterinarians will be contacted.
          </li>
          <li className='mb-2.5 pl-3 font-QBook'>Your personal references will be contacted.</li>
          <li className='mb-2.5 pl-3 font-QBook'>
            Your landlord will be contacted, if applicable.
          </li>
          <li className='mb-2.5 pl-3 font-QBook'>
            We will review the information received with the dog’s foster team to determine if a
            home visit will be scheduled.
          </li>
        </ul>
        <h5 className='font-QBold text-charcoal mb-1'>Virtual Home Visit</h5>
        <p className='font-QBook mb-3.5'>
          A virtual home visit will be scheduled at a time that is convenient for you. We require
          that everyone living in the home be present during the visit, including all animals. The
          home visit volunteer will inspect the locations where the dachshund will eat, sleep, and
          play, etc.
        </p>
        <p className='font-QBook mb-3.5'>
          We will keep your application and fee on file, and you are welcome to contact us at
          applications@littlepawsdr.org within 6 months of your original adoption application
          submission with the name of another dog that interests you if the following occurs:
        </p>
        <ul className='list-disc mb-3.5'>
          <li className='mb-2.5 pl-3 font-QBook'>
            The dog you applied for is adopted by another applicant.
          </li>
          <li className='mb-2.5 pl-3 font-QBook'>
            The dog you applied for is no longer available by the time your application is received.
          </li>
          <li className='mb-2.5 pl-3 font-QBook'>You do not meet the dog’s requirements.</li>
          <li className='mb-2.5 pl-3 font-QBook'>
            The dog you applied for has been removed from availability  If your application does not
            meet the requirements for the dog you selected, we will contact you with more detailed
            information about why we’re not moving forward with your application.
          </li>
        </ul>
        <p className='font-QBook mb-3.5'>
          Little Paws reserves the right to deny an application for any reason. We look forward to
          working with you. To get help prior to completing an application, please contact us at{' '}
          <a href='mailto:applications@littlepawsdr.org'>applications@littlepawsdr.org</a>. Our
          application can take{' '}
          <span className='font-QBold text-charcoal'>15-30 minutes to complete.</span>
        </p>
      </div>
      <button
        onClick={() => setStep((prev: any) => ({ ...prev, step2: true }))}
        className='text-17 mt-4 w-full py-3 font-QBold rounded-md duration-300 bg-teal-400 text-white hover:shadow-lg hover:bg-teal-500'
      >
        I accept the conditions
      </button>
    </section>
  );
};

export default StepOne;
