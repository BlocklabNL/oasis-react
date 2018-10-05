
import "./index.css";
import "./styles/style.scss";


import {OasisChart} from './components/OasisChart';
import OasisTable from './components/OasisTable';

import OasisMarketWidget from './components/OasisMarketWidget';

import OasisWidgetFrame from './containers/OasisWidgetFrame';

import OasisSignificantDigitsWrapper from './containers/OasisSignificantDigits'


import { FlexBox } from "./components/FlexBox";

import OasisMakeSellOffer from './containers/OasisMakeSellOffer';
import OasisMakeBuyOffer from './containers/OasisMakeBuyOffer';

import OasisMarketHistory from './components/OasisMarketHistory';

import OasisBuyOrders from './components/OasisBuyOrders';
import OasisSellOrders from './components/OasisSellOrders';

import {styles,tableStyles} from './containers/OasisOfferMakeForm';
import MaskedTokenAmountInput from "./components/MaskedTokenAmountInput";
import OasisButton from "./components/OasisButton";
const OfferForm = {
    styles,tableStyles
}



export {
    OasisButton,
    OasisChart,
    OasisMarketWidget,
    OasisMakeSellOffer,
    OasisMakeBuyOffer,
    OasisMarketHistory,
    OasisBuyOrders,
    OasisSellOrders,
    OasisTable,
    OasisWidgetFrame,
    OasisSignificantDigitsWrapper,
    FlexBox,
    OfferForm,
    MaskedTokenAmountInput
};