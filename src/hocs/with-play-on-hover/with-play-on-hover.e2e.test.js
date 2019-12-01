import React from 'react';
import {shallow} from 'enzyme';
import withPlayOnHover from "./with-play-on-hover";
import {MOVIE_PREVIEW_DELAY} from "@constants";

const MockComponent = () => <video/>;
const WrappedMockComponent = withPlayOnHover(MockComponent);

describe(`withPlayOnHover tests`, () => {
  let wrapper;
  let videoRef;

  beforeEach(() => {
    videoRef = {
      play: jest.fn(),
      load: jest.fn(),
    };
    wrapper = shallow(<WrappedMockComponent/>);
    wrapper.instance()._videoRef.current = videoRef;
  });

  it(`video starts to play when call handleMouseEnter after MOVIE_PREVIEW_DELAY seconds`, () => {
    wrapper.instance()._handleMouseEnter();

    expect(wrapper.instance()._videoRef.current.play).toHaveBeenCalledTimes(0);
    expect(wrapper.instance()._videoRef.current.load).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      expect(wrapper.instance()._videoRef.current.play).toHaveBeenCalledTimes(1);
      expect(wrapper.instance()._videoRef.current.load).toHaveBeenCalledTimes(0);
    }, MOVIE_PREVIEW_DELAY);
  });

  it(`video stops to play when call handleMouseLeave`, () => {
    wrapper.instance()._handleMouseLeave();
    expect(wrapper.instance()._videoRef.current.play).toHaveBeenCalledTimes(0);
    expect(wrapper.instance()._videoRef.current.load).toHaveBeenCalledTimes(1);
  });
});
