package br.com.api.appprodutos.controllers;

import br.com.api.appprodutos.models.Produto;
import br.com.api.appprodutos.models.RespostaModelo;
import br.com.api.appprodutos.services.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    final ProdutoService service;
    final RespostaModelo rm;

    @GetMapping("/listar")
    public Iterable<Produto> listarProdutos() {
        return service.listar();
    }

    @GetMapping("/buscar-id/{id}")
    public ResponseEntity<Object> buscarUmProduto(@PathVariable(value = "id") Integer id) {
        Optional<Produto> produtoModel = service.buscarPorId(id);
        return produtoModel.<ResponseEntity<Object>>map(produtoObj -> ResponseEntity.status(HttpStatus.OK)
                .body(produtoObj)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Produto não encontrado!"));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarProduto(@RequestBody Produto produto) {
        return service.cadastrarOuAlterarProduto(produto, "Cadastrar");
    }

    @PutMapping("/atualizar")
    public ResponseEntity<?> atualizarProduto(@RequestBody Produto produto) {
        return service.cadastrarOuAlterarProduto(produto, "Atualizar");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarProduto(@PathVariable(value = "id") Integer id) {
        Optional<Produto> produtoModel = service.buscarPorId(id);
        if (produtoModel.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produto não encontrado!");
        }

        return service.deletar(produtoModel.get().getId());
    }
}
