import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator, ScrollView } from 'react-native';

const HelpCenterScreen = ({ session }) => {
  const [users, setUsers] = useState([]);
  const [unreadMessage, setUnreadMessage] = useState(0);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const flatListRef = useRef(null);

  // Fetch users
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread messages
  const getUnreadMessage = async () => {
    try {
      const res = await fetch("/api/chat/unread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session.user.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUnreadMessage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch messages
  const getMessage = async () => {
    setMessageLoading(true);
    try {
      const res = await fetch(`/api/chat/${session.user.id}/${user.id}`);
      const data = await res.json();
      if (res.status === 200) {
        setMessages(data.message);
      } else if (res.status === 400) {
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMessageLoading(false);
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Append message locally first
      setMessages((prev) => [
        ...prev,
        {
          fromSelf: true,
          message,
          createAt: new Date(),
        },
      ]);

      // Send message to the server
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          from: session.user.id,
          to: user.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async () => {
    try {
      const res = await fetch(`/api/chat/${session.user.id}/${selectedUser?.id}`, {
        method: "PUT",
      });

      if (res.ok) {
        console.log("Marked messages as read successfully");
      } else {
        console.error("Failed to mark messages as read");
      }
    } catch (error) {
      console.error("Mark messages as read error:", error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getMessage();
      markMessagesAsRead();
    }
  }, [selectedUser]);

  // Fetch unread messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      getUnreadMessage();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Format message timestamp
  function formatTime(createAt) {
    const date = new Date(createAt);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ศูนย์การช่วยเหลือ</Text>
      </View>

      {/* Chat Section */}
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>Chat with us!</Text>
        <Text style={styles.chatSubtitle}>บรรยาย</Text>
      </View>

      {/* User Selection */}
      <View style={styles.usersContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(user) => user.id.toString()}
            renderItem={({ item }) => (
              <Button title={item.name} onPress={() => setSelectedUser(item)} />
            )}
          />
        )}
      </View>

      {/* Chat Bubbles */}
      <View style={styles.chatArea}>
        {messageLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={item.fromSelf ? styles.chatBubbleSelf : styles.chatBubbleOther}>
                <Text style={styles.chatText}>{item.message}</Text>
                <Text style={styles.chatTime}>{formatTime(item.createAt)}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="เขียนข้อความ"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSendMessage} disabled={!message.trim()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBE9E7',
    paddingVertical: 16,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  usersContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  chatBubbleSelf: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  chatBubbleOther: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  chatText: {
    fontSize: 14,
  },
  chatTime: {
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    padding: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});

export default HelpCenterScreen;
