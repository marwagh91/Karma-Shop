// // function Minimuim
function Min(T) {
    var min=T[0];
   for (let i = 1; i < T.length; i++) {
    if (T[i]< min) {
            min = T[i];    
      }
        
  }return min;
     }

//function paritee
//var n=prompt("saisir un nombre");
function impair(T) {
    var nbr=0 ;
for (let i = 0; i < T.length; i++) {
        if ((T[i] % 2) !== 0) {
            nbr++;
            
        }
}return nbr;
}
// // function nbres occurences de caractere
function Occurence(ch,char) {
    var nboccurence=0;
    for (let i = 0; i < ch.length; i++) {
        if(ch[i] == char){
            nboccurence++;
        }
        
    }return nboccurence;
    
}
// fonction inverse
function Inverse(CH) {
    var inverse ="";
    for (let i = 1; i < CH.length; i++) {
    //  inverse eli hiya vide  3 loul bach ta5ou caractere 9dim eli howa ch[i] w tzid 3lih chaine 9dima
        inverse = CH[i] + inverse;
        
    }
    return inverse;
    
}
//fonction replace
function Replace(chaine) {
    var espace='';
    for (let i = 1; i < chaine.length; i++) {
        if (chaine[i] == '') {
            espace = espace[i] + "_";
            
        }  else{
            espace=espace+chaine[i];
        } 
}return espace;
}

//fonction premier
function nbrPremier(T) {
    var nbr=0;
    for(var i = 1; i < T.length; i++){
      if((T[i] % i ==0 )){
         nbr++;
      }
        
      }


    
     
     return nbr;
  }