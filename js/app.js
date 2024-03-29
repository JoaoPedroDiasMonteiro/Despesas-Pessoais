// 
var numero = 1
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descrição = descricao
        this.valor = valor
    }
    validarDados() {
        // validação de dados
        if (this.ano == '' || this.mes == '' || this.dia == '' || this.tipo == '' || this.valor == '') {
            return false
        } else {
            return true
        }
    }
    alertas() {
        let audioErro = new Audio('music/Fuck.mp3')
        let audioErro2 = new Audio('music/FUUUCK.mp3')
        let audioSucesso = new Audio('music/Helicopter_By.mp3')
        let musicaD = new Audio('music/musicaFull.mp3')
        console.log(numero);
        if (this.validarDados() == true) {
            valor.value = ''
            descricao.value = ''
            tipo.value = ''
            audioSucesso.play()
            tipo.focus()
            // mostra modal
            $('#sucessoGravacao').modal('show')
            setTimeout(function () {
                $("#sucessoGravacao").modal('hide');
            }, 700);
        } else {
            if (numero % 3 != 0) {
                audioErro.play()
            } else {
                if (this.valor == 666 && this.descrição == 666) {
                    musicaD.play()
                    document.body.style.color = 'black';
                    document.body.classList = 'body-hell'
                    document.getElementById('navbar').classList = 'navbar navbar-expand-lg nav-hell bg-primary mb-5'
                    document.getElementById('btn-cadastrar').classList = 'btn btn-hell'
                } else {
                    audioErro2.play()
                }
            }
            numero++
            $('#erroGravacao').modal('show')
        }
    }
    // marca os campos com borda vermelha
    mudarBordaVermelhoCadastrarNaoPreenchido() {
        // valor
        if (valor.value == '') {
            valor.classList.add("cadastroErro");
        } else {
            valor.classList.remove("cadastroErro");
        }
        // tipo
        if (tipo.value == '') {
            tipo.classList.add("cadastroErro");
        } else {
            tipo.classList.remove("cadastroErro");
        }
        // ano
        if (ano.value == '') {
            ano.classList.add("cadastroErro");
        } else {
            ano.classList.remove("cadastroErro");
        }
        // mes
        if (mes.value == '') {
            mes.classList.add("cadastroErro");
        } else {
            mes.classList.remove("cadastroErro");
        }
        // dia
        if (dia.value == '') {
            dia.classList.add("cadastroErro");
        } else {
            dia.classList.remove("cadastroErro");
        }
    }

} // Despesas fim

class BancoDados {
    criarId() {
        if (localStorage.getItem('id') === null) {
            localStorage.setItem('id', 0)
        }
    }
    // 
    pegarProximoId() {
        let valorId = localStorage.getItem('id')
        return parseInt(valorId) + 1
    }
    // 
    gravarLocalStorage(item) {
        this.criarId()
        let id = this.pegarProximoId()
        localStorage.setItem(id, JSON.stringify(item))
        localStorage.setItem('id', id)
    }
    // 
    recuperarTodosRegistros() {
        let despesas = []
        let id = localStorage.getItem('id')
        // 
        for (let index = 1; index <= id; index++) {
            let despesa = JSON.parse(localStorage.getItem(index))
            if (despesa === null) {
                continue
            }
            despesa.id = index
            despesas.push(despesa)
        }
        //
        return despesas
    }
    pesquisar(despesa) {
        // let despesas = Array()
        let despesasFiltro = this.recuperarTodosRegistros()
        console.log(despesa);
        console.log(despesasFiltro);

        if (despesa.ano != '') {
            console.log('filtro ano');
            despesasFiltro = despesasFiltro.filter(d => d.ano == despesa.ano)
        }

        if (despesa.mes != '') {
            console.log('filtro mês');
            despesasFiltro = despesasFiltro.filter(d => d.mes == despesa.mes)
        }

        if (despesa.dia != '') {
            console.log('filtro dia');
            despesasFiltro = despesasFiltro.filter(d => d.dia == despesa.dia)
        }

        if (despesa.tipo != '') {
            console.log('filtro tipo');
            despesasFiltro = despesasFiltro.filter(d => d.tipo == despesa.tipo)
        }

        if (despesa.descrição != '') {
            console.log('filtro descrição');
            despesasFiltro = despesasFiltro.filter(d => d.descrição == despesa.descrição)
        }

        if (despesa.valor != '') {
            console.log('filtro valor');
            despesasFiltro = despesasFiltro.filter(d => d.valor == despesa.valor)
        }
        console.log(despesasFiltro);
        return despesasFiltro
    }
    remover(id) {
        localStorage.removeItem(id)
    }


} // fim BancoDados

