import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import DoubleClick from 'react-native-double-click';
import {socialInterest} from '../assets/FakeJsons/SocialInterestJson';
import {style} from './styles/HomeScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {GET_MATCHES_REQUEST} from '../redux/Actions';
import Loader from '../reUsableComponents/Loader';
import AppActionButton from '../reUsableComponents/AppActionButton';
import {homeScreen} from '../assets/Lables';

let likeIcon = 'https://i.ibb.co/7Y2hKb4/Path-21901-2x.png';
let cancelIcon = 'https://i.ibb.co/TttR87p/Icon-metro-cross-2x.png';

const HomeScreen = () => {
  const [index, setIndex] = useState({
    oldIndex: 0,
    newIndex: 1,
  });
  const [loadOtherData, setLoadOtherData] = useState(false);
  const [filterArray, setFilterArray] = useState([]);
  const [changeSlide, setChangeSlide] = useState(0);
  const state = useSelector(state => state.MatchesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: GET_MATCHES_REQUEST});
  }, []);

  //when you click on like button or double tab it will load a next data for you.
  useEffect(() => {
    setChangeSlide(0);
    let slice = socialInterest.slice(index.oldIndex, index.newIndex);
    setFilterArray(slice);
    if (slice.length === 0) {
      setIndex({oldIndex: 0, newIndex: 1});
    }
  }, [index]);

  useEffect(() => {
    if (state && state?.data && state?.data?.data) {
      setFilterArray(state?.data?.data.slice(index.oldIndex, index.newIndex));
      setTimeout(() => {
        setLoadOtherData(true);
      }, 100);
    }
  }, [state]);

  //change match data
  const setNewIndex = () => {
    setFilterArray([]);
    setLoadOtherData(false);
    setIndex({
      oldIndex: index.oldIndex + 1,
      newIndex: index.newIndex + 1,
    });
    setTimeout(() => {
      setLoadOtherData(true);
      setChangeSlide(0);
    }, 300);
  };

  //help of this function you can check in list you reached at end or not
  const handleInfinityScroll = event => {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  };

  useEffect(() => {
    if (changeSlide > 1) {
      setNewIndex();
    }
  }, [changeSlide]);

  //   single Component for renderImage
  const renderImage = (uri, style, mode) => {
    return (
      <Image
        source={{uri: uri}}
        style={[{height: '100%', width: '100%'}, style && style]}
        resizeMode={mode ? mode : 'cover'}
      />
    );
  };

  //   for Scroll and animation maintain platform vice
  const renderPlatformWiseView = ui => {
    if (Platform.OS === 'android') {
      return (
        <DoubleClick
          style={{height: Dimensions.get('window').height}}
          onClick={() => setNewIndex()}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            onScroll={event => {
              //   if (handleInfinityScroll(event)) {
              //     setChangeSlide(changeSlide + 1);
              //   }
            }}>
            <View style={style.subCnt}>{ui}</View>
          </ScrollView>
        </DoubleClick>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            onScroll={event => {
              if (handleInfinityScroll(event)) {
                setChangeSlide(changeSlide + 1);
              }
            }}>
            <DoubleClick style={style.subCnt} onClick={() => setNewIndex()}>
              {ui}
            </DoubleClick>
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={style.cnt}>
      {state.loader ? (
        <Loader />
      ) : (
        renderPlatformWiseView(
          filterArray.length > 0 ? (
            <Animatable.View
              style={[style.cardCnt]}
              animation={{
                from: {flex: 0.4},
                to: {flex: 1},
              }}>
              {/* Detail Container */}
              <View style={style.detailCardCnt}>
                <View style={[style.avatarCard]}>
                  {renderImage(
                    filterArray[0].avatar,
                    '',
                    Platform.OS === 'android' && 'center',
                  )}
                </View>
                <View style={style.basicDetailCnt}>
                  <View style={style.detailTxtCnt}>
                    <Text style={style.nameStyle}>{filterArray[0].name}</Text>
                    <Text style={style.ageDistanceStyle}>
                      {homeScreen.age} {filterArray[0].Age} {'\n'}10{' '}
                      {homeScreen.kmAway}
                    </Text>
                  </View>
                  <View style={style.profileCnt}>
                    {renderImage(filterArray[0].profileImage, {
                      borderRadius: 20,
                    })}
                  </View>
                </View>
              </View>
              <View style={style.percentageCnt}>
                <Text style={{fontWeight: '900'}}>75</Text>
              </View>

              {/* devider View */}
              <View style={style.devider} />

              {/* Interest and Media View */}
              {loadOtherData &&
                filterArray[0].otherData.map((item, index) => {
                  return (
                    <Animatable.View
                      animation={{
                        from: {opacity: 0.5, flex: 0},
                        to: {opacity: 1, flex: 1},
                      }}
                      style={{marginHorizontal: 13}}
                      key={index}>
                      {/* interest View */}
                      {item.interest.map((interest, interestIndex) => {
                        return (
                          <View
                            style={style.intrestCardCnt}
                            key={interestIndex}>
                            {interest.id % 2 !== 0 && (
                              <View style={style.interestImg}>
                                {renderImage(interest.icon, '', 'center')}
                              </View>
                            )}
                            <View
                              style={[
                                style.interestSubCnt,
                                interest.id % 2 === 0 && {
                                  marginLeft: '0%',
                                  marginRight: '2%',
                                },
                                {
                                  paddingRight:
                                    interest.id % 2 === 0 ? '5%' : '0%',
                                  paddingLeft:
                                    interest.id % 2 !== 0 ? '5%' : '0%',
                                },
                              ]}>
                              <Text
                                style={[
                                  style.interestTitle,
                                  {
                                    textAlign:
                                      interest.id % 2 === 0 ? 'right' : 'left',
                                  },
                                ]}>
                                {interest.title}
                              </Text>
                              <Text
                                style={[
                                  style.inspectionDescription,
                                  {
                                    textAlign:
                                      interest.id % 2 === 0 ? 'right' : 'left',
                                  },
                                ]}>
                                {interest.description}
                              </Text>
                            </View>
                            {interest.id % 2 === 0 && (
                              <View style={style.interestImg}>
                                {renderImage(interest.icon, '', 'center')}
                              </View>
                            )}
                          </View>
                        );
                      })}
                      {/* Media View */}
                      {item.media.map((media, mediaIndex) => {
                        return (
                          <View style={style.detailCardCnt} key={mediaIndex}>
                            {media?.description ? (
                              <Text style={{textAlign: 'center'}}>
                                {media.description}
                              </Text>
                            ) : null}
                            <View
                              style={[
                                style.avatarCard,
                                {
                                  marginTop: media?.description ? 12.22 : 0,
                                  height: 222.98,
                                },
                              ]}>
                              <Text>User Media #1</Text>
                            </View>
                          </View>
                        );
                      })}
                    </Animatable.View>
                  );
                })}
              <View style={style.actionBtnStyle}>
                {[cancelIcon, likeIcon].map((item, index) => {
                  return (
                    <AppActionButton
                      image={renderImage(item, style.likeBtnImg)}
                      onpress={() => setNewIndex('Cancel')}
                    />
                  );
                })}
              </View>
            </Animatable.View>
          ) : (
            <View
              style={[
                style.cnt,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Text style={style.nameStyle}>{state.error}</Text>
            </View>
          ),
        )
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
