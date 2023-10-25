import { Text } from '../styles/Styles';

const PhotoUploadIcon = ({ ready, uploading }: any) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='18pt'
        viewBox='0 0 395.104 395.104'
      >
        <g fill='#9761aa'>
          <path
            d='M360.693,198.729c1.373-6.779,2.1-13.794,2.1-20.979c0-58.085-47.088-105.173-105.174-105.173
         c-43.075,0-80.082,25.91-96.342,62.984c-12.494-8.139-27.381-12.912-43.403-12.912c-42.125,0-76.526,32.714-79.396,74.109
         C15.79,207.169,0,230.028,0,256.626c0,36.396,29.506,65.902,65.902,65.902c0,0,71.396,0,95.194,0
         c4.667,0,4.894-5.179,4.894-5.179v-42.28c0-3.612-2.955-6.567-6.568-6.567h-18.007c-3.612,0-4.809-2.375-2.658-5.276
         l54.887-74.094c2.15-2.902,5.668-2.902,7.818,0l54.886,74.094c2.148,2.901,0.953,5.276-2.657,5.276h-18.009
         c-3.61,0-6.567,2.955-6.567,6.567v42.364c0,0,0.274,5.095,5.108,5.095c23.746,0,94.979,0,94.979,0
         c36.396,0,65.902-29.506,65.902-65.902C395.104,231.639,381.191,209.901,360.693,198.729z'
          />
        </g>
      </svg>
      <Text fontWeight='300' color='#888888' fontSize='11px'>
        {uploading
          ? 'Uploading...'
          : ready?.name
          ? 'Ready to Upload'
          : 'Choose file to Upload'}
      </Text>
      <Text
        fontSize='8px'
        width='75px'
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center',
        }}
      >
        {ready?.name}
      </Text>
    </div>
  );
};

export default PhotoUploadIcon;
