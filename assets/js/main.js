var flightsort = 'asc';
var depSort = 'asc';
var arrSort = 'asc';
var durSort = 'asc';
var prSort = 'desc'; 

$(".ftopt").click(function(){
	var id = $(this).attr('id');
	//alert(id);
	if($("#"+id).prop("checked"))
	{
		var val = $(this).val();
		//alert(val);
		//$(".t-check-in").width('46%');
		$(".t-check-out").show();
		$(".t-check-outhidden").show();
		//$(".text_box_three").removeAttr('style');
		$(".mcity").hide();
		
		//$('.daterange').data('daterangepicker').singleDatePicker = true;
		$('#search_checkout').attr('disabled', 'disabled');
		$(".rdd").show();
		if(val == '2')
		{
			$(".t-check-outhidden").hide();
			$(".returndate").show();
			$(".t-check-outhide").hide();
			//$('.daterange').data('daterangepicker').singleDatePicker = false;
			$('#search_checkout').removeAttr('disabled');
			
		}
		else if(val == '3')
		{
			/* $(".t-check-in").width('100%');
			$(".departureLebel").hide();
			$(".returndate").hide();
			$(".t-check-out").hide(); */
			$(".rdd").hide();
			$(".mcity").show();
			
			//$(".roundreturn").hide();
			$(".t-check-outhide").hide();
			
			$(".mcity .depart_from").val($(".destination:first").val());
			$(".mcity .from_country").val($(".to_country:first").val());
			$(".mcity .destination").val('');
			$(".text_box_three").attr('style','margin-top: 0px;');
			
			$(".addmoreCity").click();
			$(".mcity:first").remove();
			
			
		}
		else
		{
			$(".roundreturn").hide();
			$(".t-check-outhide").show();
		}
	}
});

