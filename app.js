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
        let audioErro = new Audio('Fuck.mp3')
        let audioErro2 = new Audio('FUUUCK.mp3')
        let audioSucesso = new Audio('Helicopter_By.mp3')
        let musicaD = new Audio('musicaFull.mp3')
        console.log(numero);
        // marca os campos com borda vermelha
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
        // validação de dados
        if (this.ano == '' || this.mes == '' || this.dia == '' || this.tipo == '' || this.valor == '') {
            if (numero % 3 != 0) {
                audioErro.play()
            } else {
                if (numero != 666) {
                    audioErro2.play()
                } else {
                    musicaD.play()
                }
            }
            numero++
            $('#erroGravacao').modal('show')
            return false
        } else {
            valor.value = ''
            descricao.value = ''
            tipo.value = ''
            audioSucesso.play()
            // mostra modal
            $('#sucessoGravacao').modal('show')
            return true
        }
    }

}
// 
class BancoDados {
    // constructor() {
    //     this.key = localStorage.getItem('id')
    //     this.value = localStorage.getItem(this.key)
    // }
    //
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

    if (despesa.validarDados() == true) {
        bancoDados.gravarLocalStorage(despesa)
    }
}

function carregarListaDespesa() {
    let listaDespesas = document.getElementById('listaDespesas')
    let despesas = bancoDados.recuperarTodosRegistros()
    despesas.forEach(function (despesa) {
        let linha = listaDespesas.insertRow()
        linha.insertCell().innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`
        linha.insertCell().innerHTML = despesa.tipo
        linha.insertCell().innerHTML = despesa.descrição
        linha.insertCell().innerHTML = despesa.valor
        // botão para excluir despesa
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${despesa.id}`
        btn.onclick = function () {
            let btn_id = this.id.replace('id_despesa_', '')
            bancoDados.remover(btn_id)
            // recarrega a página
            window.location.reload()
        }
        // fim botão
        linha.insertCell().append(btn)
    })
}


function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descrição = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descrição, valor)

    let despesasFiltradas = bancoDados.pesquisar(despesa)
    let listaDespesas = document.getElementById('listaDespesas')

    listaDespesas.innerHTML = ''

    despesasFiltradas.forEach(function (d) {
        let linha = listaDespesas.insertRow()
        linha.insertCell().innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell().innerHTML = d.tipo
        linha.insertCell().innerHTML = d.descrição
        linha.insertCell().innerHTML = d.valor
        // botão para excluir despesa
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function () {
            let btn_id = this.id.replace('id_despesa_', '')
            bancoDados.remover(btn_id)
            // recarrega a página
            window.location.reload()
        }
        // fim botão
        linha.insertCell().append(btn)
    })
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

window.onload = preencherDataAutomaticamente()