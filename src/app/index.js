import React, { useState } from 'react';
import { Link, Stack} from 'expo-router';
import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {

  // Informações dos jogos
  const jogos = [
    {
      id: 1,
      nome: "Dark Souls III",
      descricao: "Dark Souls III continua a expandir os limites da famosa série Souls.",
      imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg"
    },
    {
      id: 2,
      nome: "Elden Ring",
      descricao: "Explore um vasto mundo aberto cheio de perigos e mistérios.",
      imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg"
    },
    {
      id: 3,
      nome: "Sekiro",
      descricao: "Uma aventura brutal de samurai com combate extremamente preciso.",
      imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/814380/header.jpg"
    },
    {
      id: 4,
      nome: "Counter Strike 2",
      descricao: "FPS competitivo focado em estratégia, precisão e trabalho em equipe.",
      imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861"
    },
    {
      id: 5,
      nome: "Lies of P",
      descricao: "Soulslike sombrio inspirado em Pinóquio com combates desafiadores.",
      imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1627720/header.jpg"
    },
    {
      id: 6,
      nome: "The Witcher 3",
      descricao: "Um RPG épico em um mundo aberto cheio de escolhas e histórias.",
      imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg"
    }
  ];

  //Conteúdo deslizante lógica
  const [indiceAtual, setIndiceAtual] = useState(0);
  const proximo = () => {
    if (indiceAtual + 2 < jogos.length) {
      setIndiceAtual(indiceAtual + 2);
    }
  };
  const anterior = () => {
    if (indiceAtual - 2 >= 0) {
      setIndiceAtual(indiceAtual - 2);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.safeArea}>
        <Stack.Screen options={{headerShown: false}}/>
        
        {/* Cabeçalho */}
        <View style={estilos.cabecalho}>
          <Link href="/index" style={estilos.botoesCabecalho}>
          <Text style={estilos.textoBotao}>{'Inicio'}</Text>
        </Link>

          <Link href="/AppBiblioteca" style={estilos.botoesCabecalho}>
          <Text style={estilos.textoBotao}>{'Biblioteca'}</Text>
        </Link>

          <Link href="/AppConfig" style={estilos.botoesCabecalho}>
          <Text style={estilos.textoBotao}>{'Config'}</Text>
        </Link>

        </View>

        {/* Barra de Pesquisa */}
        <View style={estilos.barraPesquisa}>
          <TextInput placeholder="Pesquisar por Games" style={estilos.textoPesquisa} />
          <Pressable
            style={({ pressed }) => [
              estilos.botaoPesquisa,
              pressed && estilos.botaoPressionado
            ]}

          >
            <Image style={estilos.imagensBotaoPesquisa}
              source={require('./_icon-icons.png')}
            />
          </Pressable>
        </View>
        <View style={estilos.jogosPopulares}>
          <Text style={estilos.textoJogosPopulares}>{'Jogos Populares'}</Text>
        </View>

        {/* Conteúdo Principal */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {jogos.map((jogo) => (
            <TouchableOpacity key={jogo.id} onPress={() => alert(jogo.nome)}>
              <View style={estilos.conteudoPrincipal}>
                <Image
                  style={estilos.imagensPrincipal}
                  source={{ uri: jogo.imagem }}
                />

                <Text style={estilos.textoImagens}>
                  {jogo.descricao}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Conteúdo Principal Deslizante*/}
        {/* Botão esquerdo */}
        <View style={estilos.conteudoDeslizarGeral}>
          <TouchableOpacity onPress={anterior}>
            <Image
              style={estilos.deslizarInvertido}
              source={{ uri: 'https://images.vexels.com/media/users/3/136720/isolated/preview/aa2c8886b534f88cf3c788d11ee553b4-seta-direita.png' }}
            />
          </TouchableOpacity>


          {jogos.slice(indiceAtual, indiceAtual + 2).map((jogo) => (
            <TouchableOpacity key={jogo.id} onPress={() => alert("Em breve")}>
              <View style={estilos.conteudoDeslizar}>
                <Image
                  style={estilos.imagensDeslizar}
                  source={{ uri: jogo.imagem }}
                />
                <Text style={estilos.textoImagensDesliar}>{jogo.nome}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Botão direito */}
          <TouchableOpacity onPress={proximo}>
            <Image
              style={estilos.deslizar}
              source={{ uri: 'https://images.vexels.com/media/users/3/136720/isolated/preview/aa2c8886b534f88cf3c788d11ee553b4-seta-direita.png' }}
            />
          </TouchableOpacity>
        </View>

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

  //CONTEUDO PRINCIPAL
  imagensPrincipal: {
    width: 150,
    height: 110,
    borderRadius: 10,
  },

  conteudoPrincipal: {
    flexDirection: 'row',
    backgroundColor: '#274857',
    width: '100%',
    minHeight: 95,
    borderRadius: 12,
    marginTop: 18,
    padding: 8,
    alignItems: 'center',
    gap: 10,
  },

  textoImagens: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    flexWrap: 'wrap',
    color: '#FFFFFF',
  },

  //CONTEUDO PRINCIPAL DESLIZANTE
  conteudoDeslizar: {
    backgroundColor: '#274857',
    width: 140,
    height: 110,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    padding: 6,
    marginHorizontal: 6,
  },

  imagensDeslizar: {
    width: 128,
    height: 60,
    borderRadius: 8,
  },

  textoImagensDesliar: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  conteudoDeslizarGeral: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deslizar: {
    width: 28,
    height: 28,
    marginTop: 20,
  },

  deslizarInvertido: {
    transform: [{ rotate: '180deg' }],
    width: 28,
    height: 28,
    marginTop: 20,
  },

});
