function search(){
    var cnpj = document.getElementById('inputCNPJ').value;
    console.log(cnpj);
    validation(cnpj);
          // Função de pesquisa de dados.
}
function validation(cnpjValue){
//          // Função de validar os dados recebido e mostra no display.
                                //     document.getElementById('busca').setAttribute("class", "ocultar");
                                //     document.getElementById('resultado').removeAttribute("class", "ocultar");
                                //     document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cnpjValue;
        // Criação de objetos para storage colocando os atributos "var" e funções "function".
    var storage = firebase.storage();
        //  Para buscar uma pasta no storage "arquivo-raiz" é aonde esta o arquivo
                        // storage.ref().child('arquivo-raiz').listAll().then(function(todosArquivos){console.log(todosArquivos.items);
// });
        // Para buscar a pasta com CPF e valida se existe e confirmar existencia.
    storage.ref().child(cnpjValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1){
            // O alerta vai mostra o nome do arquivo no StorageManager.
            listFiles(cnpjValue);
            next(cnpjValue);
            // alert('CNPJ Encontrado: '+ todosArquivos.items[0].name);
        } else {
                alert('CNPJ não cadastrado');
        }
            // Se não encontra nada ou colocar letras vai dar error.
    }).catch(function(error) {
        console.log('ERRO', error)
    });
        // Teste de função com visualização no console mostrando Promise.
                                    // var resultado = storage.ref().child('arquivo-raiz').listAll();
                                    // // console.log(resultado);
}
//  A função esta pegando o cnpj vai mostra o nome do arquivo e mostra o link para o arquivo.
function listFiles(cnpjValue){
                                    // console.log('OI');
        // Vai mostra o links dos arquivos.
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cnpjValue;
    var storage = firebase.storage();
    var files;
    var fileNames = [];
    var fileLinks = [];
    storage.ref().child(cnpjValue).listAll().then(function(todosArquivos){
        files = todosArquivos.items;
         // vai dar permissão para fazer Download.
        for(let i=0; 1<files.length; i++){
          fileNames.push(files[i].name);
          storage.ref(cnpjValue+'/'+fileNames[i]).getDownloadURL().then(function(url){
              console.log(url);
              var ul = document.getElementById("list");
            //   Para criar um elemento na lista precisa li onde fica o texto e o link
              var li = document.createElement("li");
            //   Vai mostra ao usuario o nomes e o links dos todosArquivos.
            //  Atenção com as aspas pois se tem um dentro não pode haver outro do mesmo.
              var listItem = '<a href="'+url[i]+'" target="_blank">'+fileNames[i]+'</a>';
              li.innerHTML = listItem;
              ul.appendChild(li);
              fileLinks.push(url);
        }).catch(function(error){
              console.log(error);
            //   Algo opcional tag função finally.
        // }).finally(function(){
        //       console.log('Nome ',fileNames[i]);
        //       console.log('Links ',fileLinks[i]);
        });
        }
                                                        //   files = todosArquivos.items;
                                                        //   console.log(files);
                                                        //   for(let i = 0; i<files.length; i++){      
                                                        //     console.log(files[i].name);
                                                        //   }

    });
}
function next(cnpjValue){
    // Função de validar os dados recebido e mostra no display.
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de:' +cnpjValue;
}
function back(){
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById("inputCNPJ").value = '';
        // função de voltar para pesquisa e ocultar o primeiro display.
}