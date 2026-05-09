import React, { useState, useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {


  const [jogos, setJogos] = useState([]);


  useEffect(() => {

    const buscarJogos = async () => {

      try {

        // Pega lista oficial da Steam
        const respostaLista = await fetch(
          "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
        );

        const textoLista = await respostaLista.text();

        if (textoLista.startsWith("<")) {
          console.log("Steam bloqueou temporariamente a lista");
          return;
        }

        const dadosLista = JSON.parse(textoLista);

        const apps = dadosLista.applist.apps;

        const jogosEncontrados = [];

        const idsUsados = new Set();

        // Busca 6 jogos válidos
        while (jogosEncontrados.length < 6) {

          // Escolhe app aleatório da lista oficial
          const randomApp =
            apps[Math.floor(Math.random() * apps.length)];

          const appID = randomApp.appid;

          // Evita repetidos
          if (idsUsados.has(appID)) {
            continue;
          }

          idsUsados.add(appID);

          try {

            const resposta = await fetch(
              `https://store.steampowered.com/api/appdetails?appids=${appID}&l=brazilian`
            );

            const texto = await resposta.text();

            // Evita erro HTML
            if (texto.startsWith("<")) {
              continue;
            }

            const dados = JSON.parse(texto);

            const respostaJogo = dados[appID];

            if (!respostaJogo?.success) {
              continue;
            }

            const game = respostaJogo.data;

            if (!game) continue;

            // Apenas jogos
            if (game.type !== "game") {
              continue;
            }

            // Precisa ter imagem e descrição
            if (!game.header_image || !game.short_description) {
              continue;
            }

            jogosEncontrados.push({
              id: appID,
              nome: game.name,
              descricao: game.short_description,
              imagem: game.header_image
            });

            console.log("Jogo encontrado:", game.name);

            // Delay anti-rate-limit
            await new Promise(resolve =>
              setTimeout(resolve, 300)
            );

          } catch (erro) {
            console.log("Erro jogo:", erro);
          }

        }

        setJogos(jogosEncontrados);

      } catch (erro) {
        console.log("Erro lista:", erro);
      }

    };

    buscarJogos();

  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Cabeçalho */}
        <View style={estilos.cabecalho}>
          <Link href="/" style={estilos.botoesCabecalho}>
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

            <TouchableOpacity style={{ marginBottom: 10 }} key={jogo.id}>
              <Link
                href={{
                  pathname: "/AppJogo",
                  params: { id: jogo.id }
                }}
              >
                <View style={estilos.conteudoPrincipal}>
                  <Image
                    style={estilos.imagensPrincipal}
                    source={{ uri: jogo.imagem }}
                  />

                  <Text style={estilos.textoImagens}>
                    {jogo.descricao}
                  </Text>
                </View>
              </Link>
            </TouchableOpacity>

          ))}
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
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
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
    marginBottom: 10,
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
    width: 234,
    height: 110,
    borderRadius: 10,
  },

  conteudoPrincipal: {
    flexDirection: 'column',
    backgroundColor: '#274857',
    width: '100%',
    minHeight: 110,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    gap: 10,
  },

  textoImagens: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    flexWrap: 'wrap',
    color: '#FFFFFF',
  }

});
