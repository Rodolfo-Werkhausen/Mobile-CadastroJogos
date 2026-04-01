import { Link, Stack} from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable,  ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.safeArea}>
        <Stack.Screen options={{ title: 'Configurações' }} />

        {/* Configurações */}
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={estilos.tituloSecao}>
            <Text style={estilos.textoTitulo}>Configurações</Text>
          </View>

          <View style={estilos.cardConfig}>
            <Text style={estilos.tituloConfig}>Conta</Text>
            <Text style={estilos.itemConfig}>Editar Perfil</Text>
            <Text style={estilos.itemConfig}>Alterar Email</Text>
            <Text style={estilos.itemConfig}>Alterar Senha</Text>
          </View>

          <View style={estilos.cardConfig}>
            <Text style={estilos.tituloConfig}>Preferências</Text>
            <Text style={estilos.itemConfig}>Tema Escuro</Text>
            <Text style={estilos.itemConfig}>Idioma</Text>
            <Text style={estilos.itemConfig}>Notificações</Text>
          </View>

          <View style={estilos.cardConfig}>
            <Text style={estilos.tituloConfig}>Jogos</Text>
            <Text style={estilos.itemConfig}>Sincronizar Biblioteca</Text>
            <Text style={estilos.itemConfig}>Mostrar Jogos Concluídos</Text>
            <Text style={estilos.itemConfig}>Ordenar Biblioteca</Text>
          </View>

          <View style={estilos.cardConfig}>
            <Text style={estilos.tituloConfig}>Outros</Text>
            <Text style={estilos.itemConfig}>Ajuda</Text>
            <Text style={estilos.itemConfig}>Sobre o App</Text>
            <Text style={estilos.itemConfig}>Versão 1.0</Text>
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

  //CONFIG
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

  cardConfig: {
    backgroundColor: '#274857',
    borderRadius: 12,
    padding: 12,
    marginTop: 15
  },

  tituloConfig: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8
  },

  itemConfig: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6
  }

});