$(document).ready(function(){
	
 
	//$('.depart_from').keyup(function(){
	$(document).on('keyup',".departure", function(){
		//alert(website_url);
		var val = $(this).val();
		var nextUl = $(this).next();
		//alert($(this).next().attr('id'));
		if(val.length >=3)
		{
			$.ajax({
				url:website_url+"home/getcities/origin",
				method:"POST",
				data:{query:val},
				dataType:"html",
				success:function(data)
				{
					//alert(nextUl.attr('id'));
					nextUl.html(data);
					nextUl.show();
					//$("#orgincities").html(data);
					//$("#orgincities").show();
				}
			});
		}
	});
	//$('.destination').keyup(function(){
	$(document).on('keyup',".destination", function(){	
		var val = $(this).val();
		var nextUl = $(this).next();
		if(val.length >=3)
		{
			$.ajax({
				url:website_url+"home/getcities/destination",
				method:"POST",
				data:{query:val},
				dataType:"html",
				success:function(data)
				{
					//alert(data);
					nextUl.html(data);
					nextUl.show();
					//$("#destinationcities").html(data);
					//$("#destinationcities").show();
				}
			});
		}
	});
	
	/* $(document).on('click', '.citydata a', function(){
		var countryCode = $(this).attr('rel');
		var city = $(this).text();
		alert($(this).parent().parent().prev().attr('name'))
		$(this).parent().parent().prev().val(city);
		//$("#depart_from").val();
	}) */
	var clicked = 0;
	$(document).on('click',".addmoreCity", function(){
		var countmc = $(".mcity").length;
		//alert(countmc);
		//console.log(countmc);
		if(countmc <= 3)
		{
			var c = $(this).parent().parent();
			var cloned = c.clone();
			
			//cloned.find( ".calender" ).replaceWith('<li class="calender" style="width:187px;"><div class="form-group t-datepicker"><div class="t-check-in"></div></div></li>');
			
			var departure = cloned.find('.departure').val();
			var destination = cloned.find('.destination').val();
			var depDate = cloned.find('.ddate').val();
			
			//alert(departure+':::'+destination+'::::'+depDate);
			//alert('sadfds:::'+$('.mcity:not([style*="display: none"])').length);
			
			if((departure != '' && destination != '' && depDate != '') || $('.mcity:visible').size()<=1)
			{
				cloned.insertAfter(c);
				$(this).remove();
				
				var drPicker = cloned.find('.daterange');
				
				var DateOptions2 = {
					locale: {
						  format: 'DD-MM-YYYY'
					},
					"singleDatePicker":true,
					"alwaysShowCalendars": true,
					"minDate": currentDate,
					"maxDate": moment().add('months', 10),
					autoApply: true,
					autoUpdateInput: false
				}
				drPicker.daterangepicker(DateOptions2, function(start, end, label) {
				  //console.log(start);
				  //console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
				  
				  // Lets update the fields manually this event fires on selection of range
				  var selectedStartDate = start.format('DD-MM-YYYY'); // selected start
				  var selectedEndDate = end.format('DD-MM-YYYY'); // selected end

				  drPicker.val(selectedStartDate);
				  /* var checkInPicker = $checkinInput.data('daterangepicker');
				  checkInPicker.setStartDate(selectedStartDate);
				  checkInPicker.setEndDate(selectedEndDate); */
				});
				
				if(!clicked)
				{
					cloned.find('.departure').val($('.destination:first').val());
					cloned.find('.from_country').val($('.to_country:first').val());
					clicked++;
				}
				else
				{
					cloned.find('.departure').val(cloned.find('.destination').val());
					cloned.find('.from_country').val(cloned.find('.to_country').val());
				}
				cloned.find('.destination').val('');
				
				if(countmc == '3')
				{
					cloned.find('.addmoreCity').hide();
				}
			}
			else
			{
				//if(departure != '' && destination != '' && depDate != '')
				if(departure == '')
				{
					c.find('.departure').focus().addClass('req_error');
				}
				if(destination == '')
				{
					c.find('.destination').focus().addClass('req_error');
				}
				if(depDate == '')
				{
					c.find('.t-date-check-in').focus().addClass('req_error');
				}
			}
		}
	});
	
	$(document).on('keyup',"#viatorDestination", function(){
		//alert(website_url);
		var val = $(this).val();
		var nextUl = $(this).next();
		//alert($(this).next().attr('id'));
		$.ajax({
			url:website_url+"activities/getDestinations",
			method:"POST",
			data:{query:val},
			dataType:"html",
			success:function(data)
			{
				//alert(nextUl.attr('id'));
				nextUl.html(data);
				nextUl.show();
				//$("#orgincities").html(data);
				//$("#orgincities").show();
			}
		});
	});
	
	$(document).on('click',".verifycouponcode", function(){
		var copon_code = $("#applied_couponcode").val();
		var searched_data = $(this).attr('rel');
		//alert(website_url);
		//alert($(this).next().attr('id'));
		$.ajax({
			url:website_url+"user/apply_coupon_code",
			method:"POST",
			data:{copon_code:copon_code, searched_data:searched_data},
			dataType:"json",
			success:function(data)
			{
				$("#ccodemsg").html(data.msg);
				
				if(data.status == '1')
				{
					//alert(parseFloat(data.discount).toFixed(2));
					
					if(data.service == 'Hotels')
					{
						$("#discount").val(data.discount);
						$("#ttldiscount").html(parseFloat(data.discount).toFixed(2));
					
						var total_price = $("#total_price").val();
						var ttlpriceafterdisc = total_price - data.discount;
						
						$("#grandttlamt").html(parseFloat(ttlpriceafterdisc).toFixed(2)); 
					}
					else
					{
						$("#pdiscount").val(data.discount);
						$("#coupon_code").val(copon_code);
						$("#ttldiscount").html(parseFloat(data.discount).toFixed(2));
						calculate_subttlAmt();
					}
				}
				else
				{
					if(data.service == 'Hotels')
					{
						$("#discount").val(0);
						$("#ttldiscount").html(parseFloat(0).toFixed(2));
					
						var total_price = $("#total_price").val();
						var ttlpriceafterdisc = total_price - 0;
						
						$("#grandttlamt").html(parseFloat(ttlpriceafterdisc).toFixed(2)); 
					}
					else
					{
						$("#ttldiscount").html(parseFloat(0).toFixed(2));
						$("#pdiscount").val(0);
						$("#coupon_code").val('');
						calculate_subttlAmt();
					}
				}
			}
		});
	});
	
});

