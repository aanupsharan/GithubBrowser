import React,{ Component, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import AuthService from './AuthService';

export const initialState = {
  username:'',
  password:'',
  showProgress: false,
  success: false,
  badCredentials: false,
  unknownError: false
};

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = initialState;
    }
    onLogin(){
        console.log(`${this.state.username} ::: ${this.state.password}`);
        this.setState({showProgress: true});

        AuthService.login({
            username: this.state.username,
            password: this.state.password
        },(results) => {
            this.setState(results);
            this.setState({showProgress: false});
        })
    }

    render(){
     let errorCtrl = <View/>;
     if(!this.state.success && this.state.badCredentials){
         errorCtrl = <Text style={styles.error}>The username and password combination did not work</Text>
     }
     if(!this.state.success && this.state.unknownError){
         errorCtrl = <Text style={styles.error}>The username and password combination did not work</Text>
     }

     return(
         <View style={styles.containeer}>
            <Image source={{uri: 'octcat'}} style={styles.logo}  />
             <Text style={styles.header}>
                 Github Browser
             </Text>
             <TextInput style={styles.input}
                        placeholder = "Github Login"
                        onChangeText={(usrtext) => this.setState({username: usrtext})}/>
             <TextInput style={styles.input}
                        placeholder = "Github Password"
                        secureTextEntry = "true"
                        onChangeText = {(passtext) => this.setState({password: passtext})}/>
             <TouchableHighlight
                 onPress = {this.onLogin.bind(this)}
                 style={styles.button}>
                 <Text style={styles.buttonText}>
                     Log In
                 </Text>
             </TouchableHighlight>

             {errorCtrl}

             <ActivityIndicator animating={this.state.showProgress}
                                size="large"
                                style={styles.loader}/>
         </View>
     );
    }
}

const styles = StyleSheet.create({
    containeer:{
        backgroundColor: '#F5FCFF',
        flex:1,
        paddingTop: 40,
        alignItems: 'center',
        padding: 10
    },
    logo:{
        width: 66,
        height: 55
    },
    header:{
        fontSize: 30,
        marginTop: 10
    },
    input:{
        height: 40,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        alignSelf: 'stretch'
    },
    button:{
        height: 40,
        marginTop: 10,
        backgroundColor: '#48bbec',
        justifyContent:'center',
        alignSelf: 'stretch'
    },
    buttonText:{
        fontSize: 18,
        color: '#FFF',
        alignSelf:'center'
    },
    loader:{
        marginTop: 15
    },
    error: {
        color: '#FF0000',
        paddingTop: 10
    }


})
module.export = Login;