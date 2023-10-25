import { Text } from '../../styles/Styles';

const GuidelinesAndRequirements = () => {
  const listItemStyles = { fontSize: '16px' };
  const spanStyles = { fontWeight: '600', fontSize: '16px' };
  return (
    <>
      <Text
        fontSize='31px'
        marginTop='56px'
        fontWeight={400}
        textAlign='center'
        marginBottom='24px'
      >
        Our Adoption Guidelines & Requirements
      </Text>
      <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
        To ensure that we are working with people who are committed to adopting
        and welcoming a rescue into their family,
        <span style={spanStyles}>
          {' '}
          we require all individuals to read each dog’s bio/requirements
          completely to ensure the dog of interest is the best match for your
          family and that the needs of the dog can be met.
        </span>{' '}
        This will help us to ensure that you as the adopter are fully prepared
        to welcome a new dog into your home.{' '}
        <span style={spanStyles}>
          We also encourage you to be in contact with the dog’s foster family,
          as we highly value the input of our foster families.
        </span>{' '}
        You can find the email address in the dog’s bio.
      </Text>
      <Text maxWidth='680px' fontSize='16px' className='mb-4 mx-auto'>
        Below are requirements to which we strongly adhere.
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto'>
        <li style={listItemStyles}>
          Your current and previous pets must be spayed or neutered, with some
          exceptions for health reasons, which need to be clarified by your
          veterinarian.
        </li>
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto'>
        <li style={listItemStyles}>
          Your current pets must be up to date on core vaccines, heartworm
          testing and taking heartworm and flea and tick preventative.
        </li>
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto'>
        <li style={listItemStyles}>
          You must be at least 21 years old to be considered to adopt one of our
          dogs.
        </li>
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto'>
        <li style={listItemStyles}>
          OFF-LEASH AND INVISIBLE FENCE POLICY - We understand that some of the
          best adopters do not have fenced yards. Unlike some rescues, we do not
          impose the rule that adopters must have fenced yards to adopt.
          Dachshunds are, by breed definition, scent hounds. They will often go
          into hunting mode, zoning out their humans. For their own protection,
          the majority of LPDR dogs will need to be adopted into home
          environments that allow them to run free in securely fenced areas or
          with people who are devoted to leash walking. Please understand that
          there is a subset of dogs that do not deal well leashed and will only
          be adoptable to applicants with fenced yards.
        </li>
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto'>
        <li style={listItemStyles}>
          It is LPDR&#39;s position that invisible fences are not suitable for
          dachshunds for several reasons. Dachshunds are known for protecting
          their humans and others they view as part of their pack. Invisible
          fences pose two large problems. First, a dachshund may chase something
          out of the yard as they are prey driven and they will run right
          through the invisible fence only to realize that the associated collar
          zap hurt, thus preventing them from returning to their yard as they do
          not want to feel that pain again. Second, invisible fences serve to
          keep your dog in, but do not keep your pet safe from other dogs or
          wild animals entering their territory. This false sense of security
          has been the downfall of many small dogs. For those reasons, it will
          be uncommon that we adopt to people who utilize invisible fences.
        </li>
      </Text>
      <Text maxWidth='680px' className='mb-4 mx-auto'>
        <li style={listItemStyles}>
          USE OF DOGGY DOOR - Homes with Doggy Doors must show proof of a
          securely fenced yard. LPDR must confirm that someone will watch over
          one of our dogs when outside and not let the dog have unsupervised use
          of an open doggy door, to make sure the door is closed at night. We
          have had instances where dogs were within their securely fenced yard
          and required immediate veterinary care. First, a woodchuck somehow
          entered the fenced area and attacked one of our dogs. Secondly, one of
          our dogs was stung by a bee and swelled up. Fortunately, these were
          both instances where the dog owners were home to care for them. A lot
          of thought has gone into our decision to not place our dogs in homes
          where they will be left unattended in their backyard.
        </li>
      </Text>
    </>
  );
};

export default GuidelinesAndRequirements;