function remove_applied_code(elem)
{
	var serviceType = $(elem).attr('rel');
	//alert(serviceType);
	
	$("#applied_couponcode").val('');
	$("#ccodemsg").html('');
	//$("#discount").val(0);
	if(serviceType == 'Hotels')
	{
		$("#discount").val(0);
		$("#ttldiscount").html(parseFloat(0).toFixed(2));
	
		var total_price = $("#total_price").val();
		var ttlpriceafterdisc = total_price - 0;
		
		$("#grandttlamt").html(parseFloat(ttlpriceafterdisc).toFixed(2)); 
	}
	else
	{
		$("#ttldiscount").html(parseFloat(0).toFixed(2));
		$("#pdiscount").val(0);
		$("#coupon_code").val('');
		calculate_subttlAmt();
	}
	
}

/*******************************************************************************/
function check_fl()
{
	var $inputs = $('#flsearchfrm :input');
	$("#ladingpop").modal({
		backdrop: 'static',
		keyboard: false
	});
	
	//var frmData = $("#flsearchfrm").serialize();
	var adults = $("#flsearchfrm :input[name='adults']").val(); 
	var children = $("#flsearchfrm :input[name='children']").val(); 
	var infant = $("#flsearchfrm :input[name='infant']").val(); 
	var tripType = $("#flsearchfrm :input[name='trip_type']").val(); 

	var totalPassangers = parseInt(adults) + parseInt(children) + parseInt(infant);

	
	var values = {};
	var orginsArr = [];
	var destinationArr = [];
	var depDateArr = [];
	var returnDateArr = [];
	//var tripType = 0;
    $inputs.each(function() {
		var fname = this.name;
		if(this.name == 'from_country[]' || this.name == 'from_city[]' || this.name == 'to_country[]' || this.name == 'destination_city[]' || this.name == 'depart_date[]' || this.name == 'return_date[]')
		{
			fname = fname.replace('[]','');
		}
		/* if(this.name == 'trip_type')
		{
			tripType = $(this).val();
		} */
		if(this.name == 'from_city[]')
		{
			orginsArr.push($(this).val());
		}
		if(this.name == 'destination_city[]')
		{
			destinationArr.push($(this).val());
		}
		if(this.name == 'depart_date[]')
		{
			depDateArr.push($(this).val());
		}
		if(this.name == 'return_date[]')
		{
			returnDateArr.push($(this).val());
		}
        //values[fname] = $(this).val();
    });
	
	/* alert(orginsArr);
	alert(destinationArr); */
	
	var arrow = '<i class="icofont-long-arrow-right"></i>';
	if(tripType == 2)
	{
		arrow = '<i class="icofont-exchange"></i>';
	}
	
	var str = '';
	var depPassStr = '';
	for (i = 0; i < orginsArr.length-1; i++) {
		str += '<div class="fromto"><span>'+orginsArr[i]+'</span><span class="arrow">'+arrow+'</span><span>'+destinationArr[i]+'</span></div>';
		depPassStr = '<div class="depPassRow"><span class="depd"> Departure Date: '+depDateArr[0]+'</span><span class="passc"> Passengers: '+totalPassangers+'</span></div>';
	}
	
	$("#flight_search_text").html(str);
	$("#depPass").html(depPassStr);
	//trip_type=1&from_country%5B%5D=IN&from_city%5B%5D=Delhi%2C+India(DEL)&to_country%5B%5D=IN&destination_city%5B%5D=Mumbai%2C+India(BOM)&depart_date%5B%5D=16-01-2020&adults=1&children=0&infant=0&class_type=1&from_country%5B%5D=IN&from_city%5B%5D=&to_country%5B%5D=IN&destination_city%5B%5D=&depart_date%5B%5D=

	
	/* console.log(frmData);
	
	alert(frmData); */
	
	//return false;
}
$("#flsearchfrm").submit(function(){
	check_fl()
});
$(".ttltraveler").click(function(){
	$(".traveldropdown").toggle();
});
$(".closeinfo").click(function(){
	var rel = $(this).attr('rel');
	$("#collapseExample_"+rel).removeClass('show');
	//$(this).parent().parent().parent().toggle(300);
});
$(".trvelerInfo .add").click(function(){
	
	var ttlTraveC = $(".traveler_count").text();
	//alert(ttlTraveC);
	if(ttlTraveC < 9)
	{
		var ttl = $(this).prev().find('span').text();
		$(this).prev().find('span').text(parseInt(ttl)+1);
		total_traveler(parseInt(ttl)+1, $(this));
		if($(this).prev().find('span').parent().attr('class') == 'adults')
		{
			$("#adults").val(parseInt(ttl)+1);
		}
		else if($(this).prev().find('span').parent().attr('class') == 'child')
		{
			$("#children").val(parseInt(ttl)+1);
		}
		else
		{
			$("#infant").val(parseInt(ttl)+1);
		}
	}
});

