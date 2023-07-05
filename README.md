# Aplicação de Registro de Refeições - Daily Diet API

## Requisitos Funcionais

- [x] Criação de usuário
- [x] Autenticação de usuário
- [x] Registro de refeições com nome, descrição, data e hora, e indicação se está dentro ou não da dieta
- [x] Edição de refeições
- [x] Exclusão de refeições
- [ ] Listagem de todas as refeições de um usuário
- [ ] Visualização de uma única refeição
- [ ] Recuperação de métricas do usuário, incluindo quantidade total de refeições registradas, quantidade total de refeições dentro da dieta, quantidade total de refeições fora da dieta e melhor sequência de refeições dentro da dieta

## Regras de Negócio

- [x] As refeições devem ser relacionadas a um usuário
- [x] O usuário só pode visualizar, editar e apagar as refeições que ele criou

## Requisitos Não Funcionais

- [x] Utilização de banco de dados para armazenamento das informações do usuário e das refeições
- [x] Utilização de autenticação por token para identificar o usuário entre as requisições
