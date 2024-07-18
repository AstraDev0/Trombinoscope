import { View, Text } from 'react-native';
import { chatScreenStyles } from "../../style"

export function MessageBubble({ text, id, myId }) {
    const isOutgoing = id === myId;
    return (
        <View style={[chatScreenStyles.messageBubble, { alignSelf: isOutgoing ? 'flex-end' : 'flex-start' }, { backgroundColor: isOutgoing ? 'grey' : 'black' }]}>
            <Text style={{ color: 'white' }}>{text}</Text>
        </View>
    );
}
