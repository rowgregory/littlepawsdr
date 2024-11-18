import { Link, useNavigate, useParams } from 'react-router-dom';
import { uploadMultipleFilesToFirebase } from '../../../../utils/uploadToFirebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/toolkitStore';
import {
  useCreateAuctionItemMutation,
  useDeleteAuctionItemPhotoMutation,
  useUpdateAuctionItemMutation,
} from '../../../../redux/services/campaignApi';
import useAuctionItemForm from '../../../../hooks/form-hooks/useAuctionItemForm';
import AuctionItemForm from '../../../../components/forms/campaign/AuctionItemForm';

const AuctionItem = () => {
  const navigate = useNavigate();
  const campaign = useSelector((state: RootState) => state.campaign);
  const params = useParams() as any;
  const auctionItemId = params.auctionItemId;
  const isEditMode = params['*'].split('/')[1] === 'edit';
  const [createAuctionItem, { isLoading: loadingCreate }] = useCreateAuctionItemMutation();
  const [updateAuctionItem, { isLoading: loadingUpdate }] = useUpdateAuctionItemMutation();
  const [deleteAuctionItemPhoto, { isLoading: loadingDelete }] =
    useDeleteAuctionItemPhotoMutation();

  const auctionItem = campaign.campaign.auction?.items?.find(
    (item: any) => item?._id === auctionItemId
  );

  const editPhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];

    // Filter out any files that are videos
    const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length !== newFiles.length) {
      alert('Videos are not allowed. Please upload images only.');
      return;
    }

    setInputs((inputs: any) => ({ ...inputs, photoAmount: Number(newFiles.length) }));

    const images = await uploadMultipleFilesToFirebase(newFiles, true);

    setInputs((inputs: any) => ({
      ...inputs,
      photos: [...inputs.photos, ...images],
      photoAmount: 0,
    }));
  };

  const deleteImageHandler = async (file: any) => {
    if (file?._id) {
      setInputs((inputs: any) => ({ ...inputs, photoIdToDelete: file?._id }));
      deleteAuctionItemPhoto({ photoId: file._id, auctionItemId: inputs._id });
    } else {
      setInputs((inputs: any) => ({
        ...inputs,
        photos: inputs.photos.filter((photo: any) => photo.url !== file.url),
      }));
    }
  };

  const saveAuctionItem = async (e: any) => {
    e.preventDefault();
    if (isEditMode) {
      await updateAuctionItem({
        id: auctionItemId,
        auction: campaign.campaign.auction._id,
        name: inputs.name,
        description: inputs.description,
        photos: inputs.photos,
        sellingFormat: inputs.sellingFormat,

        requiresShipping: inputs.requiresShipping,
        shippingCosts: inputs.shippingCosts,
        ...(inputs.sellingFormat === 'fixed' && {
          startingPrice: null,
          currentPrice: null,
          currentBid: null,
          minimumBid: null,
          buyNowPrice: inputs.buyNowPrice,
          isFixed: true,
          isAuction: false,
          isDigital: inputs.isDigital,
          itemBtnText: 'Buy Now',
          totalBids: null,
          totalQuantity: inputs.totalQuantity,
        }),
        ...(inputs.sellingFormat === 'auction' && {
          startingPrice: inputs.startingPrice,
          currentPrice: inputs.startingPrice,
          currentBid: inputs.startingPrice,
          minimumBid: inputs.startingPrice,
          isFixed: false,
          isAuction: true,
          isDigital: false,
          buyNowPrice: null,
          itemBtnText: 'Place Bid',
          totalBids: 0,
          totalQuantity: 1,
        }),
      })
        .unwrap()
        .then(() => navigate(`/admin/campaigns/${campaign?.campaign?._id}/auction/items`))
        .catch((err: any) => err);
    } else {
      await createAuctionItem({
        auction: campaign.campaign.auction._id,
        photos: inputs.photos,
        name: inputs.name,
        description: inputs.description,
        sellingFormat: inputs.sellingFormat,
        requiresShipping: inputs.requiresShipping,
        shippingCosts: inputs.shippingCosts,
        ...(inputs.sellingFormat === 'fixed' && {
          buyNowPrice: inputs.buyNowPrice,
          isFixed: true,
          isAuction: false,
          isDigital: inputs.isDigital,
          totalQuantity: inputs.totalQuantity,
          itemBtnText: 'Buy Now',
          totalBids: null,
        }),
        ...(inputs.sellingFormat === 'auction' && {
          startingPrice: inputs.startingPrice,
          currentPrice: inputs.startingPrice,
          currentBid: inputs.startingPrice,
          minimumBid: inputs.startingPrice,
          isFixed: false,
          isAuction: true,
          isDigital: false,
          totalBids: 0,
          totalQuantity: 1,
          itemBtnText: 'Place Bid',
        }),
      })
        .unwrap()
        .then(() => navigate(`/admin/campaigns/${campaign?.campaign?._id}/auction/items`))
        .catch((err: any) => err);
    }
  };

  const { inputs, handleSwitch, handleInput, setInputs } = useAuctionItemForm(auctionItem);

  return (
    <div className='flex flex-col gap-y-8'>
      <Link
        to={`/admin/campaigns/${campaign?.campaign?._id}/auction/items`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to items</p>
      </Link>
      <div className='bg-white border border-slate-100 rounded-xl p-3 lg:p-8 grid gap-y-8'>
        <div className='font-Matter-Medium text-2xl'>New Item Details</div>
        <AuctionItemForm
          inputs={inputs}
          handleInput={handleInput}
          loading={loadingUpdate || loadingCreate || loadingDelete}
          editPhotoHandler={editPhotoHandler}
          deleteImageHandler={deleteImageHandler}
          handleSwitch={handleSwitch}
          saveAuctionItem={saveAuctionItem}
        />
      </div>
    </div>
  );
};

export default AuctionItem;
