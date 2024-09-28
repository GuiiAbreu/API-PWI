# Trabalhando os conceitos do fundamentos de criação de uma API com nodejs e uso de middleware.

## Sobre o desafio
Aplicação para gerenciar uma lista de tecnologias de estudos por usuário. Permitidindo a criação de um usuário com `name` e `username`, bem como o CRUD das tecnologias:

- Adicionar uma nova tecnologia;
- Listar todas as tecnologias;
- Alterar o `title` e `deadline` de uma tecnologia existente;
- Marcar uma tecnologia como estudada;
- Excluir uma tecnologia;

Tudo isso para cada usuário em específico, com o `username` sendo passado pelo header.

## Rotas da aplicação

### POST `/users`

A rota recebe `name`, e `username` dentro do corpo da requisição. Ao cadastrar um novo usuário, ele é armazenado dentro de um objeto no seguinte formato:  

```jsx
{ 
	id: 'uuid', // precisa ser um uuid
	name: 'Guilherme Henrique', 
	username: 'guilherme', 
	technologies: []
}
```

O objeto do usuário criado é retornado na resposta da requisição, como JSON. 

Antes de criar um usuário, é feita uma validação se outro usuário com o mesmo `username` já existe. Caso exista, é retornando uma resposta com status `400` e um json no seguinte formato:

```jsx
{
	error: 'Mensagem do erro'
}
```

### GET `/technologies`

A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e retorna uma lista com todas as tecnologias desse usuário.

Portanto, para que essa rota liste todas as tecnologias, foi necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount` e então retornar a lista de todas tecnologias do usuário que está no objeto do usuário conforme foi criado. Caso não exista o usuário. retorna um error com código 404 e mensagem user not exists.

### POST `/technologies`

A rota recebe `title` e `deadline` dentro do corpo da requisição e, uma propriedade `username` contendo o username do usuário dentro do header da requisição. Ao criar um novo objeto *Technology*, ele é armazenada dentro da lista `technologies` do usuário que está criando esse objeto *Technology*. Cada objeto *Technology* está no seguinte formato: 

```jsx
{ 
	id: 'uuid', // precisa ser um uuid
	title: 'Nome da tecnologia',
	studied: false, 
	deadline: '2021-02-27T00:00:00.000Z', 
	created_at: '2021-02-22T00:00:00.000Z'
}
```

**Observação**: A propriedade `studied` sempre inicia como `false` ao criar um *objeto Technology*.

**Dica**: Ao fazer a requisição com o Insomnia ou Postman, preencha a data de `deadline` com o formato `ANO-MÊS-DIA` e ao salvar a essa tecnologia pela rota, é feita da seguinte forma: 

```jsx
{ 
	id: 'uuid', // precisa ser um uuid
	title: 'Nome da tecnologia',
	done: false, 
	deadline: new Date(deadline), 
	created_at: new Date()
}
```

É utilizado `new Date(deadline)` pra realizar a transformação da string "ANO-MÊS-DIA" (por exemplo "2021-02-25") para uma data válida do JavaScript.
O objeto `technology`é retornado na resposta da requisição.

Portanto, para criar uma nova tecnologia, foi necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount`, pegar também o `title` e o `deadline` do corpo da requisição e adicionar um novo *objeto Technology* na lista `technologies` que está no objeto do usuário. Após adicionar o novo *objeto Technology* na lista, retorna um status `201` e o json contendo o objeto *Technology criado*.

### PUT `/technologies/:id`

A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e recebe as propriedades `title` e `deadline` dentro do corpo. Alterando apenas o `title` e o `deadline` da tarefa que possua o `id` igual ao `id` presente nos parâmetros da rota. 

Portanto, para atualizar uma nova tecnologia, foi necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount`, pegar também o `title` e o `deadline` do corpo da requisição e atualizar o *objeto Technology* na lista `technologies` que está no objeto do usuário.  Caso não exista o usuário. retorna um error com código 404 e mensagem user not exists.

A aplicação não permite a atualização de uma tecnologia que não existe e retorna uma resposta contendo um status `404` e um json no seguinte formato:

```jsx
{
	error: 'Mensagem do erro'
}
```

### PATCH `/technologies/:id/studied`

A rota deve recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e altera a propriedade `studied` para `true` na *technology* que possuir um `id` igual ao `id` presente nos parâmetros da rota.

Portanto, para atualizar uma nova tecnologia, foi necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount.` Caso não exista o usuário na request. retorna um error com código 404 e mensagem user not exists. A aplicação não permite a mudança da propriedade `studied` de uma tecnologia que não existe e retorna uma resposta contendo um status `404` e um json no seguinte formato: 

```jsx
{
	error: 'Mensagem do erro'
}
```

### DELETE `/technologies/:id`

A rota recebe, pelo header da requisição, uma propriedade `username` contendo o username do usuário e exclui a tecnologia que possuir um `id` igual ao `id` presente nos parâmetros da rota.

Portanto, para remover uma tecnologia, foi necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount.` Caso não exista o usuário na request. retorna um error com código 404 e mensagem user not exists. A aplicação não permite excluir uma tecnologia que não exista e retorna uma resposta contendo um status `404` e um json no seguinte formato. Caso exista a tecnologia, é removida do banco e retorna uma resposta contendo um status 200 e um json contento todas as tecnologias restantes.

```jsx
{
	error: 'Mensagem do erro'
}
```

### Middleware
Para completar todas rotas referentes à Tecnologias foi necessário, antes ter completado o código no middleware checkExistsUserAccount. Para isso, foi pego o username do usuário no header da requisição, realizando a verificação se esse usuário existe e então colocando esse usuário dentro da request antes de chamar a função next. Caso o usuário não seja encontrado, retorna uma resposta contendo status 404 e um json no seguinte formato:
```jsx
{
	error: 'Mensagem do erro'
}
```
**Observação:** O username é enviado pelo header em uma propriedade chamada username.
