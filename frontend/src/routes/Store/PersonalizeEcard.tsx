import { Fragment, useState } from 'react';
import { useGetEcardQuery } from '../../redux/services/ecardApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VerticalLogo from '../../components/common/VerticalLogo';
import { Link } from 'react-router-dom';
import { formatDateForEstTimezone } from '../../utils/dateFunctions';
import useECardForm from '../../hooks/form-hooks/useEcardForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import PersonalizeEcardForm from '../../components/forms/PersonalizeEcardForm';

const PersonalizeEcard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const [sendNow, setSendNow] = useState(state?.ecard?.sendNow ?? 'send-now');
  const { ecard } = useSelector((state: RootState) => state.ecard);
  useGetEcardQuery(id);

  const personalizeCallback = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      navigate(
        {
          pathname: `/store/ecards/${ecard?._id}/preview`,
        },
        {
          state: {
            ecard,
            ...inputs,
            sendNow,
            ...{
              dateToSend: new Date(
                formatDateForEstTimezone(inputs.dateToSend, 13, 0)
              ).toISOString(),
            },
          },
        }
      );
    }
  };

  const { inputs, handleInput, validate, errors } = useECardForm(state);

  return (
    <Fragment>
      <VerticalLogo />
      <div className='min-h-[calc(100vh-540px)] mt-[65px] pb-20 w-full'>
        <div className='mx-auto w-full max-w-screen-sm px-[16px] md:px-0'>
          <h1 className='text-4xl font-Matter-Bold pt-10 pb-6 text-[#313436]'>Personalize ecard</h1>
          <div className='bg-gray-100 flex p-7 rounded-lg'>
            <img className='object-contain h-48 w-60 mr-3' src={ecard?.image} alt={ecard?.name} />
            <div className='flex flex-col justify-between'>
              <div>
                <p className='text-lg font-Matter-Light mb-2.5'>You have chosen this ecard:</p>
                <p className='text-2xl font-Matter-Bold text-[#313436]'>{ecard?.name}</p>
              </div>
              <Link to='/store' className='text-blue-800 underline'>
                Pick another ecard
              </Link>
            </div>
          </div>
          <h3 className='text-xl font-Matter-Bold text-[#313436] my-8'>Send this ecard</h3>
          <div className='grid grid-cols-12 gap-7 w-full mx-auto'>
            <PersonalizeEcardForm
              handleInput={handleInput}
              inputs={inputs}
              errors={errors}
              sendNow={sendNow}
              setSendNow={setSendNow}
              personalizeCallback={personalizeCallback}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalizeEcard;
