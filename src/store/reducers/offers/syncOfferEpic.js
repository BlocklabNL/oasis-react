import getOfferTradingPairAndType from "../../../utils/offers/getOfferTradingPairAndType";
import { getTradingPairOfferCount } from "./getTradingPairOffersCount";
import { OFFER_SYNC_TYPE_INITIAL, OFFER_SYNC_TYPE_UPDATE } from "../offers";
import { setOfferEpic } from "./setOfferEpic";
import { loadOffer } from "./syncOffersEpic";
import { createAction } from "redux-actions";

const attemtToSyncRemovedOffer = createAction(
  "OFFERS/ATTEMPT_TO_SYNC_REMOVED_OFFER",
  syncOfferParams => syncOfferParams
);

export const syncOffer = (
  offerId,
  syncType = OFFER_SYNC_TYPE_INITIAL,
  previousOfferState,
  {
    doLoadOffer = loadOffer,
    doGetOfferTradingPairAndType = getOfferTradingPairAndType,
    doGetTradingPairOfferCount = getTradingPairOfferCount,
    doSetOfferEpic = setOfferEpic
  } = {}
) => async (dispatch, getState) => {
  const offer = (await dispatch(doLoadOffer(offerId))).value;
  // const isBuyEnabled = Session.get('isBuyEnabled');
  const [
    sellHowMuch,
    sellWhichTokenAddress,
    buyHowMuch,
    buyWhichTokenAddress,
    owner,
    timestamp
  ] = offer;

  if (buyWhichTokenAddress && sellWhichTokenAddress) {
    const { baseToken, quoteToken, offerType } = doGetOfferTradingPairAndType(
      { buyWhichTokenAddress, sellWhichTokenAddress, syncType },
      getState()
    );

    const id = offerId.toString();
    await dispatch(doGetTradingPairOfferCount(baseToken, quoteToken));

    dispatch(
      doSetOfferEpic(
        Object.assign(
          {
            id,
            sellHowMuch,
            sellWhichTokenAddress,
            buyHowMuch,
            buyWhichTokenAddress,
            owner,
            timestamp,
            offerType,
            tradingPair: { baseToken, quoteToken },
            syncType: syncType
          },
          syncType == OFFER_SYNC_TYPE_UPDATE ? { previousOfferState } : {}
        )
      )
    );

    return {
      offer,
      offerMeta: { baseToken, quoteToken, offerType }
    };
  } else {
    dispatch(
      attemtToSyncRemovedOffer({ offerId, syncType, previousOfferState })
    );
    console.log(
      "trying to sync already removed offer",
      { offerId, syncType, previousOfferState },
      {
        sellHowMuch,
        sellWhichTokenAddress,
        buyHowMuch,
        buyWhichTokenAddress,
        owner,
        timestamp
      }
    );
  }
};
