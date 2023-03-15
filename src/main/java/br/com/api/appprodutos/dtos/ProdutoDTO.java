package br.com.api.appprodutos.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ProdutoDTO {

    @NotBlank(message = "O campo nome não pode ser vazio!")
    @Size(min = 3, max = 30, message = "O campo nome deve conter entre 3 e 30 caracteres!")
    private String nome;

    @NotBlank(message = "O campo marca não pode ser vazio!")
    @Size(min = 2, max = 15, message = "O campo marca deve conter entre 2 e 15 caracteres!")
    private String marca;

    @NotBlank(message = "O campo preço não pode ser vazio!")
    @Size(min = 2, max = 7, message = "O campo preço deve conter entre 2 e 7 caracteres!")
    private String preco;
}
