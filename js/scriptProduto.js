class Combustivel{

    constructor (){
        this.id = 1;
        this.arrayCombustivel = [];
        this.editId = null;
        this.td_precoCombustivel;
    }

    calcular(){
        let km = this.lerDados();

        if(this.validaCampos(km)){
            if(this.editId == null){
                this.adicionar(km);                                    
            }else{
                this.atualizar(this.editId,km);
            }
        } 
        this.calculaComb();    
        this.listaTabela();
        this.cancelar();            
    } 

    listaTabela(){
        let tbody = document.getElementById('tbody');
            tbody.innerText = '';

        for(let i = 0; i < this.arrayCombustivel.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_kmInicial = tr.insertCell();
            let td_kmFinal = tr.insertCell();
            let td_data = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayCombustivel[i].id
            td_kmInicial.innerText = this.arrayCombustivel[i].td_kmInicial
            td_kmFinal.innerText = this.arrayCombustivel[i].td_kmFinal
            td_data.innerText = this.arrayCombustivel[i].data          
                        
            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src='img/edit.svg';
            td_acoes.appendChild(imgEdit);
            imgEdit.setAttribute("onclick","combustivel.preparaEdicao("
            +JSON.stringify(this.arrayCombustivel[i])+")");

            let imgDelete = document.createElement('img');
            imgDelete.src='img/delete.svg';
            imgDelete.setAttribute("onclick","combustivel.deletar("
            +this.arrayCombustivel[i].id+")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            console.log(this.arrayCombustivel);

        }
    }

    adicionar(km){
        km.preco = parseFloat(km.preco);
        this.arrayCombustivel.push(km);
        this.id++;      
             
    }

    calculaComb(){
        let km = []
        let totalKmRodados =0;       
        const kmPorLitro = 30;
        let vlrTotalPorLitros ; 
        let vlrApagar =0;
                    
        for(let i = 0; i < this.arrayCombustivel.length; i++){
            totalKmRodados += this.arrayCombustivel[i].td_kmFinal - this.arrayCombustivel[i].td_kmInicial
        }
        vlrTotalPorLitros = totalKmRodados / kmPorLitro;
        vlrApagar += vlrTotalPorLitros * this.td_precoCombustivel;  
        
        console.log("Km Rodados: "+totalKmRodados.toFixed(2))
        console.log("Total Lt's consumidos: "+vlrTotalPorLitros.toFixed(2))
        console.log("Preço do combustivel: $"+this.td_precoCombustivel.toFixed(2))
        console.log("Vlr a receber: $"+vlrApagar.toFixed(2))          
            
    }
    atualizar(id, km){                
        for(let i = 0; i < this.arrayCombustivel.length; i++){
            if(this.arrayCombustivel[i].id == id){
                this.arrayCombustivel[i].td_kmInicial = km.td_kmInicial;
                this.arrayCombustivel[i].td_kmFinal = km.td_kmFinal;
                this.arrayCombustivel[i].data = km.data;
            }
            document.getElementById('btn1').style='color:white'
        }
        
    }
    lerDados(){
        let km = {}
        km.id = this.id;
        km.td_kmInicial = document.getElementById('kmInicio').value;
        km.td_kmFinal = document.getElementById('kmFinal').value;
        this.td_precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
        km.data = document.getElementById('date').value;     
        return km;
    }

    validaCampos(km){
        let msg = '';

        if(km.td_kmInicial ==''){
            msg += 'Informe a quilometragem inicial \n';            
        }
        if(km.td_kmFinal == ''){
            msg += 'Informe a quilometragem final \n';
        }
        if(isNaN =!this.td_precoCombustivel){
            msg += 'Informe o preço do combustivel \n';
        }
        if(km.td_data ==''){
            msg += 'Informe a data \n';
        }
        if(msg != ''){
            alert(msg);
            return false;
        }
        return true;
    }
    cancelar(){
        document.getElementById('kmInicio').value ='';
        document.getElementById('kmFinal').value =''; 
        document.getElementById('date').value ='';          
        document.getElementById('btn1').innerText='Calcular';
        this.editId = null;
    } 

    deletar(id){
        if(confirm(`Deseja realmente deletar o km do ID ${id} ?`)){
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayCombustivel.length; i++){
                if(this.arrayCombustivel[i].id == id){
                    this.arrayCombustivel.splice(i, 1);
                    tbody.deleteRow(i);   
                
                }
            }
        }   
    }

    preparaEdicao(dados){
        this.editId = dados.id;
        document.getElementById('kmInicio').value = dados.td_kmInicial;
        document.getElementById('kmFinal').value = dados.td_kmFinal;
        document.getElementById('date').value =dados.data; 
        document.getElementById('btn1').innerText = 'Atualizar';
        document.getElementById('btn1').style='color:#98FB98'
    }
    
}

var combustivel = new Combustivel();