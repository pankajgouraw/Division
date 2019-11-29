$(function() {

    let multiplyLength = '';  
    let divdendIndex = '';    

    $("#headerText").text(headerText);
    $("#instruction").css({color: headerInstructionColor});
    $('.carryContainer .dragCarry').css({'color':carryColor})
    $('body').css({'background-image': bg});
    $('#firstNo, #secNo, .sign').css({color: questColor});
    $('.options p span').css({color: numColor});

    generateContent();



    // function for drag and drop
    function dragDrop() {

        $('.drag').draggable({
            revert: 'invalid',
            snapMode: 'inner',
            helper: 'clone'
        });

        $(".drop").droppable({
            accept: ".drag",
            // tolerance: 'intersect',
            drop: function(event, ui) {
                $(this).append($(ui.draggable).clone().css({
                    color: ansColor
                }));

                $(event.target).attr('data-user',ui.draggable.text());
                // console.log(event.target)

                if ($(this).children("span").length > 1) {
                    $(this).children("span:nth-child(1)").remove();
                }
            }
        });

    } //end here drag and drop 

  


    // generate multiplication quiz question
    function generateContent() {
        $('.randBox').remove();
        // generate random numbers
       let randA = Math.ceil(Math.random() * (maxA - minA) + 1) + minA;
       let randB = Math.ceil(Math.random() * (maxB - minB) + 1) + minB;       

       randA = 4;
       randB = 811;

       // console.log('divisor' ,randA);
       // console.log('dividend',randB);

       let quotient = randB / randA;
       let  string = quotient.toString();
       let  dotIndex = string.indexOf('.');

       let quotientWithoutDot = Number(string.substring(0, dotIndex));
       if(quotientWithoutDot ==''){
          quotientWithoutDot = quotient;
       }

       //console.log('quotientWithoutDot', quotientWithoutDot)
       //console.log(' quotient ',quotient);
       let remainder = randB % randA;
       //console.log('remainder', remainder);

        // convert random number into array
        let quotientWithoutDotArray = Array.from(quotientWithoutDot.toString(), Number);
        let carryRandA = Array.from(randA.toString(), Number);
        let carryRandB = Array.from(randB.toString(), Number);
        let dividendArray  = Array.from(randB.toString(), Number);
        //console.log('dividendArray', dividendArray);

        //generate span tag for numbers
        carrySpanA = '';
        carrySpanB = '';
        quotientSpan = '';
        
        //add span tag to the number
        $.each(carryRandA, function(i,value){
            var spanA = `<span>${value}</span>`
            carrySpanA += spanA;
        }); 

        // add span tag to second number
        $.each(carryRandB, function(i,value){
            var spanB = `<span>${value}</span>`
            carrySpanB += spanB;
        }); 

        // add span tag with data-quotient to second number
        $.each(quotientWithoutDotArray, function(i,value){
            var quotB = `<span class='drop' data-quotient='${value}'>${value}</span>`
            quotientSpan += quotB;
        }); 


        $('.divisor').html(carrySpanA);
        $('.divident').html(carrySpanB);
        $('.quotient').html(quotientSpan);

        console.log('quotientWithoutDotArray', quotientWithoutDotArray);
        let solutionStructure = '';
        for(let i=0; i<quotientWithoutDotArray.length; i++){
            let multiply  = randA*quotientWithoutDotArray[i];
            let multiplyArray = Array.from(multiply.toString(), Number);
            multiplyLength = multiplyArray.length;

            divdendIndex = multiplyLength;
            // get the digit from divided to subtract
            let dividDigit = '';
            let k=null;
            for(k=0; k < divdendIndex; k++){
               let x = dividendArray[k];
               dividDigit += x;   
            }
            let subtractValue = multiply-Number(dividDigit);
          
            if(subtractValue < randA){
                   let x = dividendArray[k];
                   console.log('x' , x)
                   let appendfromTop = subtractValue.toString() + x.toString(); 
                   console.log('append to ' , appendfromTop);
            }
            console.log("k ", k)
            if(i==0){
                let span = '';
                for(let j=0; j < multiplyArray.length; j++){
                    let x  = `<span class='drop' data-ans='${multiplyArray[j]}'>${multiplyArray[j]}</span>`
                    span += x;
                }
                let html = `<div class="dividentSolution">
                                   <p>${span}</p>
                            </div>`;
                $('#solContainer').append(html);
            }else{
                // console.log('i ', i)

            }
        }

    } // end generate multiplication quiz function


function dividentSolutionWidth(){
    let W = $('.divident').width();
    $('.divident').width(W+10);
    // console.log('divident width',W);
     W = $('.divident').width();
    $('.dividentSolution').width(W);
}

dividentSolutionWidth();

}); // end document ready function 