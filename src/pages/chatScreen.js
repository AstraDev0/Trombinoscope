import { View, TextInput, TouchableOpacity, Text, FlatList, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { chatScreenStyles } from "../../style"
import fireApi from '../utils/firebaseApi'
import localStorage from '../utils/localStorage'
import hash from '../utils/hash';
import { MessageBubble } from '../components/DisplayMessage';

export function ChatScreen({ route, navigation }) {
    const { info, image } = route.params;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [infoMe, setInfoMe] = useState({});
    const [chatId, setchatId] = useState("");
    const flatListRef = useRef();

    const callback = (data) => {
        if (!data)
            return;
        setMessages(data.map(item => ({ text: item.text, id: item.id })));
    };

    const handleSendPress = () => {
        if (newMessage.trim() !== '') {
            fireApi.setData("chats/" + chatId + "/" + hash.makeId(20), { text: newMessage, id: infoMe.id, timestamp: new Date().getTime() })
            setNewMessage('');
        }
    };

    const generateChatId = (id1, id2) => {
        return id1 > id2 ? id1.toString() + id2.toString() : id2.toString() + id1.toString();
    };

    useEffect(() => {
        setMessages([])
        localStorage.getData("_me")
            .then((response) => JSON.parse(response))
            .then((data) => {
                const idChat = generateChatId(data.id, info.id)
                setInfoMe(data)
                setchatId(idChat)
                fireApi.listenToRealTimeData("chats/" + idChat, callback);
            })
    }, [info.id]);

    return (
        <View style={{ flex: 1 }}>
            <View style={chatScreenStyles.containerTopBar}>
                <Image
                    source={{ uri: image }}
                    style={chatScreenStyles.profileImage}
                />
                <Text style={chatScreenStyles.username}>{info.name} {info.surname}</Text>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                ref={flatListRef}
                onContentSizeChange={(contentWidth, contentHeight) => { flatListRef.current.scrollToEnd({ animated: true }) }}
                renderItem={({ item }) => (
                    <MessageBubble text={item.text} id={item.id} myId={infoMe.id} />
                )}
            />
            <View style={chatScreenStyles.containerInput}>
                <TextInput
                    style={chatScreenStyles.TextInput}
                    placeholder="Message..."
                    value={newMessage}
                    onChangeText={text => setNewMessage(text)}
                    onSubmitEditing={handleSendPress}
                />
                <TouchableOpacity onPress={handleSendPress}>
                    <Image
                        source={require('../assets/send.png')}
                        style={chatScreenStyles.IconItem}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