$(".trvelerInfo .minus").click(function(){
	var ttl = $(this).next().find('span').text();
	
	var ttlAdult = $("#adults").val();
	
	if(ttl > 0)
	{
		if($(this).next().find('span').parent().attr('class') == 'adults')
		{
			var ttlAdult = $("#adults").val();
			//alert(ttlAdult);
			if(ttlAdult > 1)
			{
				$(this).next().find('span').text(parseInt(ttl)-1);
				total_traveler(parseInt(ttl)-1, $(this));
				
				$("#adults").val(parseInt(ttl)-1);
			}
		}
		else if($(this).next().find('span').parent().attr('class') == 'child')
		{
			$(this).next().find('span').text(parseInt(ttl)-1);
			total_traveler(parseInt(ttl)-1, $(this));
		
			$("#children").val(parseInt(ttl)-1);
		}
		else
		{
			$(this).next().find('span').text(parseInt(ttl)-1);
			total_traveler(parseInt(ttl)-1, $(this));
		
			$("#infant").val(parseInt(ttl)-1);
		}
	}
});
$("input[name='trip_type']").change(function(){
	$(".returndate").hide();
	$(".t-check-outhidden").show();
	
	if($(this).val() == '2')
	{
		$(".returndate").show();
		$(".t-check-outhidden").hide();
	}
	if($(this).val() == '3')
	{
		$(".t-check-outhidden").hide();
	}
});

$(document).on('click', ".rdd", function(){
	/* $(".returndate").show();
	$(".t-check-outhidden").hide(); */
	//alert('asdfka');
	$("#search_checkout").removeAttr('disabled');
	//$(".rdd").show();
	//alert('asdfa');
	$("input[name=trip_type][value=2]").prop('checked', true);
	
	//$('.daterange').data('daterangepicker').singleDatePicker = false;
});
$(document).on('click', ".getfr", function(){
	//alert('dadfad');
	var rel = $(this).attr('rel');
	var dataArr = rel.split(',');
	var trashId = dataArr[0];
	var resultIndex = dataArr[1];
	
	var data = 'trashid='+trashId+'&result_index='+resultIndex;
	$.ajax({
		type: "POST",
		url: website_url+'flight/farerule',
		data: data,
		beforeSend:function(){
			
		},
		success: function(response) {
			//alert(response);
			$(".frules").html(response);
		},
		error: function() {
			alert("failure");
		}
	}); 
});

$(document).on('click', ".exancheIcon", function(){
	var prevItem = $(this).prev();
	var prevFCountry = $(prevItem).find('.from_country').val();
	var prevdeparture= $(prevItem).find('.departure').val();
	
	var nextItem = $(this).next();
	
	var nextTCountry = $(nextItem).find('.to_country').val();
	var nextdestination= $(nextItem).find('.destination').val();
	
	$(prevItem).find('.from_country').val(nextTCountry);
	$(nextItem).find('.to_country').val(prevFCountry);
	
	$(nextItem).find('.destination').val(prevdeparture);
	$(prevItem).find('.departure').val(nextdestination);
	
	
});

