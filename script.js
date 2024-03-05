

$.Thailand({
  $district: $('#district'),
  $amphoe: $('#amphoe'),
  $province: $('#province'),
  $zipcode: $('#zipcode'),

  onDataFill: function(data) {
    console.log(data)
    var html = '<b>ที่อยู่:</b> ตำบล' + data.district + ' อำเภอ' + data.amphoe + ' จังหวัด' + data.province + ' ' + data.zipcode
    $('#demo2-output').html('')

  },

  onLoad: function() {
    console.info('Autocomplete is ready!')
    $('#loader, .demo').toggle()
  }
})

const scriptUrl = 'https://script.google.com/macros/s/AKfycbyLslWayIv2jJwt04qqHAztE3NaKJxac8_JzyMMaL-HP4IKxVPwVcJfSPia6_aPJBp-/exec'

function submit() {
  let district = $('#district').val()
  let amphoe = $('#amphoe').val()
  let province = $('#province').val()
  let weight = $('#weight').val()
  $.LoadingOverlay('show')
  let selectedValue = $('input[name="radio"]:checked').val();
  let data = {
    opt: 'savedata',
    data1: $('#district').val(),
    data2: $('#amphoe').val(),
    data3: $('#province').val(),
    data4: $('#zipcode').val(),
    data5: $('#weight').val(),
    data6: selectedValue
  }
  $.ajax({
    method: "POST",
    url: scriptUrl,
    data: data,
    dataType: 'json',
    success: function(res) {
      $.LoadingOverlay('hide')
      if (res.status == 'success') {
        $('#myForm')[0].reset()
        Swal.fire({
          title: '<strong>' + district + ' ' + amphoe + ' ' + province + ' <br>' + ' สินค้าจำนวน ' + weight + ' พาเลท </strong>',
          html:
            '<table class="table table-bordered">' +
            '<thead>' +
            '<tr>' +
            '<th scope="col" colspan="2">' + 'เงื่อนไข : ' + selectedValue + '</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>' + res.period1 + '</td>' +
            '<td>' + res.price1 + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + res.period2 + '</td>' +
            '<td>' + res.price2 + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + res.period3 + '</td>' +
            '<td>' + res.price3 + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + res.period4 + '</td>' +
            '<td>' + res.price4 + '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>',
          showCloseButton: true,
          focusConfirm: true,
        })
      }
    },
    error: function(err) {
      console.log(err)
      $.LoadingOverlay('hide')
      alert('บันทึกไม่สำเร็จ')
    },
  })
}

(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      if (!form.checkValidity()) {
        event.stopPropagation()
        form.classList.add('was-validated')
        $('#myForm').find(":invalid").first().focus()
      } else {
        submit()
      }

    }, false)
  })
})()
