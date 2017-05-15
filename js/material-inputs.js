$(document).ready(function () {
  $('.form-control--material').on('input', function () {
    if ($(this).val() === '') {
      $(this).removeClass('is-dirty')
    } else {
      $(this).addClass('is-dirty')
    }
  })

  var inputs = document.querySelectorAll('.inputfile')
  Array.prototype.forEach.call(inputs, function (input) {
  	var label	 = input.nextElementSibling,
  		labelVal = label.innerHTML

  	input.addEventListener('change', function (e)  	{
  		var fileName = ''
  		if (this.files && this.files.length > 1)  			{ fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length) }  		else  			{ fileName = e.target.value.split('\\').pop() }

  		if (fileName) {
    console.log(fileName)
  			label.querySelector('span').innerHTML = fileName
  }  		else  			{ label.innerHTML = labelVal }
  	})
  })
})
