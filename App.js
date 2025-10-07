import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';

import * as Database from './services/Database';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';
import Grafico from './components/Grafico';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [ordenacao, setOrdenacao] = useState('recentes');

  useEffect(() => {
    const init = async () => {
      const dados = await Database.carregarDados();
      setRegistros(dados);
      setCarregando(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!carregando) {
      Database.salvarDados(registros);
    }
  }, [registros, carregando]);

  // Função handleSave totalmente adaptada para o novo tema
  const handleSave = (brainrotsRoubados, brainrotsPerdidos, dinheiroRendido) => {
    const roubadosNum = parseInt(String(brainrotsRoubados).replace(',', '.')) || 0;
    const perdidosNum = parseInt(String(brainrotsPerdidos).replace(',', '.')) || 0;
    const dinheiroNum = parseFloat(String(dinheiroRendido).replace(',', '.')) || 0;

    if (roubadosNum < 0 || perdidosNum < 0 || dinheiroNum < 0) {
      return Alert.alert("Erro de Validação", "Nenhum valor pode ser negativo.");
    }

    if (editingId) {
      // MODO DE ATUALIZAÇÃO
      const registrosAtualizados = registros.map(reg =>
        reg.id === editingId
          ? { ...reg, roubados: roubadosNum, perdidos: perdidosNum, dinheiro: dinheiroNum }
          : reg
      );
      setRegistros(registrosAtualizados);
      Alert.alert('Sucesso!', 'Lançamento atualizado!');
    } else {
      // MODO DE CRIAÇÃO
      const novoRegistro = { 
        id: new Date().getTime(), 
        data: new Date().toLocaleDateString('pt-BR'),
        roubados: roubadosNum, 
        perdidos: perdidosNum, 
        dinheiro: dinheiroNum 
      };
      setRegistros([...registros, novoRegistro]);
      Alert.alert('Sucesso!', 'Novo lançamento salvo no livro-caixa!');
    }

    setEditingId(null);
  };

  const handleDelete = (id) => {
    setRegistros(registros.filter(reg => reg.id !== id));
    Alert.alert('Sucesso!', 'Lançamento deletado.');
  };
  
  const handleEdit = (registro) => {
    setEditingId(registro.id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const exportarDados = async () => { /* ... (código inalterado) ... */ };

  // Lógica de Ordenação adaptada
  let registrosExibidos = [...registros]; 
  if (ordenacao === 'maior_dinheiro') {
    registrosExibidos.sort((a, b) => b.dinheiro - a.dinheiro);
  } else {
    registrosExibidos.sort((a, b) => b.id - a.id);
  }

  if (carregando) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#bb86fc" /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Contabilidade de Brainrots 🤑</Text>
        <Text style={styles.subtituloApp}>Onde o cérebro vira commodity</Text>
        
        <Grafico registros={registrosExibidos} />

        <Formulario 
          onSave={handleSave} 
          onCancel={handleCancel}
          registroEmEdicao={registros.find(r => r.id === editingId) || null}
        />

        <View style={styles.botoesOrdenacaoContainer}>
          <TouchableOpacity 
            style={[styles.botaoOrdenacao, ordenacao === 'recentes' && styles.botaoOrdenacaoAtivo]} 
            onPress={() => setOrdenacao('recentes')}>
            <Text style={styles.botaoOrdenacaoTexto}>Mais Recentes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.botaoOrdenacao, ordenacao === 'maior_dinheiro' && styles.botaoOrdenacaoAtivo]} 
            onPress={() => setOrdenacao('maior_dinheiro')}>
            <Text style={styles.botaoOrdenacaoTexto}>+ Dinheiro</Text>
          </TouchableOpacity>
        </View>

        <ListaRegistros 
          registros={registrosExibidos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        {/* ... (O restante do código, como a seção de exportar, continua igual) ... */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: '#121212' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#e0e0e0' },
  subtituloApp: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: -20, marginBottom: 20, fontStyle: 'italic' },
  botoesOrdenacaoContainer: { flexDirection: 'row', justifyContent: 'center', marginHorizontal: 15, marginBottom: 15, gap: 10 },
  botaoOrdenacao: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#333' },
  botaoOrdenacaoAtivo: { backgroundColor: '#bb86fc' },
  botaoOrdenacaoTexto: { color: 'white', fontWeight: '600' },
  // ... (outros estilos como 'card', 'subtitulo', etc., podem ser mantidos)
});