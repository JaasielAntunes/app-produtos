package br.com.api.appprodutos.services;

import br.com.api.appprodutos.models.Produto;
import br.com.api.appprodutos.models.RespostaModelo;
import br.com.api.appprodutos.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    final ProdutoRepository repo;
    final RespostaModelo rm;

    @Transactional
    public ResponseEntity<?> cadastrarOuAlterarProduto(Produto produto, String acao) {

        if (produto.getNome().equals("")) {
            rm.setMsg("O campo nome é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);

        } else if (produto.getMarca().equals("")) {
            rm.setMsg("O campo marca é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);

        } else if (produto.getPreco().equals("")) {
            rm.setMsg("O campo preço é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);

        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<Produto>(repo.save(produto), HttpStatus.CREATED);

            } else {
                return new ResponseEntity<Produto>(repo.save(produto), HttpStatus.OK);
            }
        }
    }

    public Iterable<Produto> listar() {
        return repo.findAll();
    }

    public Optional<Produto> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    @Transactional
    public ResponseEntity<RespostaModelo> deletar(Integer id) {
        repo.deleteById(id);
        rm.setMsg("Produto removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
