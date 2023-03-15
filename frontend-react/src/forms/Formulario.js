function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, remover, atualizar }) {
  return (
    <form>
      <h5 className="fw-bold d-flex justify-content-start">Nome</h5>
      <input
        type="text"
        name="nome"
        value={obj.nome}
        
        placeholder="Informe o nome do produto"
        className="form-control"
        onChange={eventoTeclado}
        required
      />

      <h5 className="fw-bold d-flex justify-content-start">Marca</h5>
      <input
        type="text"
        name="marca"
        value={obj.marca}
        
        placeholder="Informe a marca do produto"
        className="form-control"
        onChange={eventoTeclado}
        required
      />

      <h5 className="fw-bold d-flex justify-content-start">Preço</h5>
      <input
        type="number"
        name="preco"
        value={obj.preco}
        placeholder="Informe o preço do produto"
        className="form-control"
        onChange={eventoTeclado}
      />

      {botao 
        ?
        <input  
          type="button"
          name="Cadastrar"
          value="Cadastrar"
          className="btn btn-success"
          onClick={cadastrar}
        />
        : 
        <div>
          <input
            type="button"
            name="Atualizar"
            value="Atualizar"
            className="btn btn-warning"
            onClick={atualizar}
          />
          <input
            type="button"
            name="Remover"
            value="Remover"
            className="btn btn-danger"
            onClick={remover}
          />
          <input
            type="button"
            name="Cancelar"
            value="Cancelar"
            className="btn btn-dark"
            onClick={cancelar}
          />
        </div>
      }
    </form>
  );
}
export default Formulario;
