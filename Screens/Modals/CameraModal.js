import React,{Component} from 'react';
import { Container, Header, Content, Icon,Button } from 'native-base';
import { ImagePicker,Camera,Permissions } from 'expo';
import { Text, View,  Modal, StyleSheet,TouchableOpacity,Image,Dimensions } from 'react-native';
export default class CameraModal extends Component{

    state = {
        image: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
      };

      async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }


      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

    render(){
        let camera=null;
        let { image,hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            camera =  <View />;
          } else if (hasCameraPermission === false) {
            camera = <Text>No access to camera</Text>;
          } else {
            camera = <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
          }
          return(
            <Modal
    visible={this.props.modalVisible}
    animationType={'slide'}
    onRequestClose={this.props.closeModal}
>
  <View style={styles.modalContainer}>
  {image &&
          <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height/3 }} />}
    <View style={styles.innerContainer}>
     <Button  transparent light onPress={this.props.takeImage}>
     <Icon name='camera' style={{fontSize:80}}/>
     </Button>
     

       <Button transparent light onPress={this._pickImage}>
     <Icon name='image' style={{fontSize:80}}/>
     </Button>
     
      

    </View>

    {camera && camera}
  </View>
</Modal>
        )
    }

    
} 



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    innerContainer: {
        flexDirection:'row',
      alignItems: 'center',
      justifyContent:'space-around'
    },
  });