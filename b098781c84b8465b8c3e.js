window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import "bootstrap/scss/bootstrap.scss";
import "@fortawesome/fontawesome-free/js/all.min.js"
import "./css/style.css"
import "./sass/style.scss"

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(item => new bootstrap.Tooltip(item));


// برمجة زر اضافة منتج الى عربة الشراء
document.querySelectorAll('.add-to-card-btn').forEach(item => {
    item.addEventListener('click' , () =>{
        alert("تم اضافة هذا المنتج الى عربة الشراء ")
    })
}); 
// برمجة مدخلات الاحجام بالنسبة للمنتج 
// احصل على قائمة بجميع الحاويات
const sizes = document.querySelectorAll('.size-option');

// أضف مستمع نقرة إلى كل حاوية
for (const size of sizes) {
  size.addEventListener('click', () => {
    // إزالة الصنف "active" من جميع الحاويات
    sizes.forEach(c => c.classList.remove('active'));
    
    // إضافة الصنف "active" إلى الحاوية المنقرة
    size.classList.add('active');
  });
};   
// برمجة ازار الالوان الخاصة بالمنتج 
const colors = document.querySelectorAll('.color-option')

for(const color of colors){
    color.addEventListener('click', () => {
        colors.forEach(i => i.classList.remove('active'))
        color.classList.add('active');
    })
};

// برمجة السعر الاجمالي للجدول العربة 
document.querySelectorAll('[data-product-quantity]').forEach(item => {
  item.addEventListener('change', () =>{
    const newQuantity = item.value 
    const parent =item.closest('[data-product-info]')
    const price = parent.getAttribute('data-product-price')
    const totalPrice = newQuantity * price 
    parent.querySelector('.total-price').innerHTML= totalPrice + "$";
    totalPriceForAllProduct();

  })
});
document.querySelectorAll('[data-remove-form-card]').forEach(item => {
  item.addEventListener('click', () =>{
      item.closest('[data-product-info]').remove();
      totalPriceForAllProduct();
  })
})
function totalPriceForAllProduct(){
  let totalPriceForAllProduct = 0;
  document.querySelectorAll('[data-product-info]').forEach(product =>{
    const PricePerUnit =product.getAttribute('data-product-price');
    const Quantity = product.querySelector('[data-product-quantity]').value
    const PriceForProduct = PricePerUnit * Quantity 
    totalPriceForAllProduct = totalPriceForAllProduct + PriceForProduct;
  })
  document.getElementById('total-price-for-all-product').innerHTML = totalPriceForAllProduct + '$'
};
//ننشئ كائن يحتوي على المدن الخاصة بالدول 
const citiesByCountry = {
  iq : ['بغداد' , 'ديالى ' , 'الموصل ' , 'الانبار ' , 'اربيل ' , 'البصرة'],
  sa : ['مكة ' , 'المدينة' , 'الرياض' , 'القصيم ' , 'جدة'] , 
  eg : ['القاهرة' , ' شرم الشيخ ' , 'الاسكندرية' ,'الجيزة' ,'الرشيد' ],
  uae :['دبي ' , 'ابو ظبي' , 'المنامة' , 'الشارقة' , 'كلباء'] 
}

document.querySelectorAll('select[name="country"]').forEach(item =>{
  item.addEventListener('change' , () =>{ 
    const countries = item.value

    const cities = citiesByCountry[countries]

    document.querySelectorAll('#citiesOption option').forEach(option => option.remove())

    const firstOption=document.createElement('option')
    const textNode = document.createTextNode('اختر مدينة')
    firstOption.appendChild(textNode)
    firstOption.setAttribute('value' , '')
    firstOption.setAttribute('disabled' , 'true')
    firstOption.setAttribute('selected' , 'true')

    const city_option = document.getElementById('citiesOption')
    city_option.appendChild(firstOption)

    cities.forEach(city => {
      const newOption = document.createElement('option')
      const newText   = document.createTextNode(city)
      newOption.appendChild(newText)
      newOption.setAttribute('value' , city)
      city_option.appendChild(newOption)
    })
  })
})

// اختيار طريقة الدفع

document.querySelectorAll('input[name="payment_method"]').forEach(item =>{
  item.addEventListener('change' , () =>{
    const pymentmethod = item.value

    const cridetInput = document.querySelectorAll('#data_input')

    if(pymentmethod === 'on_delevery') {
      cridetInput.forEach(input => {
        input.style.display = 'none'
      })
    }
    else {
      cridetInput.forEach(input => {
        input.style.display = 'block'
      })
    }
  })

})

 //اضافة السنة الحالية لحاوية ال copyright
document.getElementById('fullyear').innerHTML = new Date().getFullYear();