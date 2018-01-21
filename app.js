(function () {
    var configs = [
        {
            "cardPattern": /^4/,
            "cardNumberLength": 16,
            "cvv": "required",
            "cvvLength": 3,
            "displayText": "Visa"
        },
        {
            "cardPattern": /^5[1-5]/,
            "cardNumberLength": 16,
            "cvv": "required",
            "cvvLength": 3,
            "displayText": "Master"
        },
        {
            "cardPattern": /^(50|63|66|5[6-8]|6[8-9]|600[0-9]|6010|601[2-9]|60[2-9]|61|620|621|6220|6221[0-1])/,
            "cardNumberLength": 19,
            "cvv": "optional",
            "cvvLength": 4,
            "displayText": "Maestro"
        }
    ];
    function getYear(){
        var year = document.getElementById('cc-year');
        for(var i = 0; i<=20; i++){
            var value = '20'+ (18+i);
            year.options[i] = new Option(value, value);
        }
    }
    getYear();


    function  hey(data) {
        console.log(data);
    }

    document.getElementById('cc-number').addEventListener('blur',function () {
        var inputValue = document.getElementById('cc-number').value;
        var cctype = 'invalid Card Number';
        var cvv = document.getElementById('cc-cvv');
            for(var i in configs){
                var reg = new RegExp(configs[i].cardPattern);
                var strMatch = reg.test(inputValue);
                if(strMatch == true) {
                    cctype = configs[i].displayText;
                    cvv.removeAttribute("disabled",false);
                    if(cctype == "Maestro") {
                        cvv.setAttribute("required",false);
                    }
                }

            }
            document.getElementById('cc-type').innerText = cctype

    });

    document.getElementById('cc-cvv').addEventListener('blur',function () {
        document.getElementById('submit-card').removeAttribute("disabled",false);

    });
    var i=0;
    document.getElementById('submit-card').addEventListener('click',function () {
        var data = {
            number:document.getElementById('cc-number').value,
            expMonth:document.getElementById('cc-month').value,
            expYear:document.getElementById('cc-year').value,
            cvv:document.getElementById('cc-cvv').value,
            cardType:document.getElementById('cc-type').innerText
        };
        console.log(data);
        var strData = JSON.stringify(data);
        var cardNumber = 'card'+i;
        window.localStorage.setItem(cardNumber, strData);
        var frm = document.getElementsByName('cc-form')[0];
        frm.reset()
    })

    function getFromLocal(){
        if(localStorage.length>=1){
            for(var key in localStorage){
                var div = document.createElement('div');
                div.className = 'card'+ i;
                var keys = localStorage.getItem(key);

                if(keys){
                    keys = JSON.parse(keys)
                    var span1 = document.createElement('p');
                    span1.innerText = 'card number:'  +keys.number
                    var span2 = document.createElement('p');
                    span2.innerText = 'exp month:' + keys.expMonth
                    var span3 = document.createElement('p');
                    span3.innerText = 'exp year:' + keys.expYear
                    var span4 = document.createElement('p');
                    span4.innerText = 'cvv:' + keys.cvv;
                    var span5 = document.createElement('p');
                    span5.innerText = 'card type:' + keys.cardType;



                   // div.innerText = localStorage.getItem(key)
                    div.appendChild(span1)
                    div.appendChild(span2)
                    div.appendChild(span3)
                    div.appendChild(span4)
                    div.appendChild(span5)
                    document.getElementById('savedCard').appendChild(div);
                    i = localStorage.length + 1;
                }

            }


        }


    }
    getFromLocal()
})();