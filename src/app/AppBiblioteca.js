import { Link, Stack} from 'expo-router';
import { View, Text, Image, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (

    <SafeAreaProvider>
      <SafeAreaView style={estilos.safeArea}>

        <Stack.Screen options={{ title: 'Biblioteca' }} />
        

        {/* Biblioteca */}
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={estilos.tituloSecao}>
            <Text style={estilos.textoTitulo}>Cadastrar Jogo</Text>
          </View>

          <TextInput
            placeholder="Nome do jogo"
            style={estilos.input}
          />

          <TextInput
            placeholder="Conquistas"
            style={estilos.input}

          />

          <TextInput
            placeholder="% de conclusão"
            style={estilos.input}

          />

          <TextInput
            placeholder="Tempo de jogo"
            style={estilos.input}

          />

          <Pressable
            style={({ pressed }) => [
              estilos.botaoCadastrar,
              pressed && estilos.botaoPressionado
            ]}

          >
            <Text style={estilos.textoBotao}>Cadastrar</Text>
          </Pressable>

          <View style={estilos.tituloSecao}>
            <Text style={estilos.textoTitulo}>Seus Jogos</Text>
          </View>

        </ScrollView>
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

  //CABEÇALHO
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  botoesCabecalho: {
    height: 36,
    backgroundColor: '#274857',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  botaoPesquisa: {
    backgroundColor: '#274857',
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  imagensBotaoPesquisa: {
    width: 34,
    height: 34,
  },

  botaoPressionado: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8
  },

  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  barraPesquisa: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },

  textoPesquisa: {
    paddingLeft: 12,
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 44,
    borderRadius: 12,
    color: '#718096',
    fontWeight: '500',
  },

  jogosPopulares: {
    width: 180,
    height: 50,
    marginTop: 25,
    backgroundColor: '#274857',
    borderRadius: 12,
    marginBottom: 15,
  },

  textoJogosPopulares: {
    marginTop: 10,
    paddingLeft: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    width: '100%',
    height: 50,
  },

  //BIBLIOTECA
  cardBiblioteca: {
    backgroundColor: '#274857',
    borderRadius: 10,
    padding: 10,
    marginTop: 15
  },

  nomeJogo: {
    color: '#fff',
    fontWeight: '700'
  },

  infoJogo: {
    color: '#fff'
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
    marginTop: 20
  },

  textoTitulo: {
    color: '#fff',
    fontWeight: '700'
  },

  botaoCadastrar: {
    backgroundColor: '#274857',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },

});
