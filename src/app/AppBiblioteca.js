import { useState, useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text, Image, StyleSheet, TextInput, Pressable, ScrollView, FlatList, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { db, initDb } from '../data/db';
import { carregarJogos, cadastrarJogo, editarJogo, excluirJogo } from '../data/jogos';

initDb();

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [conquistas, setConquistas] = useState('');
  const [porcentagemConclusao, setPorcentagemConclusao] = useState('');
  const [tempoJogo, setTempoJogo] = useState('');
  const [jogos, setJogos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  function listarJogos() {
    setJogos(carregarJogos());
  }

  function somenteNumeros(valor) {
    return valor.replace(/[^0-9]/g, '');
  }

  useEffect(() => {
    listarJogos();
  }, []);

  function cadastrar() {
    if (!nome.trim() || !conquistas.trim() || !porcentagemConclusao.trim() || !tempoJogo.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const numConquistas = parseInt(conquistas, 10);
    const numPorcentagemConclusao = parseInt(porcentagemConclusao, 10);
    const numTempoJogo = parseInt(tempoJogo, 10);

    if (
      Number.isNaN(numConquistas) ||
      Number.isNaN(numPorcentagemConclusao) ||
      Number.isNaN(numTempoJogo)
    ) {
      Alert.alert('Atenção', 'Digite valores numéricos válidos.');
      return;
    }

    if (numPorcentagemConclusao < 0 || numPorcentagemConclusao > 100) {
      Alert.alert('Atenção', 'A porcentagem deve estar entre 0 e 100.');
      return;
    }

    if (editandoId !== null) {
      editarJogo(editandoId, nome.trim(), numConquistas, numPorcentagemConclusao, numTempoJogo);
    } else {
      cadastrarJogo(nome.trim(), numConquistas, numPorcentagemConclusao, numTempoJogo);
    }

    limparFormulario();
    listarJogos();
  }

  function editar(jogo) {
    setEditandoId(jogo.id);
    setNome(jogo.nome);
    setConquistas(String(jogo.conquistas));
    setPorcentagemConclusao(String(jogo.porcentagemConclusao));
    setTempoJogo(String(jogo.tempoJogo));
  }

  function limparFormulario() {
    setEditandoId(null);
    setNome('');
    setConquistas('');
    setPorcentagemConclusao('');
    setTempoJogo('');
  }

  function excluir(id, nome, conquistas, porcentagemConclusao, tempoJogo) {
    Alert.alert('Excluir', `Remover "${nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          excluirJogo(id);
          if (editandoId === id) {
            limparFormulario();
          }
          listarJogos();
        },
      },
    ]);
  }

  return (

    <SafeAreaProvider>
      <SafeAreaView style={estilos.safeArea}>

        <Stack.Screen options={{ title: 'Biblioteca' }} />


        {/* Biblioteca */}


        <View style={estilos.tituloSecao}>
          <Text style={estilos.textoTitulo}>Cadastrar Jogo</Text>
        </View>

        <TextInput
          style={estilos.input}
          placeholder="Jogo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Conquistas"
          style={estilos.input}
          value={conquistas}
          keyboardType="numeric"
          onChangeText={(value) => setConquistas(somenteNumeros(value))}
        />

        <TextInput
          placeholder="% de conclusão"
          style={estilos.input}
          value={porcentagemConclusao}
          keyboardType="numeric"
          onChangeText={(value) => setPorcentagemConclusao(somenteNumeros(value))}
        />

        <TextInput
          placeholder="Tempo de jogo (horas)"
          style={estilos.input}
          value={tempoJogo}
          keyboardType="numeric"
          onChangeText={(value) => setTempoJogo(somenteNumeros(value))}
        />

        {/*Cadastrar e Editar*/}

        <Pressable style={estilos.botaoCadastrar} onPress={cadastrar}>
          <Text style={estilos.textoCadastrar}>
            {editandoId !== null ? 'Salvar alterações' : 'Cadastrar'}
          </Text>
        </Pressable>

        {editandoId !== null && (
          <Pressable style={estilos.botaoCancelar} onPress={limparFormulario}>
            <Text style={estilos.textoCancelar}>Cancelar edição</Text>
          </Pressable>
        )}

        <View style={estilos.tituloSecaoJogos}>
          <Text style={estilos.textoTituloJogos}>Seus Jogos</Text>
        </View>

        <FlatList showsVerticalScrollIndicator={false}
          data={jogos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={estilos.lista}
          renderItem={({ item }) => (
            <View style={estilos.card}>
              <View style={estilos.info}>
                <Text style={estilos.nome}>{item.nome}</Text>
                <Text style={estilos.conquistas}>Conquistas: {item.conquistas}</Text>
                <Text style={estilos.porcentagem}>Conclusão: {item.porcentagemConclusao}%</Text>
                <Text style={estilos.tempo}>Tempo: {item.tempoJogo} horas</Text>

              </View>
              <View style={{ flexDirection: 'column', gap: 10 }}>
                <Pressable onPress={() => excluir(item.id, item.nome, item.conquistas, item.porcentagemConclusao, item.tempoJogo)}>
                  <Text style={estilos.excluir}>Excluir</Text>
                </Pressable>
                <Pressable onPress={() => editar(item)}>
                  <Text style={estilos.editar}>Editar</Text>
                </Pressable>
              </View>

            </View>
          )}
          ListEmptyComponent={
            <Text style={estilos.vazio}>Nenhum Jogo Cadastrado Ainda</Text>
          }
        />


      </SafeAreaView>
    </SafeAreaProvider>

  );
}


const estilos = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#3D7F7F',
    paddingHorizontal: 16,
  },

  //BIBLIOTECA
  cardBiblioteca: {
    backgroundColor: '#274857',
    borderRadius: 10,
    padding: 10,
    marginTop: 15
  },

  nomeJogo: {
    color: '#ffffff',
    fontWeight: '700'
  },

  infoJogo: {
    color: '#ffffff'
  },

  input: {
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10
  },

  tituloSecao: {
    backgroundColor: '#274857',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },

  textoTitulo: {
    color: '#fff',
    fontWeight: '700',
  },

  tituloSecaoJogos: {
    backgroundColor: '#274857',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },

  textoTituloJogos: {
    color: '#fff',
    fontWeight: '700',
  },

  botaoCadastrar: {
    backgroundColor: '#274857',
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },

  textoCadastrar: {
    color: '#ffffff',
    fontWeight: '700'
  },




  botaoCancelar: {
    backgroundColor: '#274857',
    height: 45,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  textoCancelar: {
    color: '#ffffff',
    fontWeight: '700'
  },



  //FLATLIST
  lista: {
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#274857',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: "#ffffff",
    marginBottom: 4,
  },
  conquistas: {
    fontSize: 14,
    color: '#ffffff',
  },
  porcentagem: {
    fontSize: 14,
    color: '#ffffff',
  },
  tempo: {
    fontSize: 14,
    color: '#ffffff',
  },

  excluir: {
    color: '#f38ba8',
    fontWeight: '700',
    fontSize: 14,
  },

  editar: {
    color: '#5992cf',
    fontWeight: '700',
    fontSize: 14,
  },

  vazio: {
    color: 'black',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },

});