var value = '';
$(document).on('click', ".foval", function(){
	var val = $(this).val();
	if(val != '')
	{
		$(this).val('');
		value = val;
	}
});

$(document).on('focusout', ".foval", function(){
	var focusoutVal = $(this).val();
	
	var newval = value;
	if(focusoutVal != value && focusoutVal != '')
	{
		newval = focusoutVal;
	}
	//alert(newval);
	$(this).val(newval);
})
function validate(formid)
{
	var getTripType = $("input[name='trip_type']:checked").val();

	var noerror = true;
	
	if($("#departure").val() == '')
	{
		$("#departure").focus().addClass('req_error');
		noerror = false;
	}
	else
	{
		$("#departure").removeClass('req_error');
		noerror = true;
	}
	if($("#destination").val() == '')
	{
		$("#destination").focus().addClass('req_error');
		noerror = false;
	}
	else
	{
		$("#destination").removeClass('req_error');
		noerror = true;
	}
	if($(".ddate").val() == '')
	{
		$(".ddate").addClass('req_error');
		noerror = false;
	}
	
	if(getTripType == 2)
	{
		if($(".rdate").val() == '')
		{
			$(".rdate").addClass('req_error');
			noerror = false;
		}
	}
	
	if(getTripType == 3)
	{
		$(".departure").each(function(){
			if($(this).val() == '')
			{
				$(this).addClass('req_error');
				noerror = false;
			}
			else
			{
				$(this).removeClass('req_error');
				noerror = true;
			}
		});
		$(".destination").each(function(){
			if($(this).val() == '')
			{
				$(this).addClass('req_error');
				noerror = false;
			}
			else
			{
				$(this).removeClass('req_error');
				noerror = true;
			}
		});
		
		$(".ddate").each(function(){
			if($(this).val() == '' || $(this).val() == 'null')
			{
				$(this).prev().addClass('req_error');
				noerror = false;
			}
			else
			{
				$(this).prev().removeClass('req_error');
				noerror = true;
			}
		});
	}
	
	//alert(noerror);
	if(noerror == true)
	{
		//alert('submit');
		$("#"+formid).submit();
	}
	
}

/***************Date Range Picker********************/
$('#search_checkout').attr('disabled', 'disabled');
var currentDate = moment().format("DD-MM-YYYY");

