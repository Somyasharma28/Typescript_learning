const num1= document.getElementById('num1')! as HTMLInputElement;
const num2= document.getElementById('num2')! as HTMLInputElement;
const button = document.querySelector('button');

function add(n1: number,n2: number){
    return n1+n2;
};


button.addEventListener('click',()=>{
    console.log(add(+num1.value, +num2.value));
})