/* global shallow describe it expect */
/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';
import OasisOfferCancelModal from './OasisOfferCancelModal';


describe('(Component) OasisOfferCancelModal', () => {
  it('should render', () => {
    const props = {
      canOfferBeCancelled: false
    };
    const wrapper = shallow(
      <OasisOfferCancelModal {...props}/>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
