import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Platform, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS == "web" ? 0 : Platform.OS === 'ios' ? 80 : StatusBarManager.HEIGHT;

export const LoginPageStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 10,
  },
  inputView: {
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    width: 200,
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    shadowOpacity: 0.2,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    backgroundColor: '#707070',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  TextLogin: {
    paddingBottom: 30,
    fontSize: 22,
  },
  buttonText: {
    color: "white"
  },
  error: {
    marginTop: 10,
    color: "red"
  },
});

export const PublicPageStyles = StyleSheet.create({
  profilPictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  profilPicture: {
    height: "100%",
    width: "100%",
  },
  publicScreen: {
    backgroundColor: "white",
  },
  itemContainer: {
    border: "1px solid #000",
    backgroundColor: "#E7EDEF",
    paddingTop: 7,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    shadowOpacity: 0.2,
  },
  BlockImageText: {
    padding: 10,
    marginBottom: 14,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  BlockText: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    paddingRight: 16,
  },
  IconItem: {
    marginRight: 9,
    width: 20,
    height: 20,
    paddingRight: 10,
    left: 0
  },
  input: {
    width: "100%",
    padding: 5,
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  topBar: {
    zIndex: 99,
    display: 'block',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingTop: STATUSBAR_HEIGHT + (Platform.OS === 'ios' ? -10 : 10),
    paddingHorizontal: 10,
    borderBottomColor: '#ccc',
  },
  buttonText: {
    color: 'white',
  },
});

export const PrivatePageStyles = StyleSheet.create({
  privateScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: STATUSBAR_HEIGHT
  },
  WidgetClock: {
    position: 'absolute',
    top: 80,
    shadowOpacity: 0.2,
    width: 100,
    height: 50,
  },
  WidgetClockClock: {
    fontWeight: "bold",
  },
  WidgetWeather: {
    position: 'absolute',
    top: 120,
    borderRadius: 10,
    shadowOpacity: 0.2,
    width: 200,
    height: 200,
  },
  WidgetWeatherCity: {
    position: 'absolute',
    top: "10%",
    left: "25%",
    fontWeight: 'bold',
    fontSize: 20,
  },
  WidgetWeatherMain: {
    justifyContent: "center",
  },
  WidgetWeatherDescription: {
    top: "60%",
    left: "23%",
    fontSize: 20,
    justifyContent: "center",
  },
  WidgetWeatherTemp: {
    position: 'absolute',
    top: "30%",
    left: "25%",
    fontSize: 30,
  },
  WidgetWeatherImageContainer: {
    position: 'absolute',
    top: "75%",
    left: "40%",
    shadowOpacity: 0.2,
    borderColor: 'black',
    width: '20%',
    height: '20%',
    resizeMode: 'cover',
  },
  WidgetToDo: {
    flex: 1,
    position: 'absolute',
    top: 120,
    borderRadius: 10,
    shadowOpacity: 0.2,
    width: 300,
    height: 200,
    borderBlockColor: "black",
  },
  ToDoInput: {
    marginTop: 10,
    backgroundColor: 'white',
    width: 200,
    height: 20,
    borderRadius: 5,
    fontSize: 15,
  },
  ToDoAddButton: {
    backgroundColor: "#707070",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  ToDoAddButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
  },
  ToDoTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
    fontSize: 18,
  },
  ToDoItemList: {
    fontWeight: "bold",
    marginRight: 3,
  },
  ToDoEditButton: {
    color: "green",
  },
  ToDoDeleteButton: {
    color: "red",
    marginLeft: 10,
  },
  ToDoTaskButtons: {
    flexDirection: "row",
  },
  WidgetNote: {
    flex: 1,
    position: 'absolute',
    top: 130,
    borderRadius: 10,
    shadowOpacity: 0.2,
    width: 300,
    height: 100,
    borderBlockColor: "black",
  },
  NoteInput: {
    borderRadius: 4,
    borderWidth: 0.5,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  listComponent: {
  },
  WidgetWeatherGradient: {
    flex: 20,
    borderRadius: 10,
  },
  WidgetNoteGradient: {
    borderRadius: 10,
  },
  WidgetClockGradient: {
    flex: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  WidgetToDoGradient: {
    flex: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  WidgetChat: {
    position: 'absolute',
    top: 150,
    borderRadius: 10,
    shadowOpacity: 0.2,
    width: 300,
    height: 100,
    borderBlockColor: "black",
  }
});

export const chatScreenStyles = StyleSheet.create({
  TextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  IconItem: {
    marginRight: 15,
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  messageBubble: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  containerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E7EDEF',
    paddingTop: STATUSBAR_HEIGHT + 5
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export const LandingScreenStyles = StyleSheet.create({
  Slogan: {
    marginTop: 100,
    fontSize: 50,
    fontWeight: "bold"
  },
  background: {
    flex: 1,
  },
  LandingScreen: {
    margin: 40,
  },
  Description: {
    width: 300,
    marginTop: 20,
    height: 150,
  },
  LoginButton : {
    backgroundColor: 'black',
    width: 100,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  LoginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  LandingGradient: {
    flex: 20,
  },
});
export const Appstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export const Profilstyles = StyleSheet.create({
  Contener: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  Contener_top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 10,
  },

  Contener_mid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  Contener_bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  Name_top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 137,
    height: 42,
    borderRadius: 40,
    backgroundColor: '#E7EDEF'
  },

  Page_mid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 450,
    borderRadius: 30,
    backgroundColor: '#E7EDEF',
    marginTop: 90,
  },

  Page_mid_two: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 340,
    height: 325,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
  },

  print_info_mid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 20,
    borderRadius: 40,
    backgroundColor: '#FFF',
    marginLeft: 15
  },

  text_first: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'normal',
  },

  Groupe_print_mid: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30
  },
  btn: {
    backgroundColor: '#707070',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "white"
  }
});

export const LogBtnStyle = StyleSheet.create({
  container: {
  },
  img: {
    width: 30,
    height: 30,
    marginLeft: 5,
  }
})
