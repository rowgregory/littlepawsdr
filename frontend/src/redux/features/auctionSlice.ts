import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuctionItem } from '../../types/entities/auction-item';
import { IAuction } from '../../types/entities/auction';
import { auctionInitialState } from '../../lib/initial-states/auciton';
import { auctionItemInitialState } from '../../lib/initial-states/auction-item';

interface AuctionState {
  auctions: IAuction[];
  auction: IAuction;
  auctionItems: IAuctionItem[];
  auctionItem: IAuctionItem;
  isLiveAuction: boolean;
  hasHandledAuctionModal: boolean;
  placeBidSuccess: boolean;
  status: 'DRAFT' | 'ACTIVE' | 'ENDED';
  quickBidModal: boolean;
  bidModal: boolean;
  confirmBidModal: boolean;
  confirmedBidAmount: number;
  auctionItemDrawer: boolean;
  confettiPop: boolean;
  auctionCompleteModal: boolean;
  auctionItemBidsDrawer: boolean;
}

const initialState: AuctionState = {
  auctions: [],
  auction: auctionInitialState, // 👈 instead of null
  auctionItems: [],
  auctionItem: auctionItemInitialState,
  isLiveAuction: false,
  hasHandledAuctionModal: false,
  placeBidSuccess: false,
  status: 'DRAFT',
  quickBidModal: false,
  bidModal: false,
  confirmBidModal: false,
  confirmedBidAmount: 0,
  auctionItemDrawer: false,
  confettiPop: false,
  auctionCompleteModal: false,
  auctionItemBidsDrawer: false,
};

export const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    updateAuctionInState: (state, action) => {
      state.auction = action.payload;
    },
    setOpenLiveAuctionModal: (state) => {
      state.isLiveAuction = true;
    },
    closeAuctionModal: (state) => {
      state.isLiveAuction = false;
    },
    handleLiveAuctionModal: (state, action: PayloadAction<any>) => {
      const handledAuctionModal = JSON.parse(
        localStorage.getItem('handledAuctionModal') || 'false'
      );

      state.hasHandledAuctionModal = handledAuctionModal;

      if (action.payload?.status === 'ACTIVE' && !handledAuctionModal) {
        state.isLiveAuction = true;
      }

      if (Object.keys(action.payload).length === 0) {
        localStorage.removeItem('handledAuctionModal');
        state.hasHandledAuctionModal = false;
        state.isLiveAuction = false;
      }
    },
    saveHasHandledAuctionModalToLocalStorage: (state) => {
      state.hasHandledAuctionModal = true;
      localStorage.setItem('handledAuctionModal', JSON.stringify(true));
    },
    setPlaceBidSuccess: (state) => {
      state.placeBidSuccess = true;
    },
    resetPlaceBidSuccess: (state) => {
      state.placeBidSuccess = false;
    },
    setAuctions: (state, { payload }) => {
      state.auctions = payload;
    },
    setAuctionItem: (state, { payload }) => {
      state.auctionItem = payload;
    },
    resetAuctionItem: (state) => {
      state.auctionItem = auctionItemInitialState;
    },
    setAuctionItems: (state, { payload }) => {
      state.auctionItems = payload;
    },
    setOpenQuickBidModal: (state) => {
      state.quickBidModal = true;
    },
    setCloseQuickBidModal: (state) => {
      state.quickBidModal = false;
    },
    setOpenBidModal: (state) => {
      state.bidModal = true;
    },
    setCloseBidModal: (state) => {
      state.bidModal = false;
    },
    setOpenConfirmBidModal: (state) => {
      state.confirmBidModal = true;
    },
    setCloseConfirmBidModal: (state) => {
      state.confirmBidModal = false;
    },
    setConfirmedBidAmount: (state, { payload }) => {
      state.confirmedBidAmount = payload;
    },
    setOpenAuctionItemDrawer: (state) => {
      state.auctionItemDrawer = true;
    },
    setCloseAuctionItemDrawer: (state) => {
      state.auctionItemDrawer = false;
    },
    setOnConfettiPop: (state) => {
      state.confettiPop = true;
    },
    setOffConfettiPop: (state) => {
      state.confettiPop = false;
    },
    setOpenAuctionCompleteModal: (state) => {
      state.auctionCompleteModal = true;
    },
    setCloseAuctionCompleteModal: (state) => {
      state.auctionCompleteModal = false;
    },
    setOpenAuctionItemBidsDrawer: (state) => {
      state.auctionItemBidsDrawer = true;
    },
    setCloseAuctionItemBidsDrawer: (state) => {
      state.auctionItemBidsDrawer = false;
    },
  },
});

export const {
  updateAuctionInState,
  setOpenLiveAuctionModal,
  closeAuctionModal,
  handleLiveAuctionModal,
  saveHasHandledAuctionModalToLocalStorage,
  resetPlaceBidSuccess,
  setAuctions,
  setAuctionItems,
  setAuctionItem,
  setOpenBidModal,
  setOpenQuickBidModal,
  setCloseBidModal,
  setCloseQuickBidModal,
  setConfirmedBidAmount,
  setOpenAuctionItemDrawer,
  setCloseAuctionItemDrawer,
  resetAuctionItem,
  setCloseConfirmBidModal,
  setOpenConfirmBidModal,
  setPlaceBidSuccess,
  setOnConfettiPop,
  setOffConfettiPop,
  setCloseAuctionCompleteModal,
  setOpenAuctionCompleteModal,
  setCloseAuctionItemBidsDrawer,
  setOpenAuctionItemBidsDrawer,
} = auctionSlice.actions;

export const auctionReducer = auctionSlice.reducer;