var selectedchckein = 0;
var singleDatePicker = true;
var DateOptions = {
	locale: {
		  format: 'DD-MM-YYYY'
	},
	"singleDatePicker": true,
	"alwaysShowCalendars": true,
	"minDate": currentDate,
	"maxDate": moment().add('months', 10),
	autoApply: true,
	autoUpdateInput: true
}
$datepickerinput = '';
$('.datepicker1').daterangepicker(DateOptions, function(start, end, label) {
	
	var selectedStartDate = start.format('DD-MM-YYYY');
	datepicker2(selectedStartDate);
	$('#search_checkout').val('');
	selectedchckein = 1;
});
var selectedDate = '';
$('.datepicker1').on('apply.daterangepicker', function(ev, picker) {
	//do something, like clearing an input
	selectedDate = picker.startDate.format('DD-MM-YYYY');
	/* console.log('tt');
	console.log(picker); */
	//$('#daterange').val('');
	$datepickerinput = picker.element;
	console.log($datepickerinput);
	$datepickerinput.val(selectedDate);
});
function getMonthFromString(mon, year){
   return new Date(Date.parse(mon +" 1, "+year)).getMonth()+1
}
$('.datepicker1').on('showCalendar.daterangepicker', function(ev, picker) {
	//do something, like clearing an input
	//$('#daterange').val('');
	//console.log(picker.startDate.format('YYYY-MM-DD'));
	//console.log(picker.endDate.format('YYYY-MM-DD'));
	var startDate = picker.startDate.format('YYYY-MM-DD');
	//console.log(picker.element);
	//console.log(picker.element[0].id);
	
	$checkinInput = $(picker.element[0]);
	
	//addCustomInformation1(startDate);
	
	/* var currentMonthYear = $(".month").html();
	var monthYearSplit = currentMonthYear.split(' ');
	var monthNumber = numFormate(getMonthFromString(monthYearSplit[0], monthYearSplit[1]));
	//alert(monthNumber);
	//console.log(currentMonth);
	var currentDate = new Date(startDate);
	var cdate = currentDate.getDate();
	var cyear = currentDate.getFullYear();
	var cmonth = monthNumber; //numFormate(parseInt(currentDate.getMonth()+1));
	
	var newdate = monthYearSplit[1]+'-'+cmonth+'-01';
	
	var d = new Date();
	var currentMonth = numFormate(d.getMonth()+1);
	
	var cfaredate = startDate;
	if(currentMonth != monthNumber)
	{
		cfaredate = newdate;
	} */
	//alert(cfaredate);
	/* $(".daterangepicker table tr td.available").filter(function() {
		if(!$(this).hasClass('off'))
		{
			var availableDay = numFormate($(this).text());
			//console.log(':::'+availableDay);
			
			var newdate = cyear+'-'+cmonth+'-'+availableDay;
			console.log(newdate);
			
			var jsDate = new Date(newdate);
			var clMonth = numFormate(parseInt(jsDate.getMonth()+1));
			
			var ttlDaysInMonth = daysInMonth(cmonth, cyear);
			
			//console.log(jsDate+':::'+ttlDaysInMonth+':::'+clMonth)
			if(ttlDaysInMonth == availableDay)
			{
				cmonth =  numFormate(parseInt(cmonth)+1);
				console.log(cmonth);
				//currentDate.setMonth(cmonth);
			}
			
			var dateMonth =  availableDay+'_'+clMonth;
			
		}
    }); */
	
	
	
	getCalnderFare(startDate);
});

function total_traveler(ttl, elem)
{
	var getTTtype = elem.attr('rel');
	var ttlTraveler = 0;
	$(".t_"+getTTtype+" span").each(function(){
		ttlTraveler = ttlTraveler + parseInt($(this).text());
	});
	$(".traveler_count").text(ttlTraveler);	
}

$(".classBox .radio").click(function(){
	var id = $(this).children().attr('id');
	//alert(id);
	if($("#"+id).prop("checked"))
	{
		var fclass = $(this).children().val();
		var classtxt = 'Any';
		if(fclass == '2')
		{
			classtxt = 'Economy';
		}
		if(fclass == '3')
		{
			classtxt = 'Premium Economy';
		}
		if(fclass == '4')
		{
			classtxt = 'Business';
		}
		$(".current_class").text(classtxt);
	}
	
});

// CHANGES
$(function(){
		
	//
	var today = new Date(); 
    var dd = today.getDate(); 
    var mm = today.getMonth()+1; //January is 0! 
    var yyyy = today.getFullYear(); 
    if(dd<10){ dd='0'+dd } 
    if(mm<10){ mm='0'+mm } 
    var today = dd+'/'+mm+'/'+yyyy; 
	$('.goexp-datepicker').daterangepicker({
          singleDatePicker: true,
          startDate: moment(),
		  minDate:new Date()
        });
	
	$(document).on('click', '.addPas', function(){
	   let $display_element = $(this).closest('.trvelerInfo').find('.headcount-value');
	   let headcount_value = $display_element.html();
	   let jheadcount_value = Number(headcount_value);
	   
	   jheadcount_value++;
	   $display_element.html(jheadcount_value);
	});	
	$(document).on('click', '.minusPas', function(){
	   let $display_element = $(this).closest('.trvelerInfo').find('.headcount-value');
	   let headcount_value = $display_element.html();
	   let jheadcount_value = Number(headcount_value);
	   
	   if(jheadcount_value==0)return;
	   
	   jheadcount_value--;
	   $display_element.html(jheadcount_value);
	});
});
// CHANGES






