import { useEffect, useState } from "react";
import { CAMPAIGN_DETAILS_FIELDS } from "../../components/data/form-fields";

export const useCampaignDetailsForm = (data?: any) => {
    const [inputs, setInputs] = useState(CAMPAIGN_DETAILS_FIELDS);
  
    useEffect(() => {
      if (data) {
        setInputs((inputs: any) => ({
          ...inputs,
          title: data?.title,
          subtitle: data?.subtitle,
          goal: data?.goal,
          themeColor: data?.themeColor,
          coverPhoto: data?.coverPhoto,
          coverPhotoName: data?.coverPhotoName,
          maintainAspectRatio: data?.maintainAspectRatio,
          story: data?.story,
          imgPreference: data.imgPreference,
        }));
      }
    }, [data]);
  
    const handleInput = (e: any) => {
      const { name, value } = e.target;
      setInputs((inputs: any) => ({
        ...inputs,
        [name]: value,
      }));
    };
  
    const handleSwitch = (e: any) => {
      const { name, checked } = e.target;
      setInputs((inputs: any) => ({
        ...inputs,
        [name]: checked,
      }));
    };
  
    return { inputs, handleInput, handleSwitch, setInputs };
  };

  export default useCampaignDetailsForm