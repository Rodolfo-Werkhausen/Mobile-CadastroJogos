import { useState, useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';


export default function App() {

    const { id } = useLocalSearchParams();

    const [jogo, setJogo] = useState(null);

    const [contador, setContador] = useState(0);

    useEffect(() => {

    const buscarJogo = async () => {

        try {

            const resposta = await fetch(
                `https://store.steampowered.com/api/appdetails?appids=${id}`
            );

            const dados = await resposta.json();

            const game = dados[id].data;

            setJogo({
                id: id,
                nome: game.name,
                descricao: game.short_description,
                imagem: game.header_image
            });

        } catch (erro) {
            console.log("Erro:", erro);
        }

    };

    buscarJogo();

}, []);

if (!jogo) {
    return (
        <View>
            <Text>Carregando...</Text>
        </View>
    );
}

    return (
        <SafeAreaProvider>
            <SafeAreaView style={estilos.safeArea}>
                <Stack.Screen options={{ headerShown: true }} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    

                        <View key={jogo.id} style={estilos.conteudoPrincipal}>
                            <Image
                                style={estilos.imagensPrincipal}
                                source={{ uri: jogo.imagem }}
                            />
                            <Text style={estilos.textoTitulo}>
                                {jogo.nome}
                            </Text>

                            <Text style={estilos.textoImagens}>
                                {jogo.descricao}
                            </Text>
                            <View style={estilos.tituloSecao}>
                                <Text style={estilos.textoTitulo}>DAR LIKE</Text>
                            </View>

                            <View>
                                <View style={estilos.botoes}>
                                <Text style={estilos.valor}>{contador}</Text>   
                                    <TouchableOpacity
                                        style={[estilos.botao, estilos.botaoSucesso]}
                                        onPress={() => setContador(contador + 1)}
                                    >
                                        <Image style={[estilos.imagemLike]}source={require('./_Botón_Me_gusta.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
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

    //CONTEUDO PRINCIPAL
    imagensPrincipal: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },

    conteudoPrincipal: {
        flexDirection: 'column',
        backgroundColor: '#274857',
        width: '100%',
        borderRadius: 12,
        marginTop: 18,
        padding: 8,
        alignItems: 'center',
        gap: 5,
    },

    textoImagens: {
        fontSize: 12,
        fontWeight: '600',
        maxWidth: 300,
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

    //CONFIG
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
    },

    //

    botoes: {
        flexDirection: 'row',
        gap: 10,
    },

    botao: {
        height: 48,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 20,
        alignItems: 'center',
    },
    botaoSucesso: { backgroundColor: '#89b4fa' },
    botaoTexto: {
        fontWeight: 'bold',
        color: '#1e1e2e',
        fontSize: 16,
    },
    valor: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#cdd6f4',
        marginBottom: 16,
    },
    imagemLike: {
        width: 24,
        height: 24,
    },

});
