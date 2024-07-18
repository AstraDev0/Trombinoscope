import { View, Text, TouchableOpacity } from 'react-native';
import { LandingScreenStyles } from '../../style';
import { LinearGradient } from 'expo-linear-gradient';
import localStorage from '../utils/localStorage'

export function LandingScreen({ navigation }) {
    const handleStart = () => {
        localStorage.storeData("LoadingPage", "true")
        navigation.navigate("Login")
    }
    return (
        <View style={LandingScreenStyles.background}>
            <LinearGradient
                colors={['#8357c5', '#2980b9', '#27ae60']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={LandingScreenStyles.LandingGradient}
            >
                <View style={LandingScreenStyles.LandingScreen}>

                    <Text style={LandingScreenStyles.Slogan}>
                        L'entreprise, autrement
                    </Text>
                    <View style={LandingScreenStyles.Description}>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>Trombiii</Text>, le réseau social privé dédié aux collaborateurs de votre entreprise.
                        </Text>
                        <Text>
                            Découvrir, communiquer et partager des informations avec vos collaborateurs dans un environnement sécurisé et privé.
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={LandingScreenStyles.LoginButton}
                        onPress={() => {  handleStart() }}>
                            <Text style={LandingScreenStyles.LoginButtonText}> Commencer </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}