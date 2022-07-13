document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

let loader = $('.loader');
$('#submit').click(function () {
    let product = $('#product');
    let name = $('#name');
    let phone = $('#phone');
    let hasError = false;
    $('.error-input').hide();
    product.css('border-color' , 'rgb(130, 19, 40)');
    name.css('border-color' , 'rgb(130, 19, 40)');
    phone.css('border-color' , 'rgb(130, 19, 40)');

    if(!product.val()) {
        product.next().show();
        hasError = true;
        product.css('border-color' , 'red');
    }
    if(!name.val()) {
        name.next().show();
        hasError = true;
        name.css('border-color' , 'red');
    }
    if(!phone.val()) {
        phone.next().show();
        hasError = true;
        phone.css('border-color' , 'red');
    }

    if(!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: { product: product.val(), name: name.val(), phone: phone.val() }
        })
            .done(function( msg ) {
                loader.hide();
                if(msg.success) {
                    $('#form').css('display', 'none');
                    $('#form-success').css('display', 'block');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
    }
})