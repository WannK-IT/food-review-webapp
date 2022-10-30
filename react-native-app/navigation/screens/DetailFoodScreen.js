import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'; 

import Header from '../../src/components/Header/Header';
import color from '../../src/color';

const images = [
  {
    id: 1,
    url: 'https://daotaovuabep.com/wp-content/uploads/2020/04/ga_chien_han_quoc.jpg'
  },
  {
    id: 2,
    url: 'https://static.riviu.co/960/image/2021/03/28/8f68228f08f016229be1840cbadf7690_output.jpeg'
  },
  {
    id: 3,
    url: 'https://static.riviu.co/960/image/2021/03/28/cb277a713b836e5e9f7a413b7894350d_output.jpeg'
  }
]

const WIDTH = (Dimensions.get('window').width)
const HEIGHT = (Dimensions.get('window').height)

const DetailFoodScreen = ({navigation}) => {
  const [imgActive, setImgActive] = useState(0)

  const onchange = (nativeEvent) => {
    if(nativeEvent){
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      setImgActive(slide);
    }
  }

  const directBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Header directBack={directBack}/>

      <ScrollView showsVerticalScrollIndicator={true}>

        {/* User */}
        <View style={styles.user}>
          <View style={styles.infoUser}>
            <Image resizeMode="contain" source={require('../../assets/img/user/user_test1.jpg')} style={{width: 40, height: 40, borderRadius: 40/2, borderWidth: 1}}/>
            <View>
              <Text style={{paddingHorizontal: 8, fontSize: 13, color: color.black, fontWeight: 'bold', paddingBottom: 3}}>Quang Nguyen</Text>
              <Text style={{paddingHorizontal: 8, fontSize: 10, color: color.grayOriginal}}>28/09/2022 lúc 19:30  •  Gà rán Popeyes - Bình Thạnh</Text>
            </View>
          </View>
        </View>
        {/* End User */}

        <View style={styles.wrapImageFood}>
          <ScrollView
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator = {false}
            pagingEnabled
            horizontal
            style={styles.wrapImageFood}>
              {
                images.map((img) =>
                  <Image key={img.id} resizeMode='contain' source={{uri: img.url}} style={styles.wrapImageFood}/>
                )
              }
          </ScrollView>
          <View style={styles.wrapNumberImg}>
            <Text style={styles.wrapPageNumber}>
              {(imgActive + 1)}/{images.length}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Gà rán sốt cay Hàn Quốc tại Bình Thạnh ngon ngon ngon</Text>
          <Text style={{paddingVertical: 8, fontSize: 13}}>
          <Entypo name="star" style={{fontSize: 13, color: color.main}}/> <Text style={{fontWeight: 'bold'}}>4.3</Text>/5 điểm
          </Text>

          <Text style={{lineHeight: 25}}>Mọi người đã thử thưởng thức món này chưa?
            Hôm trước thấy quán này có chướng trình khuyến mãi trên Now nên mình gọi thử về ăn . Cơ mà siu ngon luôn. Cơm dẻo, gà thơm, nước sốt cực đỉnh, quan trọng gà đến nơi vẫn ấm và giòn tan ăn cực đã ý. Mình là người ăn cay tốt nên mình chọn vị cay.. ăn rất thích nhưng mà lần sau sẽ gọi loại siêu cay xem thế nào. Gà giòn ăn cùng kim chi chua nhẹ rất hợp. À kim chi ở quán này ăn ngon phết đó mọi người. Hôm mình ăn quán còn đang có chương trình tặng gimpab nữa. Đơn hàng gửi đến hộp hiếc xin sò nhìn như ảnh luôn kèm theo cái gimpab siêu to khổng lồ kình ăn ko hết nổi. Gimpab ăn 1 nửa, 1 nửa chiều mới lấy ra ăn mà cơm vẫn dẻo ngon ý
            Nói túm lại đây là quán online chất lượng nhất mà mình từng mò đươc trên Now. Chắc chắn sẽ ủng hộ quán dài dài
            Share cho mọi người đường link cho dễ tìm kiếm nhé.
          </Text>
        </View>

        <TouchableOpacity style={styles.wrapFoodPlace}>
          <Image style={styles.imgFoodPlace} source={{uri: 'https://kenh14cdn.com/2018/2/7/6-151797495481038039623.jpg '}}/>

          <View style={styles.infoFoodPlace}>
            <Text style={{fontWeight: 'bold', fontSize: 13}}>No Name Chicken - Gà rán Hotdog Q1</Text>
            <Text style={{fontSize: 12}}>112 Kios 12 Phạm Viết Chánh, P. Nguyễn Cư Trinh, Q1, TPHCM</Text>
            <Text style={{fontSize: 12}}>
              <Entypo name="star" style={{color: color.main}}/>
              <Text style={{fontWeight: 'bold'}}> 4.5
              </Text>/5 điểm (15 bài review) 
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.reacts}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <Ionicons style={{fontSize: 25, color: color.main}} name='heart'/>
              </TouchableOpacity>
              <Text style={{fontSize: 13, paddingLeft: 5, color: color.grayOriginal}}>15 người thích</Text>
            </View>
            <Text style={{fontSize: 13, color: color.grayOriginal}}>2 bình luận</Text>
          </View>

          <Text style={{fontSize: 15, marginVertical: 20, fontWeight: 'bold'}}>Bình luận</Text>

          <View style={{marginBottom: 100}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image resizeMode='contain' source={require('../../assets/img/user/user_test1.jpg')} style={{width: 40, height: 40, borderRadius: 24}}/>
              <TextInput style={{paddingHorizontal: 15, width: '85%', height: 40, backgroundColor: color.grayBackgroundImg, borderRadius: 20}} placeholder="Viết bình luận..."/>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default DetailFoodScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user:{
    paddingVertical: 10,
    paddingLeft: 10
  },
  infoUser:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapImageFood:{
    backgroundColor: color.grayBackgroundImg,
    width: WIDTH,
    height: HEIGHT - 250,
  },
  wrapNumberImg:{
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    right: 20,
  },
  wrapPageNumber:{
    color: color.white,
    fontWeight: 'bold',
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: 'rgba(108, 104, 98, .5)'
  },
  content:{
    paddingVertical: 10,
    paddingLeft: 10
  },

  wrapFoodPlace:{
    flexDirection: 'row',
    alignSelf: 'center',
    width: WIDTH - 20,
    height: 100,
    backgroundColor: color.grayBackgroundImg,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  imgFoodPlace:{
    width: 70,
    height: 70,
    borderRadius: 7
  },
  infoFoodPlace:{
    width: WIDTH - 120,
    paddingLeft: 20,
  },

  reacts:{
    width: WIDTH - 20,
    marginHorizontal: 10,
  }
});