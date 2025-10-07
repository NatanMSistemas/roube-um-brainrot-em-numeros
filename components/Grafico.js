import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Grafico({ registros }) {
  if (registros.length < 2) {
    return (
      <View style={styles.card}>
        <Text style={styles.fallbackText}>
          Adicione pelo menos 2 lançamentos para ver o gráfico.
        </Text>
      </View>
    );
  }

  const data = {
    labels: registros.map(reg => reg.data.substring(0, 5)).reverse(),
    datasets: [
      {
        data: registros.map(reg => reg.dinheiro).reverse(),
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Evolução do Dinheiro Rendido</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel="R$ "
        chartConfig={{
          backgroundColor: '#1e1e1e',
          backgroundGradientFrom: '#2c2c2c',
          backgroundGradientTo: '#1e1e1e',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(3, 218, 198, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#bb86fc' },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1e1e1e', borderRadius: 8, padding: 10, marginHorizontal: 15, marginBottom: 20, borderColor: '#333', borderWidth: 1, alignItems: 'center' },
  titulo: { textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#bb86fc', marginBottom: 5 },
  fallbackText: { color: '#999', textAlign: 'center', padding: 20 },
});