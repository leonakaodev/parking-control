module.exports = {
    async vehicles(_, args){
        console.log(args);
        return [
            {name: 'Teste0'},
            {name: 'Teste1'},
            {name: 'Teste2'},
        ];
    }
};