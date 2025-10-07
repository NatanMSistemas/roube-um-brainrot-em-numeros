import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Formulario({ onSave, onCancel, registroEmEdicao }) {
  const [brainrotsRoubados, setBrainrotsRoubados] = useState('');
  const [brainrotsPerdidos, setBrainrotsPerdidos] = useState('');
  const [dinheiroRendido, setDinheiroRendido] = useState('');

  useEffect(() => {
    if (registroEmEdicao) {
      setBrainrotsRoubados(String(registroEmEdicao.roubados));
      setBrainrotsPerdidos(String(registroEmEdicao.perdidos));
      setDinheiroRendido(String(registroEmEdicao.dinheiro));
    } else {
      setBrainrotsRoubados('');
      setBrainrotsPerdidos('');
      setDinheiroRendido('');
    }
  }, [registroEmEdicao]);

  const handleSaveClick = () => {
    onSave(brainrotsRoubados, brainrotsPerdidos, dinheiroRendido);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>
        {registroEmEdicao ? 'Editando Lançamento' : 'Novo Lançamento'}
      </Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Brainrots roubados 😈" 
        keyboardType="numeric" 
        value={brainrotsRoubados} 
        onChangeText={setBrainrotsRoubados}
        placeholderTextColor="#999"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Brainrots perdidos 😭" 
        keyboardType="numeric" 
        value={brainrotsPerdidos} 
        onChangeText={setBrainrotsPerdidos}
        placeholderTextColor="#999"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Dinheiro rendido (R$)" 
        keyboardType="numeric" 
        value={dinheiroRendido} 
        onChangeText={setDinheiroRendido}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.botao} onPress={handleSaveClick}>
        <Text style={styles.botaoTexto}>
          {registroEmEdicao ? 'Atualizar Lançamento' : 'Registrar no Livro'}
        </Text>
      </TouchableOpacity>

      {registroEmEdicao && (
        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancel}>
          <Text style={styles.botaoTexto}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#1e1e1e', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, borderColor: '#333', borderWidth: 1 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#bb86fc' },
    input: { borderWidth: 1, borderColor: '#444', borderRadius: 5, padding: 12, fontSize: 16, marginBottom: 10, color: '#e0e0e0' },
    botao: { backgroundColor: '#03dac6', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 5 },
    botaoTexto: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
    botaoCancelar: { backgroundColor: '#cf6679', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
});