class Tabela {
    constructor(lugarParaImprimir, ano, mes, dia, tipo, descrição, valor) {
        this.lugarParaImprimir = lugarParaImprimir
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descrição = descrição
        this.valor = valor
    }
    imprimirDespesas(despesas) {
        this.lugarParaImprimir.innerHTML = ''
        despesas.forEach(element => {
            let linha = this.lugarParaImprimir.insertRow()
            linha.classList = 'tableRow'
            // criar checkbox
            let checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.value = element.id
            checkbox.name = 'check'
            // função mudar de cor on click
            linha.onclick = function () {
                if (checkbox.checked == false) {
                    linha.style.backgroundColor = 'rgba(173, 173, 173, 0.63)'
                    checkbox.checked = true
                } else {
                    linha.style.backgroundColor = 'white'
                    checkbox.checked = false
                }
            }
            // função mudar de cor on click
            checkbox.onclick = function () {
                if (checkbox.checked == false) {
                    linha.style.backgroundColor = 'rgba(173, 173, 173, 0.63)'
                    checkbox.checked = true
                } else {
                    linha.style.backgroundColor = 'white'
                    checkbox.checked = false
                }
            }
            // botão para excluir despesa
            let btn = document.createElement('button')
            btn.innerHTML = '<i class="fas fa-times"></i>'
            btn.id = element.id
            btn.onclick = function () {
                var r = confirm('Você está prestes a deletar um ou mais itens!\nSe você realmente deseja fazer isso clique em OK.\nSe não clique em CANCELAR.')
                if (r == true) {
                    bancoDados.remover(element.id)
                    pesquisarTabela()
                }
            }
            // inserir as coisas
            linha.insertCell().append(checkbox)
            linha.insertCell().innerHTML = `${element.dia}/${element.mes}/${element.ano}`
            linha.insertCell().innerHTML = element.tipo
            linha.insertCell().innerHTML = element.descrição
            linha.insertCell().innerHTML = element.valor
            linha.insertCell().append(btn)
        })
    }
    selecionarTodosItems() {
        // let rows = document.querySelectorAll('.tableRow')
        // let checks = document.getElementsByName('check')
        // o metodo Array.from é usado pq o NodeList não funciona
        let row = Array.from(document.querySelectorAll('.tableRow'))
        let checkbox = Array.from(document.getElementsByName('check'))

        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked == false) {
                checkbox[i].checked = true
                row[i].style.backgroundColor = 'rgba(173, 173, 173, 0.63)'
            } else if (checkbox[i].checked == true) {
                checkbox[i].checked = false
                row[i].style.backgroundColor = 'white'
            }
        }
    }
    apagarItemsSelecionados() {
        let checks = document.getElementsByName('check')
        var r = confirm('Você está prestes a deletar um ou mais itens!\nSe você realmente deseja fazer isso clique em OK.\nSe não clique em CANCELAR.')
        if (r == true) {
            checks.forEach(element => {
                if (element.checked == true) {
                    bancoDados.remover(element.value)
                }
            });
            window.location.reload()
        }
    }
    imprimirDespesasPesquisadas() {
        let despesa = new Despesa(this.ano, this.mes, this.dia, this.tipo, this.descrição, this.valor)
        let despesasFiltradas = bancoDados.pesquisar(despesa)
        this.imprimirDespesas(despesasFiltradas)
        console.log(this.ano, this.mes, this.dia, this.tipo, this.descrição, this.valor);
    }

} // Tabela Fim

// cria o banco de dados
let bancoDados = new BancoDados

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descrição = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descrição.value, valor.value)
    despesa.mudarBordaVermelhoCadastrarNaoPreenchido()
    despesa.alertas()
    if (despesa.validarDados() == true) {
        bancoDados.gravarLocalStorage(despesa)
    }
}

function cadastrarDespesaEnterKeyPress() {
    let key = event.keyCode;

    if (key == 13) {
        cadastrarDespesa()
    }
}

function preencherDataAutomaticamente() {
    let hoje = new Date()
    let dia = hoje.getDate()
    let mes = hoje.getMonth() + 1
    let ano = hoje.getFullYear()

    if (mes < 10) {
        mes = `0${hoje.getMonth() + 1}`
    } else {
        mes = mes.toString()
    }

    document.getElementById('dia').value = dia
    document.getElementById('mes').value = mes
    document.getElementById('ano').value = ano
}


function carregarTabela() {
    let listaDespesas = document.getElementById('listaDespesas')
    let despesas = bancoDados.recuperarTodosRegistros()
    let tabela = new Tabela(listaDespesas)

    let btn1 = document.getElementById('selecionarTodos')
    let btn2 = document.getElementById('apagarSelecionados')

    tabela.imprimirDespesas(despesas, )

    btn1.onclick = function () {
        tabela.selecionarTodosItems()
    }

    btn2.onclick = function () {
        tabela.apagarItemsSelecionados()
    }
}

function pesquisarTabela() {
    let listaDespesas = document.getElementById('listaDespesas')
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descrição = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    let tabela = new Tabela(listaDespesas, ano, mes, dia, tipo, descrição, valor)
    tabela.imprimirDespesasPesquisadas()
}