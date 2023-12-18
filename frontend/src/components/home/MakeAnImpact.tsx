import {
  MobileImageSection,
  ParallaxImg2,
  ParallaxSectionContent,
  ParallaxWindow,
} from './styles';

const MakeAnImpact = () => {
  return (
    <>
      <MobileImageSection>
        <ParallaxImg2 />
        <ParallaxSectionContent
          style={{
            textAlign: 'center',
            filter: 'drop-shadow(0px 20px 10px rgb(0 0 0/0.4))',
            fontSize: '56px',
          }}
        >
          You can make an impact
        </ParallaxSectionContent>
      </MobileImageSection>
      <ParallaxWindow>
        <ParallaxSectionContent>You can make an impact</ParallaxSectionContent>
        <ParallaxImg2 />
      </ParallaxWindow>
    </>
  );
};

export default MakeAnImpact;
