import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function MessagesScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! 👋', sender: 'other' },
    { id: '2', text: 'Oi! Tudo bem? 😊', sender: 'me' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), text: newMessage, sender: 'me' },
    ]);
    setNewMessage('');
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Mensagens</Text>
        <Ionicons name="chatbubbles-outline" size={26} color="#2B6EF6" />
      </View>

      {/* 🔹 Lista de mensagens */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* 🔹 Campo de envio */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma mensagem..."
            value={newMessage}
            onChangeText={setNewMessage}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#222' },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 18,
    padding: 12,
    marginVertical: 6,
  },
  myMessage: {
    backgroundColor: '#2B6EF6',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#E6EFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  input: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#3b4250ff',
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});
