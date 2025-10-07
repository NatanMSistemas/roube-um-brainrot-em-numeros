import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListaRegistros({ registros, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Livro-Caixa de Brainrots</Text>
      {registros.length > 0 ? (
        registros.map(reg => (
          <View key={reg.id} style={styles.itemHistorico}>
            <Text style={styles.itemTexto}>
              <Text style={styles.dataTexto}>{reg.data}:</Text> 
              {' '}Roubados: {reg.roubados}, Perdidos: {reg.perdidos}, Saldo: R$ {reg.dinheiro.toFixed(2)}
            </Text>
            <View style={styles.botoesAcao}>
              <TouchableOpacity style={styles.botaoEditar} onPress={() => onEdit(reg)}>
                <Text style={styles.botaoTextoAcao}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoDelete} onPress={() => onDelete(reg.id)}>
                <Text style={styles.botaoTextoAcao}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.itemTexto}>Nenhum lançamento no livro-caixa.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#1e1e1e', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, borderColor: '#333', borderWidth: 1 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#bb86fc' },
    itemHistorico: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#333' },
    itemTexto: { fontSize: 16, color: '#e0e0e0', flex: 1, marginRight: 10, lineHeight: 24 },
    dataTexto: { fontWeight: 'bold', color: '#03dac6' },
    botoesAcao: { flexDirection: 'row' },
    botaoEditar: { backgroundColor: '#f39c12', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    botaoDelete: { backgroundColor: '#e74c3c', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
    botaoTextoAcao: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});