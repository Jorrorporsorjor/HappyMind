import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

interface QuizDetails {
  knowledge: string;
  belief: string;
  helpSeeking: string;
  selfHelp: string;
  totalScore: string;
  risk: string;
}

interface QuizResult {
  test1: QuizDetails | null;
  test2: QuizDetails | null;
  test3: QuizDetails | null;
}

const ResultScreen = () => {
  const [quizResults, setQuizResults] = useState<QuizResult>({
    test1: null,
    test2: null,
    test3: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchQuizResults();
  }, []);

  const fetchQuizResults = async () => {
    try {
      const response = await fetch(global.URL + "/api/quiz", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the response contains test1, test2, and test3 data in the appropriate format
        setQuizResults({
          test1: data.test1,
          test2: data.test2,
          test3: data.test3,
        });
      } else {
        Alert.alert('Failed to load quiz results.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred while fetching quiz results.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading results...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Test 1 Results */}
      <View style={styles.quizContainer}>
        <Text style={styles.quizHeader}>Test 1 Results</Text>
        {quizResults.test1 ? (
          <View style={styles.resultContent}>
            <Text>Knowledge: {quizResults.test1.knowledge}</Text>
            <Text>Belief: {quizResults.test1.belief}</Text>
            <Text>Help Seeking: {quizResults.test1.helpSeeking}</Text>
            <Text>Self Help: {quizResults.test1.selfHelp}</Text>
            <Text>Total Score: {quizResults.test1.totalScore}</Text>
            <Text>Risk Level: {quizResults.test1.risk}</Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>No Test 1 data available.</Text>
        )}
      </View>

      {/* Test 2 Results */}
      <View style={styles.quizContainer}>
        <Text style={styles.quizHeader}>Test 2 Results</Text>
        {quizResults.test2 ? (
          <View style={styles.resultContent}>
            <Text>Knowledge: {quizResults.test2.knowledge}</Text>
            <Text>Belief: {quizResults.test2.belief}</Text>
            <Text>Help Seeking: {quizResults.test2.helpSeeking}</Text>
            <Text>Self Help: {quizResults.test2.selfHelp}</Text>
            <Text>Total Score: {quizResults.test2.totalScore}</Text>
            <Text>Risk Level: {quizResults.test2.risk}</Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>No Test 2 data available.</Text>
        )}
      </View>

      {/* Test 3 Results */}
      <View style={styles.quizContainer}>
        <Text style={styles.quizHeader}>Test 3 Results</Text>
        {quizResults.test3 ? (
          <View style={styles.resultContent}>
            <Text>Knowledge: {quizResults.test3.knowledge}</Text>
            <Text>Belief: {quizResults.test3.belief}</Text>
            <Text>Help Seeking: {quizResults.test3.helpSeeking}</Text>
            <Text>Self Help: {quizResults.test3.selfHelp}</Text>
            <Text>Total Score: {quizResults.test3.totalScore}</Text>
            <Text>Risk Level: {quizResults.test3.risk}</Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>No Test 3 data available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  quizContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quizHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultContent: {
    marginTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResultScreen;
