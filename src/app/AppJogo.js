import { View, Text, Image, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {

    const jogos = [
        {
            id: 1,
            nome: "Dark Souls III",
            descricao: "Dark Souls III continua a expandir os limites da famosa série Souls.",
            imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg"
        },

    ];

    return (
        <SafeAreaProvider>
            <SafeAreaView style={estilos.safeArea}>

                {/* Cabeçalho */}
                <View style={estilos.cabecalho}>
                    <Pressable
                        style={({ pressed }) => [
                            estilos.botoesCabecalho,
                            pressed && estilos.botaoPressionado
                        ]}

                        onPress={() => setTela("inicio")}
                    >
                        <Text style={estilos.textoBotao}>Inicio</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            estilos.botoesCabecalho,
                            pressed && estilos.botaoPressionado
                        ]}
                        onPress={() => setTela("biblioteca")}
                    >
                        <Text style={estilos.textoBotao}>Biblioteca</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            estilos.botoesCabecalho,
                            pressed && estilos.botaoPressionado
                        ]}
                        onPress={() => setTela("config")}
                    >
                        <Text style={estilos.textoBotao}>{'Config'}</Text>
                    </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {jogos.map((jogo) => (

                        <View style={estilos.conteudoPrincipal}>
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
                        </View>


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
        flexDirection: 'collumn',
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
    }

});
