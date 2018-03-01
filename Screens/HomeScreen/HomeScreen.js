import React from "react";
import { AppState,StatusBar,View,TouchableOpacity,Image,AsyncStorage } from "react-native";
import { ImagePicker } from 'expo';
import CameraModal  from '../Modals/CameraModal';
import { connect } from 'react-redux';
import { getCartCount } from '../../actions'
import { Badge,Container,Input,Grid,Col, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem,Item } from "native-base";
class HomeScreen extends React.Component {
    state={
        modalVisible: false,
        cart_count:0
    }

    openModal() {
        this.setState({modalVisible:true});
      }
    
      closeModal() {
        this.setState({modalVisible:false});
      }
    componentDidMount=async()=>{
    
      try{
        
        let res = await AsyncStorage.getItem('@medi2me:cart_id')
        if(res!=null){
          console.log('test=',res);
         this.props.getCartCount(res);
        }else{
          fetch('http://192.168.0.100/api/public/get_cart_id')
          .then((response) => response.json())
          .then((responseJson) => {
            
            AsyncStorage.setItem('@medi2me:cart_id',''+responseJson[0].cart_id).then(res2=>{
              console.log(res2);
            })
          })
          .catch((error) => {
            console.error(error);
          });
          console.log('test=',cart_id);
         
        }
      }catch(err){

      }
      try{
        
      
      }catch(err){

      }
      
    }
    static navigationOptions = ({ navigation }) => ({
        header: (
           null
        )
      });
      render
  render() {
  
    return (
  
      <Container>
           <Header style={{height:70,backgroundColor:'#0db1b0'}}>
      <Left>
        <Button
          transparent
          onPress={() =>this.props.navigation.navigate("DrawerOpen")}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>HomeScreen</Title>
      </Body>
      <Right style={{position:'relative'}}>
      <Button transparent>
      <Icon name="cart" style={{fontSize:35}}/>
      {this.props.count>0 && <Badge  style={{position:'absolute',top:2,left:30}}>
      <Text style={{fontSize:10}}>{this.props.count}</Text>
    </Badge>}
      </Button>
      </Right>
    </Header>
        <Content  style={{backgroundColor:'#0db1b0'}}>
        
    <Card>

           
            <Item style={{flex:1,padding:1,paddingLeft:10}}>
            <Icon name="ios-search" />
            <Input placeholder="Search" onFocus={()=>this.props.navigation.navigate('Search')}/>
            
          </Item>
        
       
  
    </Card>

    <Grid>
            <Col style={{ backgroundColor: '#FF6F00', height: 100,justifyContent:'center',padding:10 }}>
                <Button onPress={() => this.props.navigation.navigate('Camera')} style={{ backgroundColor: '#0db1b0',alignSelf:'flex-end'}}>
                    <Text>Upload</Text>
                </Button>
            </Col>
            
    </Grid>
        
   
        </Content>
      </Container>
    );
  }


 
}

function mapStateToProps(state){
  console.log(state);
  return { count:state.cart }
}

export default connect(mapStateToProps,{getCartCount})(HomeScreen);