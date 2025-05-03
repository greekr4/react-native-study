import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const axiosTest = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    setData(response.data);
  }

  useEffect(() => {
    if (activeTab === 'data') {
      axiosTest();
    }
  }, [activeTab]);

  const renderHomeScreen = () => (
    <View style={styles.container}>
      <Image source={require('./assets/images/sy.jpg')} style={styles.image} />
      <Text style={styles.title}>소연이 괴롭히기!</Text>
      <Text style={styles.counter}>괴롭힌 횟수: {count}</Text>
      
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button title="간지럽히기!" onPress={() => setCount(count + 1)} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="찌르기!" onPress={() => setCount(count + 100)} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="괴롭히기!" onPress={() => setCount(count + 10000)} />
        </View>
      </View>
    </View>
  );

  const renderDataScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>axios 테스트</Text>
      <ScrollView style={styles.dataContainer}>
        {data.map((item: any) => (
          <View key={item.id} style={styles.dataItem}>
            <Text style={styles.dataTitle}>제목 : {item.title}</Text>
            <Text style={styles.dataBody}>내용 : {item.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {activeTab === 'home' ? renderHomeScreen() : renderDataScreen()}
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'home' && styles.activeTab]} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={styles.tabText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'data' && styles.activeTab]} 
          onPress={() => setActiveTab('data')}
        >
          <Text style={styles.tabText}>데이터</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  counter: {
    fontSize: 32,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 100,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonContainer: {
    marginHorizontal: 8,
    width: 100,
  },
  dataContainer: {
    width: '100%',
    maxHeight: 600,
  },
  dataItem: {
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataBody: {
    fontSize: 14,
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
  },
  tabText: {
    fontSize: 16,
  }
});

export default App;
