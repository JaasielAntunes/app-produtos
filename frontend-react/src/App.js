import "./App.css";
import { useEffect, useState } from "react";
import Formulario from "./forms/Formulario";
import Tabela from "./views/Tabela";
import NavBar from "./components/NavBar";

export default function App() {

  //* CRIANDO OBJETO produto VINDO DO BACKEND
  const produto = {
    id: 0,
    nome: "",
    marca: "",
    preco: "",
  };

  //* PROPRIEDADES DE MUDANÇA DE ESTADO
  //* USE STATE
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //* USE EFFECT - REQUISIÇÃO PARA O BACKEND
  useEffect(() => {
    fetch("http://localhost:8080/api/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convert) => setProdutos(retorno_convert));
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  };

  //* CADASTRAR PRODUTO
  const cadastrar = () => {
    fetch("http://localhost:8080/api/cadastrar", {
      method: "post",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        if (retorno_convert.msg !== undefined) {
          alert(retorno_convert.msg);
        } else {
          setProdutos([...produtos, retorno_convert]);
          alert("Produto cadastrado com sucesso!");
          limparFormulario();
        }
      });
  };

  //* REMOVER PRODUTO
  const remover = () => {
    fetch("http://localhost:8080/api/deletar/" + objProduto.id, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        alert(retorno_convert.msg);

        //* CÓPIA DO VETOR DE produtos
        let vetorTemp = [...produtos];

        //* INDICE
        let indice = vetorTemp.findIndex((p) => {
          return p.id === objProduto.id;
        });

        //* REMOVER PRODUTO DO vetorTemp
        vetorTemp.splice(indice, 1);

        //* ATUALIZAR VETOR DE produtos
        setProdutos(vetorTemp);

        //* LIMPAR FORMULARIO
        limparFormulario();
      });
  };

  //* ATUALIZAR PRODUTO
  const atualizar = () => {
    fetch("http://localhost:8080/api/atualizar", {
      method: "put",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        if (retorno_convert.msg !== undefined) {
          alert(retorno_convert.msg);
        } else {
          alert("Produto atualizado com sucesso!");
          //* CÓPIA DO VETOR DE produtos
          let vetorTemp = [...produtos];

          //* INDICE
          let indice = vetorTemp.findIndex((p) => {
            return p.id === objProduto.id;
          });

          //* ALTERAR PRODUTO DO vetorTemp
          vetorTemp[indice] = objProduto;

          //* ATUALIZAR VETOR DE produtos
          setProdutos(vetorTemp);
          limparFormulario();
        }
      });
  };

  //* LIMPAR FORMULARIO
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  };

  //* SELEÇÃO DE ALGUM PRODUTO CADASTRADO
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  };

  //* ESTRUTURA A SER RENDERIZADA NO NAVEGADOR
  return (
    <>
      <NavBar />
      <div className="container">
        <br />
        <h1 className="d-flex justify-content-center">
          API <span className="text-warning mx-2">Produtos</span>
        </h1>
        <br />
        <Formulario
          botao={btnCadastrar}
          eventoTeclado={aoDigitar}
          cadastrar={cadastrar}
          obj={objProduto}
          cancelar={limparFormulario}
          remover={remover}
          atualizar={atualizar}
        />
        
        <Tabela vetor={produtos} selecionar={selecionarProduto} />
      </div>
    </>
  );
}
