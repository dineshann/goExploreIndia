var base_url = window.location.origin;
var host = window.location.host;
//alert(host);
var website_url = base_url+'/';
if(host == 'localhost')
{
	website_url = base_url+'/muskan_fl/demo/'
}

$(document).ready(function(){
	$(document).on('keyup',"#destination", function(){	
		var val = $(this).val();
		var nextUl = $(this).next();
		
		if(val.length >=3)
		{
			$.ajax({
				url:website_url+"hotel/getHotelCities/destination",
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
});

/* $("#hotelsearchfrm").submit(function(){
	check_hotel_pop()
}); */

function validate_search_frm(formid)
{
	var $inputs = $('#hotelsearchfrm :input');
	var roomandGuest = $(".ttltraveler").text();
	//var totalPassangers = parseInt(adults) + parseInt(children) + parseInt(infant);
	var noerror = true;
	
	var values = {};
	var destinationCity = '';
	var depart_date = '';
	var return_date = '';
	
    $inputs.each(function() {
		var fname = this.name;
		
		if(fname !='')
		{
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
			if(this.name == 'destination')
			{
				destinationCity = $(this).val();
			}
			if(this.name == 'depart_date[]')
			{
				depart_date = $(this).val();
			}
			if(this.name == 'return_date[]')
			{
				return_date = $(this).val();
			}
		}
    });
	
	//alert($("#hnationality").val());
	if($("#hnationality").val() == '')
	{
		$("#hnationality").addClass('req_error');
		noerror = false;
	}
	
	var str = '<div class="fromto"><span>'+destinationCity+'</span></div>';
	var depPassStr = '<div class="depPassRow"><span class="depd"> Check In: '+depart_date+'</span><span class="passc"> Check Out: '+return_date+'</span></div><div class="depPassRow"><span class="depd"> Rooms & Guests: '+roomandGuest+'</span></div>';
	
	$("#hotel_search_text").html(str);
	$("#depPasshotel").html(depPassStr);
	
	if(noerror == true)
	{
		$("#ladingpophotel").modal({
			backdrop: 'static',
			keyboard: false
		});
		
		$("#hotelsearchfrm").submit();
	}
}

$('#addnewroom').click(function(){
	var roomboxClone = $('.guestBox:first').clone();
	var ttlBox = $('.guestBox').length;
	var nextRoomCount = parseInt(ttlBox)+1;
	
	var countTtlRooms = $(".htravelerBox .guestBox").length;
	//alert(countTtlRooms);
	
	if(countTtlRooms < 4)
	{
		$(".roomshortinfo").show();
		$(".guestBox").find('.trvelerInfo').hide();
		
		roomboxClone.find('.travelerDetails span').html(0);
		roomboxClone.find('.radults').html(1);
		roomboxClone.find('.travelerDetails:first span').html(1);
		roomboxClone.find('.cage').hide();
		roomboxClone.find('.roomadults').val(1);
		roomboxClone.find('.roomchildren').val(0);
		
		//alert('asdfa');
		
		
		
		roomboxClone.find('.rc').html(nextRoomCount);
		roomboxClone.find('.removeRoom').show();
		
		roomboxClone.find('.roomadults').attr('name', 'adults['+ttlBox+']');
		roomboxClone.find('.roomchildren').attr('name', 'children['+ttlBox+']');
		roomboxClone.find('.childAge').attr('name', 'childrenAge['+ttlBox+'][]');
		
		//roomboxClone.find('.roomshortinfo').attr('style', 'display:none;');
		//alert('asfda');
		$(roomboxClone).insertAfter('.guestBox:last');
		$(".roomshortinfo:last").hide();
		//$(".guestBox").hide();
		$(".guestBox:last").find('.trvelerInfo').show();
		
		$("#ttlhrooms").val(parseInt(ttlBox)+1);
		total_rooms(ttlBox);
		
		total_traveler(0, $(".addh"));
	}
	
});

function total_traveler(ttl)
{
	var ttlTraveler = 0;
	$(".travelerDetails span").each(function(){
		ttlTraveler = ttlTraveler + parseInt($(this).text());
	});
	$(".traveler_count").text(ttlTraveler);
}
$(".hotelInfo .add").click(function(){
	var ttl = $(this).prev().find('span').text();
	$(this).prev().find('span').text(parseInt(ttl)+1);
	total_rooms(parseInt(ttl)+1);
});
$(".hotelInfo .minus").click(function(){
	var ttl = $(this).next().find('span').text();
	if(ttl > 0)
	{
		$(this).next().find('span').text(parseInt(ttl)-1);
		total_rooms(parseInt(ttl)-1);
	}
});

function total_rooms(ttl)
{
	/* var ttlRooms = 0;
	$(".hot_rooms span").each(function(){
		ttlRooms = ttlRooms + parseInt($(this).text());
	}); */
	var ttlBox = $('.guestBox').length;
	$(".current_class").text(ttlBox+' Rooms');
}
function getCityValues(city, country, countryCode, cityId, el)
{
	console.log(el);
	$(el).parent().parent().prev().val(city+', '+country);
	$(el).parent().parent().hide();
	$(el).parent().parent().parent().children().first().val(countryCode);
	$("#cityId").val(cityId);
}

function add_moreguest(elem)
{
	var ttl = $(elem).prev().find('span').text();
	//alert(ttl);

	if($(elem).prev().find('span').parent().attr('class') == 'adults')
	{
		var ttlRoomAdult = $(elem).parent().parent().find('.roomadults').val();
		//alert(ttlRoomAdult);
		
		if(ttlRoomAdult < 6)
		{
			$(elem).prev().find('span').text(parseInt(ttl)+1);
			total_traveler(parseInt(ttl)+1, $(elem));
			//$("#adults").val(parseInt(ttl)+1);
			$(elem).parent().parent().find('.roomadults').val(parseInt(ttl)+1);
			$(elem).parent().parent().find('.roomshortinfo').children('.radults').html(parseInt(ttl)+1);
		}
	}
	
	if($(elem).prev().find('span').parent().attr('class') == 'child')
	{
		var ttlRoomChild = $(elem).parent().parent().find('.roomchildren').val();
		if(ttlRoomChild < 2)
		{
			$(elem).prev().find('span').text(parseInt(ttl)+1);
			total_traveler(parseInt(ttl)+1, $(elem));
		
			var ttlchild = parseInt(ttl)+1;
			//alert(ttlchild);
			//var childAgeNode = $(".cage:first");
			//var childAgeNode = $(elem).parent().next().find('.cage:first');
			var childAgeNode = $(elem).parent().next().children().last();
			if(ttlchild > 0)
			{
				childAgeNode.show();
				if(ttlchild > 1)
				{
					var ageclone = childAgeNode.clone();
					for(var i=2; i<=ttlchild; i++)
					{
						ageclone.find('small').html(i);
						//$(".childrenAge").append(ageclone);
						$(elem).parent().next().append(ageclone);
					}
				}
			}
			else
			{
				childAgeNode.hide();
			}
			$(elem).parent().parent().find('.roomchildren').val(ttlchild);
			$(elem).parent().parent().find('.roomshortinfo').children('.rchildren').html(ttlchild);
			//$("#children").val(parseInt(ttl)+1);
		}
	}
	else
	{
		$("#infant").val(parseInt(ttl)+1);
	}
}

function remove_guests(elem)
{
	var ttl = $(elem).next().find('span').text();
	if(ttl > 0)
	{
		var ttlAdultinRoom = $(elem).parent().parent().find('.roomadults').val();
		
		if($(elem).next().find('span').parent().attr('class') == 'adults')
		{
			if(ttlAdultinRoom > 1)
			{
				$(elem).next().find('span').text(parseInt(ttl)-1);
				total_traveler(parseInt(ttl)-1, $(elem));
				
				//$("#adults").val(parseInt(ttl)-1);
				$(elem).parent().parent().find('.roomadults').val(parseInt(ttl)-1);
				$(elem).parent().parent().find('.roomshortinfo').children('.radults').html(parseInt(ttl)-1);
			}
		}
		
		if($(elem).next().find('span').parent().attr('class') == 'child')
		{
			$(elem).next().find('span').text(parseInt(ttl)-1);
			total_traveler(parseInt(ttl)-1, $(elem));
		
			//$("#children").val(parseInt(ttl)-1);
			//alert($(elem).parent().next().attr('class'));
			var countdrop = $(elem).parent().next().children().length;
			//alert(countdrop);
			if(countdrop > 1)
			{
				$(elem).parent().next().children().last().remove();
			}
			else
			{
				$(elem).parent().next().children().last().hide();
			}
			$(elem).parent().parent().find('.roomchildren').val(parseInt(ttl)-1);
			$(elem).parent().parent().find('.roomshortinfo').children('.rchildren').html(parseInt(ttl)-1);
		}
		else
		{
			$("#infant").val(parseInt(ttl)-1);
		}
	}
}

function updguests(ele)
{
	//alert($(ele).attr('class'));
	$('.trvelerInfo').hide();
	$('.roomshortinfo').show();
	$(ele).parent().parent().find('.trvelerInfo').show();
}

function removeRoom(elem)
{
	$(elem).parent().parent().parent().remove();
	var ttlBox = $('.guestBox').length;
	$("#ttlhrooms").val(parseInt(ttlBox));
	$(".guestBox:last").find('.trvelerInfo').show();
	total_rooms(1);
	var j = 1;
	$(".rc").each(function(){
		$(this).html(j);
		j++;
	});
	
	total_traveler(0, $(".addh"));
}