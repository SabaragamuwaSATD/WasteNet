import { Dimensions, View, ViewToken } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ImageSliderType } from "../constants/index";
import SliderItem from "./SliderItem";
import Pagination from "./Pagination";
import Animated, {
  scrollTo,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  useAnimatedRef,
} from "react-native-reanimated";

type Props = {
  itemList: ImageSliderType[];
};

const { width } = Dimensions.get("screen");

const ImageSlider = ({ itemList }: Props) => {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const [data, setData] = useState(itemList);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay == true) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    // console.log("onViewableItemsChanged called", viewableItems);
    if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
      if (
        viewableItems[0].index !== null &&
        viewableItems[0].index !== undefined
      ) {
        setPaginationIndex(viewableItems[0].index % itemList.length);
      }
    } else {
      console.warn("No viewable items or index is undefined");
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <View>
      <Animated.FlatList
        ref={ref}
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setData([...data, ...itemList])}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true);
        }}
      />
      <Pagination
        items={itemList}
        paginationIndex={paginationIndex}
        scrollX={scrollX}
      />
    </View>
  );
};

export default ImageSlider;
